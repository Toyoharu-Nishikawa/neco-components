import {MiniJscad} from "../../minijscad/index.js"


export const TAG_NAME = "neco-minijscad"
const createHTML = (params) => `
<style>
div  {
  height:100%;
  width:100%;
}

</style>
<div>
</div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const HTML = createHTML()
    this.shadow.setHTMLUnsafe(HTML)

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

customElements.define(TAG_NAME, CustomElem)
