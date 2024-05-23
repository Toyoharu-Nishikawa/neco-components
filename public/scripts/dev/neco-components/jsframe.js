import "../jsframe.js/lib/jsframe.min.js"


const url = import.meta.url
const cssMainPath = url.split("/").slice(0,-2).join("/")+"/jspreadsheet-ce/dist/jspreadsheet.css"
const cssDatatablesPath = url.split("/").slice(0,-2).join("/")+"/jspreadsheet-ce/dist/jspreadsheet.datatables.css"
const cssThemePath = url.split("/").slice(0,-2).join("/")+"/jspreadsheet-ce/dist/jspreadsheet.theme.css"
const cssJsuitesPath = url.split("/").slice(0,-2).join("/")+"/jsuites/dist/jsuites.css"
const cssPublicPath = "https://jsuites.net/docs/v4/jsuites.css"
const cssPublic2Path = "https://bossanova.uk/jspreadsheet/v4/jexcel.css"

const tagName = "neco-jsframe"

const template = (params) => `

<style>
.jsframe-titlebar-default {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));
    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);
    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);
    background: linear-gradient(top, #f5f5f5, #f8f7f2);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.jsframe-titlebar-focused {
    /* (c)2015 Johannes Jakob
       Made with <3 in Germany */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));
    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);
    background: linear-gradient(top, #ebebeb, #d5d5d5);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.jsframe-modal-window-background {
    background: rgba(0, 0, 0, 0.6);
    height: 100%;
    widdth: 100%
}
</style>
<style>
.jsframe-preset-style-yosemite-default {
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));
    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);
    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);
    background: linear-gradient(top, #f5f5f5, #f8f7f2);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.jsframe-preset-style-yosemite-focused {
    /* (c)2015 Johannes Jakob
       Made with <3 in Germany */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));
    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);
    background: linear-gradient(top, #ebebeb, #d5d5d5);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
</style>
<style>
.jsframe-preset-style-redstone-default {
    background: white;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}

.jsframe-preset-style-redstone-focused {
    background: white;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}
</style>
<style>
.jsframe-preset-style-popup-default {
    background: white;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}

.jsframe-preset-style-popup-focused {
    background: white;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}
</style>
<style>
.jsframe-preset-style-material-default {
    background: black;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.jsframe-preset-style-material-focused {
    background: black;
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
}
</style>
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.click
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
      title: this.dataset?.title ||"Window",
      left: this.dataset.left || 20,
      top: this.dataset.top || 20,
      width: this.dataset.width || 320,
      height: this.dataset.width || 220,
      html:  this.dataset.html || '<div id="my_element" style="padding:10px;font-size:12px;color:darkgray;">Contents of window</div>',
    }
    const {isShadow, title,left, top, width,height,html} = params
    let shadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
      const dom = new DOMParser().parseFromString(template(), "text/html")
      const styleNodes = dom.head.querySelectorAll("style")
      const styles = [...styleNodes]
      styles.forEach(v=>shadow.appendChild(v))
    }
    const parentElement = isShadow ? shadow : this

    const jsFrame = new JSFrame({
      parentElement,
    })
    console.log("jsFrame",jsFrame)
    const fApr = jsFrame.createFrameAppearance()
    fApr.showCloseButton = false
    fApr.titleBarHeight = '30px';
    fApr.titleBarCaptionFontSize = '14px';
    console.log("fApr",fApr)
    const partsBuilder = fApr.getPartsBuilder()
    const CROSS_MARK = '\u2573';

    const hbApr = partsBuilder.buildTextButtonAppearance();

    hbApr.width = 32;
    hbApr.height = 32;

    hbApr.borderRadius = 0;
    hbApr.borderWidth = 0;

    hbApr.borderColorDefault = '#c6c6c6';
    hbApr.borderColorFocused = '#fc615c';
    hbApr.borderColorHovered = hbApr.borderColorFocused;
    hbApr.borderColorPressed = '#e64842';

    hbApr.borderStyleDefault = 'solid';
    hbApr.borderStyleFocused = hbApr.borderStyleDefault;
    hbApr.borderStyleHovered = hbApr.borderStyleDefault;
    hbApr.borderStylePressed = hbApr.borderStyleDefault;

    //background
    hbApr.backgroundColorDefault = '';
    hbApr.backgroundColorFocused = '';
    hbApr.backgroundColorHovered = '';
    hbApr.backgroundColorPressed = '';


    //caption
    hbApr.caption = CROSS_MARK;

    hbApr.captionColorDefault = '#9b9a9b';
    hbApr.captionColorFocused = 'black';
    hbApr.captionColorHovered = 'red';
    hbApr.captionColorPressed = '#e81123';

    hbApr.captionShiftYpx = 1;
    hbApr.captionFontRatio = 0.6;

    const hideBtnEle = partsBuilder.buildTextButton(hbApr);
    const eleLeft = 0;
    const eleTop = -parseInt(fApr.titleBarHeight);
    const eleAlign = 'RIGHT_TOP';

    // 'hideButton' is a special name
    fApr.addFrameComponent('hideButton', hideBtnEle, eleLeft, eleTop, eleAlign);


    const frame = jsFrame.createFrame(left, top, width, height,fApr)
    console.log(frame)
    frame.setTitle(title)
    frame.setHTML(html)
    const frameElem = frame.getFrameView()
    frameElem.style.fontSize= "12pt"
    frameElem.style.padding="10px"
    frameElem.style.boxSizing= "border-box"

    frame.on('hideButton', 'click', (_frame, evt) => {
        console.log("!!HIDE!!")
        _frame.hide()
    });
    this.frame = frame
 //   frame.show()
  }
  show(){
    this.frame.show()
  }
  hide(){
    this.frame.hide()
  }
}

export default customElements.define(tagName, customElem)
