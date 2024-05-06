const tagName = "neco-button"
const template = (params) => `
<style>
div {
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
}
div:hover {
  background: #1495b5;
  color: #F5FFFA;
  transition: 1.2s;
  cursor: pointer;
}
div > a {
 margin:0;
 padding:0;
}

</style>
<div>
  <p>${params.text}</p>
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
