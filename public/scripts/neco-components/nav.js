const tagName = "neco-nav"
const template = (params) => `
<style>

@charset "UTF-8";

/**
 * reset
 */
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary, time, mark, audio, video, main {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
	font-weight: normal;
	font-style: normal;
	vertical-align: baseline;
	background: transparent;
}

article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, main {
	display: block;
	margin: 0;
}

body {
	color: #000;
	font: 15px/1.7 "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", sans-serif;
	background-color: #f5f5f5;
	text-align: left;
}

ol, ul {
	list-style: none;
}

a {
  text-decoration: none;
}


/**
 * base
 */
:host {
	width: 100%;
	height: 100%;
	text-align: center;
	font-size: 13px;
	/*background: #BED6E6;*/
}

.contents {
	width: 100%;
	height: 100%;
}

.contents__inner {
	box-sizing: border-box;
	width: 100%;
	margin: 0 auto;
	padding: 50px 24px;
	color: #fff;
}

.contents__inner h1 {
	margin-bottom: 30px;
	font-size: 20px;
	font-weight: bold;
}




/**
 * menu
 */
.menu {
	position: relative;
	width: 100%;
	height: 100%;
	max-width: 1000px;
	margin: 0 auto;
}

.menu > li {
	float: left;
	width: 25%;
	height: 50px;
	line-height: 50px;
	background: rgb(29, 33, 19);
}

.menu > li a {
	display: block;
	color: #fff;
}

.menu > li a:hover {
	color: #999;
}

.menu__none:hover,
.menu__multi:hover,
.menu__mega:hover,
.menu__single:hover {
  background: #072A24;
  -webkit-transition: .2s ease;
  transition: .2s ease;
}

.menu__second-level li {
  border-top: 1px solid #111;
}

.menu__third-level li {
  border-top: 1px solid #111;
}

.menu__second-level li a:hover {
  background: #111;
}

.menu__third-level li a:hover {
  background: #2a1f1f;
}

.menu__fourth-level li a:hover {
  background: #1d0f0f;
}

.init-bottom:after {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 0 0 15px;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.menu:before,
.menu:after {
  content: "";
  display: table;
}

.menu:after {
  clear: both;
}

.menu {
  *zoom: 1;
}


/**
 * single menu
 */
.menu > .menu__single {
  position: relative;
}

.menu__single .menu__second-level {
  position: absolute;
  top: 40px;
  width: 100%;
  background: #072A24;
  -webkit-transition: .2s ease;
  transition: .2s ease;
  visibility: hidden;
  opacity: 0;
}

.menu__single:hover > .menu__second-level {
  top: 50px;
  visibility: visible;
  opacity: 1;
}


/**
 * multi menu
 */
.menu > .menu__multi {
  position: relative;
}

.menu__multi .menu__second-level {
  position: absolute;
  top: 40px;
  width: 100%;
  background: #072A24;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  visibility: hidden;
  opacity: 0;
  z-index: 1;
}

.menu__multi:hover .menu__second-level {
  top: 50px;
  visibility: visible;
  opacity: 1;
}

.menu__multi .menu__second-level li {
  position: relative;
}

.menu__multi .menu__second-level li:hover {
  background: #111;
}

.menu__multi .menu__second-level li .menu__third-level {
  position: absolute;
  top: -1px;
  left: 100%;
  width: 100%;
  background: #111;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  visibility: hidden;
  opacity: 0;
}

.menu__multi .menu__second-level li:hover .menu__third-level {
  visibility: visible;
  opacity: 1;
}

.menu__multi .menu__second-level li .menu__third-level li {
  position: relative;
}

.menu__multi .menu__second-level li .menu__third-level li:hover {
  background: #2a1f1f;
}

.menu__multi .menu__second-level li .menu__third-level li .menu__fourth-level {
  position: absolute;
  top: -1px;
  left: 100%;
  width: 100%;
  background: #2a1f1f;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  visibility: hidden;
  opacity: 0;
}

.menu__multi .menu__second-level li .menu__third-level li:hover .menu__fourth-level {
  visibility: visible;
  opacity: 1;
}

.init-right:after {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 0 0 15px;
  border-right: 1px solid #fff;
  border-top: 1px solid #fff;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}


/**
 * mega menu
 */
.menu__mega .menu__second-level {
  position: absolute;
  top: 40px;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 2%;
  background: #072A24;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  visibility: hidden;
  opacity: 0;
  z-index: 1;
}

.menu__mega:hover .menu__second-level {
  top: 50px;
  visibility: visible;
  opacity: 1;
}

.menu__mega .menu__second-level > li {
  float: left;
  width: 32%;
  border: none;
}

.menu__mega .menu__second-level > li:nth-child(3n+2) {
  margin: 0 1%;
}


</style>
`

export const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
  }
  connectedCallback() {
    const params = {
      isShadow:  this.dataset?.isShadow ? (this.dataset.isShadow.toLowerCase()==="false" ? false:true): true ,
    }

    let shadow
    const isShadow = params.isShadow
    this.isShadow = isShadow
    if(isShadow){
      shadow = this.attachShadow({mode: 'open'});
      this.shadow=shadow
    }
    const parentElem = isShadow ? shadow : this
    const elementTarget = isShadow ? shadow.host : this

    const templateElem = this.querySelector("template")
    const clone = templateElem.content.cloneNode(true);

    const dom = new DOMParser().parseFromString(template(params), "text/html")
    parentElem.appendChild(dom.head.querySelector("style"))

    parentElem.appendChild(clone)
    this.parentElem = parentElem
    this.setQuerySelector()
  }
  setQuerySelector(){
    this.querySelector = (query) => this.parentElem.querySelector(query)
    this.querySelectorAll = (query) => this.parentElem.querySelectorAll(query)
  }
}

customElements.define(tagName, customElem)
