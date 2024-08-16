import {importFiles} from "../../filereader/index.js"

const tagName = "neco-file-reader-button"
const template = (params) => `
<style>
:host{
  height: 100%;
  width: 100%;
}
div {
    /*
  color: #3e5358;
  border-radius: 1px;
  border: 1px solid #1495b5;
  border-radius: 6px 6px 6px 6px;
  margin: 10px 20px 10px 50px;
  width: 100px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
*/
  height: 100%;
  width: 100%;
  border: 1px solid #a9a9a9;
  border-radius: 6px 6px 6px 6px;
  
  display: flex;
  justify-content: center;
  align-items: center;
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.25);

  background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
	color: #000;
	cursor: pointer;

}
div:hover {
    /*
  background: #1495b5;
  color: #F5FFFA;
  transition: 1.2s;
  cursor: pointer;
*/
 	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  border: 1px solid gray;
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

export const customElem = class extends HTMLElement {
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

customElements.define(tagName, customElem)
