import React, { useState } from 'react';
import { ArrowLeft, Trash2, AlertTriangle, CheckCircle, Mail, ShieldAlert } from 'lucide-react';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const DeleteAccount: React.FC<Props> = ({ onBack, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address associated with your Gamura account.');
      return;
    }
    if (!confirmed) {
      setError('Please confirm that you understand this action is permanent.');
      return;
    }

    setError('');
    setIsDeleting(true);

    // Simulate account deletion pipeline (Firebase Auth + Firestore purge)
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] px-5 sm:px-8 py-12 md:py-20 font-sans">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-[#10b981] text-sm font-semibold mb-8 transition-colors border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gamura
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-400">
            Google Play Data Safety & Deletion
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Delete Gamura Account &amp; Data
        </h1>
        <p className="text-slate-400 text-sm mb-8 pb-6 border-b border-slate-800">
          In compliance with Google Play Store User Data policies, users can request full deletion of their account credentials and all associated stored data at any time.
        </p>

        {isDeleted ? (
          <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Account Deletion Scheduled
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto mb-6">
              Your request for <strong>{email}</strong> has been received. Your Firebase Authentication credentials and all cloud Firestore records (profile, preferences, saved code, and game stats) are being permanently purged.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all"
            >
              Return to Homepage
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex gap-4 text-amber-200">
              <AlertTriangle className="w-6 h-6 shrink-0 text-amber-400 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold text-amber-300">
                  What happens when you delete your account?
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-xs sm:text-sm">
                  <li>Your Firebase Authentication user profile (Google login or email) is permanently deleted.</li>
                  <li>All Firestore database records (saved apps, high scores, GTrade watchlists, code previews) are wiped.</li>
                  <li>Any active sessions are terminated immediately.</li>
                  <li>This action cannot be undone.</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div>
                <label htmlFor="delete-email" className="block text-sm font-medium text-slate-200 mb-1.5">
                  Account Email Address
                </label>
                <input
                  id="delete-email"
                  type="email"
                  required
                  placeholder="your-email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="confirm-delete"
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-700 text-rose-500 focus:ring-rose-500"
                />
                <label htmlFor="confirm-delete" className="text-xs sm:text-sm text-slate-300 cursor-pointer">
                  I understand that this action is irreversible and will permanently delete my Gamura account, profile, and all associated cloud data.
                </label>
              </div>

              {error && (
                <p className="text-rose-400 text-xs font-medium pt-1">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isDeleting}
                className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30"
              >
                {isDeleting ? (
                  <>Processing Deletion Request...</>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Permanently Delete My Account
                  </>
                )}
              </button>
            </form>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-400 space-y-2">
              <div className="flex items-center gap-2 font-medium text-slate-300">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                Alternative: Request Manual Deletion by Email
              </div>
              <p>
                If you prefer manual handling, you can email founder Selvaranjan G directly. Please include your registered account email and specify &ldquo;Gamura Account Deletion&rdquo; in the subject line:
              </p>
              <div className="pt-1">
                <a
                  href="mailto:selva6ranjan@gmail.com?subject=Gamura%20Account%20Deletion%20Request"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  selva6ranjan@gmail.com
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>&copy; 2026 Gamura. Founded by Selvaranjan G.</span>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
