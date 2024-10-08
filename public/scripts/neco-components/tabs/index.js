export const TAG_NAME = "neco-tabs"
const createHTML = (params) => `
<style>
.tabs {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display:grid;
  grid-template-columns: repeat(${params.tN},1fr);
  grid-template-rows: 50px 1fr;

  width: 100%;
  height: 100%;
  margin: 0 auto;
}

/*タブのスタイル*/
.tab_item {
  grid-column: auto;
  grid-row: 1/2;
  border-bottom: 3px solid #5ab4bd;
  background-color: #d9d9d9;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  color: #565656;
  float: left;
  text-align: center;
  font-weight: bold;
}
.tab_item:hover {
  cursor: pointer;
  opacity: 0.75;
}

/*ラジオボタンを全て消す*/
input[name="${params.prefix}_tab_item"] {
  display: none;
}

/*タブ切り替えの中身のスタイル*/
.tab_content {
  grid-column: 1/-1;
  grid-row: 2/3;
  padding: 10px ;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}

.tab_content >*:first-child{
  height:100%;
  width:100%;
}

/*選択されているタブのコンテンツのみを表示*/

.${params.prefix} .tabs input:checked + .tab_item + .tab_content {
  visibility: unset;
}

/*選択されているタブのスタイルを変える*/
.${params.prefix} .tabs input:checked + .tab_item {
  background-color: #5ab4bd;
  color: #fff;
}
</style>
`
// アルファベットの配列を作成
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

// ランダムなインデックスを生成
const getRandomIndex = () => Math.floor(Math.random() * alphabets.length)

// ランダムなアルファベットを３文字生成して出力
const printRandomAlphabets = (N) => [...Array(N)].reduce((p,c)=>p+=alphabets[getRandomIndex()],"")


export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
      tabs:  this.dataset.tabs,
      pages: this.dataset.pages,
    }

    const prefix = printRandomAlphabets(6)
    let shadow
    const isShadow = params.isShadow
    this.isShadow = isShadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElement = isShadow ? shadow : this
    const elementTarget = isShadow ? shadow.host : this

    const tabs = this.querySelectorAll("tab")
    const pages = this.querySelectorAll("page")
    const style  = this.querySelector("style")


    const spanElem = document.createElement("span")
    spanElem.className = prefix
    const tabsElem = document.createElement("div")
    tabsElem.className = "tabs"
    const tN = tabs.length
    const pN = pages.length
    
    const pageNodes = []
    tabs.forEach((v,i)=>{
      const inputElem = document.createElement("input")
      inputElem.type="radio"
      inputElem.name=prefix+"_tab_item"
      if(i==0){
        inputElem.checked=true
      }
      const id = prefix+"_tab_" + String(i)
      inputElem.id = id
      const labelElem = document.createElement("label")
      labelElem.className="tab_item"
      labelElem.htmlFor = id
      if(typeof v === String){
        labelElem.textContent = v
      }
      else{
        labelElem.appendChild(v)
      }
      tabsElem.appendChild(inputElem)
      tabsElem.appendChild(labelElem)
      inputElem.onchange=()=>{}
      const divElem = document.createElement("div")
      divElem.className = "tab_content"
      divElem.appendChild(pages[i])
      tabsElem.appendChild(divElem)
      pageNodes.push(divElem)
    })
    spanElem.appendChild(tabsElem)
    spanElem.appendChild(style)

    const styleParams = {tN,prefix}
    const HTML = createHTML(styleParams)
    parentElement.setHTMLUnsafe(HTML)
    parentElement.appendChild(spanElem)

    this.parentElemen = parentElement
    this.pageNodes = pageNodes

  }
  get pages(){
    return this.pageNodes
  }

}

customElements.define(TAG_NAME, CustomElem)
