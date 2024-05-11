const tagName = "neco-tabs"
const template = (params) => `
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
  display: block;
  float: left;
  text-align: center;
  font-weight: bold;
  transition: all 0.2s ease;
}
.tab_item:hover {
  cursor: pointer;
  opacity: 0.75;
}

/*ラジオボタンを全て消す*/
input[name="tab_item"] {
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

.tabs input:checked + .tab_item + .tab_content {
  visibility: visible;
}

/*選択されているタブのスタイルを変える*/
.tabs input:checked + .tab_item {
  background-color: #5ab4bd;
  color: #fff;
}
</style>
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
  }
  connectedCallback() {
    const params = {
      tabs:  this.dataset.tabs,
      pages: this.dataset.pages,
    }

    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const tabs = JSON.parse(params.tabs)
    const pages = JSON.parse(params.pages)
    const tabsElem = document.createElement("div")
    tabsElem.className = "tabs"
    const tN = tabs.length
    const pN = pages.length
    console.log("tN",tN,params.tabs)
    
    tabs.forEach((v,i)=>{
      const inputElem = document.createElement("input")
      inputElem.type="radio"
      inputElem.name="tab_item"
      if(i==0){
        inputElem.checked=true
      }
      const id = "tab_" + String(i)
      inputElem.id = id
      const labelElem = document.createElement("label")
      labelElem.className="tab_item"
      labelElem.htmlFor = id
      labelElem.textContent = v
      tabsElem.appendChild(inputElem)
      tabsElem.appendChild(labelElem)
      inputElem.onchange=()=>{
      }
      const divElem = document.createElement("div")
      divElem.className = "tab_content"
      divElem.id = "page_"+String(i)
      const d = new DOMParser().parseFromString(pages[i], "text/html")
      const nodes = [...d.body.childNodes]
      nodes.forEach(node=>divElem.appendChild(node))
      tabsElem.appendChild(divElem)


    })
//    pages.forEach((v,i)=>{
//      const divElem = document.createElement("div")
//      divElem.className = "tab_content"
//      divElem.id = "page_"+String(i)
//      const d = new DOMParser().parseFromString(v, "text/html")
//      const nodes = [...d.body.childNodes]
//      nodes.forEach(node=>divElem.appendChild(node))
//      tabsElem.appendChild(divElem)
//    })
    const styleStringList = [...Array(tN)].map((v,i)=>`#tab_${i}:checked ~ #page_${i}`)
    const styleString = styleStringList.join(",")+"{display:block;}"

    const styleParams = {styleString,tN}
    const dom = new DOMParser().parseFromString(template(styleParams), "text/html")
    //this.appendChild(dom.head.querySelector("style"))
    //this.appendChild(tabsElem)

    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(tabsElem)
  }
}

export default customElements.define(tagName, customElem)
