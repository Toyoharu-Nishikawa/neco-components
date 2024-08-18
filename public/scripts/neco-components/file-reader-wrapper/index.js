import {importFiles} from "../../filereader/index.js"

export const TAG_NAME = "neco-file-reader-wrapper"
const createHTML = (params) => `
<span>
  <input id="file-reader-wrapper-input" type="file" name="files" style="display:none; multiple=multiple">
</span>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const templateHTML = createHTML()
    const innerHTML = this.innerHTML 
    const HTML =  templateHTML + innerHTML
    this.setHTMLUnsafe(HTML)
    this.onclick = this.clickHandler.bind(this)
  }
  set onread(func){
    this.afterReadCallBack = func
  }
  async clickHandler(e){
    e.stopPropagation()
    const readFileElem = this.querySelector("#file-reader-wrapper-input")
    
    const files = await importFiles(readFileElem)
   
    if(typeof this.afterReadCallBack ==="function"){
      this.afterReadCallBack(files)
    }
  }
}

customElements.define(TAG_NAME, CustomElem)
