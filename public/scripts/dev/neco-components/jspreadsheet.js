await import("./modules/jsuites/dist/jsuites.js")
console.log(jSuites)
await import("./modules/jspreadsheet-ce/dist/index.js")
console.log("error")


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
//<link rel="stylesheet" href=${cssDatatablesPath}>
//<link rel="stylesheet" href=${cssThemePath}>

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      data:  this.dataset.data,
      colHeaders: this.dataset.colHeaders,
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
    //const data = params.data ?  JSON.parse(params.data): null
    //const colHeaders = params.colHeaders ? JSON.parse(params.colHeaders): true
    const rect = shadow.host.getBoundingClientRect()
    const tableWidth  = rect.width +"px"
    const tableHeight = rect.height + "px"
    var data = [
    ['Jazz', 'Honda', '2019-02-12', '', true, '$ 2.000,00', '#777700'],
    ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
];
const columns= [
        { type: 'text', title:'Car', width:120},
        { type: 'dropdown', title:'Make', width:200, source:[ "Alfa Romeo", "Audi", "Bmw" ] },
        { type: 'calendar', title:'Available', width:200 },
        { type: 'image', title:'Photo', width:120 },
        { type: 'checkbox', title:'Stock', width:80 },
        { type: 'numeric', title:'Price', width:100, mask:'$ #.##,00', decimal:',' },
        { type: 'color', width:100, render:'square', }
    ]
 
    const jsp = jspreadsheet(divElem, {
      root: shadow,
      data,
      columns,
//      colHeaders,
      tableOverflow: true,
      tableWidth,
      tableHeight,
//      rowHeaders: true,
    })
    console.log(jsp)
    this.jspreadsheet=jsp
    const resizeObserver = new ResizeObserver((entries) => {
      const e = entries[0]
      const rect = e.target.getBoundingClientRect()
      const width  = rect.width
      const height = rect.height
      this.resize(width,height)
    })
    //resizeObserver.observe(shadow.host)
    resizeObserver.observe(divElem)
  }
  resize(width,height){
    this.jspreadsheet.content.style.width = width + "px"
    this.jspreadsheet.content.style.height = height + "px"
  }
}

export default customElements.define(tagName, customElem)
