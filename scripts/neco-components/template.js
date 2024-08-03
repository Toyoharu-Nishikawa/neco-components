const tagName = "neco-template"

export const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.isConnected

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
    this.parentElem = parentElement

    const templateElem = this.querySelector("template")
    const clone = templateElem.content.cloneNode(true);
    parentElement.appendChild(clone)


    this.setQuerySelector()
  }
  setQuerySelector(){
    this.querySelector = (query) => this.parentElem.querySelector(query)
  }
}
customElements.define(tagName, customElem)
