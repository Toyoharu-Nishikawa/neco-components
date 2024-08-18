import {TAG_NAME as TL} from "./template/layout/index.js"

import {TAG_NAME as TH} from "./header/index.js"
import {TAG_NAME as TF} from "./footer/index.js"
import {TAG_NAME as TN} from "./nav/index.js"
import {TAG_NAME as TA} from "./aside/index.js"
import {TAG_NAME as TM} from "./main/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 

const createHTML = () =>`
<style>
  :host{
    width:  100%;
    height: 100%;
  }
</style>
<${TL}>
</${TL}>
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

    const layoutElem = shadow.querySelector(TL)

    const headerElem = document.createElement(TH)
    layoutElem.addElem("header", headerElem)

    const footerElem = document.createElement(TF)
    layoutElem.addElem("footer", footerElem)

    const navElem = document.createElement(TN)
    layoutElem.addElem("nav", navElem)

    const asideElem = document.createElement(TA)
    layoutElem.addElem("aside", asideElem)

    const mainElem = document.createElement(TM)
    layoutElem.addElem("main", mainElem)
  }
  test(){
    console.log("test")
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
