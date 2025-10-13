type ClassicCardProps = {
    label: string;
    value: string;
};

const ClassicCard = ({ label, value }: ClassicCardProps) => {
    return (
        <div className="bg-gray-100 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    );
};

export default ClassicCard;
