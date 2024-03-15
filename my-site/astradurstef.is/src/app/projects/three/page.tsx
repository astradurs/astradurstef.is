"use client"
import { Sky, OrbitControls } from "@react-three/drei"
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"

function AnimatedBox({
  position,
  meshRef,
  ...props
}: {
  position: [number, number, number]
  meshRef: React.MutableRefObject<Mesh>
  [key: string]: any
}) {
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    meshRef.current.rotation.x = a
  })

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function Box(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function Octahedron(props: any) {
  return (
    <mesh {...props}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function Three() {
  const boxMesh = useRef<Mesh>(null!)
  return (
    <div className="grid">
      <h1>Three</h1>
      <p>
        Three is a project that I am currently working on. It is a 3D model of a
        house that I am building in the countryside.
      </p>
      <div className="flex justify-center">
        <div className="max-w-xl aspect-square">
          <Canvas>
            <Sky />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <AnimatedBox meshRef={boxMesh} position={[0, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </div>
  )
}
