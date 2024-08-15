import {reset} from "../viewModel.js"

const elements = {
  btn: document.querySelector("neco-button")
}

export const initialize = () => {
  elements.btn.onclick = reset 
}
