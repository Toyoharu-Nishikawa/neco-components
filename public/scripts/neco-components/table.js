const tagName = "neco-table"

const template = (params) => `
<style>
div {
  color: #3e5358;
  border-radius: 1px;
  border: 1px solid #1495b5;
  border-radius: 6px 6px 6px 6px;
  margin: 10px 20px 10px 50px;
  width: 100px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
div:hover {
  background: #1495b5;
  color: #F5FFFA;
  transition: 1.2s;
  cursor: pointer;
}
div > a {
 margin:0;
 padding:0;
}

</style>
<link rel="stylesheet" href="sample.css">
<table>
  <tbody>
  </tbody>
</table>
`
const T = class {
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
const I = class {
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

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      format:this.dataset.format,
      width:this.dataset.width,
      height:this.dataset.height,
      font:this.dataset.font,
      css:this.dataset.css,
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    console.log(params.format)
    const format = JSON.parse(params.format)
    const tableElem = document.createElement("table")
    const tbodyElem = document.createElement("tbody")
    format.forEach(tr=>{
      const trElem = document.createElement("tr")
      const trFragment = document.createDocumentFragment()
      tr.forEach(td=>{
        const tdElem = document.createElement("td")
        const isHTML = td.match(/<("[^"]*"|\'[^\']*\'|[^\'">])*>/)
        if(isHTML){
          const tdDom = new DOMParser().parseFromString(td, "text/html")
          console.log("tdDOM",tdDom)
          tdDom.body.childNodes.forEach(node=>tdElem.appendChild(node))
          
          //tdElem.appendChild(tdDom)
        }
        else{
          //const tdDom = new DOMParser().parseFromString(td, "text/html")
          //console.log("tdDOM",tdDom)
          tdElem.textContent = td
        }
        console.log("tdDom",td)
        trElem.appendChild(tdElem)
      }) 
      tbodyElem.appendChild(trElem)
    })
    tableElem.appendChild(tbodyElem)
 
    //const dom = new DOMParser().parseFromString(template(params), "text/html")
    //shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(tableElem)
  }
}

export default customElements.define(tagName, customElem)
