export default function InfoItem({ icon, label }) {
    return (
      <div className="flex items-center space-x-1 text-gray-600 text-sm">
        {icon}
        <span>{label}</span>
      </div>
    );
  }
  