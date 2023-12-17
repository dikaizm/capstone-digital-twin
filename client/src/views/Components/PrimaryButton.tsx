export default function PrimaryButton({ className = '', disabled, children, onClick, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 py-2 bg-sky-600 border-2 border-sky-600 rounded-lg font-semibold text-md text-white hover:bg-sky-700 hover:border-sky-700 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
