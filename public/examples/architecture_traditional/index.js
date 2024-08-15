import "neco-components/button.js"
import "neco-components/jspreadsheet.js"
import "neco-components/plotly.js"
 
const TAG_NAME = 'my-scatter'

const INITIAL_DATA = [
  [0,0],
  [1,1],
  [2,4],
]
export class CustomElem extends HTMLElement {
  constructor() {
    super()

  }
  connectedCallback() {
    const INITIAL_DATA = this.getIniData() 
    const internals = this.attachInternals()

    // check for a Declarative Shadow Root:
    let shadow = internals.shadowRoot
    if (!shadow) {
      console.log("there wasn't one. create a new Shadow Root:")
      throw new Error("You cannot access from other than declarative shadow dom")
    }

    this.shadow = shadow

    this.sheetElem = this.shadow.querySelector("neco-jspreadsheet")
    this.graphElem = this.shadow.querySelector("neco-plotly")
    this.btn       = this.shadow.querySelector("neco-button")

    this.initialize()
    this.setData(INITIAL_DATA)

  }
  initialize(){
    this.initializeSheet()
    this.initializeGraph()
    this.sheetElem.jsp.onafterchanges = this.bindData.bind(this)
    this.btn.onclick                  = this.reset.bind(this)
  }
  setData(data){
    this.setDataToSheet(data)
    this.setDataToGraph(data)
  }



  bindData(){
    const data = this.getDataFromSheet()
    this.setDataToGraph(data)
  }
  getIniData(){
    return structuredClone(this.INITIAL_DATA)
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
}

customElements.define(TAG_NAME, CustomElem)
