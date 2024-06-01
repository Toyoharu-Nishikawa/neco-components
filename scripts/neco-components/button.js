const tagName = "neco-button"
const template = (params) => `
<style>
div {
  border: 1px solid #a9a9a9;
  border-radius: 6px 6px 6px 6px;
  
  display: flex;
  justify-content: center;
  align-items: center;
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.25);
	/*background-color: #4CAF50;*/

  background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
	color: #000;
	cursor: pointer;
}
div:hover {
 	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
	transform: translateY(-0.1875em);
}
div > span {
 margin:0;
 padding:0;
}

</style>
<div>
  <span>${params.text}</span>
</div>
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      text:this.dataset.text ?? "click"
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const dom = new DOMParser().parseFromString(template(params), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("div"))
    shadow.querySelector("div").onclick = this.clickHandler.bind(this)
  }
  set onclick(func){
    this.click = func
  }
  async clickHandler(e){
    e.stopPropagation()
    const elem     = this.shadow.querySelector("div")
    if(typeof this.click ==="function"){
      this.click(e)
    }
  }
}

export default customElements.define(tagName, customElem)
