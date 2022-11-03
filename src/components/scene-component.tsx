import { useEffect, useRef } from 'react'
import * as BABYLON from '@babylonjs/core'
import type { BabylonjsProps } from 'babylonjs-hook'

export const SceneCompnent = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  onRender,
  onSceneReady,
  ...rest
}: BabylonjsProps & React.CanvasHTMLAttributes<HTMLCanvasElement>) => {
  const reactCanvas = useRef(null)

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas

    if (!canvas) return

    const engine = new BABYLON.Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio,
    )
    const scene = new BABYLON.Scene(engine, sceneOptions)
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1)

    if (scene.isReady()) {
      onSceneReady(scene)
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene))
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene)
      scene.render()
    })

    const resize = () => {
      scene.getEngine().resize()
    }

    if (window) {
      window.addEventListener('resize', resize)
    }

    return () => {
      scene.getEngine().dispose()

      if (window) {
        window.removeEventListener('resize', resize)
      }
    }
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ])

  return <canvas ref={reactCanvas} {...rest} />
}
