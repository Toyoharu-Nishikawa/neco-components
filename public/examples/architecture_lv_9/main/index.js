import {TAG_NAME as TT} from "../template/tile/index.js"
import {TAG_NAME as TS} from "./scatter/index.js"
import {TAG_NAME as TB} from "./bar/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 

const createHTML = () =>`
<style>
  :host{
    width: 100%;
    height: 100%;
  }
</style>
<${TT} data-tile-size="500px">
 <${TS}></${TS}>
 <${TB}></${TB}>

 <${TS}></${TS}>
 <${TB}></${TB}>
</${TT}>
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
