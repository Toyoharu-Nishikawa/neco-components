const tagName = "neco-template"
const template = (params) => `
<style>
:host{
  100%;
}
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
    }   

    const isShadow = params.isShadow
    this.isShadow = isShadow
    let shadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElement = isShadow ? shadow : this

    const templateElem = this.querySelector("template")
    const clone = templateElem.content.cloneNode(true);
    parentElement.appendChild(clone)
  }
}
export default customElements.define(tagName, customElem)
