'use client';

import React, { useEffect, useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import SearchInput from './SearchInput';

const SearchBar = () => {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [serviceLoading, setServiceLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (!service.trim()) return setServiceLoading(false);
    setServiceLoading(true);
    const t = setTimeout(() => setServiceLoading(false), 1000);
    return () => clearTimeout(t);
  }, [service]);

  useEffect(() => {
    if (!location.trim()) return setLocationLoading(false);
    setLocationLoading(true);
    const t = setTimeout(() => setLocationLoading(false), 1000);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center bg-white rounded-3xl lg:rounded-full px-4 sm:px-6 py-4 lg:py-3 gap-4 border-4 sm:border-[7px] border-white/40 backdrop-blur-md">

        <SearchInput
          icon={<Search className="w-5 h-5" />}
          value={service}
          loading={serviceLoading}
          onChange={(e) => setService(e.target.value)}
          placeholder="All treatments and venues"
        />

        <div className="hidden lg:block h-6 w-px bg-gray-300" />

        <SearchInput
          icon={<MapPin className="w-5 h-5" />}
          value={location}
          loading={locationLoading}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Current location"
        />

        <div className="hidden lg:block h-6 w-px bg-gray-300" />

        <SearchInput
          icon={<Calendar className="w-5 h-5" />}
          type="datetime-local"
        />

        <button className="w-full lg:w-auto lg:ml-4 bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
