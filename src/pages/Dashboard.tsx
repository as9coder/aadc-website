import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Coins, 
  History, 
  LogOut, 
  Terminal,
  Zap,
  TrendingUp,
  Package,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user, userData, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const copyApiKey = () => {
    // In a real app, you'd generate/fetch an API key
    navigator.clipboard.writeText('aadc_' + userData?.uid?.slice(0, 16) || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!user || !userData) {
    return null;
  }

  const planColors = {
    free: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
    starter: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    pro: 'text-red-400 bg-red-500/10 border-red-500/20'
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {userData.photoURL ? (
              <img 
                src={userData.photoURL} 
                alt={userData.displayName}
                className="w-16 h-16 rounded-full border-2 border-red-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-2xl font-bold">
                {userData.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{userData.displayName}</h1>
                {userData.betaAccess && (
                  <span className="px-2 py-1 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-full">
                    ✓ Beta Access
                  </span>
                )}
              </div>
              <p className="text-gray-400">{userData.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Credits Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Coins className="w-8 h-8 text-yellow-500" />
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${planColors[userData.plan]}`}>
                {userData.plan.toUpperCase()}
              </span>
            </div>
            <div className="text-4xl font-bold text-white mb-1">{userData.credits}</div>
            <div className="text-gray-400">Credits remaining</div>
            <Link 
              to="/pricing"
              className="mt-4 inline-flex items-center gap-1 text-red-500 hover:text-red-400 text-sm font-medium"
            >
              Buy more credits <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Plan Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-1 capitalize">{userData.plan}</div>
            <div className="text-gray-400">Current plan</div>
            {userData.plan === 'free' && (
              <Link 
                to="/pricing"
                className="mt-4 inline-flex items-center gap-1 text-red-500 hover:text-red-400 text-sm font-medium"
              >
                Upgrade now <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>

          {/* Usage Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-4xl font-bold text-white mb-1">{userData.purchases.length}</div>
            <div className="text-gray-400">Total purchases</div>
          </motion.div>
        </div>

        {/* API Key Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-red-500" />
            Your API Key
          </h2>
          <p className="text-gray-400 mb-4">Use this key to authenticate AADC CLI with your account.</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-300 font-mono text-sm">
              aadc_{userData.uid?.slice(0, 16)}...
            </code>
            <button
              onClick={copyApiKey}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Link 
            to="/pricing"
            className="flex items-center gap-4 p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl hover:border-red-500/40 transition-colors group"
          >
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Buy Credits</h3>
              <p className="text-gray-400">Get more credits for your projects</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
          </Link>
          
          <Link 
            to="/download"
            className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors group"
          >
            <div className="p-3 bg-white/10 rounded-lg">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Download CLI</h3>
              <p className="text-gray-400">Get the AADC command line tool</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
          </Link>
        </motion.div>

        {/* Purchase History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-gray-400" />
            Purchase History
          </h2>
          
          {userData.purchases.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No purchases yet</p>
              <Link 
                to="/pricing"
                className="mt-4 inline-flex items-center gap-1 text-red-500 hover:text-red-400 text-sm font-medium"
              >
                View pricing plans <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {userData.purchases.map((purchase, index) => (
                <div 
                  key={purchase.id || index}
                  className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Coins className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{purchase.credits} credits</div>
                      <div className="text-gray-500 text-sm">{purchase.plan} plan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">${purchase.amount}</div>
                    <div className="text-gray-500 text-sm">
                      {new Date(purchase.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
