'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import UserCard from '../../UserCard';
import { publicUserData } from '@/schemas/user.schema';

const UserViewAdmin: React.FC = () => {
  const { user } = useUser();
  const [users, setUsers] = useState<publicUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!user?._id) return;

        setLoading(true);
        const response = await fetch('/api/admin/users', {
          headers: {
            'user-id': user._id
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setUsers(data.data);
        } else {
          setError(data.error || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('An error occurred while fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No users available.</p>
            </div>
          ) : (
            users.map((userData) => (
              <UserCard 
                key={userData._id}
                user={userData}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserViewAdmin;
