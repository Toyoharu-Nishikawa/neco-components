const tagName = "neco-popup"


const HEADER_HEIGHT = 30
const template = (params) => `
<style>
div.neco-popup-parent{
  top:0;
  left:0;
  width:0;
  height:0;
}
div.neco-popup-child{
  position:absolute;
  display:flex;
  flex-flow: column;
  box-shadow: 0 0 16px gray;
  border-radius: 6px;


}
div.neco-popup-header {
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

div.neco-popup-header span{
  padding: 0 16px;
  user-select: none;
}

div.neco-popup-main {
 background: white;
 width:auto;
 flex:1;
 padding: 8px;
 border-bottom-left-radius: 6px;
 border-bottom-right-radius: 6px;
}
div.neco-popup-hide-button{
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

div.neco-popup-hide-button:hover .neco-popup-cross,
div.neco-popup-hide-button:hover .neco-popup-cross::before
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

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="true" ? true:false): false ,
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
    const parentElement =isShadow ? shadow : this
    const elementTarget = isShadow ? shadow.host : this


    const templateElem = this.querySelector("template")
    const clone = templateElem.content.cloneNode(true);

    const dom = new DOMParser().parseFromString(template(params), "text/html")
    parentElement.appendChild(dom.head.querySelector("style"))
    parentElement.appendChild(dom.body.querySelector("div"))


    const childElem = parentElement.querySelector("div.neco-popup-child")
    const headerElem = parentElement.querySelector("div.neco-popup-header")
    const hideBtElem = parentElement.querySelector("div.neco-popup-hide-button")
    const mainElem = parentElement.querySelector("div.neco-popup-main")
    mainElem.appendChild(clone)
    this.childElem = childElem
    this.mainElem = mainElem
    this.headerElem = headerElem

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

    mainElem.on = mouseMove
    mainElem.onpointermove = mouseMove
    mainElem.onmousedown = mouseDown
    document.addEventListener("mouseup", mouseUp)

    hideBtElem.onclick = this.hide.bind(this)

    this.hide()
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
    this.childElem.classList.remove("neco-popup-invisible")
  }
}

export default customElements.define(tagName, customElem)
