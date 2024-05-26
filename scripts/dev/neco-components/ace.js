import "../ace-builds/src/ace.js"
const aceURL = import.meta.url.split("/").slice(0,-2).join("/")+("/ace-builds/src")
ace.config.set('basePath', aceURL)


const tagName = "neco-ace"
const template = (params) => `
<style>
#editor{
height: 100%;
width: 100%;
}
</style>
<div id="editor"></div>
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.editor
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
      tabs:  this.dataset.tabs,
      pages: this.dataset.pages,
    }
    let shadow
    const isShadow = params.isShadow
    this.isShadow = isShadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElement = isShadow ? shadow : this

    const dom = new DOMParser().parseFromString(template(), "text/html")
    parentElement.appendChild(dom.head.querySelector("style"))
    parentElement.appendChild(dom.body.querySelector("div"))
    const divElem = parentElement.querySelector("div")
    const editor = ace.edit(divElem)
    this.editor = editor
    editor.setTheme("ace/theme/monokai")
    editor.getSession().setOptions({
      mode: "ace/mode/javascript",
      tabSize: 2,
      useSoftTabs: true,
    })
    editor.setOptions({
      fontSize: "13pt",
    })
    if(isShadow){
       editor.renderer.attachToShadowRoot()
    }
  }
  getValue(){
    return this.editor.getValue()
  }
  get value(){
    return this.getValue
  }
  setValue(text){
    this.editor.setValue(text)
  }
  set value(text){
    this.setValue(text)
  }
}
export default customElements.define(tagName, customElem)
