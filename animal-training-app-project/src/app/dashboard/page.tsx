'use client';

import Sidebar from '../../components/Sidebar';
import CreateAnimal from '../../components/forms/create/CreateAnimal';
import CreateTrainingLog from '../../components/forms/create/CreateTrainingLog';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import AdminAnimalView from '../../components/views/admin/AnimalViewAdmin';
import TrainingViewAdmin from '../../components/views/admin/TrainingViewAdmin';
import TrainingView from '../../components/views/user/TrainingView';
import AnimalView from '../../components/views/user/AnimalView';
import UserViewAdmin from '../../components/views/admin/UserViewAdmin';
// import UserViewAdmin from '../../components/views/UserViewAdmin'; need later 
import { useState } from 'react';

type PageView = 'training-logs' | 'create-training-log' | 'animals' | 'create-animal' | 'all-training' | 'all-animals' | 'all-users';

export default function TestPage() {
  const [currentView, setCurrentView] = useState<PageView>('training-logs');
  
  const handleCancel = () => {
    if (currentView === 'create-training-log') {
      setCurrentView('training-logs');
    } else if (currentView === 'create-animal') {
      setCurrentView('animals');
    }
    console.log('Cancelled');
  };
  
  const handleSave = () => {
    if (currentView === 'create-training-log') {
      setCurrentView('training-logs');
    } else if (currentView === 'create-animal') {
      setCurrentView('animals');
    }
    console.log('Saved');
  };

  const handleViewChange = (view: PageView) => {
    setCurrentView(view);
    console.log('View changed to:', view);
  };

  const handleCreateNew = () => {
    if (currentView === 'all-animals') {
      setCurrentView('create-animal');
    } else if (currentView === 'animals') {
      setCurrentView('create-animal');
    } else if (currentView === 'all-training') {
      setCurrentView('create-training-log');
    } else if (currentView === 'training-logs') {
      setCurrentView('create-training-log');
    }
    console.log('Create new clicked for view:', currentView);
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'create-animal': return 'Create Animal';
      case 'create-training-log': return 'Create Training Log';
      case 'training-logs': return 'Training Logs';
      case 'animals': return 'My Animals';
      case 'all-animals': return 'All Animals';
      case 'all-training': return 'All Training Logs';
      case 'all-users': return 'All Users';
      default: return String(currentView).charAt(0).toUpperCase() + String(currentView).slice(1).replace('-', ' ');
    }
  };

  const shouldShowCreateButton = ['training-logs', 'animals', 'all-animals', 'all-training'].includes(currentView);

  const renderView = () => {
    switch (currentView) {
      case 'all-animals':
        return <AdminAnimalView />;
      case 'all-training':
        return <TrainingViewAdmin />;
      case 'all-users':
        return <UserViewAdmin />;
      case 'create-animal':
        return <CreateAnimal onCancel={handleCancel} onSave={handleSave} />;
      case 'create-training-log':
        return <CreateTrainingLog onCancel={handleCancel} onSave={handleSave} />;
      case 'training-logs':
        return <TrainingView />;
      case 'animals':
        return <AnimalView />;
      default:
        return <div>Select a view from the sidebar</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex mt-[5.5rem]">
        <Sidebar 
          currentView={currentView} 
          onViewChange={handleViewChange} 
        />
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
