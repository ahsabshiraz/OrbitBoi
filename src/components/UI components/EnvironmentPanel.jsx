import { FiSun, FiUpload, FiTrash2 } from 'react-icons/fi';
import PremiumToggle from './PremiumToggle';
import Slider from './Slider';
import { useState, useEffect } from 'react';

const EnvironmentPanel = ({ store }) => {
    const [hdrFile, setHdrFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.hdr')) {
            setHdrFile(file);
        } else {
            alert('Please select a valid .hdr file');
        }
    };
console.log('selectedCustomHdr---->',store.selectedCustomHdr)
    const handleUploadHdr = async () => {
        if (!hdrFile) {
            alert('Please select a file');
            return;
        }
        setUploading(true);
        try {
            // Use the file's original name for upload
            await store.uploadHdr(hdrFile);
            setHdrFile(null);
            // Reset file input
            const fileInput = document.getElementById('hdr-file-input');
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload HDR file');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteHdr = async (hdrId) => {
        if (confirm('Are you sure you want to delete this HDR?')) {
            try {
                await store.deleteHdr(hdrId);
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Failed to delete HDR file');
            }
        }
    };


    return (
    <div className="bg-white/5 rounded-lg p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FiSun className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-zinc-200 font-medium">Environment</span>
            </div>
            <PremiumToggle checked={store.env} onChange={() => { store.setEnv(); store.setGround(); }} />
        </div>
        {/* Add Environment Ground Controls */}
        <div className="mt-4 space-y-2">
            <span className="text-xs text-zinc-400 font-medium">Ground (Environment)</span>
            <div>
                <span className="text-xs text-zinc-400">HDR Type</span>
                <select
                    value={store.hdrType}
                    onChange={e => store.setHdrType(e.target.value)}
                    disabled={store.selectedCustomHdr !== null}
                    className={`w-full text-white text-xs px-2 py-1 rounded border focus:outline-none mb-2 ${
                        store.selectedCustomHdr 
                            ? 'bg-gray-600/50 border-gray-500 cursor-not-allowed' 
                            : 'bg-black/50 border-white/10 focus:border-blue-500'
                    }`}
                >
                    <option value="apartment">apartment</option>
                    <option value="city">city</option>
                    <option value="dawn">dawn</option>
                    <option value="forest">forest</option>
                    <option value="lobby">lobby</option>
                    <option value="night">night</option>
                    <option value="park">park</option>
                    <option value="studio">studio</option>
                    <option value="sunset">sunset</option>
                    <option value="warehouse">warehouse</option>
                </select>
                {store.selectedCustomHdr && (
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-400">Custom HDR selected: {store.selectedCustomHdr.name}</span>
                        <button
                            onClick={() => store.setSelectedCustomHdr(null)}
                            className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded bg-black/30"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>
            <div>
                <span className="text-xs text-zinc-400">Radius</span>
                <Slider
                    value={store.hdrRadius}
                    onChange={store.setHdrRadius}
                    min={1}
                    max={1000}
                    step={1}
                    color="blue"
                />
            </div>
            <div>
                <span className="text-xs text-zinc-400">Height</span>
                <Slider
                    value={store.hdrHeight}
                    onChange={store.setHdrHeight}
                    min={30}
                    max={100}
                    step={1}
                    color="blue"
                />
            </div>
            <div>
                <span className="text-xs text-zinc-400">Scale</span>
                <Slider
                    value={store.hdrScale}
                    onChange={store.setHdrScale}
                    min={150}
                    max={890}
                    step={1}
                    color="blue"
                />
            </div>
        </div>

        {/* Custom HDR Upload Section */}
        <div className="mt-6 space-y-3">
            <span className="text-xs text-zinc-400 font-medium">Custom HDR Files</span>
            
            {/* Upload Form */}
            <div className="space-y-2">
                <input
                    id="hdr-file-input"
                    type="file"
                    accept=".hdr"
                    onChange={handleFileChange}
                    className="w-full bg-black/50 text-white text-xs px-2 py-1 rounded border border-white/10 focus:border-blue-500 focus:outline-none"
                />
                <button
                    onClick={handleUploadHdr}
                    disabled={uploading || !hdrFile}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-xs px-3 py-2 rounded flex items-center justify-center gap-2"
                >
                    <FiUpload className="w-3 h-3" />
                    {uploading ? 'Uploading...' : 'Upload HDR'}
                </button>
            </div>

            {/* Custom HDRs List */}
            <div className="space-y-2">
                {store.customHdrs && store.customHdrs.length > 0 ? (
                    store.customHdrs.map((hdr) => (
                        <div 
                            key={hdr._id} 
                            className={`flex items-center justify-between rounded p-2 cursor-pointer transition-colors ${
                                store.selectedCustomHdr?._id === hdr._id 
                                    ? 'bg-blue-600/50 border border-blue-400' 
                                    : 'bg-black/30 hover:bg-black/50'
                            }`}
                            onClick={() => store.setSelectedCustomHdr(hdr)}
                        >
                            <span className="text-xs text-zinc-200">{hdr.name}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteHdr(hdr._id);
                                }}
                                className="text-red-400 hover:text-red-300 p-1"
                            >
                                <FiTrash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))
                ) : (
                    <span className="text-xs text-zinc-500">No custom HDRs uploaded</span>
                )}
            </div>
        </div>
    </div>
    );
};

export default EnvironmentPanel;