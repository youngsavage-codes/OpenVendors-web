'use client';

import React from 'react';
import GetAppButton from './landing/GetAppButton';
import LandingHero from './landing/LandingHero';
import SearchBar from './landing/SearchBar';
import Stats from './landing/Stats';
import JoinWaitlist from './landing/JoinWaitlist';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center text-center w-full max-w-6xl">
        <LandingHero />
        <JoinWaitlist
          title="Join the waitlist"
          description="Early access, exclusive perks, and launch updates."
          onSubmit={async (email) => {
            console.log('Waitlist email:', email);
            // call API here
          }}
        />
        <Stats />
        <GetAppButton />
      </div>
    </div>
  );
};

export default LandingPage;
