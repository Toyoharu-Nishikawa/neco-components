import "../../ace-builds/src/ace.js"
const aceURL = import.meta.url.split("/").slice(0,-3).join("/")+("/ace-builds/src")
ace.config.set('basePath', aceURL)

export const TAG_NAME = "neco-ace"
const createHTML = (params) => `
<style id="emaxMode">
.emacs-mode .ace_cursor{
    border: 1px rgba(50,250,50,0.8) solid!important;
    box-sizing: border-box!important;
    background-color: rgba(0,250,0,0.9);
    opacity: 0.5;
}
.emacs-mode .ace_hidden-cursors .ace_cursor{
    opacity: 1;
    background-color: transparent;
}
.emacs-mode .ace_overwrite-cursors .ace_cursor {
    opacity: 1;
    background-color: transparent;
    border-width: 0 0 2px 2px !important;
}
.emacs-mode .ace_text-layer {
    z-index: 4
}
.emacs-mode .ace_cursor-layer {
    z-index: 2
}
/*# sourceURL=ace/css/emacsMode */
</style>
<style id="vimMode">
.normal-mode .ace_cursor{
    border: none;
    background-color: rgba(255,0,0,0.5);
}
.normal-mode .ace_hidden-cursors .ace_cursor{
  background-color: transparent;
  border: 1px solid red;
  opacity: 0.7
}
.ace_dialog {
  position: absolute;
  left: 0; right: 0;
  background: inherit;
  z-index: 15;
  padding: .1em .8em;
  overflow: hidden;
  color: inherit;
}
.ace_dialog-top {
  border-bottom: 1px solid #444;
  top: 0;
}
.ace_dialog-bottom {
  border-top: 1px solid #444;
  bottom: 0;
}
.ace_dialog input {
  border: none;
  outline: none;
  background: transparent;
  width: 20em;
  color: inherit;
  font-family: monospace;
}
/*# sourceURL=ace/css/vimMode */
</style>
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
    const isShadow = true
    this.shadow= isShadow ? this.attachShadow({mode: 'open'}) : this

    const HTML = createHTML()
    this.shadow.setHTMLUnsafe(HTML)

    const divElem = this.shadow.querySelector("div")
    const editor = ace.edit(divElem)
    this.editor = editor

    const editorKey = "ace/keyboard/vim"
    editor.setKeyboardHandler(editorKey)

    editor.setTheme("ace/theme/monokai")
    editor.getSession().setOptions({
      mode: "ace/mode/javascript",
      tabSize: 2,
      useSoftTabs: true,
    })
    editor.setOptions({
      fontSize: "13pt",
    })
    editor.$blockScrolling = Infinity

    const runFunc = ()=>{
      if(this.hasOwnProperty("runCallback")){
        this.runCallback()
      }
    }
    editor.commands.addCommand({
      name:'run',
      bindKey: {win:'Shift-Return',mac:'Shift-Return'},
      exec: runFunc,
    })
    editor.commands.addCommand({
      name:'clearAll',
      bindKey: {win:'Shift-Delete',mac:'Shift-Delete'},
      exec: function(){
        editor.setValue("")
      },
    })
    //editor.setSession(ace.createEditSession("alert('works')"))
    if(isShadow){
      editor.renderer.attachToShadowRoot()
    }
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
  set onrun(runCallback){
    console.log("set run callback")
    this.runCallback = runCallback
  }
  setFontSize(fontSize){
    this.editor.setOptions({fontSize: fontSize })
  }
  set fontSize(fontSize){
    this.setFontSize(fontSize)
  }
  setKeyBinding(key){
    const editorKey = key !=="" ? "ace/keyboard/"+key : null
    this.editor.setKeyboardHandler(editorKey)
  }
  set keyBinding(key){
    this.setKeyBinding(key) 
  }
  setMode(mode){
    this.editor.setOptions({mode: mode })
  }
  set mode(mode){
    this.setMode(mode)
  }
  setTheme(theme){
    this.editor.setTheme(theme)
  }
  set theme(theme){
    this.setTheme(theme)
  }
}
customElements.define(TAG_NAME, customElem)
