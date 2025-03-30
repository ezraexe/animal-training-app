// Animal components display an image of the animal from a Google image URL string
// , its name, breed, owner, and hours it has been trained thus far.

import { AnimalWithId } from '@/schemas/animal.schema';

export default function AnimalCard({ animal }: { animal: AnimalWithId }) {
  return (
    <div className="w-[25rem] h-[23.375rem] bg-white rounded-lg overflow-hidden border border-gray-400">
      <div className="h-[16.25rem] overflow-hidden">
        <img
          src={animal.profilePicture}
          alt={`${animal.name}`}
          className="w-[25rem] h-[16.25rem] object-cover"
        />
      </div>

      <div className="p-4 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-[3.125rem] h-[3.125rem] bg-[#D21312] rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {animal.name[0].toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              {animal.name} - {animal.breed}
            </h3>
            <p className="text-gray-600 text-base">
              {animal.owner.ownerId} - Trained: {animal.hoursTrained} hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
