export const TAG_NAME = "neco-header"
const createHTML = (params) => `
<style>
:host{
  100%;
}
header {
  display: flex;
  align-items: center;
	color: ${params.color};
	background: ${params.background};
  height: 100%;
  padding: 0 0 0 1em;
}
header h1{
  margin: 0;
  padding: 0;
}
</style>
<header>
  <h1>${params.title}</h1>
</header>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      title:this.dataset.title ?? "sample",
      color:this.dataset.color ?? "#3e5358",
      background:this.dataset.background ?? "initial",
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    //const dom = new DOMParser().parseFromString(template(params), "text/html")
    //shadow.appendChild(dom.head.querySelector("style"))
    //shadow.appendChild(dom.body.querySelector("header"))
    const HTML = createHTML(params)
    shadow.setHTMLUnsafe(HTML)
  }
}
customElements.define(TAG_NAME, CustomElem)
