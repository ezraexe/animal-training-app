'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import LogCard from '../LogCard';

interface Animal {
  _id: string;
  name: string;
  breed: string;
  owner: {
    _id: string;
    fullName: string;
  };
  hoursTrained: number;
  profilePicture: string;
}

interface TrainingLog {
  _id: string;
  user: {
    _id: string;
    fullName: string;
  };
  animal: Animal;
  title: string;
  date: string;
  description: string;
  hours: number;
}

const TrainingViewAdmin: React.FC = () => {
  const { user } = useUser();
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainingLogs = async () => {
      try {
        if (!user?._id) return;

        setLoading(true);
        const response = await fetch('/api/admin/training', {
          headers: {
            'user-id': user._id
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setTrainingLogs(data.data);
        } else {
          setError(data.error || 'Failed to fetch training logs');
        }
      } catch (error) {
        console.error('Error fetching training logs:', error);
        setError('An error occurred while fetching training logs');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingLogs();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading training logs...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6">
        
        {/* Empty state message */}
        <div className="text-center py-10">
          <p className="text-gray-500">No training logs available.</p>
        </div>
        
        {/* You can add a button to create new logs if needed */}
        {/* <div className="mt-4 text-center">
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Create New Training Log
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TrainingViewAdmin;
