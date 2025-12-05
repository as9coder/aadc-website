import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function CLIAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, userData, loading } = useAuth();
  const [status, setStatus] = useState<'loading' | 'ready' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  
  const callbackUrl = searchParams.get('callback');

  useEffect(() => {
    if (!loading) {
      if (user && userData) {
        setStatus('ready');
      } else {
        // Not logged in - redirect to login with return URL
        const currentUrl = window.location.href;
        navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
      }
    }
  }, [user, userData, loading, navigate]);

  const handleAuthorize = async () => {
    if (!callbackUrl || !userData) {
      setErrorMessage('Invalid callback URL');
      setStatus('error');
      return;
    }

    try {
      // Prepare auth data to send to CLI
      const authData = {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        credits: userData.credits,
        plan: userData.plan,
        timestamp: Date.now()
      };

      // Base64 encode the data
      const encodedData = btoa(JSON.stringify(authData));
      
      // Redirect to CLI callback
      const redirectUrl = `${callbackUrl}?data=${encodeURIComponent(encodedData)}`;
      window.location.href = redirectUrl;
      
      setStatus('success');
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMessage('Failed to authorize. Please try again.');
      setStatus('error');
    }
  };

  const handleDeny = () => {
    if (callbackUrl) {
      window.location.href = `${callbackUrl}?error=denied`;
    } else {
      navigate('/');
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Authorization Successful!</h1>
          <p className="text-gray-400">You can close this window and return to your terminal.</p>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Authorization Failed</h1>
          <p className="text-gray-400 mb-4">{errorMessage}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Authorize AADC CLI</h1>
          <p className="text-gray-400">
            The AADC command-line tool is requesting access to your account.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {userData?.photoURL ? (
              <img 
                src={userData.photoURL} 
                alt={userData.displayName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xl font-bold">
                {userData?.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <div className="text-white font-medium">{userData?.displayName}</div>
              <div className="text-gray-400 text-sm">{userData?.email}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3 border-t border-white/10">
            <span className="text-gray-400">Available Credits</span>
            <span className="text-white font-semibold">{userData?.credits || 0}</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-t border-white/10">
            <span className="text-gray-400">Plan</span>
            <span className="text-white font-semibold capitalize">{userData?.plan || 'Free'}</span>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-white font-medium mb-3">This will allow AADC CLI to:</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Access your account information
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Use credits for AI prompts
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              Stay logged in on this device
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleDeny}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAuthorize}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
          >
            Authorize
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Make sure you trust this application before authorizing.
        </p>
      </motion.div>
    </div>
  );
}
