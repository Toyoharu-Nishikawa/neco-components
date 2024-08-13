export class CustomElem extends HTMLElement {
  constructor() {
    super()

    const internals = this.attachInternals()

    // check for a Declarative Shadow Root:
    let shadow = internals.shadowRoot
    if (!shadow) {
      // there wasn't one. create a new Shadow Root:
      shadow = this.attachShadow({
        mode: 'open'
      })
      console.log("!!!!!!SHADOW DOM ERROR !!!!!!!!")
    }

    // in either case, wire up our event listener:
    const main = shadow.querySelector("main")
    const searchbar = main.shadowRoot.querySelector("neco-search-bar")
    console.log("searchbar")
    searchbar.onenter = (text) =>{
      console.log("text",text)
    }
  }
}
customElements.define('my-architecture', CustomElem)

