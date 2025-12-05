import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, githubProvider, db } from '../lib/firebase';

// User data stored in Firestore
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  credits: number;
  plan: 'free' | 'starter' | 'pro';
  createdAt: Date;
  lastLoginAt: Date;
  purchases: Purchase[];
  // Beta access fields
  betaAccess: boolean;
  betaRequested: boolean;
  betaRequestedAt?: Date;
  betaApprovedAt?: Date;
}

export interface Purchase {
  id: string;
  plan: string;
  credits: number;
  amount: number;
  date: Date;
  stripeSessionId?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch or create user data in Firestore
  const fetchOrCreateUserData = async (firebaseUser: User): Promise<UserData> => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // Update last login
      await updateDoc(userRef, { lastLoginAt: serverTimestamp() });
      return userSnap.data() as UserData;
    } else {
      // Create new user document - no beta access by default
      const newUserData: UserData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'User',
        photoURL: firebaseUser.photoURL,
        credits: 5, // Free tier starts with 5 credits
        plan: 'free',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        purchases: [],
        betaAccess: false,
        betaRequested: false,
      };
      await setDoc(userRef, {
        ...newUserData,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });
      return newUserData;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setError(null);
      
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const data = await fetchOrCreateUserData(firebaseUser);
          setUserData(data);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user data');
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      throw err;
    }
  };

  const signInWithGithub = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with GitHub');
      throw err;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      throw err;
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      throw err;
    }
  };

  const refreshUserData = async () => {
    if (user) {
      try {
        const data = await fetchOrCreateUserData(user);
        setUserData(data);
      } catch (err) {
        console.error('Error refreshing user data:', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      error,
      signInWithGoogle,
      signInWithGithub,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
