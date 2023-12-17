import { BaseIcon } from "./BaseIcon";

export function FlowIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" className="object-contain w-full h-full" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M6.5 17.5l11 -11m-12.5 .5v10m14 -10v10" />
      </svg>
    </BaseIcon>
  )
}