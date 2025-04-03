'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import AnimalCard from '@/components/AnimalCard';
import { AnimalWithId } from '@/schemas/animal.schema';

export default function AnimalView() {
  const { user } = useUser();
  const [animals, setAnimals] = useState<AnimalWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimals();
  }, [user]);

  const fetchAnimals = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/nonadmin/animal', {
        headers: {
          'Content-Type': 'application/json',
          'user-id': user._id
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setAnimals(result.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading animals...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No animals available.</p>
            </div>
          ) : (
            animals.map((animal) => (
              <AnimalCard 
                key={animal._id}
                animal={animal}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
