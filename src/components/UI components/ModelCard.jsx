export default function ModelCard({ model }) {
    return (
      <div className="border rounded-lg shadow-md p-4 bg-white">
        <h3 className="font-semibold text-lg truncate">{model.name}</h3>
        <div className="my-2 h-40 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-gray-400 text-sm">Model Preview</span>
        </div>
        <div className="flex gap-2 mt-2 text-sm">
          <button className="text-blue-600 underline">View</button>
          <button className="text-green-600 underline">Edit</button>
          <button className="text-red-500 underline">Delete</button>
        </div>
      </div>
    );
  }
  