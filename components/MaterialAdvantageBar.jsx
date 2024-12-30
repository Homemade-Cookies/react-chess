const MaterialAdvantageBar = ({ advantage }) => {
    const barWidth = Math.min(Math.abs(advantage) * 5, 100);
    const barColor = advantage > 0 ? 'bg-blue-500' : 'bg-red-500';
    const side = advantage > 0 ? 'right' : 'left';

    return (
        <div className="w-full h-4 bg-neutral-200 rounded-full overflow-hidden">
            <div
                className={`h-full ${barColor} transition-all duration-300 ease-in-out`}
                style={{
                    width: `${barWidth}%`,
                    float: side
                }}
            ></div>
        </div>
    );
};
export { MaterialAdvantageBar };
