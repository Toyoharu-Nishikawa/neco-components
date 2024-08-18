const tagName = "neco-search-bar"
const template = (params) => `
<style>
:host{
  height: 100%;
  width: 100%;
  display:block; 
}
input  {
  background-image: url("${params.path}/images/searchicon.png");
  background-position: 10px 12px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-sizing: border-box;
}


</style>
<div>
  <input name="search" type="text" placeholder="Search ..." >
</div>
`

export const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
  }
  connectedCallback() {
    const url = import.meta.url
    const path = url.split("/").slice(0,-2).join("/")
    const params = {
      path,
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const dom = new DOMParser().parseFromString(template(params), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("input"))
    shadow.querySelector("input").onkeydown = this.enterHandler.bind(this)
  }
  set onenter(func){
    this.enter = func
  }
  enterHandler(e){
    e.stopPropagation()
    if(e.key ==="Enter"){
      const elem = this.shadow.querySelector("input")
      const text =elem.value
      if(typeof this.enter ==="function"){
        this.enter(text)
      }
    }
  }
}

customElements.define(tagName, customElem)
