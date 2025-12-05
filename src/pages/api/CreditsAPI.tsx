import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../lib/firebase';

/**
 * API endpoint for CLI credit operations
 * 
 * Usage:
 * GET /api/credits?uid=USER_ID&action=get     - Get credit balance
 * GET /api/credits?uid=USER_ID&action=deduct  - Deduct 1 credit
 * GET /api/credits?uid=USER_ID&action=sync    - Get full user data
 */
export function CreditsAPI() {
  const [searchParams] = useSearchParams();
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const handleRequest = async () => {
      const uid = searchParams.get('uid');
      const action = searchParams.get('action') || 'get';
      // token param reserved for future auth: searchParams.get('token')

      // Basic validation
      if (!uid) {
        setResponse({ success: false, error: 'Missing uid parameter' });
        return;
      }

      try {
        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          setResponse({ success: false, error: 'User not found' });
          return;
        }

        const userData = userDoc.data();

        switch (action) {
          case 'get':
            setResponse({
              success: true,
              credits: userData.credits || 0
            });
            break;

          case 'deduct':
            const currentCredits = userData.credits || 0;
            if (currentCredits <= 0) {
              setResponse({
                success: false,
                credits: 0,
                error: 'No credits remaining'
              });
              return;
            }

            await updateDoc(userRef, {
              credits: increment(-1)
            });

            setResponse({
              success: true,
              credits: currentCredits - 1,
              deducted: 1
            });
            break;

          case 'sync':
            setResponse({
              success: true,
              uid: uid,
              email: userData.email,
              displayName: userData.displayName,
              credits: userData.credits || 0,
              plan: userData.plan || 'free',
              photoURL: userData.photoURL
            });
            break;

          default:
            setResponse({ success: false, error: 'Invalid action' });
        }
      } catch (error: any) {
        setResponse({ success: false, error: error.message });
      }
    };

    handleRequest();
  }, [searchParams]);

  // Return JSON response
  useEffect(() => {
    if (response) {
      // Set content type for programmatic access
      document.title = 'AADC API Response';
    }
  }, [response]);

  return (
    <pre style={{ 
      background: '#0a0a0a', 
      color: '#fff', 
      padding: '20px',
      margin: 0,
      minHeight: '100vh',
      fontFamily: 'monospace'
    }}>
      {response ? JSON.stringify(response, null, 2) : 'Loading...'}
    </pre>
  );
}
