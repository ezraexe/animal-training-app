'use client';

import Sidebar from '../../components/Sidebar';
import CreateAnimal from '../../components/forms/CreateAnimal';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

type PageView = 'training-logs' | 'animals' | 'all-training' | 'all-animals' | 'all-users';

export default function TestPage() {
  const [currentView, setCurrentView] = useState<PageView>('animals');
  
  const handleCancel = () => {
    console.log('Cancelled');
  };
  
  const handleSave = () => {
    console.log('Saved');
  };

  const handleViewChange = (view: PageView) => {
    setCurrentView(view);
    console.log('View changed to:', view);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      
      {/* Main Content */}
      <div className="flex h-[calc(100vh-6.375rem)] pt-0">
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />
        
        <div className="ml-80 flex-1 p-4">
          {currentView === 'animals' && (
            <CreateAnimal onCancel={handleCancel} onSave={handleSave} />
          )}
          {currentView !== 'animals' && (
            <div className="p-8">
              <h1 className="text-2xl font-bold">View: {currentView}</h1>
              <p className="mt-4">Click on different sidebar options to change views</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
