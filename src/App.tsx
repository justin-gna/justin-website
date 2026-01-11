import './App.css'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

function App() {

  return (
    <div>
      <ShaderGradientCanvas style={{ position: "absolute", pointerEvents: "none" }}>
        <ShaderGradient
          color1='#ff5005'
          color2='#dbba95'
          color3='#d0bce1'
          positionX={0}
          positionY={0}
          grain='off'
        />
      </ShaderGradientCanvas>
    </div>
  )
}

export default App
