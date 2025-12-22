export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '',
  icon: Icon
}) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center";
  
  const variants = {
    primary: "bg-green-500 hover:bg-green-600 text-black shadow-lg shadow-green-500/50 hover:shadow-green-500/70",
    secondary: "bg-gray-800 border border-green-500/30 text-green-400 hover:bg-green-500/10 shadow-lg shadow-green-500/20",
    danger: "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30",
    ghost: "bg-transparent text-green-400 hover:bg-green-500/10"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}