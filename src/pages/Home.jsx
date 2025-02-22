import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';

import MusicSet from '../models/MusicSet';
import Sky from '../models/Sky';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustMusicSetForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [27, -10, -43];
    let rotation = [0.3, 6.8, 0];

    if(window.innerWidth < 768) {
      screenScale = [15, 15, 15];
    } else {
      screenScale = [15, 15, 15];
    }
    return [screenScale, screenPosition, rotation];
  }

  const [musicSetScale, musicSetPosition, musicSetRotation] = adjustMusicSetForScreenSize();

  return (
    <section className="w-full h-screen relative">
    <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
      {currentStage && <HomeInfo currentStage={currentStage} />}
    </div>
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}

        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Sky isRotating={isRotating} />

          <MusicSet 
            position={musicSetPosition}
            scale={musicSetScale}
            rotation={musicSetRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home
