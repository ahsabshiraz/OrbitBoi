const PremiumToggle = ({ checked, onChange }) => (
    <button
        onClick={onChange}
        className={`relative w-9 h-5 rounded-full transition-all duration-300 focus:outline-none
        ${checked
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25'
                : 'bg-zinc-600'}`}
    >
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300
        ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
);

export default PremiumToggle