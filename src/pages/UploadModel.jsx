import { useState, useRef } from 'react';
import useCreatorStore from '../store/CreatorStore/useCreatorStore';

export default function UploadModal({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();
    const uploadModel = useCreatorStore((state) => state.uploadModel);
    const setShowUploadModel = useCreatorStore((state) => state.setShowUploadModel);
    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            await uploadModel(file);
            setShowUploadModel(false);
            // Refresh the experience data to show the new model
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current.click()}
                    style={{ cursor: 'pointer' }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".glb,.gltf,.obj,.fbx"
                    />
                    <p className="text-gray-600 mb-2">
                        {file ? file.name : 'Drag and drop your 3D model here or click to browse files'}
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowUploadModel(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        disabled={!file || uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
}