export const TAG_NAME = "neco-table-simple"

const createHTML = (params) => `
<style>
${params.widthStyleString}
${params.heightStyleString}

table {
  border-spacing: 0;
  table-layout: fixed;
  box-sizing: content-box;
  border-collapse: collapse; 
}
tbody {
  padding:0;
  margin:0;
  box-sizing:border-box;
  table-layout: fixed;
}

td{
  padding: 5px;
  margin:0;
  height: 100%;
  table-layout: fixed;
  box-sizing:border-box;

  ${params.verticalLine   ? "border-left:1px solid;border-right:1px solid;":""}
  ${params.horizontalLine ? "border-bottom:1px solid;border-top:1px solid;":""}
}
th{
  background: ${params.headerBackground};
  ${params.verticalLine   ? "border-left:1px solid;border-right:1px solid;":""}
  ${params.horizontalLine ? "border-bottom:1px solid;border-top:1px solid;":""}
}

${params.evenBackground ? "tr:nth-child(eve){background:"+params.evenBackground+"}":""}
${params.oddBackground  ? "tr:nth-child(odd){background:"+params.oddBackground+"}":""}

td > output,
td > input{
  width: 100%; 
  height: 100%; 
  max-width:100%;
  box-sizing:border-box;
}

td > output{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow:hidden;
}
</style>
`
const Text = class {
  constructor(val){
    this.val = val
  }
  get value(){
    return this.val.textContent
  }
  set value(v){
    this.val.textContent = v
  }
}
const IO = class {
  constructor(val){
    this.val = val
  }
  get value(){
    return this.val.value
  }
  set value(v){
    this.val.value = v
  }
}

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
      caption:this.dataset.caption,
      data:this.dataset.data,
      header:this.dataset.header || "[]",
      width:this.dataset.width,
      height:this.dataset.height,
      verticalLine: this.dataset.verticalLine ? (this.dataset.verticalLine.toLowerCase()==="true" ? true:false): false,
      horizontalLine: this.dataset.horizontalLine ? (this.dataset.horizontalLine.toLowerCase()==="true" ? true:false): false,
      oddBackground: this.dataset.oddBackground,
      evenBackground: this.dataset.evenBackground,
      headerBackground: this.dataset.headerBackground,
      css:this.dataset.css,
    }
    //const isShadow = params.isShadow
    //this.isShadow = isShadow
    //let shadow
    //if(isShadow){
    //  shadow = this.attachShadow({mode: 'open'});
    //  this.shadow=shadow
    //}
    //const parentElement = isShadow ? shadow : this
 
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const data = JSON.parse(params.data)
    const header = JSON.parse(params.header)
    const tableElem = document.createElement("table")
    const tbodyElem = document.createElement("tbody")
    const list = []
    const obj = {}

    if(params.caption){
        const captionElem = document.createElement("caption")
        captionElem.textContent = params.caption
      tableElem.appendChild(captionElem)
    }
    if(header.length>0){
    const trElemForH = document.createElement("tr")
      header.forEach(h=>{
        const thElem = document.createElement("th")
        thElem.textContent = h
        trElemForH.appendChild(thElem)
      })
      tbodyElem.appendChild(trElemForH)
    }
    data.forEach(tr=>{
      const trElem = document.createElement("tr")
      const trFragment = document.createDocumentFragment()
      const inList = []
      tr.forEach(td=>{
        const tdElem = document.createElement("td")
     //   const isHTML = td.match(/<input.*>|<output.*>/)
        const isHTML = td.match(/<("[^"]*"|\'[^\']*\'|[^\'">])*>/)
        if(isHTML){
          const tdDom = new DOMParser().parseFromString(td, "text/html")
          const ioElem = tdDom.body.childNodes[0]
          tdElem.append(ioElem)
          if(ioElem.tagName==="INPUT"){
            ioElem.onchange = this.afterchange.bind(this)
          }
          const io = new IO(ioElem)
          inList.push(io) 
          const nameValue = ioElem.getAttribute("name")
          if(nameValue){
            obj[nameValue] = io
          }
        }
        else{
          tdElem.textContent = td
          const text = new Text(td)
          inList.push(text) 
        }
        trElem.appendChild(tdElem)
      }) 
      list.push(inList)
      tbodyElem.appendChild(trElem)
    })
    tableElem.appendChild(tbodyElem)
    if(params.css){
      const link = document.createElement("link")
      link.href = params.css
      link.rel = "stylesheet"
      tableElem.appendChild(link)
    }

    let widthStyleString = ""
    if(params.width){
      const widthList = JSON.parse(params.width)
      const styleStringList = widthList.map((v,i)=>`td:nth-child(${i+1}){width:${v};}`)
      widthStyleString = styleStringList.reduce((p,c)=>p+c,"")
    }
    let heightStyleString = ""
    if(params.height){
      const heightList = JSON.parse(params.height)
      const styleStringList = heightList.map((v,i)=>`tr:nth-child(${i+1}){height:${v};}`)
      heightStyleString = styleStringList.reduce((p,c)=>p+c,"")
    }

    const styleParams ={
      widthStyleString,
      heightStyleString,
      verticalLine:params.verticalLine,
      horizontalLine:params.horizontalLine,
      oddBackground:params.oddBackground,
      evenBackground:params.evenBackground,
      headerBackground:params.headerBackground,
    }

    //const dom = new DOMParser().parseFromString(template(styleParams), "text/html")
    //parentElement.appendChild(dom.head.querySelector("style"))
    //parentElement.appendChild(tableElem)
    const templateHTML = createHTML(styleParams)
    const innerHTML = this.innerHTML
    const HTML = templateHTML+innerHTML
    shadow.setHTMLUnsafe(HTML)
    shadow.appendChild(tableElem)

    this.list = list
    this.obj  = obj
  }

  get cells(){
    return this.list 
  }
  get range(){
    return this.obj
  }
  set onchange(func){
    this.afterChangeFunc = func 
  }
  afterchange(e){
    e.cells = this.cells
    e.range = this.range
    if(typeof this.afterChangeFunc ==="function"){
      this.afterChangeFunc(e)
    }
  } 
}

customElements.define(TAG_NAME, CustomElem)
