"use client"
import { useState } from 'react';

interface TabComponentProps {
  exteriorContent: React.ReactNode;
  interiorContent: React.ReactNode;
  className?: string;
}

export default function TabComponent({ exteriorContent, interiorContent, className = "" }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior'>('exterior');

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Navigation */}
      <div className="flex w-full max-w-md mx-auto mb-6 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
        <button
          onClick={() => setActiveTab('exterior')}
          className={`flex-1 px-6 py-3 font-bold text-base transition-all duration-200 focus:outline-none ${
            activeTab === 'exterior' 
              ? 'bg-white text-green-700 shadow font-bold' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Exterior
          </div>
        </button>
        <button
          onClick={() => setActiveTab('interior')}
          className={`flex-1 px-6 py-3 font-bold text-base transition-all duration-200 focus:outline-none ${
            activeTab === 'interior' 
              ? 'bg-white text-green-700 shadow font-bold' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
              <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 7v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Interior
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'exterior' && (
          <div className="animate-fade-in">
            {exteriorContent}
          </div>
        )}
        {activeTab === 'interior' && (
          <div className="animate-fade-in">
            {interiorContent}
          </div>
        )}
      </div>
    </div>
  );
} 