'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import AnimalCard from '@/components/AnimalCard';
import { AnimalWithId } from '@/schemas/animal.schema';

export default function AdminAnimalView() {
  const { user } = useUser();
  const [animals, setAnimals] = useState<AnimalWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimals();
  }, [user]);

  const fetchAnimals = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/admin/animal', {
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
    return <div></div>;
  }

  return (
    <div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <AnimalCard 
            key={animal._id}
            animal={animal}
          />
        ))}
  
        {animals.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            No animals found
          </div>
        )}
      </div>
    </div>
  );
}
