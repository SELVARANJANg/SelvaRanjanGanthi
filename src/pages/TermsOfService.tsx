import React from 'react';
import { ArrowLeft, FileText, Mail } from 'lucide-react';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const TermsOfService: React.FC<Props> = ({ onBack, onNavigate }) => {
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
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#10b981]">
            Agreement & Conditions
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm mb-10 pb-6 border-b border-slate-800">
          Last updated: November 8, 2026 • Effective Date: November 8, 2026
        </p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing, installing, or using Gamura (including the Progressive Web App, Android application, or connected web services), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. User Accounts & Responsibilities</h2>
            <p>
              To access certain features (such as persistent game scores, saved code sandboxes, or customized AI personas), you may be required to sign in using Google or Firebase Authentication. You are responsible for safeguarding your login credentials and for any activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Acceptable Use</h2>
            <p>You agree not to misuse Gamura or assist anyone else in doing so. You will not:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
              <li>Reverse engineer, decompile, or extract the source code of proprietary services except as permitted by open-source licenses.</li>
              <li>Use the services to distribute malware, transmit harmful code, or launch denial-of-service attacks.</li>
              <li>Abuse, harass, or submit defamatory or infringing content through AI prompts or file transfer channels.</li>
              <li>Attempt to circumvent security controls or rate limits on cloud APIs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
            <p>
              Gamura, its logos, branding, trademarks, interface graphics, and original codebase are the intellectual property of <strong>Selvaranjan G</strong>. All rights not expressly granted to you are reserved. Any user content you create or submit remains your own.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Disclaimer of Warranties</h2>
            <p>
              Gamura is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, either express or implied. Simulated market tools such as GTrade are educational simulators and do not constitute real financial or investment advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Gamura and its founder shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Information</h2>
            <p>
              For legal inquiries or questions regarding these terms, contact:
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-400 font-mono text-sm">
              <Mail className="w-4 h-4" />
              selva6ranjan@gmail.com
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>&copy; 2026 Gamura. Founded by Selvaranjan G.</span>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:text-emerald-400 transition-colors">
              Privacy Policy
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
