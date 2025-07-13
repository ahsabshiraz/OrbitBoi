const Slider = ({ value, onChange, min, max, step, color = 'blue' }) => (
    <div className="relative">
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
                background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${((value - min) / (max - min)) * 100}%, rgb(63 63 70) ${((value - min) / (max - min)) * 100}%, rgb(63 63 70) 100%)`
            }}
        />
    </div>
);

export default Slider;