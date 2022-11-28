let url = "./ElMailAMandar.html";
var lines = await obtenerMail();

async function obtenerMail() {
  return new Promise((resolve, reject) => {
    fetch("/ElMailAMandar.html")
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        reject("No se encuentra el html " + response.status);
      })
      .then((text) => {
        resolve(text);
        lines = text;
      })
      .catch((err) => reject(err));
  });
}

console.log(lines);

function descargar(lines) {
  let encabezado =
    "<!DOCTYPE html><html  lang='en' xmlns='https://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='UTF-8' /><meta name='viewport' content='width=device-width,initial-scale=1' /><meta name='x-apple-disable-message-reformatting' /> <title></title> </head>";
  //let cuerpo ="\<body\>\<h1\>HOLIS\</h1\>\</body\>";
  let cuerpo = "";
  let datos = encabezado + lines + "</html>";
  let textFileAsBlob = new Blob([datos], { type: "text/html" });
  let downloadLink = document.createElement("a");
  downloadLink.download = "archivo.html";
  downloadLink.innerHTML = "El mail para mandar";
  if (window.webkitURL != null) {
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}
