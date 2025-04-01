'use client'

import { useUser } from '@/context/UserContext'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation' 

type PageView = 'training-logs' | 'animals' | 'all-training' | 'all-animals' | 'all-users';

interface SidebarProps {
  currentView?: PageView; 
  onViewChange?: (view: PageView) => void
}

export default function Sidebar({ currentView = 'training-logs', onViewChange = () => {} } : SidebarProps) {

  const router = useRouter(); 
  const { user, logout } = useUser(); 
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) return null; 

  const handleLogout = async () => {
    try {
      await logout(); 
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }



  return (
    <div className="h-[calc(100vh-6.375rem)] w-80 bg-white py-2 px-6 flex flex-col border-r-2 border-[#615E5E66] font-heebo fixed left-0 top-[6.375rem] bottom-0 overflow-y-auto"> 
      <div className="space-y-4 mb-20">
        {/*Training logs menu*/}
        <div 
          onClick={() => onViewChange('training-logs')}
          className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer 
            ${currentView === 'training-logs' ? 'bg-[#D21312] text-white' : 'hover:bg-gray-100'}`}
        >
          <img 
            src="/training-log-pen.svg"
            alt="Training Log Pen"
            className="w-6"
          />
          <span className={`text-xl pl-2 ${currentView === 'training-logs' ? 'text-white' : 'text-[#565252]'}`}>Training Logs</span>
        </div>

        {/* Animal Menu */} 
        <div 
          onClick={() => onViewChange('animals')}
          className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
            ${currentView === 'animals' ? 'bg-[#D21312] text-white' : 'hover:bg-gray-100'}`}
        >
          <img 
            src="/animal-bone.svg"
            alt="Animal Bone"
            className="w-6"
          />
          <span className={`text-xl pl-2 ${currentView === 'animals' ? 'text-white' : 'text-[#565252]'}`}>Animals</span>
        </div>

        {/* Admin Section*/}
        {mounted && user?.admin && (
          <>
            <div className="pt-4 font-bold text-xl text-[#565252] border-t-2 border-[#615E5E66] pl-3 pr-3">Admin access</div>

            {/* All Training */}
            <div 
              onClick={() => onViewChange('all-training')}
              className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
                ${currentView === 'all-training' ? 'bg-[#D21312] text-white' : 'hover:bg-gray-100'}`}
            >
              <img 
                src="/training-folder.svg"
                alt="Training Folder"
                className="w-6"
              />
              <span className={`text-xl pl-2 ${currentView === 'all-training' ? 'text-white' : 'text-[#565252]'}`}>All Training</span>
            </div>

            {/* All Animals */}
            <div 
              onClick={() => onViewChange('all-animals')}
              className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
                ${currentView === 'all-animals' ? 'bg-[#D21312] text-white' : 'hover:bg-gray-100'}`}
            >
              <img 
                src="/animal-rabbit.svg"
                alt="Animals"
                className="w-6"
              />
              <span className={`text-xl pl-2 ${currentView === 'all-animals' ? 'text-white' : 'text-[#565252]'}`}>All Animals</span>
            </div>

            {/* All Users */}
            <div 
              onClick={() => onViewChange('all-users')}
              className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
                ${currentView === 'all-users' ? 'bg-[#D21312] text-white' : 'hover:bg-gray-100'}`}
            >
              <img 
                src="/all-user.svg"
                alt="All Users"
                className="w-6"
              />
              <span className={`text-xl pl-2 ${currentView === 'all-users' ? 'text-white' : 'text-[#565252]'}`}>All Users</span>
            </div>
          </>
        )}
      </div>
      
      {/* User Profile Section*/}
      <div className="fixed bottom-0 left-0 w-80 pt-4 border-t-2 border-r-2 border-[#615E5E66] bg-white px-6 pb-2">
        <div className="p-3 flex items-center space-x-2 text-[#565252]">
          <div className="w-8 h-8 bg-[#D21312] rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
          </div>
          <span className="text-xl">{user?.fullName || 'User Name'}</span>
          <div className="flex flex-grow items-center justify-end">
            <img 
              src="/logout-button.svg"
              alt="Logout"
              className="w-6 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  )
}