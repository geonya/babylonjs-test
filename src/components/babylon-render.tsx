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

  const box = BABYLON.MeshBuilder.CreateBox('box', {})
  box.position.x = 0.5
  box.position.y = 1

  const boxMaterial = new BABYLON.StandardMaterial('material', scene)
  boxMaterial.diffuseColor = BABYLON.Color3.Random()
  box.material = boxMaterial

  box.actionManager = new BABYLON.ActionManager(scene)
  box.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function (evt) {
        const sourceBox = evt.meshUnderPointer
        //move the box upright
        sourceBox!.position.x += 0.1
        sourceBox!.position.y += 0.1
        //update the color
        boxMaterial.diffuseColor = BABYLON.Color3.Random()
      },
    ),
  )
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: BABYLON.Scene) => {}

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
