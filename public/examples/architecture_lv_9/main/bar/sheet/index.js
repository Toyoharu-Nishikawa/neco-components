import "neco-components/jspreadsheet/index.js"

const tag = import.meta.url.split("/")?.slice(3,-1)?.join("-") ?? "origin"
export const TAG_NAME = "my-" + tag 

const createHTML = (params)=>`
<style>
  neco-jspreadsheet{
    width: 290px;
    height: 120px;
  }
</style>

<neco-jspreadsheet></neco-jspreadsheet>
`
const INITIAL_DATA = [
  ["Lion"    , 3, 2],
  ["Elephant", 1, 2],
  ["Zebra"   , 5, 2],
]

export class CustomElem extends HTMLElement {
  constructor() {
    super()
    console.log("!!! constructor !!!",TAG_NAME)
  }
  connectedCallback() {
    console.log("!!! connected !!!", TAG_NAME)

    // check for a Declarative Shadow Root:
    const internals = this.attachInternals()
    let shadow = internals.shadowRoot
    this.isJSshadow = !shadow
    if (!shadow) {
      shadow = this.attachShadow({mode: 'open'})
      const HTML = createHTML()
      shadow.setHTMLUnsafe(HTML) 
    }
    console.log("!!! setHTML!!!", TAG_NAME)
    this.shadow = shadow


    this.jspElem = this.shadow.querySelector("neco-jspreadsheet")

    if(!this.isJSshadow){
      console.log("declarative template")
      this.test()
    }

  }
  test(){
    this.initialize()
    const data = this.getIniData() 
    this.setData(data)
  }
  initialize(data){
    const columns = [
      { title:'Species', width:100 },
      { title:'A zoo'  , width: 60 },
      { title:'B zoo'  , width: 60  },
    ]
    const tableOverflow = true 
    const contents = {
        data,
        columns,
        defaultColumnWidth: 100,
        tableOverflow,
        allowInsertRow: false,
        allowDeleteRow: false,
    }
    this.jspElem.setContents(contents)
  }
  setData(data){
    this.jspElem.setData(data)
  }
  getData(data){
    return this.jspElem.getData()
  }
  getIniData(){
    return structuredClone(INITIAL_DATA)
  }
  reset(){
    const data = this.getIniData()
    this.setData(data)
  }
  set onafterchanges(func){
    this.jspElem.jsp.onafterchanges = func
  }
}

customElements.define(TAG_NAME, CustomElem)
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
