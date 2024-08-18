const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 
const baseURL = import.meta.url.split("/").slice(0,-1).join("/")


const createHTML = (params) =>  `
<style>
  :host{
    height: 100%;
    padding: 30px;
    box-sizing: border-box;

    display:grid;
    grid-template-columns: repeat(auto-fill,minmax(${params.tileSize},1fr));
    gap: ${params.gapSize};
    overflow-y: scroll;
  }
</style>
`

export class CustomElem extends HTMLElement {
  constructor() {
    super()
    console.log("!!! constructor !!!", TAG_NAME)
  }
  connectedCallback() {
    console.log("!!! connected !!!", TAG_NAME)
    const internals = this.attachInternals()
    let shadow = internals.shadowRoot
    if (!shadow) {
      shadow = this.attachShadow({mode: 'open'})
    }
    const params = {
      tileSize : this.dataset?.tileSize ?? "500px",
      gapSize : this.dataset?.gapSize ?? "50px",
    }

    const templateHTML = createHTML(params)
    const innerHTML    = this.innerHTML
    const HTML = templateHTML + innerHTML
    shadow.setHTMLUnsafe(HTML) 
    
    console.log("!!! setHTML!!!", TAG_NAME)
    this.shadow = shadow
  }
  test(){
    console.log("test")
    const elem1 = document.createElement("div")
    elem1.textContent = "hello"
    this.addElem(elem1)

    const elem2 = document.createElement("div")
    elem2.textContent = "good morning"
    this.addElem(elem2)
  }
  addElem(elem){
    this.shadow.appendChild(elem)
  }
  removeElem(elem){
    this.shadow.removeChild(elem)
  }
  removeAllElem(){
    const children = [...this.shadow.children]
    const elemsExpectForStyle =  children.slice(1)
    elemsExpectForStyle.forEach(v=>{
      v.remove()
    })
  }
  setDataList(dataList){
    this.removeAllElem()
    dataList.forEach(v=>{
      const tagName = v.tagName
      const data    = v.data
      const elem = document.createElement(tagName)
      this.addElem(elem)
      elem.setData(data)
    })
  }
  getDataList(){
    const children = [...this.shadow.children]
    const elemsExpectForStyle =  children.slice(1)
    const dataList = elemsExpectForStyle.map(v=>v?.getData())  
    return dataList
  }
}


customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
