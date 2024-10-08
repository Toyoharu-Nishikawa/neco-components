import {TAG_NAME as NI} from "neco-components/icon/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 
const baseURL = import.meta.url.split("/").slice(0,-1).join("/")


const createHTML = () =>  `
<style>
  :host{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 10px 30px  1fr  30px 10px;
    grid-template-columns: 10px 30px 1fr  30px 10px;
    border: 1px solid black;
    border-radius: 30px;
    box-sizing: border-box; 
  }
  ${NI} {
    grid-row: 2/3; 
    grid-column: 4/5; 
  }
  main{
    grid-row: 3/4; 
    grid-column: 3/4; 
  }
</style>

<${NI} 
  data-base-url = ${baseURL + "../../../"}
  data-href="./images/close_black.svg"
  data-href-hover="./images/close_red.svg"
></${NI}>
<main></main>
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
      const HTML = createHTML()
      shadow.setHTMLUnsafe(HTML) 
    }
    console.log("!!! setHTML!!!", TAG_NAME)
    this.shadow = shadow

    const mainElem = shadow.querySelector("main")
    const main = mainElem.attachShadow({mode: 'open'})
    this.main = main
    const innerHTML = this.innerHTML
    main.setHTMLUnsafe(innerHTML)

    this.closeBtn = shadow.querySelector(NI)
  }
  test(){
    console.log("test")
    this.initialize()
  }
  setElem(graphElem, sheetElem, btnElem){
    this.graphElem = graphElem
    this.sheetElem = sheetElem
    this.btnElem   = btnElem
  }
  setParentShadow(parentShadow){
    this.parentShadow = parentShadow
  }
  setIniData(data){
    this.INITIAL_DATA = data
  }
  initialize(){
    this.sheetElem?.initialize()
    this.graphElem?.initialize()
    if(this.sheetElem){
      this.sheetElem.onafterchanges = this.bindData.bind(this)
    }
    if(this.btnElem){
      this.btnElem.onclick          = this.reset.bind(this)
    }
    this.closeBtn.onclick = this.close.bind(this)
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
    return structuredClone(this.INITIAL_DATA)
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
  close(){
    if(typeof this.closeCallback === "function"){
      this.closeCallback(this)
    }
    this.shadow.host.remove()
    if(this.parentShadow){
      this.parentShadow.host.remove()
    }
  }
  set onclose(func){
    this.closeCallback = func
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
