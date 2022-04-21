
const StatCard = ({name, icon, className, children}) => {
  return (
    <div key={name} className={`px-4 py-5 bg-grey-500 border-4 border-red shadow rounded-lg overflow-hidden sm:p-6 transition-all duration-400 ${className}`}>
      <div className="text-sm font-medium text-gray-500 truncate flex space-between">
        {icon && (
          icon
        )}
        <h3 className="ml-4">{name}</h3>
      </div>
      {children}
    </div>
  )
}

export default  StatCard;
