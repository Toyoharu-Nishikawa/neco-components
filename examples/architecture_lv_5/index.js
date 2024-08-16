import {TAG_NAME as TS} from "./scatter/index.js"
import {TAG_NAME as TB} from "./bar/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 

const createHTML = () =>`
<style>
  :host{
    display: flex;
    flex-flow: row;
    gap: 50px;
  }
</style>
<${TS}></${TS}>
<${TB}></${TB}>
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

    this.scatterElem  = this.shadow.querySelector(TS)
    this.barElem  = this.shadow.querySelector(TB)

   // this.barElem.onremove = this.remove.bind(this)

  }
  test(){
  }
  remove(){
    
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
