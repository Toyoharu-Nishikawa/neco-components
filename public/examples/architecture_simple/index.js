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

    const data = this.getIniData() 
    this.setData(data)
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
  initializeGraph(){
    const plotlyElem = this.graphElem
    const traces = []
    const layout = {
      title: 'sample graph',
      xaxis: {
        autorange: true,
        title: 'x [-]',
        type: 'linear'
      },
      yaxis: {
        autorange: true,
        title: 'y [-]',
        type: 'linear'
      }
    }
    plotlyElem.react(traces, layout)
  }
  setDataToGraph(data){
    const graphElem = this.graphElem
    const trace1 = {
      x: data.map(v=>v[0]),
      y: data.map(v=>v[1]),
      marker: {size: 8},
      mode: 'lines+markers',
      type: 'scatter',
    }
    const traces = [trace1]
    const pData = graphElem.getData()
    if(pData.length>0) {
      graphElem.deleteTraces([0])
    }
    graphElem.addTraces(traces)
  }

  initializeSheet(data){
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
    this.sheetElem.setContents(contents)
  }
  setDataToSheet(data){
    this.sheetElem.setData(data)
  }
  getDataFromSheet(data){
    return this.sheetElem.getData()
  }
  bindData(){
    const data = this.getDataFromSheet()
    this.setDataToGraph(data)
  }
  getIniData(){
    return structuredClone(INITIAL_DATA)
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
}

customElements.define(TAG_NAME, CustomElem)
