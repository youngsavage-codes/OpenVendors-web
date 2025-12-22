'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface SearchInputProps {
  icon: React.ReactNode;
  loading?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  loading,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-gray-600 flex-shrink-0" />
      ) : (
        <span className="text-gray-600 flex-shrink-0">{icon}</span>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-sm sm:text-base bg-transparent outline-none border-none font-inter text-black placeholder:text-gray-600"
      />
    </div>
  );
};

export default SearchInput;
