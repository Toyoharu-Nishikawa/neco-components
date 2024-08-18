const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 
const baseURL = import.meta.url.split("/").slice(0,-1).join("/")


const createHTML = () =>  `
<style>
  :host{
    padding: 30px;
    display: flex;
    flex-flow: row;
    gap: 50px;
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
      const HTML = createHTML()
      shadow.setHTMLUnsafe(HTML) 
    }
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
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
