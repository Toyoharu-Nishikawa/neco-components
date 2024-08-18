export const saveAs = (text, fileName) => {
  const blob = new Blob([text], {type: 'text/plain'})
  const url = window.URL || window.webkitURL
  const link = url.createObjectURL(blob)
  const a = document.createElement("a")
  a.setAttribute("download", fileName)
  a.setAttribute("href", link)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const csvParse = csv => csv
  .split(/\r\n|\n|\r/) //split by line feed codes
  .filter((k)=>k.match(/[^,\s\f\n\r\t\v]/)) //remove empty lines
  .map((k)=>k.trim() //remove white spaces of begining and end of line
    .replace(/,\s+/g,",") //remove white spaces
    .split(",") //split by cannma
    .map((l)=>isNaN(l)? l:parseFloat(l)) //convert string to flot
  )

