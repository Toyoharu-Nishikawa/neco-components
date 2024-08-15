import {TAG_NAME as TB} from "neco-components/button.js"
import {TAG_NAME as TS} from "./sheet/index.js"
import {TAG_NAME as TG} from "./graph/index.js"


const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 

const createHTML = () =>  `
<style>
  :host{
    display: grid;
    grid-template-rows: 30px 290px 30px 120px 30px;
    grid-template-columns: 30px 290px 30px 120px 30px;
    border: 1px solid black;
    border-radius: 30px;
    box-sizing: border-box; 
  }
  ${TG}{
    grid-row: 2/3; 
    grid-column: 2/5; 
  }
  ${TS}{
    grid-row: 4/5; 
    grid-column: 2/3; 
  }
  ${TB}{
    grid-row: 4/5; 
    grid-column: 4/5; 
  }
</style>

<${TG}></${TG}>
<${TS}></${TS}>
<${TB} data-text=reset></${TB}>
`
const INITIAL_DATA = [
  [0,0],
  [1,1],
  [2,4],
]

export class CustomElem extends HTMLElement {
  constructor() {
    super()
    console.log("!!! constructor !!!", TAG_NAME)
  }
  connectedCallback() {
    console.log("!!! connected !!!", TAG_NAME)
    // check for a Declarative Shadow Root:
    const internals = this.attachInternals()
    let shadow = internals.shadowRoot
    if (!shadow) {
      shadow = this.attachShadow({mode: 'open'})
      const HTML = createHTML()
      shadow.setHTMLUnsafe(HTML) 
    }
    console.log("!!! setHTML!!!", TAG_NAME)
    this.shadow = shadow

    this.graphElem  = this.shadow.querySelector(TG)
    this.sheetElem  = this.shadow.querySelector(TS)
    this.btn        = this.shadow.querySelector(TB)
 
    this.initialize()
  
    const data = this.getIniData() 
    this.setData(data)
  }
  test(){
    console.log("scatter test")
  }
  initialize(){
    this.sheetElem.initialize()
    this.graphElem.initialize()
    this.sheetElem.onafterchanges = this.bindData.bind(this)
    this.btn.onclick              = this.reset.bind(this)
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
    return structuredClone(INITIAL_DATA)
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
