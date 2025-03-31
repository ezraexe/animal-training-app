'use client';

import React from 'react';
import AnimalCard from '@/components/AnimalCard';
import UserCard from '@/components/UserCard';
import { AnimalWithId } from '@/schemas/animal.schema';
import { publicUserData } from '@/schemas/user.schema';

export default function Dashboard() {
  // Sample animal data for testing
  const sampleAnimal: AnimalWithId = {
    _id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    hoursTrained: 50,
    profilePicture: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    owner: {
      ownerId: 'owner123',
    },
  };

  // Sample user data for testing
  const sampleUser: publicUserData = {
    _id: '123',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    admin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Animals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <AnimalCard animal={sampleAnimal} />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserCard user={sampleUser} />
        </div>
      </div>
    </>
  );
}
