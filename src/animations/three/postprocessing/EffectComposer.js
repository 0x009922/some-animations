import * as THREE from 'three'
// import { Pass } from './Pass'
import { ShaderPass } from './ShaderPass'
import { CopyShader } from '../shaders/CopyShader'

export function EffectComposer (renderer, renderTarget) {
  this.renderer = renderer

  if (renderTarget === undefined) {
    var parameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    }

    var size = renderer.getDrawingBufferSize(new THREE.Vector2())
    renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters)
    renderTarget.texture.name = 'EffectComposer.rt1'
  }

  this.renderTarget1 = renderTarget
  this.renderTarget2 = renderTarget.clone()
  this.renderTarget2.texture.name = 'EffectComposer.rt2'

  this.writeBuffer = this.renderTarget1
  this.readBuffer = this.renderTarget2

  this.renderToScreen = true

  this.passes = []

  // dependencies

  if (CopyShader === undefined) {
    console.error('THREE.EffectComposer relies on THREE.CopyShader')
  }

  if (ShaderPass === undefined) {
    console.error('THREE.EffectComposer relies on THREE.ShaderPass')
  }

  this.copyPass = new ShaderPass(THREE.CopyShader)

  this._previousFrameTime = Date.now()
};

Object.assign(EffectComposer.prototype, {

  swapBuffers: function () {
    var tmp = this.readBuffer
    this.readBuffer = this.writeBuffer
    this.writeBuffer = tmp
  },

  addPass: function (pass) {
    this.passes.push(pass)

    var size = this.renderer.getDrawingBufferSize(new THREE.Vector2())
    pass.setSize(size.width, size.height)
  },

  insertPass: function (pass, index) {
    this.passes.splice(index, 0, pass)
  },

  isLastEnabledPass: function (passIndex) {
    for (var i = passIndex + 1; i < this.passes.length; i++) {
      if (this.passes[ i ].enabled) {
        return false
      }
    }

    return true
  },

  render: function (deltaTime) {
    // deltaTime value is in seconds

    if (deltaTime === undefined) {
      deltaTime = (Date.now() - this._previousFrameTime) * 0.001
    }

    this._previousFrameTime = Date.now()

    var currentRenderTarget = this.renderer.getRenderTarget()

    var maskActive = false

    var pass; var i; var il = this.passes.length

    for (i = 0; i < il; i++) {
      pass = this.passes[ i ]

      if (pass.enabled === false) continue

      pass.renderToScreen = (this.renderToScreen && this.isLastEnabledPass(i))
      pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive)

      if (pass.needsSwap) {
        if (maskActive) {
          var context = this.renderer.context

          context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff)

          this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime)

          context.stencilFunc(context.EQUAL, 1, 0xffffffff)
        }

        this.swapBuffers()
      }

      // if (THREE.MaskPass !== undefined) {
      //   if (pass instanceof THREE.MaskPass) {
      //     maskActive = true
      //   } else if (pass instanceof THREE.ClearMaskPass) {
      //     maskActive = false
      //   }
      // }
    }

    this.renderer.setRenderTarget(currentRenderTarget)
  },

  reset: function (renderTarget) {
    if (renderTarget === undefined) {
      var size = this.renderer.getDrawingBufferSize(new THREE.Vector2())

      renderTarget = this.renderTarget1.clone()
      renderTarget.setSize(size.width, size.height)
    }

    this.renderTarget1.dispose()
    this.renderTarget2.dispose()
    this.renderTarget1 = renderTarget
    this.renderTarget2 = renderTarget.clone()

    this.writeBuffer = this.renderTarget1
    this.readBuffer = this.renderTarget2
  },

  setSize: function (width, height) {
    this.renderTarget1.setSize(width, height)
    this.renderTarget2.setSize(width, height)

    for (var i = 0; i < this.passes.length; i++) {
      this.passes[ i ].setSize(width, height)
    }
  }

})
