const tagName = "neco-pagenation"
const template = (params) => `
<style>

div {
  display:inline-block;
}

div > a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}

div > a.active {
  background-color: #4CAF50;
  color: white;
}

div> a:hover:not(.active) {
  background-color: #ddd;
}

div.pageNotFound {
  font-size: 40px;
  color: #CCCCCC;
}


</style>

<div>
</div>
`

export const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      totalPages       :  this.dataset.totalPages      ?? 10,
      pagenationIcons  :  this.dataset.pagenationIcons ?? 5,
      currentPage      :  this.dataset.currentPage     ?? 1,
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const dom = new DOMParser().parseFromString(template(params), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("div"))
    const elem = shadow.querySelector("div")
    this.elem = elem

    const totalPages      = parseInt(params.totalPages)
    const pagenationIcons = parseInt(params.pagenationIcons)
    const currentPage     = parseInt(params.currentPage)
    this.totalPages       = totalPages 
    this.pagenationIcons  = pagenationIcons
    this.currentPage      = currentPage
    this.makePagenation(currentPage, pagenationIcons, totalPages)
  }
  makePagenation(page, numberOfPagination, totalPages){
    const paginationElem = this.elem
    const half = (numberOfPagination/2)|0
    const previousFlag = page>1
    const nextFlag = page < totalPages
    const pagePreList = [...Array(numberOfPagination)].map((v,i)=>page+i-half)
    const pageList = pagePreList.filter(v=>v>0&&v<=totalPages)
    const index = pageList.indexOf(page)
    if(index<0){
      paginationElem.innerHTML="page is not found"
      paginationElem.className = "pageNotFound"
      return
    }
    const fragment = document.createDocumentFragment()
    const elements = pageList.map((v,i)=>{
      const elem = document.createElement("a")
      elem.textContent = v
      const clickEvent = this.makeClickEvent(v)
      elem.onclick=clickEvent
      
      if(i===index){
        elem.className = "active"
      }
      return elem
    })
    if(previousFlag){
      const elem = document.createElement("a")
      elem.innerHTML = "&laquo;"
      elements.unshift(elem)

      const clickEvent = this.makeClickEvent(page-1)
      elem.onclick=clickEvent
    }
    if(nextFlag){
      const elem = document.createElement("a")
      elem.innerHTML = "&raquo;"
      elements.push(elem)

      const clickEvent = this.makeClickEvent(page+1)
      elem.onclick=clickEvent
    }
    elements.forEach(v=>{
      fragment.appendChild(v)
    })
    paginationElem.innerHTML=""
    paginationElem.appendChild(fragment)
  }
  makeClickEvent(targetPage){
    return () => {
      const pagenationIcons=this.pagenationIcons
      const totalPages = this.totalPages
      this.setGETparam(targetPage)      
      this.makePagenation(targetPage, pagenationIcons, totalPages)
      if(typeof this.callbackFunc ==="function"){
          this.callbackFunc(targetPage, pagenationIcons, totalPages)
       }
    }
  }
  setGETparam(currentPage){
    const url = new URL(window.location.href)
   	url.searchParams.set('currentPage',currentPage)
    const title = "page." + currentPage
    history.pushState( null, title, url)
  }
  set callback(callbackFunction){
    this.callbackFunc=callbackFunction
  }
}

customElements.define(tagName, customElem)
