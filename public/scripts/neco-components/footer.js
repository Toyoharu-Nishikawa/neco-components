const tagName = "neco-footer"
const template = (params) => `
<style>
:host{
  100%;
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${params.color};
  background: ${params.background};
  height: 100%;
}
footer small{
  margin: 0 0.5em;
  padding: 0;
}
</style>
<footer>
  ${params.title  ? "<small>"+params.title+ "</small>":""}
  ${params.version? "<small class=\"version\">version &nbsp"+params.version+"</small>":""}
  ${params.auther? "<small>Copyright &copy "+params.auther+"</small>":""}
  ${params.dateOfIssue? "<small>"+params.dateOfIssue+"</small>":""}
</footer>
`

export const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this._version
  }
  connectedCallback() {
    const params = {
      auther: this.dataset.auther ?? "",
      dateOfIssue: this.dataset.dateOfIssue ?? "",
      title: this.dataset.title ?? "" ,
      version: this.dataset.version ?? "" ,
      color: this.dataset.color ?? "initial",
      background: this.dataset.background ?? "initial",
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    this._version=params.version
    const dom = new DOMParser().parseFromString(template(params), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("footer"))
  }
  get version(){
    return this._version
  }
  set version(version){
    this._version = version
    const versionElem = this.shadow.querySelector("footer small.version")
    versionElem.textContent = version
  }
}
customElements.define(tagName, customElem)
