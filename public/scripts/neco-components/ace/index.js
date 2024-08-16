import "../../ace-builds/src/ace.js"
const aceURL = import.meta.url.split("/").slice(0,-3).join("/")+("/ace-builds/src")
ace.config.set('basePath', aceURL)

export const TAG_NAME = "neco-ace"
const createHTML = (params) => `
<style>
#editor{
  height: 100%;
  width: 100%;
}
</style>
<div id="editor"></div>
`

export const customElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow

    const HTML = createHTML()
    this.shadow.setHTMLUnsafe(HTML)

    const divElem = this.shadow.querySelector("div")
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

    editor.renderer.attachToShadowRoot()
  }
  getValue(){
    return this.editor.getValue()
  }
  get value(){
    return this.getValue()
  }
  setValue(text){
    this.editor.setValue(text)
  }
  set value(text){
    this.setValue(text)
  }
}
customElements.define(TAG_NAME, customElem)
