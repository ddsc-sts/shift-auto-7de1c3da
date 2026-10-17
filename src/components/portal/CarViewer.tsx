import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import type { Component3D } from "@/lib/data";
import { cn } from "@/lib/utils";

const LENGTH = 4.2;

function Car({
  url,
  components,
  selected,
  onSelect,
}: {
  url: string;
  components: Component3D[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const { scene } = useGLTF(url);
  const { obj, dims } = useMemo(() => {
    const obj = scene.clone(true);
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const s = LENGTH / Math.max(size.x, size.z);
    obj.scale.setScalar(s);
    const b2 = new THREE.Box3().setFromObject(obj);
    const c = b2.getCenter(new THREE.Vector3());
    obj.position.set(-c.x, -b2.min.y, -c.z);
    obj.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
      }
    });
    return { obj, dims: b2.getSize(new THREE.Vector3()) };
  }, [scene]);

  return (
    <group>
      <primitive object={obj} />
      {components.map((c) => {
        const p: [number, number, number] = [
          (c.pos[0] * dims.x) / 2 * 1.02,
          c.pos[1] * dims.y,
          (c.pos[2] * dims.z) / 2,
        ];
        const active = c.id === selected;
        return (
          <Html key={c.id} position={p} center zIndexRange={[20, 0]}>
            <button
              onClick={() => onSelect(c.id)}
              className={cn(
                "grid size-8 place-items-center rounded-full border-2 transition-all",
                active
                  ? "animate-pulse-ring scale-110 border-primary-foreground bg-primary"
                  : c.state === "planned"
                    ? "border-ink-foreground/60 bg-info/80"
                    : "border-ink-foreground/60 bg-success/80",
              )}
              aria-label={c.name}
            >
              <span className="size-2 rounded-full bg-primary-foreground" />
            </button>
          </Html>
        );
      })}
    </group>
  );
}

export default function CarViewer(props: {
  url: string;
  components: Component3D[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [5.5, 3, 6], fov: 35 }}>
      <fog attach="fog" args={["#141a24", 12, 26]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 4]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-6, 6, -4]} intensity={40} color="#ff8a3d" angle={0.6} penumbra={1} />
      <Suspense fallback={null}>
        <Car {...props} />
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1.2} color="#ffb27a" position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
          <Lightformer intensity={1} position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
        </Environment>
      </Suspense>
      <ContactShadows position={[0, 0.001, 0]} opacity={0.65} scale={12} blur={2.4} far={3} />
      <gridHelper args={[30, 30, "#3a4252", "#232a36"]} position={[0, 0, 0]} />
      <OrbitControls
        enablePan={false}
        minDistance={4.5}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0.6, 0]}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/sedan.glb");
