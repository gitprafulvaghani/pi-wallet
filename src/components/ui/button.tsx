export function CustomButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button {...props} className={`px-4 py-2 rounded bg-blue-500 text-white ${className}`}>
        {children}
      </button>
    )
  }
  