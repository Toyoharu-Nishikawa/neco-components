import {TAG_NAME as TB} from "neco-components/button/index.js"
import {TAG_NAME as TS} from "./sheet/index.js"
import {TAG_NAME as TG} from "./graph/index.js"
import {TAG_NAME as TT} from "../../template/card/index.js"


const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 

const createHTML = () => `
<style>
  :host{
    width: 500px;
    height: 500px;
  }
</style>

<${TT}>
  <style>
    :host(main){
      display: grid;
      grid-template-rows: 270px 30px 120px;
      grid-template-columns: 280px 20px 120px;
    }
    ${TG}{
      grid-row: 1/2; 
      grid-column: 1/4; 
    }
    ${TS}{
      grid-row: 3/4; 
      grid-column: 1/2; 
    }
    ${TB}{
      grid-row: 3/4; 
      grid-column: 3/4; 
    }
  </style>
  <${TG}></${TG}>
  <${TS}></${TS}>
  <${TB} data-text=reset></${TB}>
</${TT}>

`
const INITIAL_DATA = [
  ["Lion"    , 3, 2],
  ["Elephant", 1, 2],
  ["Zebra"   , 5, 2],
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

    const template = this.shadow.querySelector(TT)
    this.template = template

    this.graphElem  = this.shadow.querySelector(TT).main.querySelector(TG)
    this.sheetElem  = this.shadow.querySelector(TT).main.querySelector(TS)
    this.btnElem    = this.shadow.querySelector(TT).main.querySelector(TB)

    template.setElem(this.graphElem, this.sheetElem, this.btnElem) 
    template.setIniData(INITIAL_DATA) 
    template.setParentShadow(shadow)

    template.initialize()
    const data = this.template.getIniData()
    template.setData(data)

  }
  test(){
    console.log("bar test")
  }
  setData(data){
    this.template.setData(data)
  }
  getData(){
    const data = this.template.getData()
    const tagName = TAG_NAME
    const obj = {tagName, data}
    return obj
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
