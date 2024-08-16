import "../modules/jsuites/dist/jsuites.js"
import "../modules/jspreadsheet-ce/dist/index.js"

const url = import.meta.url
const cssMainPath = url.split("/").slice(0,-2).join("/")+"/modules/jspreadsheet-ce/dist/jspreadsheet.css"
const cssDatatablesPath = url.split("/").slice(0,-2).join("/")+"/modules/jspreadsheet-ce/dist/jspreadsheet.datatables.css"
const cssThemePath = url.split("/").slice(0,-2).join("/")+"/modules/jspreadsheet-ce/dist/jspreadsheet.theme.css"
const cssJsuitesPath = url.split("/").slice(0,-2).join("/")+"/modules/jsuites/dist/jsuites.css"

export const TAG_NAME = "neco-jspreadsheet"
const createHTML = (params) => `
<style>
:host{
/*  height: 100%;
  width: 100%;
  */
}
#jspreadsheet{
  display:block;
  /*
  height: 100%;
  width: 100%;
*/
  
}
</style>
<link rel="stylesheet" href=${cssJsuitesPath}>
<link rel="stylesheet" href=${cssMainPath}>
<div id="jspreadsheet"> </div>
`
//<link rel="stylesheet" href=${cssThemePath}>
//<link rel="stylesheet" href=${cssDatatablesPath}>

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const defaultData = [["","",""],["","",""],["","",""]]
    const defaultColumns = [
      {type:"text", title:"A"},
      {type:"text", title:"B"},
      {type:"text", title:"C"},
    ]

    const shadow = this.attachShadow({mode: 'open'})
    this.shadow=shadow

    const HTML = createHTML() 
    shadow.setHTMLUnsafe(HTML)

    const divElem = shadow.querySelector("#jspreadsheet")
    this.divElem = divElem
  }
  get contents(){
    return this._contents
  }
  set contents(contents){
    this.setContents(contents)
  }
  setContents(contents){
    this.jsp?.destroy()
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

    const jsp = jspreadsheet(this.divElem, mergedContents) 
    this.jsp=jsp
    this.shadow.host.onblur=(e)=>{
        jsp.resetSelection()
    }
    
    const resizeObserver = new ResizeObserver((entries) => {
      const e = entries[0]
      const rect = e.target.getBoundingClientRect()
      const width  = rect.width
      const height = rect.height
      this.resize(width,height)
    })
    resizeObserver.observe(this.shadow.host)
  }
  getData(){
    return this.jsp.getData()
  }
  set data(data){
    this.setData(data)
  }
  setData(data){
    this.jsp.setData(data)
  }
  resize(width,height){
    this.jsp.content.style.width = width + "px"
    this.jsp.content.style.height = height + "px"
  }

}

customElements.define(TAG_NAME, CustomElem)
