const clickBtnClear = document.querySelector("neco-button[name='clear']")
const clickBtnDraw = document.querySelector("neco-button[name='draw']")
const clickBtnPop = document.querySelector("neco-button[name='pop']")
const clickBtnHide = document.querySelector("neco-button[name='hide']")
const readBtn = document.querySelector("neco-file-reader-button")
const editor = document.querySelector("neco-ace")
const plotly = document.querySelector("neco-plotly")
const mj = document.querySelector("neco-minijscad")
const thr = document.querySelector("neco-three")
const jsF = document.querySelector("neco-jsframe")

const div = document.querySelector("div")
const inp = document.querySelector("input")
const tabs = document.querySelector("neco-tabs")

export const initialize = () => {
    clickBtnPop.onclick = ()=>jsF.show()
    clickBtnHide.onclick = ()=>jsF.hide()
    console.log(tabs) 
    console.log(tabs.shadowRoot) 
    console.log(tabs.pages) 
    const minijscad = tabs.pages[2].querySelector("neco-minijscad")
    console.log(minijscad)

//  readBtn.onread = (files) =>{
//    const file = files[0] 
//    const text = file.text
//    editor.value = text
//  }
//  clickBtnClear.onclick = () => {
//    //plotly.react()
//    //mj.style.width="300px"
//    //thr.style.width="300px"
//  }
//  clickBtnDraw.onclick = () => {
//    drawTHREE()
//  }
}
const drawTHREE = () => {
  const THREE = thr.THREE
  const scene = thr.scene
  const geometry = new THREE.SphereGeometry( 15, 6, 6 );
  const material = new THREE.MeshLambertMaterial( { color: "gray" } );
  const sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );

}

const drawMJ = () => {
  const sheet0 = mj.screen.addSheet("sheet0")
  const text0_2 = sheet0.addText({text:"polyline", position:[10,160],font: {size: 10,"stroke-width":0.1}})
  const fig0_2  = sheet0.addFig("polyline", {points:[[50,160],[60,170],[70,160],[80,170],[90,160]]})
}

const drawPlotly = () => {
  const  trace1 = {
    x: [0,1,2,3], 
    y: [2,3,6,7], 
    marker: {size: 8}, 
    mode: 'lines+markers', 
    name: 'Foot-y [m]', 
    type: 'scatter', 
  }
  const  trace2 = {
    x: [0,1,2,3], 
    y: [2,5,10,7], 
    marker: {size: 8}, 
    mode: 'lines+markers', 
    name: 'Foot-y [m]', 
    type: 'scatter', 
  }
 
  const data = [trace1,trace2]
  const layout = {
    autosize: true,
    title: '',
    xaxis: {
      autorange: true,
      type: 'linear'
    },
    yaxis: {
      autorange: true,
      type: 'linear'
    }
  }
  plotly.react(data,layout)    
}
