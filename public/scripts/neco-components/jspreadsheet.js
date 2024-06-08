await import("./modules/jsuites/dist/jsuites.js")
await import("./modules/jspreadsheet-ce/dist/index.js")

const url = import.meta.url
const cssMainPath = url.split("/").slice(0,-1).join("/")+"/modules/jspreadsheet-ce/dist/jspreadsheet.css"
const cssDatatablesPath = url.split("/").slice(0,-1).join("/")+"/modules/jspreadsheet-ce/dist/jspreadsheet.datatables.css"
const cssThemePath = url.split("/").slice(0,-1).join("/")+"/modules/jspreadsheet-ce/dist/jspreadsheet.theme.css"
const cssJsuitesPath = url.split("/").slice(0,-1).join("/")+"/modules/jsuites/dist/jsuites.css"

const tagName = "neco-jspreadsheet"

const template = (params) => `
<style>
:host{
  height: 100%;
  width: 100%;
}
#jspreadsheet{
  height: 100%;
  width: 100%;
}
</style>
<link rel="stylesheet" href=${cssJsuitesPath}>
<link rel="stylesheet" href=${cssMainPath}>
<div id="jspreadsheet"> </div>
`
//<link rel="stylesheet" href=${cssThemePath}>
//<link rel="stylesheet" href=${cssDatatablesPath}>

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this._contents = this.contents
    delete this.contents 
  }
  connectedCallback() {
    const defaultData = [["","",""],["","",""],["","",""]]
    const defaultColumns = [
      {type:"text", title:"A"},
      {type:"text", title:"B"},
      {type:"text", title:"C"},
    ]
    const params = {
      data:  this.dataset.data ?? JSON.stringify(defaultData),
      columns: this.dataset.columns ?? JSON.stringify(defaultColumns),
      editable:true,
    }

    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const dom = new DOMParser().parseFromString(template(), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    const links = [...dom.head.querySelectorAll("link")]
    links.forEach(v=>shadow.appendChild(v))
    shadow.appendChild(dom.body.querySelector("div"))
    const divElem = shadow.querySelector("#jspreadsheet")
    this.divElem = divElem
    //const data = params.data ?  JSON.parse(params.data): null
    //const colHeaders = params.colHeaders ? JSON.parse(params.colHeaders): true
//    const rect = shadow.host.getBoundingClientRect()
//    const tableWidth  = rect.width +"px"
//    const tableHeight = rect.height + "px"
 
//    const data = JSON.parse(params.data)
//    const columns = JSON.parse(params.columns)
    const contents = this._contents

    if(contents){
      this.setContents(contents)
    }
  }
  get contents(){
    return this._contents
  }
  set contents(contents){
    this._contents = contents
    this.setContents(contents)
  }
  setContents(contents){
    this.jspreadsheet?.destroy()
    const rect = this.divElem.getBoundingClientRect()
    const width  = rect.width
    const height = rect.height
 
    const target = {
      root : this.shadow,
      tableOverflow : true,
      tableWidth : width,
      tableHeight : height,
    }
    const mergedContents = Object.assign(target, contents)

    const jsp = jspreadsheet(this.divElem, contents) 
    const resizeObserver = new ResizeObserver((entries) => {
      const e = entries[0]
      const rect = e.target.getBoundingClientRect()
      const width  = rect.width
      const height = rect.height
      this.resize(width,height)
    })
    this.jspreadsheet=jsp
    resizeObserver.observe(this.divElem)
  }
  resize(width,height){
    this.jspreadsheet.content.style.width = width + "px"
    this.jspreadsheet.content.style.height = height + "px"
  }

}

export default customElements.define(tagName, customElem)
