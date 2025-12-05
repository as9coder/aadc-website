/**
 * Credits API utilities for CLI integration
 * The CLI will call these endpoints to manage credits
 */

import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CreditResponse {
  success: boolean;
  credits?: number;
  error?: string;
}

/**
 * Get user's current credit balance
 */
export async function getUserCredits(uid: string): Promise<CreditResponse> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, credits: userDoc.data().credits || 0 };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Deduct one credit from user's balance
 */
export async function deductCredit(uid: string): Promise<CreditResponse> {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return { success: false, error: 'User not found' };
    }
    
    const currentCredits = userDoc.data().credits || 0;
    if (currentCredits <= 0) {
      return { success: false, credits: 0, error: 'No credits remaining' };
    }
    
    // Deduct one credit
    await updateDoc(userRef, {
      credits: increment(-1)
    });
    
    return { success: true, credits: currentCredits - 1 };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
