import '../plotly.js-dist-min/plotly.min.js'

const tagName = "neco-plotly"

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.plotly
  }
  async connectedCallback() {
    const data = []
    const layout = {
      autosize: true,
      title: '',
      xaxis: {
        autorange: true,
        type: 'linear'
      },
      yaxis: {
        autorange: true,
        type: 'linear'
      }
    }
    const plotly =  await Plotly.newPlot(this,data,layout,{
      editable: true,
      scrollZoom: true,
      showLink: false,
      displaylogo: false,
      modeBarButtonsToRemove: ['sendDataToCloud']
    })
    this.plotly=plotly
  }
  react(data, layout){
    Plotly.react(this, data,layout)
  }
  relayout(layout){
    Plotly.relayout(this, layout)
  }

}

export default customElements.define(tagName, customElem)
