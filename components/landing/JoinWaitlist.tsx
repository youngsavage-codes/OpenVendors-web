'use client';

import React, { useState } from 'react';
import { Loader2, Mail } from 'lucide-react';

interface JoinWaitlistProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

const JoinWaitlist: React.FC<JoinWaitlistProps> = ({
  title = 'Join our waitlist',
  description = 'Be the first to know when we launch. No spam, ever.',
  buttonText = 'Join waitlist',
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    try {
      setLoading(true);
      await onSubmit?.(email);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 text-center space-y-6 shadow-sm">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-black">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base">
        {description}
      </p>

      {/* Success State */}
      {success ? (
        <div className="rounded-xl bg-green-50 text-green-700 py-4 text-sm font-medium">
          🎉 You’re on the waitlist!
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Input */}
          <div className="flex items-center gap-2 flex-1 rounded-full border border-gray-300 px-4 py-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-sm sm:text-base placeholder:text-gray-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-full bg-black text-white px-6 py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinWaitlist;
