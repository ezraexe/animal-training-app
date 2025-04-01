import LogCard from '@/components/LogCard';

export default function TestPage() {
  // Sample training log data
  const sampleLog = {
    _id: '1',
    user: {
      fullName: 'Long Lam'
    },
    animal: {
      name: 'Lucy',
      breed: 'Golden Retriever'
    },
    title: 'Complete sit lessons',
    date: new Date('2023-10-20'),
    description: 'Lucy finishes the sit lessons very well today. Should give her a treat',
    hours: 20
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <LogCard log={sampleLog} />
    </div>
  );
} 