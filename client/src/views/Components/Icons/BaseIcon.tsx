import { ReactNode } from "react"

type BaseIconProps = {
  children: ReactNode;
  className?: string;
}

export function BaseIcon({ children, className }: BaseIconProps) {
  return (
    <div className={" " + className}>
      {children}
    </div>
  )
}