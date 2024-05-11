import '../plotly.js-dist-min/plotly.min.js'

const tagName = "neco-plotly"
const template = (params) => `
<style>
#plotly{
height: 100%;
width: 100%;
}
.js-plotly-plot .plotly,.js-plotly-plot .plotly div {
    direction:ltr;
    font-family:'Open Sans', verdana, arial, sans-serif;
    margin:0;
    padding:0;
}
.js-plotly-plot .plotly input,.js-plotly-plot .plotly button {
    font-family:'Open Sans', verdana, arial, sans-serif;
}
.js-plotly-plot .plotly input:focus,.js-plotly-plot .plotly button:focus {
    outline:none;
}
.js-plotly-plot .plotly a {
    text-decoration:none;
}
.js-plotly-plot .plotly a:hover {
    text-decoration:none;
}
.js-plotly-plot .plotly .crisp {
    shape-rendering:crispEdges;
}
.js-plotly-plot .plotly .user-select-none {
    -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;
    user-select:none;
}
.js-plotly-plot .plotly svg {
    overflow:hidden;
}
.js-plotly-plot .plotly svg a {
    fill:#447adb;
}
.js-plotly-plot .plotly svg a:hover {
    fill:#3c6dc5;
}
.js-plotly-plot .plotly .main-svg {
    position:absolute;
    top:0;
    left:0;
    pointer-events:none;
}
.js-plotly-plot .plotly .main-svg .draglayer {
    pointer-events:all;
}
.js-plotly-plot .plotly .cursor-default {
    cursor:default;
}
.js-plotly-plot .plotly .cursor-pointer {
    cursor:pointer;
}
.js-plotly-plot .plotly .cursor-crosshair {
    cursor:crosshair;
}
.js-plotly-plot .plotly .cursor-move {
    cursor:move;
}
.js-plotly-plot .plotly .cursor-col-resize {
    cursor:col-resize;
}
.js-plotly-plot .plotly .cursor-row-resize {
    cursor:row-resize;
}
.js-plotly-plot .plotly .cursor-ns-resize {
    cursor:ns-resize;
}
.js-plotly-plot .plotly .cursor-ew-resize {
    cursor:ew-resize;
}
.js-plotly-plot .plotly .cursor-sw-resize {
    cursor:sw-resize;
}
.js-plotly-plot .plotly .cursor-s-resize {
    cursor:s-resize;
}
.js-plotly-plot .plotly .cursor-se-resize {
    cursor:se-resize;
}
.js-plotly-plot .plotly .cursor-w-resize {
    cursor:w-resize;
}
.js-plotly-plot .plotly .cursor-e-resize {
    cursor:e-resize;
}
.js-plotly-plot .plotly .cursor-nw-resize {
    cursor:nw-resize;
}
.js-plotly-plot .plotly .cursor-n-resize {
    cursor:n-resize;
}
.js-plotly-plot .plotly .cursor-ne-resize {
    cursor:ne-resize;
}
.js-plotly-plot .plotly .cursor-grab {
    cursor:-webkit-grab;
    cursor:grab;
}
.js-plotly-plot .plotly .modebar {
    position:absolute;
    top:2px;
    right:2px;
}
.js-plotly-plot .plotly .ease-bg {
    -webkit-transition:background-color 0.3s ease 0s;-moz-transition:background-color 0.3s ease 0s;-ms-transition:background-color 0.3s ease 0s;-o-transition:background-color 0.3s ease 0s;
    transition:background-color 0.3s ease 0s;
}
.js-plotly-plot .plotly .modebar--hover>:not(.watermark) {
    opacity:0;-webkit-transition:opacity 0.3s ease 0s;-moz-transition:opacity 0.3s ease 0s;-ms-transition:opacity 0.3s ease 0s;-o-transition:opacity 0.3s ease 0s;
    transition:opacity 0.3s ease 0s;
}
.js-plotly-plot .plotly:hover .modebar--hover .modebar-group {
    opacity:1;
}
.js-plotly-plot .plotly .modebar-group {
    float:left;
    display:inline-block;
    box-sizing:border-box;
    padding-left:8px;
    position:relative;
    vertical-align:middle;
    white-space:nowrap;
}
.js-plotly-plot .plotly .modebar-btn {
    position:relative;
    font-size:16px;
    padding:3px 4px;
    height:22px;
    cursor:pointer;
    line-height:normal;
    box-sizing:border-box;
}
.js-plotly-plot .plotly .modebar-btn svg {
    position:relative;
    top:2px;
}
.js-plotly-plot .plotly .modebar.vertical {
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    align-content:flex-end;
    max-height:100%;
}
.js-plotly-plot .plotly .modebar.vertical svg {
    top:-1px;
}
.js-plotly-plot .plotly .modebar.vertical .modebar-group {
    display:block;
    float:none;
    padding-left:0px;
    padding-bottom:8px;
}
.js-plotly-plot .plotly .modebar.vertical .modebar-group .modebar-btn {
    display:block;
    text-align:center;
}
.js-plotly-plot .plotly [data-title]:before,.js-plotly-plot .plotly [data-title]:after {
    position:absolute;-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);display:none;
    opacity:0;
    z-index:1001;
    pointer-events:none;
    top:110%;right:50%;
}
.js-plotly-plot .plotly [data-title]:hover:before,.js-plotly-plot .plotly [data-title]:hover:after {
    display:block;
    opacity:1;
}
.js-plotly-plot .plotly [data-title]:before {
    content:'';position:absolute;
    background:transparent;
    border:6px solid transparent;
    z-index:1002;
    margin-top:-12px;
    border-bottom-color:#69738a;
    margin-right:-6px;
}
.js-plotly-plot .plotly [data-title]:after {
    content:attr(data-title);background:#69738a;
    color:white;
    padding:8px 10px;
    font-size:12px;
    line-height:12px;
    white-space:nowrap;
    margin-right:-18px;
    border-radius:2px;
}
.js-plotly-plot .plotly .vertical [data-title]:before,.js-plotly-plot .plotly .vertical [data-title]:after {
    top:0%;right:200%;
}
.js-plotly-plot .plotly .vertical [data-title]:before {
    border:6px solid transparent;
    border-left-color:#69738a;
    margin-top:8px;
    margin-right:-30px;
}
.js-plotly-plot .plotly .select-outline {
    fill:none;
    stroke-width:1;
    shape-rendering:crispEdges;
}
.js-plotly-plot .plotly .select-outline-1 {
    stroke:white;
}
.js-plotly-plot .plotly .select-outline-2 {
    stroke:black;
    stroke-dasharray:2px 2px;
}
.plotly-notifier {
    font-family:'Open Sans', verdana, arial, sans-serif;
    position:fixed;
    top:50px;
    right:20px;
    z-index:10000;
    font-size:10pt;
    max-width:180px;
}
.plotly-notifier p {
    margin:0;
}
.plotly-notifier .notifier-note {
    min-width:180px;
    max-width:250px;
    border:1px solid #fff;
    z-index:3000;
    margin:0;
    background-color:#8c97af;
    background-color:rgba(140,151,175,0.9);color:#fff;
    padding:10px;
    overflow-wrap:break-word;
    word-wrap:break-word;-ms-hyphens:auto;-webkit-hyphens:auto;
    hyphens:auto;
}
.plotly-notifier .notifier-close {
    color:#fff;
    opacity:0.8;
    float:right;
    padding:0 5px;
    background:none;
    border:none;
    font-size:20px;
    font-weight:bold;
    line-height:20px;
}
.plotly-notifier .notifier-close:hover {
    color:#444;
    text-decoration:none;
    cursor:pointer
}
</style>
<div id="plotly"></div>
`

const customElem = class extends HTMLElement {
  constructor(){
    super()
    this.shadow
    this.plotly
  }
  async connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    this.shadow=shadow
    const dom = new DOMParser().parseFromString(template(), "text/html")
    shadow.appendChild(dom.head.querySelector("style"))
    shadow.appendChild(dom.body.querySelector("div"))
    const divElem = shadow.querySelector("#plotly")
    const data = []
    const layout = {
      autosize: true,
      //height: 500,
      title: '',
      //width: 800,
      xaxis: {
        autorange: true,
        type: 'linear'
      },
      yaxis: {
        autorange: true,
        type: 'linear'
      }
    }
    const plotly =  await Plotly.newPlot(divElem,data,layout,{
      editable: true,
      scrollZoom: true,
      showLink: false,
      displaylogo: false,
      modeBarButtonsToRemove: ['sendDataToCloud']
    })
    this.plotly=plotly
  }
  react(data, layout){
    const divElem = this.shadow.querySelector("#plotly")
    Plotly.react(divElem, data,layout)
  }
  relayout(layout){
    const divElem = this.shadow.querySelector("#plotly")
    Plotly.relayout(divElem, layout)
  }

}

const test = () =>{
    const divElem = document.querySelector("#xx")
    const  trace1 = {
      x: ['1.4629541543408053', '1.449384764554683', '1.443271124323532',
          '1.4357189805085815', '1.426728333109831', '1.4046113405089038',
          '1.404467131323703', '1.3777133677122921', '1.2855256245554019',
          '1.2480297808974994', '1.182693187236171', '1.0869666897654229',
          '1.0990904606647236', '0.8837704923717853', '0.8837704923717853',
          '0.756470897929133', '0.756470897929133', '0.5604875712810431',
          '0.37012689943296184', '0.33488011769506265', '0.31332086846610796',
          '0.2901978576275086', '0.2505442172906829', '0.25187336433201235',
          '0.3130141282331893', '0.3329513338531367'], 
      y: ['1.3529478271923225', '1.3586279251673754', '1.3562903568437001',
          '1.339387939734049', '1.3079206738384206', '1.2924567603125694',
          '1.307004694903538', '1.3034649045327376', '1.285373765624191',
          '1.2559692540111211', '1.2081594707242795', '1.1140507570884464',
          '1.1189881115780949', '0.9535602818389741', '0.9535602818389741',
          '0.9017180596976648', '0.9017180596976648', '0.9491150666707611',
          '1.0694743143644796', '1.0692546990396585', '1.0180713228728122',
          '1.0227890620376396', '0.9995185750800757', '0.9642961784848334',
          '0.8911930912116899', '0.8785661943190564'], 
      marker: {size: 8}, 
      mode: 'lines+markers', 
      name: 'Foot-y [m]', 
      type: 'scatter', 
      uid: '0f9fa6'
    };
    const data = [trace1]
    const layout = {
      autosize: true,
      //height: 500,
      title: '',
      //width: 800,
      xaxis: {
        autorange: true,
        type: 'linear'
      },
      yaxis: {
        autorange: true,
        type: 'linear'
      }
    }
    const plotly = Plotly.newPlot(divElem,data,layout,{
      editable: true,
      scrollZoom: true,
      showLink: false,
      displaylogo: false,
      modeBarButtonsToRemove: ['sendDataToCloud']
    })

    divElem.on("plotly_click",() => {
      console.log("changed")
    })
}
//test()

export default customElements.define(tagName, customElem)
