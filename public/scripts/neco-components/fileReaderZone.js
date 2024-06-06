const tagName = "neco-file-reader-zone"
const template = (params) => `
<style>
div {
  border: 5px solid blue;
  width: 200px;
  height: 100px;
}
</style>
<div>
  <p>Drag one or more files to this <i>drop zone</i>.</p>
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
    shadow.querySelector("div").ondrop = this.dropHandler
    shadow.querySelector("div").ondragover = this.dragHandler
    this.shadow=shadow
  }
  dragHandler(ev) {
    ev.preventDefault();
  }
  dropHandler = (ev)=> {
    console.log("File(s) dropped");
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
        }
      })
    }
    else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      })
    }
  }
}

customElements.define(tagName, customElem)
