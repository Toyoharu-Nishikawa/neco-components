import "neco-components/button.js"
import "./sheet/index.js"
import "./graph/index.js"

const TAG_NAME = 'my-scatter'
const wait = t => new Promise(resolve => setTimeout(resolve, t))

export class CustomElem extends HTMLElement {
  constructor() {
    super()
    this.INITIAL_DATA = [
      [0,0],
      [1,1],
      [2,4],
    ]
  }
  async connectedCallback() {
    const internals = this.attachInternals()

    // check for a Declarative Shadow Root:
    let shadow = internals.shadowRoot
    if (!shadow) {
      console.log("there wasn't one. create a new Shadow Root:")
      shadow = this.attachShadow({
        mode: 'open'
      })

     const url = import.meta.url.split("/").slice(0,-1).join("/") + "/index.html"
     const res = await fetch(url)
     const html = await res.text()
     shadow.setHTMLUnsafe(html) 
    }

    this.shadow = shadow

    this.sheetElem  = this.shadow.querySelector("my-sheet")
    this.graphElem  = this.shadow.querySelector("my-graph")
    this.btn        = this.shadow.querySelector("neco-button")
 
    this.initialize()

    const INITIAL_DATA = this.getIniData() 
    this.setData(INITIAL_DATA)

    this.sheetElem.onafterchanges = this.bindData.bind(this)
    this.btn.onclick              = this.reset.bind(this)
  }
  initialize(){
    console.log("initialize")
    this.sheetElem.initialize()
    this.graphElem.initialize()
  }
  setData(data){
    this.sheetElem.setData(data)
    this.graphElem.setData(data)
  }
  bindData(){
    const data = this.sheetElem.getData()
    this.graphElem.setData(data)
  }
  getIniData(){
    const INITIAL_DATA = structuredClone(this.INITIAL_DATA)
    return INITIAL_DATA
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
}

customElements.define(TAG_NAME, CustomElem)
