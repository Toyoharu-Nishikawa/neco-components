export const TAG_NAME = "neco-popup"


const HEADER_HEIGHT = 30
const createHTML = (params) => `
<style>
.neco-popup-parent{
  top:0;
  left:0;
  width:0;
  height:0;
}
.neco-popup-child{
  position:absolute;
  display:flex;
  flex-flow: column;
  box-shadow: 0 0 16px gray;
  border-radius: 6px;


}
.neco-popup-header {
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  width: 100%;
  color: black;
  cursor: move;

  background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));
  background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
  background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);
  background: linear-gradient(top, #ebebeb, #d5d5d5);
 
  border-bottom: 1px solid #a9a9a9;

  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
}

.neco-popup-header span{
  padding: 0 16px;
  user-select: none;
}

.neco-popup-main {
  background: white;
  width:auto;
  flex:1;
  padding: 8px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
/*  display:contents;*/
}
.neco-popup-hide-button{
  position:absolute;
  right: 6px;
  top: 2px;
}
.neco-popup-cross {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 1px;
  background: #808080;
  transform: rotate(45deg);
  vertical-align: middle;
}

.neco-popup-cross::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #808080;
  transform: rotate(90deg);
}

.neco-popup-hide-button:hover .neco-popup-cross,
.neco-popup-hide-button:hover .neco-popup-cross::before
{
  background: red;
}

.neco-popup-invisible {
  visibility: hidden;
}

</style>
<div class="neco-popup-parent">
  <div class="neco-popup-child" style="top:${params.top};left:${params.left};width:${params.width};height:${params.height};">
    <div class="neco-popup-header"><span>${params.title}</span></div>
    <div class="neco-popup-main"></div>
    <div class="neco-popup-hide-button"><span class="neco-popup-cross"></span></div>
  </div>
</div>
`
//

let Z_INDEX = 9999
export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
      title:this.dataset.title ?? "popup",
      top: this.dataset.top ?? "100px",
      left: this.dataset.left ?? "100px",
      width: this.dataset.width ?? "500px",
      height: this.dataset.height ?? "300px",
    }
    let shadow
    const isShadow = params.isShadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElem =isShadow ? shadow : this
    const elementTarget = isShadow ? shadow.host : this



    const templateHTML = createHTML(params)
    parentElem.setHTMLUnsafe(templateHTML)

    const childElem = parentElem.querySelector("div.neco-popup-child")
    const headerElem = parentElem.querySelector("div.neco-popup-header")
    const hideBtElem = parentElem.querySelector("div.neco-popup-hide-button")
    const mainElem = parentElem.querySelector("div.neco-popup-main")
    const innerHTML = this.innerHTML
    mainElem.setHTMLUnsafe(innerHTML)

    Z_INDEX++
    childElem.style.zIndex = Z_INDEX

    this.childElem = childElem
    this.mainElem = mainElem
    this.headerElem = headerElem
    this.parentElem = parentElem

    const pointerMoveFunc = (e)=>{
      if(e.buttons){
          const childRect = childElem.getBoundingClientRect()
          const childWidth = childRect.width 
          const childHeight = childRect.height
          const shiftX = e.clientX - childRect.left
          const shiftY = e.clientY - childRect.top
          const positionLeft = e.pageX  + e.movementX - shiftX
          const positionTop  = e.pageY  + e.movementY - shiftY
          const clientHeight = document.documentElement.clientHeight
          const clientWidth  = document.documentElement.clientWidth
          const rightEnd = positionLeft + childWidth
          const bottomEnd = positionTop + childHeight

          const rangeOut = positionLeft <0 ||
                           positionTop  <0 ||
                           clientWidth < rightEnd ||
                           clientHeight < bottomEnd
          if(rangeOut){
            e.target.setPointerCapture(e.pointerId)
            return
          }
          
          childElem.style.left     = positionLeft + 'px'
          childElem.style.top      = positionTop  + 'px'
          e.target.setPointerCapture(e.pointerId)
      }
    }
    headerElem.onpointermove = pointerMoveFunc

    let mouseIsDownForW = false
    let mouseIsDownForH = false
    const Dmin = 2 
    const Dmax = 8
    const mouseDown = (e) => {
      e.stopPropagation()
      e.preventDefault()
      const offsetX = e.offsetX
      const offsetY = e.offsetY
      const mainRect = mainElem.getBoundingClientRect()
      const mainHeight = mainRect.height
      const childRect = childElem.getBoundingClientRect()
      const childWidth = childRect.width 
      const dx = childWidth - offsetX
      const dy = mainHeight - offsetY
      const dw = Dmin < dx && dx < Dmax 
      const dh = Dmin < dy && dy < Dmax
 
      if(dw){
        mouseIsDownForW = true
      }
      else if(dh){
        mouseIsDownForH = true
      }
    }
    const mouseUp = (e) => {
      mouseIsDownForW = false
      mouseIsDownForH = false
      mainElem.style.cursor = ""
    }
    const mouseMove = (e) => {
      e.stopPropagation()
      e.preventDefault()
      const offsetX = e.offsetX
      const offsetY = e.offsetY
      const mainRect = mainElem.getBoundingClientRect()
      const mainHeight = mainRect.height
      const childRect = childElem.getBoundingClientRect()
      const childWidth = childRect.width 
      const childHeight = childRect.height
      const dx = childWidth - offsetX
      const dy = mainHeight - offsetY
      const dw = Dmin < dx && dx < Dmax 
      const dh = Dmin < dy && dy < Dmax
      if(dw){
        mainElem.style.cursor = "ew-resize"
      }
      else if(dh){
        mainElem.style.cursor = "ns-resize"
      }
      else{
        e.currentTarget.style.cursor = ""
      }

      if(mouseIsDownForW){
        const clientX = e.clientX
        const clientWidth  = document.documentElement.clientWidth
        const rangeOut = clientWidth < clientX
        if(rangeOut){
          e.target.setPointerCapture(e.pointerId)
          return
        }
        const width = childWidth + e.movementX  
        childElem.style.width=width+"px"
      }
      if(mouseIsDownForH){
        const clientY = e.clientY
        const clientHeight = document.documentElement.clientHeight
        const rangeOut = clientHeight < clientY
        if(rangeOut){
          e.target.setPointerCapture(e.pointerId)
          return
        }

        const height = childHeight + e.movementY 
        const mainHeight = height - HEADER_HEIGHT 
        childElem.style.height=height+"px"
        mainElem.style.height=mainHeight+"px"
      }
      e.target.setPointerCapture(e.pointerId)
    }

    const moveToFront = (e) =>{
      const elem = e.target
      ++Z_INDEX
      childElem.style.zIndex = Z_INDEX
    }

    mainElem.addEventListener("pointermove", mouseMove)
    mainElem.addEventListener("mousedown", mouseDown)
    document.addEventListener("mouseup", mouseUp)

    hideBtElem.onclick = this.hide.bind(this)
    childElem.onmousedown = moveToFront
    mainElem.addEventListener("mousedown", moveToFront)

    this.hide()
    this.setQuerySelector()
  }
  resize(width, height){
     const mainHeight = height - HEADER_HEIGHT
    this.childElem.style.width=width+"px"
    this.childElem.style.height=height+"px"
    this.mainElem.style.height=mainHeight+"px"
  }
  hide(){
    this.childElem.classList.add("neco-popup-invisible")
  }
  show(){
    ++Z_INDEX
    this.childElem.style.zIndex = Z_INDEX
    this.childElem.classList.remove("neco-popup-invisible")
  }
  setQuerySelector(query){
    this.querySelector = (query) => this.parentElem.querySelector(query)
  }

}

customElements.define(TAG_NAME, CustomElem)
