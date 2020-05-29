handleOnChange1 (event) {
  console.log(event.target.files);
  const totalArchivos = event.target.files;

  for (var i = 0; i < totalArchivos.length; i++) {
    const archivo = totalArchivos[i];
    console.log(archivo);

    var file = archivo;
    if(archivo.type == 'application/pdf'){
      alert('Enviar archivo');
    }
    else if(archivo.type == 'text/xml'){
      var reader  = new FileReader();

      reader.onloadend = function () {
        console.log("Enseguida sigue el archivo");
        console.log(reader.result);

        var XMLParser = require('react-xml-parser');
        var xml = new XMLParser().parseFromString(reader.result);
        console.log(xml);
        console.log('');
        console.log(xml.children[0]);
        console.log('');
        console.log(xml.children[0].attributes['Rfc']);

        alert('Mandar datos');
      }
      reader.readAsText(file);
  }
};
