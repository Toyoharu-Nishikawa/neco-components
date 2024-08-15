const elements = {
  graphElem: document.querySelector("neco-plotly")
}

export const initialize = () => {
  const plotlyElem = elements.graphElem
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

export const setData = (data) => {
  const graphElem = elements.graphElem
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

