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
  div {
    display: block;
    background-image: url(${baseURL}/images/close1.svg);
    background-size: 30px;
    grid-row: 2/3; 
    grid-column: 4/5; 
    width: 30px;
    height: 30px;
  }
  div:hover {
    background-image: url(${baseURL}/images/close2.svg);
    cursor: pointer;
  }
  main{
    grid-row: 3/4; 
    grid-column: 3/4; 
  }
</style>

<div></div>
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

    const divElem = shadow.querySelector("div")
    divElem.onclick = this.close.bind(this)
  }
  test(){
    console.log("test")
  }
  close(){
    if(typeof this.closeCallback === "function"){
      this.closeCallback(this)
    }
    this.shadow.host.remove()
  }
  set onclose(func){
    this.closeCallback = func
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
