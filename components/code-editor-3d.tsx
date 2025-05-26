"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Box, Environment, Float, Sphere, Cylinder, Cone, RoundedBox } from "@react-three/drei"
import { motion } from "framer-motion"
import { useRef, useState, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"

function CodeLine({
  position,
  text,
  color = "#4ade80",
}: {
  position: [number, number, number]
  text: string
  color?: string
}) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Box args={[5, 0.6, 0.15]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <meshStandardMaterial color={hovered ? "#374151" : "#1f2937"} transparent opacity={0.8} />
      </Box>
      <Text3D font="/fonts/helvetiker_regular.typeface.json" size={0.12} height={0.03} position={[-2.3, -0.08, 0.08]}>
        {text}
        <meshStandardMaterial color={color} />
      </Text3D>
    </group>
  )
}

function CodeLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Left angle bracket < */}
      {/* Top part */}
      <Box args={[0.05, 0.05, 0.05]} position={[-0.15, 0.1, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      {/* Middle part */}
      <Box args={[0.05, 0.05, 0.05]} position={[-0.2, 0.05, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[-0.25, 0, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[-0.2, -0.05, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      {/* Bottom part */}
      <Box args={[0.05, 0.05, 0.05]} position={[-0.15, -0.1, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>

      {/* Forward slash / */}
      <Box args={[0.05, 0.05, 0.05]} position={[-0.05, 0.15, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.05, 0.05, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.1, 0, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.15, -0.05, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.2, -0.1, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.25, -0.15, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>

      {/* Right angle bracket > */}
      {/* Top part */}
      <Box args={[0.05, 0.05, 0.05]} position={[0.35, 0.1, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      {/* Middle part */}
      <Box args={[0.05, 0.05, 0.05]} position={[0.4, 0.05, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.45, 0, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      <Box args={[0.05, 0.05, 0.05]} position={[0.4, -0.05, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
      {/* Bottom part */}
      <Box args={[0.05, 0.05, 0.05]} position={[0.35, -0.1, 0]}>
        <meshStandardMaterial color="#60a5fa" />
      </Box>
    </group>
  )
}

function ReactLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* React atom symbol */}
      <Sphere args={[0.08]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#61dafb" />
      </Sphere>
      {/* Electron orbits */}
      <Cylinder args={[0.3, 0.3, 0.02]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#61dafb" transparent opacity={0.6} />
      </Cylinder>
      <Cylinder args={[0.3, 0.3, 0.02]} rotation={[0, 0, Math.PI / 3]}>
        <meshStandardMaterial color="#61dafb" transparent opacity={0.6} />
      </Cylinder>
      <Cylinder args={[0.3, 0.3, 0.02]} rotation={[0, 0, -Math.PI / 3]}>
        <meshStandardMaterial color="#61dafb" transparent opacity={0.6} />
      </Cylinder>
    </group>
  )
}

function HooksLogo({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Hook shape */}
      <Cylinder args={[0.05, 0.05, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.2]} position={[0.1, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#f59e0b" />
      </Cylinder>
      <Sphere args={[0.06]} position={[0.15, 0.15, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </Sphere>
    </group>
  )
}

function StorageLogo({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Database server icon */}
      {/* Main server body */}
      <Box args={[0.25, 0.35, 0.15]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>

      {/* Database disks */}
      <Cylinder args={[0.18, 0.18, 0.05]} position={[0, 0.12, 0.08]}>
        <meshStandardMaterial color="#059669" />
      </Cylinder>
      <Cylinder args={[0.18, 0.18, 0.05]} position={[0, 0.02, 0.08]}>
        <meshStandardMaterial color="#059669" />
      </Cylinder>
      <Cylinder args={[0.18, 0.18, 0.05]} position={[0, -0.08, 0.08]}>
        <meshStandardMaterial color="#059669" />
      </Cylinder>

      {/* Connection lines */}
      <Box args={[0.02, 0.08, 0.02]} position={[-0.1, 0.07, 0.08]}>
        <meshStandardMaterial color="#34d399" />
      </Box>
      <Box args={[0.02, 0.08, 0.02]} position={[0.1, 0.07, 0.08]}>
        <meshStandardMaterial color="#34d399" />
      </Box>

      {/* Status indicator */}
      <Sphere args={[0.03]} position={[0.15, 0.15, 0.08]}>
        <meshStandardMaterial color="#22c55e" />
      </Sphere>
    </group>
  )
}

function StateLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 1.5
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* State management icon */}
      <RoundedBox args={[0.2, 0.2, 0.2]} radius={0.05}>
        <meshStandardMaterial color="#8b5cf6" />
      </RoundedBox>
      <Sphere args={[0.05]} position={[0.15, 0.15, 0.15]}>
        <meshStandardMaterial color="#a855f7" />
      </Sphere>
      <Sphere args={[0.05]} position={[-0.15, 0.15, 0.15]}>
        <meshStandardMaterial color="#a855f7" />
      </Sphere>
      <Sphere args={[0.05]} position={[0.15, -0.15, 0.15]}>
        <meshStandardMaterial color="#a855f7" />
      </Sphere>
    </group>
  )
}

function EffectLogo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 1.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Effect/lifecycle icon */}
      <Cone args={[0.1, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ef4444" />
      </Cone>
      <Cylinder args={[0.02, 0.02, 0.4]} position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ef4444" />
      </Cylinder>
    </group>
  )
}

function JSLogo({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* JavaScript logo - rounded square */}
      <RoundedBox args={[0.25, 0.25, 0.1]} radius={0.05}>
        <meshStandardMaterial color="#f7df1e" />
      </RoundedBox>
      <Text3D font="/fonts/helvetiker_bold.typeface.json" size={0.08} height={0.02} position={[-0.05, -0.05, 0.06]}>
        JS
        <meshStandardMaterial color="#000000" />
      </Text3D>
    </group>
  )
}

function FloatingTag({
  position,
  text,
  color = "#3b82f6",
  shape = "box",
  LogoComponent,
}: {
  position: [number, number, number]
  text: string
  color?: string
  shape?: "box" | "sphere" | "cylinder"
  LogoComponent?: React.ComponentType<{ position: [number, number, number] }>
}) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3
    }
  })

  // All shapes are now rounded boxes except JavaScript which keeps its original design
  const ShapeComponent = RoundedBox
  const shapeArgs = [2.2, 0.6, 0.3, 0.1] as const

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          if (groupRef.current) {
            groupRef.current.rotation.z += Math.PI / 4
          }
        }}
      >
        {/* Tag background shape */}
        <ShapeComponent args={shapeArgs}>
          <meshStandardMaterial color={hovered ? "#1e40af" : color} transparent opacity={hovered ? 0.9 : 0.7} />
        </ShapeComponent>

        {/* Logo */}
        {LogoComponent && <LogoComponent position={[-0.6, 0, 0.2]} />}

        {/* Tag text */}
        <Text3D font="/fonts/helvetiker_bold.typeface.json" size={0.1} height={0.03} position={[-0.2, -0.06, 0.16]}>
          {text}
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </group>
    </Float>
  )
}

function Scene() {
  const codeLines = [
    { text: "const useSnippet = (id) => {", color: "#f59e0b" },
    { text: "  const [snippet, setSnippet] = useState(null)", color: "#10b981" },
    { text: "  const [loading, setLoading] = useState(true)", color: "#10b981" },
    { text: "  ", color: "#6b7280" },
    { text: "  useEffect(() => {", color: "#f59e0b" },
    { text: "    const saved = localStorage.getItem('snippet')", color: "#8b5cf6" },
    { text: "    if (saved) setSnippet(JSON.parse(saved))", color: "#8b5cf6" },
    { text: "    setLoading(false)", color: "#10b981" },
    { text: "  }, [id])", color: "#f59e0b" },
    { text: "  ", color: "#6b7280" },
    { text: "  return { snippet, loading }", color: "#ef4444" },
    { text: "}", color: "#f59e0b" },
  ]

  const tags = [
    {
      text: "React",
      position: [3.8, 1.5, 1] as [number, number, number], // Moved further right and forward
      color: "#61dafb",
      shape: "box" as const,
      LogoComponent: ReactLogo,
    },
    {
      text: "Hooks",
      position: [-3.5, 0.5, -1] as [number, number, number],
      color: "#f59e0b",
      shape: "box" as const,
      LogoComponent: HooksLogo,
    },
    {
      text: "localStorage",
      position: [3.2, -1.8, 1] as [number, number, number], // Moved down to avoid overlap
      color: "#10b981",
      shape: "box" as const,
      LogoComponent: StorageLogo,
    },
    {
      text: "useState",
      position: [-3, 2.5, 1] as [number, number, number],
      color: "#8b5cf6",
      shape: "box" as const,
      LogoComponent: StateLogo,
    },
    {
      text: "useEffect",
      position: [3.2, 3.2, 1] as [number, number, number], // Moved higher and further right with forward z
      color: "#ef4444",
      shape: "box" as const,
      LogoComponent: EffectLogo,
    },
    {
      text: "JavaScript",
      position: [-2.5, -1.5, 0.5] as [number, number, number],
      color: "#f7df1e",
      shape: "box" as const,
      LogoComponent: JSLogo,
    },
  ]

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#8b5cf6" />

      {/* Code lines */}
      {codeLines.map((line, index) => (
        <CodeLine key={index} position={[0, 3 - index * 0.5, 0]} text={line.text} color={line.color} />
      ))}

      {/* Floating tags with logos and different shapes */}
      {tags.map((tag, index) => (
        <FloatingTag
          key={index}
          position={tag.position}
          text={tag.text}
          color={tag.color}
          shape={tag.shape}
          LogoComponent={tag.LogoComponent}
        />
      ))}

      {/* Code logo and title */}
      <group position={[-2.2, 4, 0]}>
        <CodeLogo position={[0, 0, 0]} />
        <Text3D font="/fonts/helvetiker_bold.typeface.json" size={0.4} height={0.06} position={[0.7, -0.1, 0]}>
          SnipStash
          <meshStandardMaterial color="#60a5fa" />
        </Text3D>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading 3D Code Editor...</p>
      </div>
    </div>
  )
}

export function CodeEditor3D() {
  return (
    <motion.div
      className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </Suspense>

      {/* Overlay UI */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-gray-400 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Interactive 3D Code View</span>
        </div>
        <div className="text-xs">Click tags • Drag to rotate</div>
      </div>
    </motion.div>
  )
}
