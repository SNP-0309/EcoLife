import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
}) {
  const baseClasses =
    "flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg",

    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100",

    outline:
      "border border-emerald-500 text-emerald-600 hover:bg-emerald-50",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {loading ? "Loading..." : children}
    </motion.button>
  );
}

export default Button;