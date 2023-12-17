export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold text-md text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
