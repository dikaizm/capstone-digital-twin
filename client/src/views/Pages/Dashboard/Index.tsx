import "@sass/components/loading.scss"

import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import Ground from '@/views/Components/Scenes/Ground';
import { Environment } from "@/views/Components/Scenes/Environment";
import GroupObjects from "@Components/Objects/GroupObjects";
import FlowLine from "@/views/Components/Scenes/FlowLine";
import { useDisplay } from "@/context/DisplayContext";
import AuthenticatedLayout from "@/views/Layouts/AuthenticatedLayout";
import Head from "@/views/Components/Head";
import { DefaultLoadingManager } from "three";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader.js";
import Lights from "@/views/Components/Scenes/Lights";
import Windows from "@/views/Layouts/WindowsLayout";

DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader())

export default function Dashboard() {
  const { displayState } = useDisplay()

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full bg-scene">
          <div className="animateContainer">
            <div className="circleCell" />
            <div className="circleCell" />
            <div className="circleCell" />
          </div>

          <span>Sedang memuat model...</span>
        </div>
      }>
        <Canvas frameloop="demand" shadows>

          <GroupObjects />

          {displayState && <FlowLine />}

          <Ground position={[120, 0]} size={800} />

          <Environment />
          <Lights />

          <OrbitControls
            target={[0, 0.4, 0]}
            maxDistance={600}
            maxPolarAngle={1.5}
          />
          <PerspectiveCamera makeDefault fov={60} position={[0, 150, -300]} />

          {/* <axesHelper args={[150]} /> */}

        </Canvas>

        <Windows />

      </Suspense>
    </AuthenticatedLayout>
  )
}