export const TAG_NAME = "neco-icon-button"

const createHTML = (params) => `
<style>
:host{
  height: 100%;
  width: 100%;
  --color: ${params.color};
  --background: ${params.background};
  --border: ${params.border};
}

div.whole{
  position: relative;
  display:flex;
  justify-content: left;
  align-items: center;
  box-sizing: border-box;
  padding: 0 5%;
  gap: 5%;

  width: 100%;
  height: 100%;

  border-radius: 5%;
 
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.25);

	cursor: pointer;

  border:var(--border);
  background: var(--background);
	color: var(--color);
 
}
div.whole:hover{
  cursor: pointer;
}
div.whole::before { /* ボタンと同じサイズの白い半透明の疑似要素beforeを作成し、非表示にしておく */
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

div.whole:hover:before { /* マウスホバー時に先程作成したbeforeを表示させる */
    display: block;
}

div.iconArea{
  position: relative;
  height: 90%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center
}
div.icon{
  width: 100%;
  height: 100%;
  background-image: url(${params.href});
  background-repeat: no-repeat;
  background-size: 100%;
}

</style>
<div class="whole">
    <div class="iconArea">
      <div class="icon">
      </div>
    </div>
    <div><span>${params.text}</span></div>
</div>
`

export const CustomElem = class extends HTMLElement {
  constructor(){
    super()
  }
  connectedCallback() {
    const params = {
      baseURL:this.dataset.baseUrl ?? "./",
      text:this.dataset.text ?? "click",
      href:this.dataset.href,
      border: this.dataset.border ?? "1px solid #a9a9a9",
      background: this.dataset.background ?? "white",
      color: this.dataset.color ?? "#000",
    }
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow

    const href  =  params.baseURL + "/" + params.href
    const renderingParams = {
      href,
      text:params.text,
      color: params.color,
      background: params.background,
      border: params.border,
    }

    const HTML = createHTML(renderingParams)
    shadow.setHTMLUnsafe(HTML)

    const wholeElem = shadow.querySelector("div.whole")
    wholeElem.onclick = this.clickHandler.bind(this)
  }
  set onclick(func){
    this.click = func
  }
  async clickHandler(e){
    e.stopPropagation()
    if(typeof this.click ==="function"){
      this.click(e)
    }
  }
}

customElements.define(TAG_NAME, CustomElem)
