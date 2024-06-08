import {TabulatorFull as Tabulator}from "../tabulator-tables/dist/js/tabulator_esm.min.js"


const url = import.meta.url
const cssMainPath = url.split("/").slice(0,-2).join("/")+"/tabulator-tables/dist/css/tabulator.css"


const tagName = "neco-tabulator"

const template = (params) => `
<style>
:host{
  height: 100%;
  width: 100%;
}
#tabulator{
  height: 100%;
  width: 100%;
}
</style>
<link rel="stylesheet" href=${cssMainPath}>
<div id="tabulator"> </div>
`

export const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    const _contents = this.contents
    this._contents = _contents
    delete this.contents
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
    }
    const isShadow = params.isShadow
    this.isShadow = isShadow
    let shadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElement = isShadow ? shadow : this
    const elementTarget = isShadow ? shadow.host : this

    const dom = new DOMParser().parseFromString(template(), "text/html")
    parentElement.appendChild(dom.head.querySelector("style"))
    const links = [...dom.head.querySelectorAll("link")]
    links.forEach(v=>shadow.appendChild(v))
    parentElement.appendChild(dom.body.querySelector("div"))
    const divElem = parentElement.querySelector("div")
    this.divElem = divElem

    const contents = this._contents
    if(contents){
      this.setContents(contents)
    }

    //const data = JSON.parse(params.data)
    //const headers = JSON.parse(params.headers)
    //const columns = headers.map((v,i)=>Object({title:v,field:String(i)}))
  }
  set contents(contents){
    this.setContents(contents)
    this._contents = contents
  }
  setContents(contents){
    const target = {
      layout:"fitColumns",
      responsiveLayout: false,
    }
    const mergedContents = Object.assign(target, contents)
    console.log(mergedContents)
    const tabulator = new Tabulator(this.divElem, mergedContents)
    this.tabulator=tabulator


//    const resizeObserver = new ResizeObserver((entries) => {
//      const e = entries[0]
//      const rect = e.target.getBoundingClientRect()
//      const width  = rect.width
//      const height = rect.height
//      this.resize(width,height)
//    })
//    resizeObserver.observe(this.divElem)


  }
//  resize(width,height){
//    //this.tabulator.content.style.width = width + "px"
//    //this.tabulator.content.style.height = height + "px"
//  }
}

customElements.define(tagName, customElem)
