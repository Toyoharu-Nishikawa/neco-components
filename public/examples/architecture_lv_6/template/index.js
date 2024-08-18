import {TAG_NAME as NI} from "neco-components/icon/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 
const baseURL = import.meta.url.split("/").slice(0,-1).join("/")


const createHTML = () =>  `
<style>
  :host{
    display: grid;
    grid-template-rows: 10px 30px  420px  30px 10px;
    grid-template-columns: 10px 30px 420px  30px 10px;
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
  data-base-url = ${baseURL}
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

    const divElem = shadow.querySelector(NI)
    divElem.onclick = this.close.bind(this)
  }
  test(){
    console.log("test")
  }
  setParentShadow(parentShadow){
    this.parentShadow = parentShadow
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
