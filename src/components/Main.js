import React, { useRef, Suspense, useState,  useEffect} from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import {proxy, useSnapshot} from "valtio";
import { HexColorPicker } from 'react-colorful';


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
  
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

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
        <div style ={{display : snap.current ? "block": "none"}}>
            <HexColorPicker className = "picker"
            color = {snap.items[snap.current]} 
            onChange = {(color) => (state.items[snap.current] = color)} />
            <h1>{snap.current}</h1>
        </div>
    )
}

export default function Main() {
  return (
    <>
    <Picker/>
    <Canvas camera = {{position: [0,5, 20]}}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.3} position = {[5, 20, 20]}/>
      <Suspense fallback ={null}>
          <Model/>
          <Environment files = "snowy_forest_path_01_2k.hdr"/>
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
      </Suspense>
      <OrbitControls />
    </Canvas>
    </>
  )
}