import { useLoader } from '@react-three/fiber';
import { Html } from "@react-three/drei"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useRef, useState } from 'react';

export default function TestObj({ data, camera }) {
  const [isOpen, setIsOpen] = useState(false)

  const mtUrl = './models/cff/cff.mtl'
  const objUrl = './models/cff/cff.obj'

  const materials = useLoader(MTLLoader, mtUrl)

  const object = useLoader(OBJLoader, objUrl, loader => {
    materials.preload()
    loader.setMaterials(materials)
  })

  // object.position.y -= 60;

  // object.scale.set(0.05, 0.05, 0.05);

  const objRef = useRef()
  objRef.current = object

  return (
    <mesh
      position={[0, -0.95, 4]}
      receiveShadow
      castShadow
      scale={0.05}
      onClick={() => {
        console.log("Object clicked")
        if (isOpen) {
          setIsOpen(false)
        } else {
          setIsOpen(true)
        }
      }}
    >
      <primitive object={object} />
      {isOpen && (
        <>
          <Html
            distanceFactor={20}
            center
          >
            <div className="w-40 content test-obj">
              <div className="w-full space-y-2">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="text-white ">Counter: {data.counter}</div>
                </div>

                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="text-white ">Temperature: {data.temperature}</div>
                </div>
              </div>
            </div>
          </Html>
        </>
      )
      }
    </mesh >
  )
}