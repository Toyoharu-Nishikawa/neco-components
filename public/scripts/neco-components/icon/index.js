export const TAG_NAME = "neco-icon"
const baseURL = import.meta.url.split("/").slice(0,-1).join("/")

const createHTMLForSimple = (params) => `
<style>
div{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${params.href});
  background-size: 100%;
}
div:hover{
  cursor: pointer;
  /*background-image: none;*/
}
div::before { /* ボタンと同じサイズの白い半透明の疑似要素beforeを作成し、非表示にしておく */
  background-image: url(${params.href});
  background-size: 100%;
  display: none;
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius:10%;
  background-color:rgba(222,222,222,0.2);
}

div:hover:before { /* マウスホバー時に先程作成したbeforeを表示させる */
    display: block;
}
</style>
<div>
</div>
`
const createHTMLForHover = (params) => `
<style>
div{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${params.href});
  background-size: 100%;
}
div:hover{
  cursor: pointer;
  background-image: url(${params.hover});
  background-size: 100%;
}
</style>
<div>
</div>
`


export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      baseURL:this.dataset.baseUrl ?? "./",
      href:this.dataset.href,
      hover:this.dataset.hrefHover,
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow

    const href  =  params.baseURL + "/" + params.href
    const hover =  params.baseURL + "/" + params.hover

    const renderingParams = {href, hover}
    const HTML = params.hover ? createHTMLForHover(renderingParams):
                                createHTMLForSimple(renderingParams)
    shadow.setHTMLUnsafe(HTML)
    const divElem = shadow.querySelector("div")
    divElem.onclick = this.clickCallbackFunc.bind(this)
  }
  set onclick(func){
    this.clickCallback = func
  }
  clickCallbackFunc(){
    if(typeof this.clickCallback === "function"){
      this.clickCallback(this)
    }
  }
}
customElements.define(TAG_NAME, CustomElem)
