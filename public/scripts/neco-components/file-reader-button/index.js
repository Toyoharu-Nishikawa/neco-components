import {importFiles} from "../../filereader/index.js"

export const TAG_NAME = "neco-file-reader-button"
const template = (params) => `
<style>
:host{
  height: 100%;
  width: 100%;
  display:block; 

  --font-size           : initial;

  --color               : black;
  --background          : -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
  --border              : 1px solid #a9a9a9;
  --border-radius       : 6px 6px 6px 6px;
  --box-shadow          : 0 0 3px 0 rgba(0, 0, 0, 0.25);
  --cursor              : pointer;

  --color-hover         : var(--color);
  --box-shadow-hover    : 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  --border-hover        : 1px solid gray;
  --border-radius-hover : var(--border-radius);
  --background-hover    : var(--background);
  --transition          : none;

}
div {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size     : var(--font-size);
  color         : var(--color);
  background    : var(--background);
  border        : var(--border);
  border-radius : var(--border-radius);
  box-shadow    : var(--box-shadow);
  cursor        : var(--cursor);
}
div:hover {
  color         : var(--color-hover);
  background    : var(--background-hover);
  border        : var(--border-hover);
  border-radius : var(--border-radius-hover);
  box-shadow    : var(--box-shadow-hover);
  transition    : var(--transition);
}
div > span {
 user-select: none;
 margin:0;
 padding:0;
}
</style>
<div>
  <span>${params.text}</span>
  <input type="file" name="files" style="display:none; multiple=multiple">
</div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.afterReadCallBack
  }
  connectedCallback() {
    const params = {
      text:this.dataset.text ?? "read"
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const dom = new DOMParser().parseFromString(template(params), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("div"))
    shadow.querySelector("div").onclick = this.clickHandler.bind(this)
  }
  set onread(func){
    this.afterReadCallBack = func
  }
  async clickHandler(e){
    e.stopPropagation()
    const readElem     = this.shadow.querySelector("div")
    const readFileElem = this.shadow.querySelector("input")
    
    const files = await importFiles(readFileElem)
   
    if(typeof this.afterReadCallBack ==="function"){
      this.afterReadCallBack(files)
    }
  }
}

customElements.define(TAG_NAME, CustomElem)
