import React from 'react'
import * as BABYLON from '@babylonjs/core'
import { SceneCompnent } from './scene-component'

let box: BABYLON.Mesh | undefined = undefined

const onSceneReady = (scene: BABYLON.Scene) => {
  // This creates and positions a free camera (non-mesh)
  const canvas = scene.getEngine().getRenderingCanvas()

  const alpha = Math.PI / 4
  const beta = Math.PI / 3
  const radius = 8
  const target = new BABYLON.Vector3(0, 0, 0)

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    alpha,
    beta,
    radius,
    target,
    scene,
  )
  camera.attachControl(canvas, true)

  camera.setTarget(BABYLON.Vector3.Zero())

  const light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(1, 1, 0),
    scene,
  )
  light.intensity = 0.8

  const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene)

  box.position.y = 1
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: BABYLON.Scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime()

    const rpm = 10
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 500)
  }
}

export default () => (
  <div>
    <SceneCompnent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id='bjs-canvas'
    />
  </div>
)
