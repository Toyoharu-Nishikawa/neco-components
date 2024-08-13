/*---------*/
const url = import.meta.url
const path = url.split("/").slice(0,-1).join("/")
const htmlURL = path +  "/index.html"
const html = await fetch(htmlURL) 
/*----------*/

const TAG_NAME = 'my-scatter'

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
    const INITIAL_DATA = this.getIniData() 
    const internals = this.attachInternals()

    // check for a Declarative Shadow Root:
    let shadow = internals.shadowRoot
    if (!shadow) {
      console.log("there wasn't one. create a new Shadow Root:")
      shadow = this.attachShadow({
        mode: 'open'
      })
     shadow.setHTMLUnsafe(html) 
    }

    this.shadow = shadow

    this.jspElem    = this.shadow.querySelector("neco-jspreadsheet")
    this.plotlyElem = this.shadow.querySelector("neco-plotly")
    this.btn        = this.shadow.querySelector("neco-button")

    this.initialize()
    this.setData(INITIAL_DATA)

    this.jspElem.jsp.onafterchanges = this.bindData.bind(this)
    this.btn.onclick                = this.reset.bind(this)
  }
  initializePlot(){
    const plotlyElem = this.plotlyElem
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
  plot(data){
    const plotlyElem = this.plotlyElem
    const trace1 = {
      x: data.map(v=>v[0]),
      y: data.map(v=>v[1]),
      marker: {size: 8},
      mode: 'lines+markers',
      type: 'scatter',
    }
    const traces = [trace1]
    const pData = plotlyElem.getData()
    if(pData.length>0) {
      plotlyElem.deleteTraces([0])
    }
    plotlyElem.addTraces(traces)
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
    this.jspElem.setContents(contents)
  }
  setDataToSheet(data){
    this.jspElem.setData(data)
  }
  getDataFromSheet(data){
    return this.jspElem.getData()
  }
  initialize(){
    this.initializeSheet()
    this.initializePlot()
  }
  setData(data){
    this.setDataToSheet(data)
    this.plot(data)
  }
  bindData(){
    const data = this.getDataFromSheet()
    this.plot(data)
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
