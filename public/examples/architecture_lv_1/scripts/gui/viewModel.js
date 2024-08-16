import * as view from "./view.js"

export const INITIAL_DATA = [
  [0,0],
  [1,1],
  [2,4],
]

export const initialize = () => {
  view.sheet.initialize()
  view.graph.initialize()
  view.btn.initialize()

  const INITIAL_DATA = getIniData()
  setData(INITIAL_DATA)
}

const setData = (data) => {
  view.sheet.setData(data) 
  view.graph.setData(data) 
}
export const bindData = () => {
  const data = view.sheet.getData()
  view.graph.setData(data)
}

const getIniData = () =>{
  return structuredClone(INITIAL_DATA)
}
export const reset = () => {
  const data = getIniData()
  setData(data)
}
