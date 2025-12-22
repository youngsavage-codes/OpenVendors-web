import React from 'react';
import { QrCode } from 'lucide-react';

const GetAppButton = () => {
  return (
    <button className="bg-white mt-8 sm:mt-10 flex items-center gap-2 border border-gray-300 rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base">
      Get the app
      <QrCode className="w-5 h-5" />
    </button>
  );
};

export default GetAppButton;
