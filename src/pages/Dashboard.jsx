import Header from '../components/UI components/Header';
import ModelCard from '../components/UI components/ModelCard';

export default function Dashboard() {


  // Dummy array for layout preview
  const dummyModels = [
    { _id: '1', name: 'Modern Chair' },
    { _id: '2', name: 'Robot Arm' },
    { _id: '3', name: 'Futuristic Car' },
  ];

  return (
    <div>
      <Header />
      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📦 Your 3D Models</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Upload Model
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyModels.map((model) => (
            <ModelCard key={model._id} model={model} />
          ))}
        </div>
      </main>
    </div>
  );

}