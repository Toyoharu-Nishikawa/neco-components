export const TAG_NAME = "neco-template"

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const templateElem = this.querySelector("template")
    const clone = templateElem.content.cloneNode(true);
    shadow.appendChild(clone)


    this.setQuerySelector()
  }
  setQuerySelector(){
    this.querySelector = (query) => this.shadow.querySelector(query)
  }
}
customElements.define(TAG_NAME, CustomElem)
