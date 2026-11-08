import React from 'react';
import { ArrowLeft, Shield, Mail, ExternalLink } from 'lucide-react';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const PrivacyPolicy: React.FC<Props> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] px-5 sm:px-8 py-12 md:py-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-[#10b981] text-sm font-semibold mb-8 transition-colors border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gamura
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#10b981]">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#10b981]">
            Legal & Compliance
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm mb-10 pb-6 border-b border-slate-800">
          Last updated: November 8, 2026 • Effective Date: November 8, 2026
        </p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
            <p>
              Gamura (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an independent digital ecosystem of web and mobile applications founded and operated by <strong>Selvaranjan G</strong>, based in Chennai, India. Gamura provides games, developer utilities, AI interactive chat services (such as BuBuBai), and creative web tools.
            </p>
            <p className="mt-2">
              If you have any questions about this Privacy Policy or how your personal information is handled, you can reach the founder directly at:
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-400 font-mono text-sm">
              <Mail className="w-4 h-4" />
              selva6ranjan@gmail.com
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Data We Collect</h2>
            <p>When you create an account or interact with the Gamura ecosystem, we may collect the following categories of information:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li><strong>Account Credentials:</strong> Name, email address, and profile photo when signing in via Google Authentication or Firebase Authentication.</li>
              <li><strong>User Generated Content:</strong> Saved projects, code snippets created in Gamura Code Preview / GJava, market simulation watchlists in GTrade, chat prompts in BuBuBai, and files staged for transfer in Gamura Rollout.</li>
              <li><strong>Device & Usage Data:</strong> IP address, device type, operating system version, browser user agent, referral source, and anonymous crash telemetry.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Why We Collect Information</h2>
            <p>We process your data strictly to fulfill legitimate operational purposes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li>To authenticate your identity and protect user accounts from unauthorized access.</li>
              <li>To synchronize your preferences, saved states, and games across mobile and desktop devices.</li>
              <li>To operate our AI chat interfaces and compile/run code within browser developer sandboxes.</li>
              <li>To diagnose bugs, detect abuse, and enhance service reliability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Service Providers</h2>
            <p>We rely on trusted, industry-standard third-party providers to operate Gamura infrastructure:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li><strong>Google Firebase:</strong> Cloud Firestore database, Firebase Authentication, and Firebase Cloud Storage.</li>
              <li><strong>Vercel & Netlify:</strong> High-performance edge hosting, CDN caching, and serverless compute.</li>
              <li><strong>Google Play Services:</strong> Core Android application runtime, auto-updates, and licensing.</li>
              <li><strong>Ad & Monetization Partners:</strong> If advertisements or in-app billing are enabled in future updates (such as Google AdMob or Google Play Billing), standard advertising IDs may be processed according to Google Play policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Retention & Security</h2>
            <p>
              We implement industry-standard encryption in transit (HTTPS / TLS 1.3) and secure Firestore security rules to protect your personal data. We keep your personal information only for as long as your Gamura account remains active.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. User Rights & Account Deletion</h2>
            <p>
              In full compliance with Google Play Store Developer Guidelines and data privacy laws (GDPR/CCPA), you retain complete control over your data. You may inspect, rectify, or request immediate permanent deletion of your account and all associated records.
            </p>
            <p className="mt-3">
              To delete your account and all associated data, visit our dedicated self-service portal:
            </p>
            <div className="mt-3">
              <button
                onClick={() => onNavigate('delete-account')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 font-semibold text-sm transition-colors"
              >
                Go to Account Deletion Page
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Children&rsquo;s Privacy</h2>
            <p>
              Gamura is intended for general audiences aged 13 and older. We do not knowingly collect or solicit personal identifiable information from children under 13. If you believe a child has provided us personal data, please contact us immediately to remove it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Changes to this Policy</h2>
            <p>
              We may update this policy periodically to reflect feature releases or regulatory changes. Material changes will be accompanied by an updated effective date at the top of this document.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>&copy; 2026 Gamura. Founded by Selvaranjan G.</span>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('terms')} className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('delete-account')} className="hover:text-rose-400 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
