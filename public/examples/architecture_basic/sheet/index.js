import "neco-components/jspreadsheet.js"

export const TAG_NAME = 'my-sheet'
const HTML_TEXT = `
<style>
  neco-jspreadsheet{
    width: 290px;
    height: 120px;
  }
</style>

<neco-jspreadsheet></neco-jspreadsheet>
`

export class CustomElem extends HTMLElement {
  constructor() {
    super()
    this.INITIAL_DATA = [
      [0,0],
      [1,1],
      [2,4],
    ]
  }
  connectedCallback() {
    const internals = this.attachInternals()

    // check for a Declarative Shadow Root:
    let shadow = internals.shadowRoot
    this.isJSshadow = !shadow
    if (!shadow) {
      console.log("there wasn't one. create a new Shadow Root:")
      shadow = this.attachShadow({
        mode: 'open'
      })
      shadow.setHTMLUnsafe(HTML_TEXT) 
    }

    this.shadow = shadow
    this.jspElem    = this.shadow.querySelector("neco-jspreadsheet")

    if(!this.isJSshadow){
      console.log("declarative template")
      this.test()
    }
  }
  test(){
    this.initialize()
    const INITIAL_DATA = this.getIniData() 
    this.setData(INITIAL_DATA)
  }
  initialize(data){
    const columns = [
      { title:'x' , width:100 },
      { title:'y' , width:100  },
    ]
    const tableOverflow = true 
    const contents = {
        data,
        columns,
        tableOverflow
    }
    this.jspElem.setContents(contents)
  }
  setData(data){
    this.jspElem.setData(data)
  }
  getData(data){
    return this.jspElem.getData()
  }
  getIniData(){
    const INITIAL_DATA = structuredClone(this.INITIAL_DATA)
    return INITIAL_DATA
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
  set onafterchanges(func){
    this.jspElem.jsp.onafterchanges = func
  }
}

customElements.define(TAG_NAME, CustomElem)



