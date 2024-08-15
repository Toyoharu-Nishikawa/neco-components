import "neco-components/plotly.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 


const createHTML = ()=>`
<style>
  neco-plotly{
    width : 440px;
    height: 290px;
  }
</style>

<neco-plotly></neco-plotly>
`

const INITIAL_DATA = [
  ["Lion"    , 3, 2],
  ["Elephant", 1, 2],
  ["Zebra"   , 5, 2],
]


export class CustomElem extends HTMLElement {
  constructor() {
    super()
    console.log("!!! constrcutor !!!", TAG_NAME)
  }
  connectedCallback() {
    console.log("!!! connected !!!", TAG_NAME)
    // check for a Declarative Shadow Root:
    const internals = this.attachInternals()
    let shadow = internals.shadowRoot
    this.isJSshadow = !shadow
    if(this.isJSshadow) {
      shadow = this.attachShadow({mode: 'open'})
      const HTML = createHTML()
      shadow.setHTMLUnsafe(HTML) 
    }
    console.log("!!! setHTML!!!", TAG_NAME)
    this.shadow = shadow

    this.plotlyElem = this.shadow.querySelector("neco-plotly")

    if(!this.isJSshadow){
      console.log("declarative template")
      this.test()
    }

  }
  test(){
    console.log("test")
    this.initialize()
    const data = this.getIniData() 
    this.setData(data)

  }
  initialize(){
    const plotlyElem = this.plotlyElem
    const traces = []
    const layout = {
      title: 'BAR graph',
      xaxis: {
        autorange: true,
        title: 'Species',
      },
      yaxis: {
        autorange: true,
        title: 'Number of Animals',
        type: 'linear'
      }
    }
    plotlyElem.react(traces, layout)
  }
  setData(data){
    const plotlyElem = this.plotlyElem
    const species = data.map(v=>v[0])
    const trace1 = {
      x: species,
      y: data.map(v=>v[1]),
      type: 'bar',
      name: "A zoo",
    }
    const trace2 = {
      x: species,
      y: data.map(v=>v[2]),
      type: 'bar',
      name: "B zoo",
    }

    const traces = [trace1,trace2]
    const pData = plotlyElem.getData()
    if(pData.length>0) {
      plotlyElem.deleteTraces([0,1])
    }
    plotlyElem.addTraces(traces)
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
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
