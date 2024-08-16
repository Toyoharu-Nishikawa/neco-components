import {TAG_NAME as NN} from "neco-components/nav/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 

const createHTML = () =>`
<style>
  :host{
    width:  100%;
    height: 100%;
  }
</style>
<${NN}>
  <style>
    .menu > li {
      width: 100px;
      height: 30px;
      line-height: 30px;
    }
  </style>

  <ul class="menu">
    <li class="menu__single">
      <a href="#" class="init-bottom">file</a>
      <ul class="menu__second-level">
        <li><a href="#">read</a></li>
        <li><a href="#">save</a></li>
      </ul>
    </li>

    <li class="menu__single">
      <a href="#" class="init-bottom">view</a>
      <ul class="menu__second-level">
        <li><a href="#">...</a></li>
        <li><a href="#">...</a></li>
      </ul>
    </li>

    <li class="menu__single">
      <a href="#" class="init-bottom">tools</a>
      <ul class="menu__second-level">
        <li><a href="#">...</a></li>
        <li><a href="#">...</a></li>
      </ul>
    </li>

    <li class="menu__single">
      <a href="#" class="init-bottom">help</a>
      <ul class="menu__second-level">
        <li><a href="#">...</a></li>
        <li><a href="#">...</a></li>
      </ul>
    </li>
  </ul>
</${NN}>
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
