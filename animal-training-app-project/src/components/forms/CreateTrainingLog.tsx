'use client'; 

import {useState, useEffect} from "react"; 
import { useUser } from "@/context/UserContext"; 
import { useRouter } from "next/navigation"; 

interface Animal {
  _id: string; 
  name: string; 
  breed: string; 
  owner: string; 
  hoursTrained: number; 
  profilePicture: string; 
}

interface CreateTrainingLogProps {
  onCancel: () => void; 
  onSave: () => void;
}

export default function CreateTrainingLog({ onCancel, onSave }: CreateTrainingLogProps) {
  const { user } = useUser(); 
  const router = useRouter(); 

  const [animals, setAnimals] = useState<Animal[]>([]); 
  
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        if (!user?._id) {
          console.log('No user ID available yet');
          return;
        }

        console.log('Fetching animals for user:', user._id);
        const response = await fetch(`/api/nonadmin/animal?owner=${user._id}`, {
          headers: {
            'user-id': user._id
          }
        }); 
        const data = await response.json(); 
        console.log('Animal fetch response:', data);

        if (data.success) {
          setAnimals(data.data);
        } else {
          console.error('Failed to fetch animals:', data.error);
        }
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };
    
    fetchAnimals();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        title: formData.get('title'),
        animal: formData.get('animalId'),
        hours: Number(formData.get('hours')),
        date: new Date(
          Number(formData.get('year')),
          Number(formData.get('month')) - 1,
          Number(formData.get('date'))
        ),
        description: formData.get('note'),
        user: user?._id
      };

      const response = await fetch('/api/nonadmin/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user?._id || ''
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      onSave();
    } catch (error) {
      console.error('Error saving training log:', error);
    }
  };

  return (
    <div>
      <div className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-lg mb-2 font-semibold">Title</label>
            <input 
              name="title"
              type="text" 
              className="w-full p-2 border border-[#C0BFBF] rounded-lg"
              placeholder="Title"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Select Animal</label>
            <select 
              name="animalId"
              className="w-full p-2 border border-[#C0BFBF] rounded-lg bg-white" 
              required
            >
              <option value="">Select an animal</option>
              {animals.map((animal) => (
                <option key={animal._id} value={animal._id}>
                  {animal.name} - {animal.breed}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Total hours trained</label>
            <input 
              name="hours"
              type="number" 
              className="w-full p-2 border border-[#C0BFBF] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              min="0"
              step="1"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-lg mb-2 font-semibold">Month</label>
              <select 
                name="month"
                className="w-full p-2 border border-[#C0BFBF] rounded-lg bg-white" 
                required
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(2000, i, 1);
                  return (
                    <option key={i} value={i + 1}>
                      {date.toLocaleString('default', { month: 'long' })}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-lg mb-2 font-semibold">Date</label>
              <input 
                name="date"
                type="number" 
                className="w-full p-2 border border-[#C0BFBF] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="20"
                min="1"
                max="31"
                required
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-lg mb-2 font-semibold">Year</label>
              <input 
                name="year"
                type="number" 
                className="w-full p-2 border border-[#C0BFBF] rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder={new Date().getFullYear().toString()}
                min="2000"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Note</label>
            <textarea 
              name="note"
              className="w-full p-2 border border-[#C0BFBF] rounded-lg h-32"
              placeholder="Enter notes"
              required
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onCancel}
              className="flex w-1/6 p-2 border border-[#D21312] rounded-md hover:bg-red-50 justify-center cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex w-1/6 p-2 bg-[#D21312] text-white rounded-md hover:bg-red-500 justify-center cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}