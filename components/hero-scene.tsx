"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(root.clientWidth, root.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    root.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.PointLight(0xf2c879, 95, 18); key.position.set(3, 3, 5); scene.add(key);
    const rim = new THREE.PointLight(0x9a7137, 70, 16); rim.position.set(-4, -2, 1); scene.add(rim);

    const group = new THREE.Group(); scene.add(group);
    const gold = new THREE.MeshPhysicalMaterial({ color: 0xc9a45d, metalness: .92, roughness: .19, clearcoat: 1, clearcoatRoughness: .12 });
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x242321, metalness: .8, roughness: .22, clearcoat: 1 });
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.18, .34, 220, 32, 2, 5), gold);
    group.add(knot);
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.05, .012, 12, 180), new THREE.MeshBasicMaterial({ color: 0xc9a45d, transparent: true, opacity: .58 }));
    ringA.rotation.set(.9, .2, .35); group.add(ringA);
    const ringB = ringA.clone(); ringB.scale.setScalar(1.13); ringB.rotation.set(1.8, .5, -.4); group.add(ringB);
    const cubeGeo = new THREE.BoxGeometry(.32,.32,.32);
    const cubes: THREE.Mesh[] = [];
    for(let i=0;i<7;i++){ const c=new THREE.Mesh(cubeGeo,i%2?gold:dark); c.position.set(Math.cos(i*2.4)*2.35,Math.sin(i*2.4)*1.75,(i%3-1)*.5); c.rotation.set(i*.4,i*.7,i*.2); group.add(c); cubes.push(c); }
    const starsGeo = new THREE.BufferGeometry(); const positions = new Float32Array(420*3);
    for(let i=0;i<420;i++){positions[i*3]=(Math.random()-.5)*9;positions[i*3+1]=(Math.random()-.5)*7;positions[i*3+2]=(Math.random()-.5)*4-1;}
    starsGeo.setAttribute("position",new THREE.BufferAttribute(positions,3));
    const stars = new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xd6bd8c,size:.018,transparent:true,opacity:.7})); scene.add(stars);

    let frame=0, pointerX=0, pointerY=0, targetX=0, targetY=0;
    const onMove=(e:PointerEvent)=>{const rect=root.getBoundingClientRect();targetY=((e.clientX-rect.left)/rect.width-.5)*.45;targetX=((e.clientY-rect.top)/rect.height-.5)*.3;};
    root.addEventListener("pointermove",onMove);
    const resize=()=>{if(!root)return;camera.aspect=root.clientWidth/root.clientHeight;camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight);};
    const observer=new ResizeObserver(resize);observer.observe(root);
    const animate=()=>{frame=requestAnimationFrame(animate);pointerX+=(targetX-pointerX)*.035;pointerY+=(targetY-pointerY)*.035;group.rotation.y+=.0028;group.rotation.x=Math.sin(Date.now()*.00035)*.08+pointerY;group.rotation.y+=pointerX*.012;knot.rotation.z+=.0015;cubes.forEach((c,i)=>{c.rotation.x+=.003+i*.0002;c.rotation.y+=.004;});stars.rotation.y-=.00012;renderer.render(scene,camera);};
    animate();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();root.removeEventListener("pointermove",onMove);renderer.dispose();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const m=o.material;if(Array.isArray(m))m.forEach(x=>x.dispose());else m.dispose();}});root.removeChild(renderer.domElement);};
  },[]);
  return <div ref={host} className="hero-scene" aria-label="Animated metallic 3D Atelier OG sculpture" role="img" />;
}
