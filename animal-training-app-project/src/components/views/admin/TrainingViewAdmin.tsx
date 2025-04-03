'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import LogCard from '../../LogCard';
import EditTrainingLog from '@/components/forms/edit/EditTrainingLog';

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
  const [editingLog, setEditingLog] = useState<TrainingLog | null>(null);

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

  useEffect(() => {
    fetchTrainingLogs();
  }, [user]);

  const handleEditLog = (log: TrainingLog) => {
    // Format the log to match what EditTrainingLog expects
    const formattedLog = {
      ...log,
      user: log.user._id || '',
      animal: {
        ...log.animal,
        _id: log.animal._id || ''
      }
    };
    setEditingLog(formattedLog as any);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading training logs...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (editingLog) {
    return (
      <EditTrainingLog 
        trainingLog={editingLog as any}
        onCancel={() => setEditingLog(null)}
        onSave={() => {
          setEditingLog(null);
          fetchTrainingLogs();
        }}
      />
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6">
        {trainingLogs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No training logs available.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trainingLogs.map((log) => (
              <div key={log._id} className="cursor-pointer" onClick={() => handleEditLog(log)}>
                <LogCard key={log._id} log={log} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingViewAdmin;
