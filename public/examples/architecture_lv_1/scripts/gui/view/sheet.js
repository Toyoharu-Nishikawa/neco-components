import {bindData} from "../viewModel.js"
const elements = {
  sheetElem: document.querySelector("neco-jspreadsheet")
}

export const initialize = (data) => {
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
  elements.sheetElem.setContents(contents)
  elements.sheetElem.jsp.onafterchanges = bindData
}

export const setData = (data) => {
  elements.sheetElem.setData(data)
}

export const getData = (data) => {
    return this.sheetElem.getData()
}
