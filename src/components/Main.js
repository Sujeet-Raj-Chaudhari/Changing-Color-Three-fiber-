import React, { useRef, Suspense, useState,  useEffect} from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import {proxy, useSnapshot} from "valtio";


const state = proxy({
    current: null,
    items: {
        Ground: "#ff0000",
        MainWalls: "#ffffff",
        MostUpperWalls: "#ffffff",
        WallRim: "#ffffff",
        Floor: "#ffffff",
        WindowCover: "#ffffff",
        DoorCover: "#ffffff",
        Door: "#ffffff",
        Door_2: "#ffffff",
        Trapullin1: "#ffffff",
        Trapullin2: "#90ee90",
        Window: "#ffffff",
        TableCloth: "#ffffff",
        CoffeeText1: "#ffffff",
        CoffeeBoard2: "#ffffff",
        Cup: "#ffffff",
        Smoke1: "#ffffff",
        Smoke2: "#ffffff",
        Table: "#ffffff",
    }
});


function Model({ ...props }) {
  const group = useRef()
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('modelCoffeeHouse.glb')
  
  const [hovered, set] = useState(null)
  

  return (
    <group ref={group} {...props} dispose={null}
    onPointerOver={(e) => {e.stopPropagation(); set(e.object.material.name)}}
    onPointerOut={(e) => {e.intersections.length===0 && set(null)}}
    onPointerDown={(e) => {e.stopPropagation(); state.current = e.object.material.name}}
    onPointerMissed={(e) => {state.current = null}}
    >
      <mesh  material-color = {snap.items.Ground}geometry={nodes.Ground.geometry} material={materials.Ground} scale={6} />
      <mesh  material-color = {snap.items.MainWalls}geometry={nodes.Mainwalls.geometry} material={materials.MainWalls} position={[0, 4.2, -0.7]} scale={3} />
      <mesh material-color = {snap.items.MostUpperWalls}
        geometry={nodes.MostUpperWalls.geometry}
        material={materials.MostUpperWalls}
        position={[0, 7.2, -0.7]}
        scale={3.4}
      />
      <mesh material-color= {snap.items.WallRim} geometry={nodes.WallRim.geometry} material={materials.WallRim} position={[0, 4.2, -0.7]} scale={3} />
      <mesh material-color ={snap.items.Floor} geometry={nodes.Floor.geometry} material={materials.Floor} position={[0, 1, 0]} scale={5} />
      <mesh material-color= {snap.items.WindowCover}
        geometry={nodes.WindowCover.geometry}
        material={nodes.WindowCover.material}
        position={[-1.16, 4.02, 2.31]}
        scale={2.89}
      />
      <mesh material-color = {snap.items.DoorCover}
        geometry={nodes.DoorCover.geometry}
        material={nodes.DoorCover.material}
        position={[0, 4.2, -0.61]}
        scale={3}
      />
      <group position={[1.5, 3.06, 2.29]} rotation={[Math.PI / 2, 0, 0]} scale={[0.67, 1, 1.83]}>
        <mesh material-color = {snap.items.Door}geometry={nodes.Door_1.geometry} material={materials.Door} />
        <mesh material-color= {snap.items.Door_2}geometry={nodes.Door_2.geometry} material={nodes.Door_2.material} />
      </group>
      <group position={[0, 4.2, -0.48]} scale={3}>
        <mesh material-color = {snap.items.Trapullin1} geometry={nodes.Trapullin_1.geometry} material={materials.Trapullin1} />
        <mesh material-color = {snap.items.Trapullin2} geometry={nodes.Trapullin_2.geometry} material={materials.Trapullin2} />
      </group>
      <mesh material-color ={ snap.items.Window} geometry={nodes.Window.geometry} material={nodes.Window.material} position={[0, 4.2, -0.7]} scale={3} />
      <mesh material-color = {snap.items.TableCloth} geometry={nodes.TableCloth.geometry} material={materials['Table Cloth']} position={[-1.22, 2.79, 3.65]} />
      <mesh material-color= {snap.items.CoffeeText1}
        geometry={nodes.CoffeeBoard.geometry}
        material={materials.CoffeeText1}
        position={[0, 7.75, 2.71]}
        rotation={[Math.PI / 2, 0.24, 0]}
        scale={[3.26, 3.26, 3.26]}
      />
      <mesh material-color = {snap.items.CoffeeBoard2}
        geometry={nodes.CoffeeBoard2.geometry}
        material={materials.CoffeeBoard2}
        position={[0, 7.75, 2.71]}
        rotation={[Math.PI / 2, 0.24, 0]}
        scale={[3.26, 3.26, 3.26]}
      />
      <mesh material-color= {snap.items.Cup}
        geometry={nodes.Cup.geometry}
        material={materials.Cup}
        position={[0, 8.88, 0.93]}
        scale={[1.74, 1.63, 1.74]}>
        <mesh geometry={nodes.Coffee.geometry} material={nodes.Coffee.material} scale={[0.93, 0.93, 0.93]} />
      </mesh>
      <mesh material-color={snap.items.Smoke1}
        geometry={nodes.Smoke1.geometry}
        material={nodes.Smoke1.material}
        position={[-0.08, 10.27, 0.94]}
        rotation={[-Math.PI, 0.9, Math.PI / 2]}
        scale={0.81}
      />
      <mesh material-color= {snap.items.Smoke2}
        geometry={nodes.Smoke2.geometry}
        material={nodes.Smoke2.material}
        position={[0.27, 10.17, 0.76]}
        rotation={[-Math.PI, 0.41, Math.PI / 2]}
        scale={0.61}
      />
      <mesh material-color = {snap.items.Table} geometry={nodes.Table.geometry} material={nodes.Table.material} position={[-1.22, 2.78, 3.6]} scale={0.8} />
    </group>
  )
}

function Picker(){
    const snap = useSnapshot(state)
    return(
        <div className = "picker">{snap.current}
        </div>
    )
}

export default function Main() {
  return (
    <>
    <Picker/>
    <Canvas camera = {{position: [0,5, 20]}}>
      <ambientLight intensity={0.5} />
      <Suspense fallback ={null}>
          <Model/>
      </Suspense>
      <OrbitControls />
    </Canvas>
    </>
  )
}