"use client";

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

interface CreateAnimalProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function CreateAnimal({ onCancel, onSave }: CreateAnimalProps) {
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        name: formData.get("name"),
        breed: formData.get("breed"),
        hoursTrained: Number(formData.get("hoursTrained")) || 0,
        owner: user?._id,
        profilePicture: "",
      };

      const response = await fetch("/api/nonadmin/animal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": user?._id || "",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      onSave(); // notifies parent component that animal was created
    } catch (error) {
      console.error("Error when creating animal:", error);
    }
  };

  return (
    <div>
      <div className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-lg mb-2 font-semibold">
              Animal Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full p-2 border border-[#C0BFBF] rounded-lg"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Breed</label>
            <input
              name="breed"
              type="text"
              className="w-full p-2 border border-[#C0BFBF] rounded-lg"
              placeholder="Animal Breed"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">
              Total Hours Trained
            </label>
            <input
              name="hoursTrained"
              type="number"
              className="w-full p-2 border border-[#C0BFBF] rounded-lg"
              placeholder="0"
              min="0"
              step="1"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-lg mb-2 font-semibold">
                Birth Month
              </label>
              <select
                name="month"
                className="w-full p-2 border border-[#C0BFBF] rounded-lg bg-white"
                required
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(2000, i, 1);
                  return (
                    <option key={i} value={i + 1}>
                      {date.toLocaleString("default", { month: "long" })}
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

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onCancel}
              className="flex w-1/6 p-2 border border-[#D21312] rounded-md hover:bg-red-50 justify-center cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" // this button calls handleSubmit method then makes post request to /api/nonadmin/animal
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
