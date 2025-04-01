'use client';

import Sidebar from '../../components/Sidebar';
import CreateAnimal from '../../components/forms/CreateAnimal';
import CreateTrainingLog from '../../components/forms/CreateTrainingLog';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import AdminAnimalView from '../../components/views/AnimalViewAdmin';
import TrainingViewAdmin from '../../components/views/TrainingViewAdmin';
// import UserViewAdmin from '../../components/views/UserViewAdmin'; need later 
import { useState } from 'react';

type PageView = 'training-logs' | 'animals' | 'all-training' | 'all-animals' | 'all-users';

export default function TestPage() {
  const [currentView, setCurrentView] = useState<PageView>('training-logs');
  
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

  const handleCreateNew = () => {
    if (currentView === 'all-animals') {
      setCurrentView('animals');
    } else if (currentView === 'all-training') {
      setCurrentView('training-logs');
    }
    console.log('Create new clicked for view:', currentView);
  };


  const getHeaderTitle = () => {
    switch (currentView) {
      case 'animals': return 'Create Animal';
      case 'training-logs': return 'Create Training Log';
      case 'all-animals': return 'All Animals';
      case 'all-training': return 'All Training Logs';
      case 'all-users': return 'All Users';
      default: return String(currentView).charAt(0).toUpperCase() + String(currentView).slice(1).replace('-', ' ');
    }
  };


  const shouldShowCreateButton = ['training-logs', 'animals'].includes(currentView);

  const renderView = () => {
    switch (currentView) {
      case 'all-animals':
        return <AdminAnimalView />;
      case 'all-training':
        return <TrainingViewAdmin />;
      // case 'all-users':
      //   return <UserViewAdmin />;
      case 'animals':
        return <CreateAnimal onCancel={handleCancel} onSave={handleSave} />;
      case 'training-logs':
        return <CreateTrainingLog onCancel={handleCancel} onSave={handleSave} />;
      default:
        return <div>Select a view from the sidebar</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex mt-[5.5rem]">
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />
        <div className="ml-80 flex-1 flex flex-col">
          <div className="sticky top-[5.5rem] bg-white z-10 w-full">
            <Header 
              title={getHeaderTitle()} 
              onCreateNew={shouldShowCreateButton ? handleCreateNew : undefined} 
            />
          </div>
          
          <div className="p-4 flex-1 overflow-auto">
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
}
