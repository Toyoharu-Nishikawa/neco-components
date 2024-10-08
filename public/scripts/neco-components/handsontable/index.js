import "../handsontable/dist/handsontable.full.js"

const url = import.meta.url
const cssPath = url.split("/").slice(0,-2).join("/")+"/handsontable/dist/handsontable.full.css"

export const TAG_NAME = "neco-handsontable"

const createHTML= (params) => `
<style>

#handsontable{
  height: 100%;
  width: 100%;
}
</style>
<link rel="stylesheet" href=${cssPath}>
<div id="handsontable">
</div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="true" ? true:false): false ,
      data:  this.dataset.data,
      colHeaders: this.dataset.colHeaders,
    }

    let shadow
    const isShadow = params.isShadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElement = isShadow ? shadow : this
    const elementTarget = isShadow ? shadow.host : this

    const dom = new DOMParser().parseFromString(createHTML(), "text/html")

    parentElement.appendChild(dom.head.querySelector("style"))
    parentElement.appendChild(dom.head.querySelector("link"))
    parentElement.appendChild(dom.body.querySelector("div"))
    const divElem = parentElement.querySelector("#handsontable")
    const data = params.data ?  JSON.parse(params.data): null
    const colHeaders = params.colHeaders ? JSON.parse(params.colHeaders): true
    const rect = isShadow ? parentElement.host.getBoundingClientRect():this.getBoundingClientRect()
    const width  = rect.width
    const height = rect.height
    console.log({width,height})
 
    const hot = new Handsontable(divElem, {
      data,
      colHeaders,
      width,
      height,
      rowHeaders: true,
    })
    this.handsontable=hot
    const resizeObserver = new ResizeObserver((entries) => {
      const e = entries[0]
      const rect = e.target.getBoundingClientRect()
      const width  = rect.width
      const height = rect.height
      this.resize(width,height)
    })
    resizeObserver.observe(elementTarget)
    hot.render()
  }
  resize(width,height){
    this.handsontable.updateSettings({width,height})
    this.handsontable.render()
  }
}

customElements.define(TAG_NAME, CustomElem)
