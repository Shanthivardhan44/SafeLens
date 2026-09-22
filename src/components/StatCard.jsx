function StatCard({
  type,
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-icon">
        <Icon size={24} />
      </div>

      <div>
        <span>{title}</span>
        <h2>{value}</h2>
        <small>{description}</small>
      </div>
    </div>
  );
}

export default StatCard;