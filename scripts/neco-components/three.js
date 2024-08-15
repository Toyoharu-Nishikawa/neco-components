//import * as THREE from "three" 
//import {TrackballControls} from "three/addons/controls/TrackballControls.js" 
import * as THREE from "./modules/three/build/three.module.min.js" 
import {TrackballControls} from "./modules/three/example/jsm/controls/TrackballControls.js" 

export const TAG_NAME = "neco-three"
const createHTML = (params) => `
<style>
:host{
  width: 100%;
  height: 100%;
}
#three{
  height: 100%;
  width: 100%;
}
canvas{
  background-image: linear-gradient(#333366, #CCCCCC);
}
</style>
<div id="three"></div>
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

    camera.position.set( 50, 50, 50 )

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

    renderer.render(scene, camera)
    
    const animate = () => {
	    requestAnimationFrame( animate );
	    controls.update();
	    renderer.render( scene, camera );
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
