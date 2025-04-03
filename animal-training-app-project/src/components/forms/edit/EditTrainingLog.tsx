'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

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
  user: string | { _id?: string; fullName: string };
  animal: Animal | { _id?: string; name: string; breed: string };
  title: string;
  date: Date;
  description: string;
  hours: number;
}

interface EditTrainingLogProps {
  onCancel: () => void;
  onSave: () => void;
  trainingLog: TrainingLog;
}

export default function EditTrainingLog({ onCancel, onSave, trainingLog }: EditTrainingLogProps) {
  const { user } = useUser();
  const router = useRouter();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAnimals = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch(`/api/nonadmin/animal?owner=${user._id}`);
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setAnimals(result.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };
  
  useEffect(() => {
    fetchAnimals();
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        _id: trainingLog._id,
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

      const response = await fetch(`/api/nonadmin/training/${trainingLog._id}`, {
        method: 'PATCH',
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
      console.error('Error updating training log:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this training log?')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/nonadmin/training/${trainingLog._id}`, {
        method: 'DELETE',
        headers: {
          'user-id': user?._id || ''
        }
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      
      onSave(); 
    } catch (error) {
      console.error('Error deleting training log:', error);
      alert('Failed to delete training log');
    } finally {
      setIsDeleting(false);
    }
  };

  const logDate = new Date(trainingLog.date);
  const year = logDate.getFullYear();
  const month = logDate.getMonth() + 1;
  const date = logDate.getDate();

  const animalId = typeof trainingLog.animal === 'object' && trainingLog.animal !== null 
    ? trainingLog.animal._id 
    : trainingLog.animal;

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
              defaultValue={trainingLog.title}
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Select Animal</label>
            <select 
              name="animalId"
              className="w-full p-2 border border-[#C0BFBF] rounded-lg bg-white" 
              defaultValue={animalId}
              required
            >
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
              defaultValue={trainingLog.hours}
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
                defaultValue={month}
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
                defaultValue={date}
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
                defaultValue={year}
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
              defaultValue={trainingLog.description}
              required
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onCancel}
              className="flex-1 p-2 border border-[#D21312] rounded-md hover:bg-red-50 justify-center cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 p-2 border border-[#D21312] bg-white text-black rounded-md hover:bg-red-50 justify-center cursor-pointer"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button 
              type="submit"
              className="flex-1 p-2 bg-[#D21312] text-white rounded-md hover:bg-red-500 justify-center cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
