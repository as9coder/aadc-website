import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Check, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function BetaRequest() {
  const { user, userData } = useAuth();
  const [formData, setFormData] = useState({
    name: userData?.displayName || '',
    email: userData?.email || '',
    github: '',
    twitter: '',
    useCase: '',
    experience: 'intermediate',
    excitedAbout: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Store beta request in Firestore
      const requestId = user?.uid || `anonymous_${Date.now()}`;
      await setDoc(doc(db, 'betaRequests', requestId), {
        ...formData,
        uid: user?.uid || null,
        status: 'pending', // pending, approved, rejected
        submittedAt: serverTimestamp(),
      });

      // If user is logged in, update their profile with beta request status
      if (user?.uid) {
        await setDoc(doc(db, 'users', user.uid), {
          betaRequested: true,
          betaRequestedAt: serverTimestamp(),
        }, { merge: true });
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="glass rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Request Submitted!</h2>
            <p className="text-gray-400 mb-6">
              Thanks for your interest in AADC! We'll review your request and get back to you soon.
              You'll receive an email when you're approved for the closed beta.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-xl hover:from-red-500 hover:to-orange-400 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-300">Closed Beta</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              AADC Beta
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            We're currently in closed beta. Fill out this form to request early access 
            and be among the first to experience AADC.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Github className="w-4 h-4 inline mr-2" />
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Twitter className="w-4 h-4 inline mr-2" />
                  Twitter/X Handle
                </label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="@username"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Development Experience *
              </label>
              <select
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="beginner" className="bg-gray-900">Beginner (0-1 years)</option>
                <option value="intermediate" className="bg-gray-900">Intermediate (1-3 years)</option>
                <option value="advanced" className="bg-gray-900">Advanced (3-5 years)</option>
                <option value="expert" className="bg-gray-900">Expert (5+ years)</option>
              </select>
            </div>

            {/* Use Case */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What will you use AADC for? *
              </label>
              <textarea
                required
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                placeholder="Tell us about your projects and how you plan to use AADC..."
              />
            </div>

            {/* What excites you */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What excites you most about AI-assisted coding?
              </label>
              <textarea
                value={formData.excitedAbout}
                onChange={(e) => setFormData({ ...formData, excitedAbout: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                placeholder="Optional: Share your thoughts..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-medium text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-xl hover:from-red-500 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Request Beta Access
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have access?{' '}
            <Link to="/login" className="text-red-400 hover:text-red-300">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
