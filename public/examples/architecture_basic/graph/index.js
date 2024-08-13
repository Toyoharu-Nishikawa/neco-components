import "neco-components/plotly.js"

export const TAG_NAME = 'my-graph'

const HTML_TEXT = `
<style>
  neco-plotly{
    width : 440px;
    height: 290px;
  }
</style>

<neco-plotly></neco-plotly>
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
    this.plotlyElem = this.shadow.querySelector("neco-plotly")

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
  initialize(){
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
  setData(data){
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
