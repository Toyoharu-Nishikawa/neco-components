const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 
const baseURL = import.meta.url.split("/").slice(0,-1).join("/")


const createHTML = () =>  `
<style>
  :host{
    width:  100%;
    height: 100%;
    display: grid;
    grid-template-rows: 50px 30px minmax(0,1fr) 30px;
    grid-template-columns: 200px minmax(0,1fr);
  }
  header{
    grid-row: 1/2;
    grid-column: 1/3;
    background: blue;
  }
  nav{
    grid-row: 2/3;
    grid-column: 1/3;
    background: orange;
  }
  aside{
    grid-row: 3/4;
    grid-column: 1/2;
    background: yellow;
  }
  main{
    grid-row: 3/4;
    grid-column: 2/3;
    background: green;
  }
  footer{
    grid-row: 4/5;
    grid-column: 1/3;
    background: gray;
  }
</style>
<header></header>
<nav></nav>
<aside></aside>
<main></main>
<footer></footer>
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
    this.header = this.shadow.querySelector("header")
    this.nav    = this.shadow.querySelector("nav")
    this.aside  = this.shadow.querySelector("aside")
    this.main   = this.shadow.querySelector("main")
    this.footer = this.shadow.querySelector("footer")
  }
  test(){
    console.log("test")
    const headerElem = document.createElement("div")
    headerElem.textContent = "HEADER"
    this.addElem("header", headerElem)

    const navElem = document.createElement("div")
    navElem.textContent = "NAV"
    this.addElem("nav", navElem)

    const asideElem = document.createElement("div")
    asideElem.textContent = "ASIDE"
    this.addElem("aside", asideElem)

    const mainElem = document.createElement("div")
    mainElem.textContent = "main"
    this.addElem("main", mainElem)

    const footerElem = document.createElement("div")
    footerElem.textContent = "footer"
    this.addElem("footer", footerElem)
  }
  addElem(tag, elem){
    this[tag].appendChild(elem)
  }
  removeElem(tag, elem){
    this[tag].removeChild(elem)
  }

}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
