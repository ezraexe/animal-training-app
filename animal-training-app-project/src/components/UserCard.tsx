import { publicUserData } from '@/schemas/user.schema';

export default function UserCard({ user }: { user: publicUserData }) {
  return (
    <div className="w-[25rem] bg-white rounded-lg overflow-hidden border border-gray-400">
      <div className="p-4 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-[3.125rem] h-[3.125rem] bg-[#D21312] rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {user.fullName[0].toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              {user.fullName}
            </h3>
            <p className="text-gray-600 text-base">
              {user.email} - {user.admin ? 'Administrator' : 'User'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 