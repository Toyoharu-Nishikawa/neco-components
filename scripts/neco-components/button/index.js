export const TAG_NAME = "neco-button"

const createHTML = (params) => `
<style>
:host{
  height: 100%;
  width: 100%;
  display:block; 
  --font-size           : initial;

  --color               : black;
  --background          : -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
  --border              : 1px solid #a9a9a9;
  --border-radius       : 6px 6px 6px 6px;
  --box-shadow          : 0 0 3px 0 rgba(0, 0, 0, 0.25);
  --cursor              : pointer;

  --color-hover         : var(--color);
  --box-shadow-hover    : 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  --border-hover        : 1px solid gray;
  --border-radius-hover : var(--border-radius);
  --background-hover    : var(--background);
  --transition          : none;
}

div {
  height: 100%;
  width: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;

  font-size     : var(--font-size);
  color         : var(--color);
  background    : var(--background);
  border        : var(--border);
  border-radius : var(--border-radius);
  box-shadow    : var(--box-shadow);
  cursor        : var(--cursor);
}
div:hover {
  color         : var(--color-hover);
  background    : var(--background-hover);
  border        : var(--border-hover);
  border-radius : var(--border-radius-hover);
  box-shadow    : var(--box-shadow-hover);
  transition    : var(--transition);
}
div > span {
 user-select: none;
 margin:0;
 padding:0;
}

</style>
<div>
  <span>${params.text}</span>
</div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const params = {
      text:this.dataset.text ?? "click"
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow

    const HTML = createHTML(params)
    shadow.setHTMLUnsafe(HTML)

    shadow.querySelector("div").onclick = this.clickHandler.bind(this)
  }
  set onclick(func){
    this.click = func
  }
  async clickHandler(e){
    e.stopPropagation()
    const elem = this.shadow.querySelector("div")
    if(typeof this.click ==="function"){
      this.click(e)
    }
  }
}

customElements.define(TAG_NAME, CustomElem)
