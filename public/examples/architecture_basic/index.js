import "neco-components/button.js"
import "./sheet/index.js"
import "./graph/index.js"

export const TAG_NAME = 'my-scatter'
const HTML_TEXT = `
<style>
  :host{
    display: grid;
    grid-template-rows: 30px 290px 30px 120px 30px;
    grid-template-columns: 30px 290px 30px 120px 30px;
    border: 1px solid black;
    border-radius: 30px;
    box-sizing: border-box; 
  }
  my-graph{
    grid-row: 2/3; 
    grid-column: 2/5; 
  }
  my-sheet{
    grid-row: 4/5; 
    grid-column: 2/3; 
  }
  neco-button{
    grid-row: 4/5; 
    grid-column: 4/5; 
  }
</style>

<my-graph></my-graph>
<my-sheet></my-sheet>
<neco-button data-text=reset></neco-button>
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
    if (!shadow) {
      shadow = this.attachShadow({mode: 'open'})
      shadow.setHTMLUnsafe(HTML_TEXT) 
    }

    this.shadow = shadow

    this.sheetElem  = this.shadow.querySelector("my-sheet")
    this.graphElem  = this.shadow.querySelector("my-graph")
    this.btn        = this.shadow.querySelector("neco-button")
 
    this.initialize()

    const data = this.getIniData() 
    this.setData(data)
  }
  test(){
  }
  initialize(){
    this.sheetElem.initialize()
    this.graphElem.initialize()
    this.sheetElem.onafterchanges = this.bindData.bind(this)
    this.btn.onclick              = this.reset.bind(this)
  }
  setData(data){
    this.sheetElem.setData(data)
    this.graphElem.setData(data)
  }
  bindData(){
    const data = this.sheetElem.getData()
    this.graphElem.setData(data)
  }
  getIniData(){
    const INITIAL_DATA = structuredClone(this.INITIAL_DATA)
    return INITIAL_DATA
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
}

customElements.define(TAG_NAME, CustomElem)
