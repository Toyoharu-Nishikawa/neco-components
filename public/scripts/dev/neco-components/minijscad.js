import {MiniJscad} from "../minijscad/index.js"


const tagName = "neco-minijscad"
const template = (params) => `
<style>
div  {
  height:100%;
  width:100%;
}

</style>
<div id="minijscad">
</div>
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
  }
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const dom = new DOMParser().parseFromString(template(), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("div"))

    const divElem = shadow.querySelector("div")
    const width = divElem.getBoundingClientRect().width
    const height = divElem.getBoundingClientRect().height
  
    const option = {width,height}
    const miniJscad = new MiniJscad(divElem,option) 
  
    miniJscad.sketch.setBackgroundColor("default")
    this.miniJscad = miniJscad

    const resizeObserver = new ResizeObserver((entries) => {
      const e = entries[0]
      const rect = e.target.getBoundingClientRect()
      const width  = rect.width
      const height = rect.height
      this.resize(width,height)  
    })
    resizeObserver.observe(divElem)
  }
  get sketch(){
    return this.miniJscad.sketch
  }
  get screen(){
    return this.miniJscad.sketch.screen
  }
  get draw(){
    return this.miniJscad.sketch.draw
  }
  resize(width,height){
    this.miniJscad.resize(width,height)
  }
}

export default customElements.define(tagName, customElem)
