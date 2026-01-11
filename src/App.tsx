import './App.css'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

function App() {

  return (
    <div>
      <ShaderGradientCanvas style={{ position: "absolute", pointerEvents: "none" }}>
        <ShaderGradient
            animate="on"
            brightness={1}
            cAzimuthAngle={180}
            cDistance={3.9}
            cPolarAngle={115}
            cameraZoom={1}
            color1="#ffaf8a"
            color2="#ec2651"
            color3="#000000"
            envPreset="city"
            grain="on"
            lightType="3d"
            positionX={-0.7}
            positionY={-0.1}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={235}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={2.2}
            uFrequency={5.5}
            uSpeed={0.1}
            uStrength={1.2}
            uTime={0.2}
            wireframe={false}
            />
      </ShaderGradientCanvas>
    </div>
  )
}

export default App
