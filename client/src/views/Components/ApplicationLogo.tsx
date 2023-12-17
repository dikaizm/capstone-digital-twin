import logoInalumFull from "../../assets/logo/inalum.png"
import logoInalumSymbol from "../../assets/logo/inalum_symbol.png"

interface ApplicationLogoProps {
    logoFull: boolean;
    [key: string]: unknown;
}

export default function ApplicationLogo({ logoFull, ...props }: ApplicationLogoProps) {
    return (
        <div {...props}>
            {logoFull ? (
                <img className="object-contain w-full h-full" src={logoInalumFull} alt="Logo Inalum" />
            ) : (
                <img className="object-contain w-full h-full" src={logoInalumSymbol} alt="Logo Inalum" />
            )}
        </div>
    );
}
