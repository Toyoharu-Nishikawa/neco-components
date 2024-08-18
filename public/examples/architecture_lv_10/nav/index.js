import {TAG_NAME as NN} from "neco-components/nav/index.js"
import {TAG_NAME as NFRW} from "neco-components/file-reader-wrapper/index.js"
import {saveAs} from "../modules/file.js"

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
        <li><a id="read"><${NFRW}>read</${NFRW}></a></li>
        <li><a id="save">save</a></li>
      </ul>
    </li>

    <li class="menu__single">
      <a href="#" class="init-bottom">view</a>
      <ul class="menu__second-level">
        <li><a>...</a></li>
        <li><a>...</a></li>
      </ul>
    </li>

    <li class="menu__single">
      <a href="#" class="init-bottom">tools</a>
      <ul class="menu__second-level">
        <li><a>...</a></li>
        <li><a>...</a></li>
      </ul>
    </li>

    <li class="menu__single">
      <a href="#" class="init-bottom">help</a>
      <ul class="menu__second-level">
        <li><a>...</a></li>
        <li><a>...</a></li>
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

    const navElem =  shadow.querySelector(NN)

    this.readBtn = navElem.querySelector(NFRW)
    this.saveBtn = navElem.querySelector("#save")

    this.readBtn.onread  = this.read.bind(this)
    this.saveBtn.onclick = this.save.bind(this)
  }
  test(){
    console.log("test")
  }
  setParentThis(parentThis){
    this.parentThis = parentThis
  }
  read(files){
    console.log("read")
    if(!this.parentThis) return

    const file = files[0]
    const text = file.text
    const dataList = JSON.parse(text)
    this.parentThis.mainElem.setDataList(dataList)
  }
  save(e){
    console.log("save")
    if(!this.parentThis) return
    const dataList = this.parentThis.mainElem.getDataList()
    const text = JSON.stringify(dataList)
    saveAs(text, "input.json")
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
