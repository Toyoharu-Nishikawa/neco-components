import {TAG_NAME as NIB} from "neco-components/icon-button/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 
const baseURL = import.meta.url.split("/").slice(0,-1).join("/")

const createHTML = () =>`
<style>
  :host{
    padding: 30px;
    display: flex;
    flex-flow: column; 
    gap: 30px;
  }
  ${NIB}{
    width: 120px;
    height: 40px;
    --background: black;
    --color: white;
  }
</style>
<${NIB}
  data-base-url = ${baseURL + "../../"}
  data-href="./images/plus.svg"
  data-text="Scatter"
></${NIB}>
<${NIB}
  data-base-url = ${baseURL + "../../"}
  data-href="./images/plus.svg"
  data-text="Bar"
></${NIB}>
<${NIB}
  data-base-url = ${baseURL + "../../"}
  data-href="./images/close_black.svg"
  data-text="All"
></${NIB}>
`

export class CustomElem extends HTMLElement {
  constructor() {
    super()
    console.log("!!! constructor !!!", TAG_NAME)
  }
  connectedCallback() {
    console.log("!!! connected !!!", TAG_NAME)

    const internals = this.attachInternals()

    // check for a Declarative Shadow Root:
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
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
