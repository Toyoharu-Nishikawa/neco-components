const tagName = "neco-dropzone"
const template = (params) => `
<style>
div {
  width: 100%;
  height: 100%;

  border:2px solid #CCCCCC;
  border-style:dashed;
  display:flex;
  justify-content: center;
  align-items: center;

}
div.notYet {
  background:#FFFFFF;
  font-size: 2rem;
  color:#AAAAAA;

}

div.dragOver {
  background:#FFDBC9;
}

div.drop {
  background:#DDFFFF;
}
object {
  pointer-events:none;
}
 
</style>
<div class="notYet">
  <p>Drag and Drop YOUR FILE</p>
</div>
`

export const customElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    const dom = new DOMParser().parseFromString(template(), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("div"))

    const elem = shadow.querySelector("div")
    elem.ondrop = this.dropHandler.bind(this)
    elem.ondragover = this.dragHandler.bind(this)
    this.elem = elem
    this.shadow=shadow
  }
  dragHandler(ev) {
    ev.preventDefault()
    this.elem.className = "dragOver"

  }
  dropHandler = (ev)=> {
    const elem = this.elem
    const self = this
    elem.className = "drop"

    ev.preventDefault();


    const files = ev.dataTransfer.files
    const file = files[0]
    this.file = file
    const filename = file.name
    const size = file.size
    const filetype = file.type
    const userEmail = localStorage.getItem("userEmail")
    console.log(filetype)
    const filetypeIsImage = filetype.indexOf("image/")===0?true:false

    const reader = new FileReader()
    reader.onload = (event)=>{
      elem.innerHTML = ""
      if(filetypeIsImage){
        const img = document.createElement("img")
        img.src= event.target.result
        img.style.maxWidth = "100%"
        img.style.maxHeight = "100%"
        elem.appendChild(img)
      }
      else{
        const div = document.createElement("object")
        div.data= event.target.result
        div.style.width = "100%"
        div.style.height = "100%"
        div.style.background="white"
        elem.appendChild(div)

        div.ondrop = (e)=>{
          e.preventDefault()
          e.stopPropagation()
          self.dropHandler(e)
          return false
        }
      }
    }
    reader.readAsDataURL(file)
  }
  getFile(){
    return this.file
  }
}

customElements.define(tagName, customElem)
