import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../lib/anim'

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aRand;
  varying float vElev;
  varying float vDist;

  void main() {
    vec3 p = position;
    float t = uTime * 0.55;
    float elev =
        sin(p.x * 0.85 + t)        * 0.24
      + sin(p.z * 1.30 + t * 1.35) * 0.18
      + sin((p.x + p.z) * 0.55 + t * 0.72) * 0.24
      + sin(p.x * 2.10 - t * 0.9)  * 0.05 * aRand;
    p.y += elev;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDist = -mv.z;
    vElev = elev;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.0 + aRand * 2.8) * uPixelRatio * (4.5 / vDist);
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  varying float vElev;
  varying float vDist;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.08, d);
    vec3 col = mix(uColA, uColB, smoothstep(-0.45, 0.55, vElev));
    float depthFade = smoothstep(16.0, 4.5, vDist);
    gl_FragColor = vec4(col, alpha * depthFade * 0.85);
  }
`

function Field({ reduced }: { reduced: boolean }) {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  const { points, uniforms } = useMemo(() => {
    const mobile = window.innerWidth < 768
    const cols = mobile ? 72 : 130
    const rows = mobile ? 46 : 78
    const width = 20
    const depth = 13
    const count = cols * rows
    const positions = new Float32Array(count * 3)
    const rands = new Float32Array(count)

    let i = 0
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        positions[i * 3 + 0] = (ix / (cols - 1) - 0.5) * width
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (iz / (rows - 1) - 0.5) * depth - 2.5
        rands[i] = Math.random()
        i++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rands, 1))

    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColA: { value: new THREE.Color('#3ddcff') },
      uColB: { value: new THREE.Color('#5b8cff') },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { points: new THREE.Points(geometry, material), uniforms }
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      points.geometry.dispose()
      ;(points.material as THREE.Material).dispose()
    }
  }, [points])

  useFrame((_, delta) => {
    if (!reduced) {
      uniforms.uTime.value += delta
      camera.position.x += (mouse.current.x * 0.55 - camera.position.x) * 0.04
      camera.position.y += (1.5 - mouse.current.y * 0.28 - camera.position.y) * 0.04
    }
    camera.lookAt(0, 0.15, -2.5)
  })

  return <primitive object={points} />
}

/** Fullscreen animated particle sea behind the hero (v1's field, recolored). */
export default function ParticleField() {
  const reduced = prefersReducedMotion()
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setWebglOk(false)
    } catch {
      setWebglOk(false)
    }
  }, [])

  if (!webglOk) return null

  return (
    <div className="particle-field" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.5, 4.6], fov: 55, near: 0.1, far: 40 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <Field reduced={reduced} />
      </Canvas>
    </div>
  )
}
