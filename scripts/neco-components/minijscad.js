import {MiniJscad} from "../minijscad/index.js"


const tagName = "neco-minijscad"
const template = (params) => `
<style>
div  {
  height:100%;
  width:100%;
}

</style>
<div>
</div>
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
      tabs:  this.dataset.tabs,
      pages: this.dataset.pages,
    }
    let shadow
    const isShadow = params.isShadow
    this.isShadow = isShadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElement = isShadow ? shadow : this

    const dom = new DOMParser().parseFromString(template(), "text/html")
    parentElement.appendChild(dom.head.querySelector("style"))
    parentElement.appendChild(dom.body.querySelector("div"))

    const divElem = parentElement.querySelector("div")
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
