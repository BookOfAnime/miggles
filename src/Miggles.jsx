/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 public/miggles.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Miggles(props) {
  const { nodes, materials } = useGLTF('/miggles.glb')
  return (
    <group {...props} dispose={null} rotation-x={Math.PI}>
      <group position={[-0.965, 23.487, -5.149]} scale={12.296} >
        <group position={[0.058, -5.534, -0.118]} rotation={[2.406, 0, 0]}>
          <mesh geometry={nodes.geometry_0_1.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.geometry_0_2.geometry} material={materials['lambert2SG.001']} />
          <mesh geometry={nodes.geometry_0_3.geometry} material={materials.lambert3SG} />
        </group>
        <group position={[-9.757, -4.109, 4.824]} rotation={[2.406, 0, 0]} scale={0.591}>
          <mesh geometry={nodes.geometry_0003_1.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.geometry_0003_2.geometry} material={materials['lambert2SG.001']} />
          <mesh geometry={nodes.geometry_0003_3.geometry} material={materials.lambert3SG} />
        </group>
        <group position={[9.793, -4.002, 4.65]} rotation={[2.406, 0, 0]} scale={0.591}>
          <mesh geometry={nodes.geometry_0004_1.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.geometry_0004_2.geometry} material={materials['lambert2SG.001']} />
          <mesh geometry={nodes.geometry_0004_3.geometry} material={materials.lambert3SG} />
        </group>
      </group>
      <mesh geometry={nodes.Object_2.geometry} material={materials['default']} position={[3.493, -73.567, 156.413]} rotation={[-Math.PI / 2, 0, 0]} scale={0.173} />
      <group position={[-123.949, -76.503, 0]} scale={-33.026}>
        <mesh geometry={nodes.geometry_0003.geometry} material={materials['Material_0.002']} position={[0, 0, -1.71]} />
        <mesh geometry={nodes.geometry_0004.geometry} material={materials['Material_0.002']} position={[-7.464, 0, -1.71]} />
      </group>
      <group position={[-26.678, -5.789, -62.141]} scale={-0.23}>
        <mesh geometry={nodes.Geo_Cat_1.geometry} material={materials.lambert2SG} />
        <mesh geometry={nodes.Geo_Cat_1_1.geometry} material={materials.Material_0} />
      </group>
      <group position={[27.991, -5.789, -62.141]} scale={-0.23}>
        <mesh geometry={nodes.Geo_Cat_1002.geometry} material={materials.lambert2SG} />
        <mesh geometry={nodes.Geo_Cat_1002_1.geometry} material={materials.Material_0} />
      </group>
      <group position={[126.42, -5.789, -11.389]} scale={-0.23}>
        <mesh geometry={nodes.Geo_Cat_1003.geometry} material={materials.lambert2SG} />
        <mesh geometry={nodes.Geo_Cat_1003_1.geometry} material={materials.Material_0} />
      </group>
      <group position={[-124.531, -5.789, 18.73]} scale={-0.23}>
        <mesh geometry={nodes.Geo_Cat_1004.geometry} material={materials.lambert2SG} />
        <mesh geometry={nodes.Geo_Cat_1004_1.geometry} material={materials.Material_0} />
      </group>
      <mesh geometry={nodes.Plane.geometry} material={materials['Sand.001']} position={[0, 1.394, 0]} scale={-426.468} />
    </group>
  )
}

useGLTF.preload('/miggles.glb')
