'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import CreateTrainingLog from '@/components/forms/create/CreateTrainingLog';
import EditTrainingLog from '@/components/forms/edit/EditTrainingLog';
import LogCard from '@/components/LogCard';

import { Heebo } from 'next/font/google';

const heebo = Heebo({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

interface Animal {
  _id: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  profilePicture: string;
}

interface TrainingLog {
  _id: string;
  user: {
    _id?: string;
    fullName: string;
  };
  animal: {
    _id?: string;
    name: string;
    breed: string;
    owner?: {
      _id: string;
      fullName: string;
    };
    hoursTrained?: number;
    profilePicture?: string;
  };
  title: string;
  date: Date;
  description: string;
  hours: number;
}

export default function TrainingLogView() {
  const { user } = useUser();
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingLog, setEditingLog] = useState<TrainingLog | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const fetchLogs = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/nonadmin/training', {
        headers: {
          'user-id': user._id
        }
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setLogs(result.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading training logs...</div>;
  }

  if (isCreating) {
    return (
      <CreateTrainingLog 
        onCancel={() => setIsCreating(false)}
        onSave={() => {
          setIsCreating(false);
          fetchLogs();
        }}
      />
    );
  }

  if (editingLog) {
    return (
      <EditTrainingLog 
        trainingLog={editingLog as any}
        onCancel={() => setEditingLog(null)}
        onSave={() => {
          setEditingLog(null);
          fetchLogs();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-auto px-8">
          <div className="flex flex-col items-center w-full space-y-6 py-8">
            {logs.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No training logs available.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log._id} onClick={() => setEditingLog(log)}>
                  <LogCard log={log} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}