//import * as THREE from "three" 
//import {TrackballControls} from "three/addons/controls/TrackballControls.js" 
import * as THREE from "../modules/three/build/three.module.min.js" 
import {TrackballControls} from "../modules/three/example/jsm/controls/TrackballControls.js" 

export const TAG_NAME = "neco-three"
const createHTML = (params) => `
<style>
:host{
  width: 100%;
  height: 100%;
}
.main {
  position:relative;
}
 
#three{
  height: 100%;
  width: 100%;
}
canvas{
  background-image: linear-gradient(#333366, #CCCCCC);
}

.viewCube {
  position:absolute; top:100px; right:100px;
  font-size: 24px;
  perspective: 400px;
}
.viewCube>.face {
  transform-style: preserve-3d;
}
.viewCube>.face>* {
  position:absolute; top:-25px; left:-25px; width:50px; height:50px;
  background-color: gray;
  opacity:1.0;
  display:flex;
  justify-content:center;
  align-items: center;
  user-select: none;
  cursor:pointer;
}
.viewCube>.face>*:hover {
  background-color: #AAAAAA;
}

.viewCube>.face>.front  { transform: translateX( 25px) rotateY( 90deg) rotateX(180deg); }
.viewCube>.face>.back   { transform: translateX(-25px) rotateY(-90deg) rotateX(180deg);}
.viewCube>.face>.top    { transform: translateY( 25px) rotateY(-90deg) rotateX( 90deg); }
.viewCube>.face>.bottom { transform: translateY(-25px) rotateY(-90deg) rotateX(270deg); }
.viewCube>.face>.left   { transform: translateZ(-25px) rotateZ(180deg); }
.viewCube>.face>.right  { transform: translateZ( 25px) rotateX(180deg); }

.triangle {
  position:absolute; top:92.5px; right:112.5px;
} 

.triangle>* {
  position:absolute;
  height: calc(30px / 2);
  width: 30px;
  background-color: gray;
  cursor:pointer;
}
.triangle>*:hover {
  background-color: #AAAAAA;

}
.triangle>.upArrow {
  transform: translateY( -60px);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
.triangle>.downArrow {
  transform: translateY( 60px) rotate(180deg);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
.triangle>.rightArrow {
  transform: translateX( 60px) rotate(90deg);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
.triangle>.leftArrow {
  transform: translateX(-60px) rotate(-90deg);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
.reset {
  user-select: none;
  position:absolute; top:15px; right:15px;
  background-color: gray;
  color: black;
  cursor:pointer;
  padding: 2px;
}
.reset:hover {
  background-color: #AAAAAA;
}
</style>

<div id="three"></div>
<div class="main">
  <div class="viewCube">
    <div class="face">
      <div class="front" >+X</div>
      <div class="back"  >-X</div>
      <div class="top"   >+Y</div>
      <div class="bottom">-Y</div>
      <div class="left"  >-Z</div>
      <div class="right" >+Z</div>
    </div>
  </div>
  <div class="triangle">
      <div class="upArrow"  ></div>
      <div class="downArrow"></div>
      <div class="leftArrow"></div>
      <div class="rightArrow"</div>
  </div>
</div>
<div class="reset">RESET</div>

`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.scene
    this.camera
    this.renderer
    this.controls
    this.THREE = THREE
  }
  connectedCallback() {
    const params = {
      showAxes:      this.dataset.showAxes ? (this.dataset.showAxes.toLowerCase()==="false" ? false:true): true,
      showGridHelper:this.dataset.showGridHelper ? (this.dataset.showGridHelper.toLowerCase()==="false" ? false:true): true,
    } 
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const HTML = createHTML()
    shadow.setHTMLUnsafe(HTML)

    const divElem = shadow.querySelector("#three")

    const width = divElem.clientWidth
    const height = divElem.clientHeight

    const initialWindowWidth = window.innerWidth
    const initialWindowHeight =  window.innerHeight
    this.initialWindowWidth = initialWindowWidth
    this.initialWindowHeight = initialWindowHeight

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera( width/-20, width/20, height/20, height/-20, 1, 1000 )

    this.scene = scene
    this.camera = camera

    camera.position.set(-50, 50, 50 )

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    })
    renderer.setSize(width, height,false)
    renderer.shadowMap.enabled = true
    this.renderer = renderer
    divElem.appendChild(renderer.domElement)
    shadow.appendChild(divElem);

    const controls = new TrackballControls( camera, renderer.domElement )
    controls.update()
    controls.rotateSpeed=2.0
    controls.panSpeed=1.5
    this.controls = controls

    if(params.showAxes){
      const axes = new THREE.AxesHelper(100)
      scene.add(axes)
    }

    if(params.showGridHelper){
      const gridHelper = new THREE.GridHelper( 50, 50 )
      scene.add( gridHelper )
    }

    const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff,10)
    //directionalLight.castShadow=true
    camera.add(directionalLight)


    scene.add(camera)

    this.testCube()
    this.setViewCubeEvent()
    renderer.render(scene, camera)
    
    
    const animate = () => {
	    requestAnimationFrame( animate )
	    controls.update()
	    renderer.render( scene, camera )
      this.rotateViewCube()
    } 

    animate()

    const resizeObserver = new ResizeObserver((entries) => {
      const e = entries[0]
      const rect = e.target.getBoundingClientRect()
      const width  = rect.width
      const height = rect.height
      this.resize(width,height)  
    })
    resizeObserver.observe(divElem, {box: 'content-box'})
  }
  resize(width,height){
    this.renderer.setSize(width, height)
    const aspect = width/height
    this.camera.aspect = aspect
    this.camera.left = width/-20
    this.camera.right = width/20
    this.camera.top = height/20
    this.camera.bottom = height/-20
    this.camera.updateProjectionMatrix()
  }
  epsilon(value) {
     return Math.abs(value) < 1e-10 ? 0 : value
  }
  setViewCubeEvent(){
    const shadow = this.shadow
    const camera = this.camera
    const controls = this.controls
    const front    = shadow.querySelector("div.viewCube > .face > .front") 
    const back     = shadow.querySelector("div.viewCube > .face > .back") 
    const top      = shadow.querySelector("div.viewCube > .face > .top") 
    const bottom   = shadow.querySelector("div.viewCube > .face > .bottom") 
    const left     = shadow.querySelector("div.viewCube > .face > .left") 
    const right    = shadow.querySelector("div.viewCube > .face > .right") 

    const upArrow     = shadow.querySelector("div.triangle >  .upArrow") 
    const downArrow   = shadow.querySelector("div.triangle >  .downArrow") 
    const leftArrow   = shadow.querySelector("div.triangle >  .leftArrow") 
    const rightArrow  = shadow.querySelector("div.triangle >  .rightArrow") 

    const reset  = shadow.querySelector("div.reset") 

    front.onclick = () => {
       controls.target.set(0, 0, 0)
       camera.position.set( 50, 0, 0 )
       camera.up.set(0, 1, 0)
       camera.lookAt(0, 0, 0)
    }
    back.onclick = () => {
       controls.target.set(0, 0, 0)
       camera.position.set( -50, 0, 0 )
       camera.up.set(0, 1, 0)
       camera.lookAt(0, 0, 0)
    }
    right.onclick = () => {
       controls.target.set(0, 0, 0)
       camera.position.set(0, 0, 50 )
       camera.up.set(0, 1, 0)
       camera.lookAt(0, 0, 0)
    }
    left.onclick = () => {
       controls.target.set(0, 0, 0)
       camera.position.set(0, 0, -50 )
       camera.up.set(0, 1, 0)
       camera.lookAt(0, 0, 0)
    } 
    top.onclick = () => {
       controls.target.set(0, 0, 0)
       camera.position.set(0, 50, 0 )
       camera.up.set(1, 0, 0)
       camera.lookAt(0, 0, 0)
    } 
    bottom.onclick = () => {
       controls.target.set(0, 0, 0)
       camera.position.set(0, -50, 0 )
       camera.up.set(-1, 0, 0)
       camera.lookAt(0, 0, 0)
    } 

    upArrow.onclick = () => {
       const t = controls.target.clone()
       const p = camera.position.clone()
       const u = camera.up.clone()
       const tp = p.sub(t).normalize() 
       const cross = tp.cross(u).normalize()
       const quaternion = new THREE.Quaternion();
       quaternion.setFromAxisAngle( cross, -Math.PI / 12 )
       camera.position.applyQuaternion(quaternion)
       camera.up.applyQuaternion(quaternion)
    }
    downArrow.onclick = () => {
       const t = controls.target.clone()
       const p = camera.position.clone()
       const u = camera.up.clone()
       const tp = p.sub(t).normalize() 
       const cross = tp.cross(u).normalize()
       const quaternion = new THREE.Quaternion();
       quaternion.setFromAxisAngle( cross, Math.PI / 12 )
       camera.position.applyQuaternion(quaternion)
       camera.up.applyQuaternion(quaternion)
    }
    leftArrow.onclick = () => {
       const t = controls.target.clone()
       const p = camera.position.clone()
       const u = camera.up.clone()
       const tp = p.sub(t).normalize() 
       const cross = tp.clone().cross(u).normalize()
       const cross2 = cross.cross(tp).normalize()
       const quaternion = new THREE.Quaternion();
       quaternion.setFromAxisAngle( cross2, Math.PI / 12 )
       camera.position.applyQuaternion(quaternion)
       camera.up.applyQuaternion(quaternion)
    }
    rightArrow.onclick = () => {
       const t = controls.target.clone()
       const p = camera.position.clone()
       const u = camera.up.clone()
       const tp = p.sub(t).normalize()
       const cross = tp.clone().cross(u).normalize()
       const cross2 = cross.cross(tp).normalize()
       const quaternion = new THREE.Quaternion()
       quaternion.setFromAxisAngle( cross2, -Math.PI / 12 )
       camera.position.applyQuaternion(quaternion)
       camera.up.applyQuaternion(quaternion)
    }
    reset.onclick = () => {
      controls.reset()
    }
  }
  rotateViewCube(){
    const shadow = this.shadow
    const viewCubeFace = shadow.querySelector("div.viewCube > .face") 
    const camera = this.camera
    const mat = new THREE.Matrix4()

    mat.extractRotation(camera.matrixWorldInverse)
    const {elements} = mat
    const matrix3d = `matrix3d(
      ${this.epsilon( elements[0])},
      ${this.epsilon(-elements[1])},
      ${this.epsilon( elements[2])},
      ${this.epsilon( elements[3])},
      ${this.epsilon( elements[4])},
      ${this.epsilon(-elements[5])},
      ${this.epsilon( elements[6])},
      ${this.epsilon( elements[7])},
      ${this.epsilon( elements[8])},
      ${this.epsilon(-elements[9])},
      ${this.epsilon( elements[10])},
      ${this.epsilon( elements[11])},
      ${this.epsilon( elements[12])},
      ${this.epsilon(-elements[13])},
      ${this.epsilon( elements[14])},
      ${this.epsilon( elements[15])}
    )`
    viewCubeFace.style.transform = matrix3d 
  }
  testCube(){
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry( 10, 10, 10 ),
      new THREE.MeshLambertMaterial( { color: "gray", wireframe: false } )
    )
    this.scene.add( mesh )
  }
  testShere(){
    const geometry = new THREE.SphereGeometry( 15, 6, 6 );
    const material = new THREE.MeshLambertMaterial( { color: "gray" } );
    const sphere = new THREE.Mesh( geometry, material );
    this.scene.add( sphere );
  }
}

customElements.define(TAG_NAME, CustomElem)
