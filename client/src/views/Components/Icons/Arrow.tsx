interface IconProps {
    className?: string;
    [key: string]: unknown;
}

export default function Arrow({ className, ...props }: IconProps) {
    return (
        <svg className={`icon ${className}`} {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" fill="none">
            <path d="M7.33327 16.6666L13.9999 9.99998L7.33327 3.33331" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
