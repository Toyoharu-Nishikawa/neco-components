import "../node_modules/jsuites/dist/jsuites.js"
import "../node_modules/jspreadsheet-ce/dist/index.js"

const url = import.meta.url
const cssMainPath = url.split("/").slice(0,-2).join("/")+"/node_modules/jspreadsheet-ce/dist/jspreadsheet.css"
const cssDatatablesPath = url.split("/").slice(0,-2).join("/")+"/node_modules/jspreadsheet-ce/dist/jspreadsheet.datatables.css"
const cssThemePath = url.split("/").slice(0,-2).join("/")+"/node_modules/jspreadsheet-ce/dist/jspreadsheet.themes.css"
const cssJsuitesPath = url.split("/").slice(0,-2).join("/")+"/node_modules/jsuites/dist/jsuites.css"

export const TAG_NAME = "neco-jspreadsheet"
const createHTML = (params) => `
<style>

:host{
/*  height: 100%;
  width: 100%;
  */
}
#jspreadsheet{
  display:flex;
  flex-flow: column;
/*
  height: 100%;
  width: 100%;
*/
}
</style>
<link rel="stylesheet" href=${cssJsuitesPath}>
<link rel="stylesheet" href=${cssThemePath}>
<link rel="stylesheet" href=${cssMainPath}>
<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
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

    const resizeObserver = new ResizeObserver((entries) => {
      const e = entries[0]
      const rect = e.target.getBoundingClientRect()
      const width  = rect.width
      const height = rect.height
      this.resize(width,height)
    })
    resizeObserver.observe(this.shadow.host)
 
  }
  get contents(){
    return this._contents
  }
  set contents(contents){
    this.setContents(contents)
  }
  setContents(contents){
    this.jsp?.destroy()
    const rect = this.shadow.host.getBoundingClientRect()
    const width  = rect.width
    const height = rect.height
    const self = this 
    const target = {
      root : this.shadow,
    }
    const mergedContents = Object.assign(target, contents)

    const jsp = jspreadsheet(this.divElem, mergedContents) 
    this.jsp=jsp
    this.shadow.host.onblur=(e)=>{
        jsp.forEach(v=>v.resetSelection())
    }
    this.resize() 
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
  resize(width, height){
    if(!this.jsp)return

    const heightList = [...this.divElem.childNodes]
      .filter(v=>!v.classList.contains("jtabs-content"))
      .map(v=>{
        return v?.getBoundingClientRect().height
      })
    const sumOthersHeight = heightList.reduce((p,c)=> p+Math.min(c,40),0)

    this.jsp.forEach(v=>{
      const nodeList = [...v.element.childNodes] 
      const childHeightList = nodeList
      .filter(v=>!v.classList.contains("jss_content"))
      .map(v=>{
        return v?.getBoundingClientRect().height
      })
      const sumOthersChildHeight = childHeightList.reduce((p,c)=>p+c,0)
      const maxHeight = Math.max(0, height - sumOthersHeight - sumOthersChildHeight)
      v.content.style.maxWidth = width + "px"
      v.content.style.maxHeight = maxHeight + "px"
    })
  }
}

customElements.define(TAG_NAME, CustomElem)
