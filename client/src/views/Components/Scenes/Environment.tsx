import { memo } from 'react'
import {
  Environment as EnvironmentImpl
} from '@react-three/drei'

export const Environment = memo(() => (
  <>
    {/* <color args={['#282B39']} attach="background" /> */}
    <color args={['#bec2ca']} attach="background" />
    <EnvironmentImpl preset="city" />
  </>
))