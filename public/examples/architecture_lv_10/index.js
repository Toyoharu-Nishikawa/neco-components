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
  <${TH} slot="header"></${TH}>
  <${TN} slot="nav"></${TN}>
  <${TA} slot="aside"></${TA}>
  <${TM} slot="main"></${TM}>
  <${TF} slot="footer"></${TF}>
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

    const headerSlot = layoutElem.shadow.querySelector('slot[name="header"]')
    this.headerElem  = headerSlot.assignedElements()[0]
 
    const footerSlot = layoutElem.shadow.querySelector('slot[name="footer"]')
    this.footerElem  = footerSlot.assignedElements()[0]
 
    const navSlot = layoutElem.shadow.querySelector('slot[name="nav"]')
    this.navElem = navSlot.assignedElements()[0]
    this.navElem.setParentThis(this)

    const asideSlot = layoutElem.shadow.querySelector('slot[name="aside"]') 
    this.asideElem = asideSlot.assignedElements()[0] 
    console.log(this.asideElem)
    this.asideElem.setParentThis(this)

    const mainSlot = layoutElem.shadow.querySelector('slot[name="main"]') 
    this.mainElem  = mainSlot.assignedElements()[0] 
  }
  test(){
    console.log("test")
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
