	var fotoNum = 1;
	var contador = 0;
	var botonReturn = false;
	var ImgZoom = "";

function TomarFoto() {
	if (contador == 6){
		alert("no se permiten adjuntar mas de  fotos.");
	}
	else{
		var options = {
                quality: 30,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
				sourceType: Camera.PictureSourceType.CAMERA,
				targetWidth: 600,
				saveToPhotoAlbum: true
            }			
      navigator.camera.getPicture(CamaraImagen, onFail, options);
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	  
	/*	var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
				sourceType: Camera.PictureSourceType.CAMERA,
				saveToPhotoAlbum: true
            }	
      navigator.camera.getPicture(CamaraImagen, onFail, options);*/
	}
}
// mostrar imagen pequeña
function CamaraImagen(imageData) {
	  var contenedor = "cnt"+fotoNum;
	  var foto = "foto0"+fotoNum+"";
	  var close = "img"+fotoNum+"";
	  var zoom = "zoom"+fotoNum+"";
	  var closezoom = "imgz"+fotoNum+"";
	  $("#contenedor-fotos").append("<div id='"+contenedor+"'class='imagen-camara'><img id='"+close+"' class='eliminar-foto' src='img/eliminar.png' onclick='EliminarFoto("+fotoNum+")'><img id='"+foto+"' class='selected-foto' style='width:100%' src='' onclick='VerImagen("+fotoNum+")'></div>");
      $("#selected-foto").append("<div id='"+zoom+"img' style='display:none;'><img id='"+closezoom+"' class='cerrar-zoom' src='img/volver2.png' onclick='CerrarZoom("+fotoNum+")'> <img id='"+zoom+"' class='imagen-zoom' src=''></div>");
	  
      // FILE_URI
	  /*$("#"+foto).attr("src",imageData);
	  $("#"+zoom).attr("src",imageData);
	  alert(imageData);
	  $("#fotoprev1").attr("src",imageData);*/
	  var imagen = document.getElementById(''+foto+'');
	  var imagenzoom = document.getElementById(''+zoom+'');
      imagen.src = imageData;
	  imagenzoom.src = imageData;
	  // DATA_URI
	/*  var imagen = document.getElementById(''+foto+'');
	  var imagenzoom = document.getElementById(''+zoom+'');
      imagen.src = "data:image/jpeg;base64," + imageData;
	  imagenzoom.src = "data:image/jpeg;base64," + imageData;
	  alert("data:image/jpeg;base64," + imageData);*/
	  
	  contador += 1;
	  fotoNum += 1;
	  //subirImagen(imageData);
}

// ***********************************************************
var ok = false;
var Contadorupload = 0;
//function subirImagen(fileURL) {
function subirImagen() {
	//alert("subiendo");
	jQuery.each( Enlaces, function( i, valor ) {
		if (valor != 'null'){
	//		alert("valor "+valor);
			var options = new FileUploadOptions();
			options.fileKey = "imagen";
			options.fileName = valor.substr(valor.lastIndexOf('/') + 1);

			var ft = new FileTransfer();
			ft.upload(valor, encodeURI("http://ar-pruebas.mindtec.me/upload-fotos.php"), uploadSuccess, uploadFail, options);
		}
	});

}
var contadorvalidar = 0;
function uploadSuccess(r) {
	//alert("subio");
	EnlacesServerFoto[contadorEnlacesFoto] = r.response;
	contadorEnlacesFoto+=1;
	Enlaces[Contadorupload]='null';
	Contadorupload+=1;	
	
	contadorvalidar+=1;
		
	//verificar();	
               // alert("Code = " + r.responseCode+" Response = " + r.response+" Sent = " + r.bytesSent);
               /* var image = document.getElementById('fotoServidor');
                image.src = r.response;*/
}
/*var numverificar = 0;
var errorupload = false;*/
function verificar(){
	//alert("funcion " +contadorvalidar);
	if(contadorvalidar == NumEnlacesFotos){
			//alert("ok");
			ok=true;
	}
}
function uploadFail(error) {
    alert("Ocurrio un error");

}

// ***********************************************************
function ObtenerFoto() {
	if (contador == 6){
		alert("no se permiten adjuntar mas de  fotos.");
	}
	else{
      // Retrieve image file location from specified source
            var options = {
                quality: 20,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				targetWidth: 600
            }
      navigator.camera.getPicture(LibreriaImagen, onFail, options);
	}
}
    // mostrar imagen grande
function LibreriaImagen(imageURI) {
	  var contenedor = "cnt"+fotoNum;
	  var foto = "foto0"+fotoNum+"";
	  var close = "img"+fotoNum+"";
	  var zoom = "zoom"+fotoNum+"";
	  var input = "input"+fotoNum+"";
	  var closezoom = "imgz"+fotoNum+"";
	  $("#contenedor-fotos").append("<div id='"+contenedor+"'class='imagen-camara'><img id='"+close+"' class='eliminar-foto' src='img/eliminar.png' onclick='EliminarFoto("+fotoNum+")'><img id='"+foto+"' class='selected-foto' style='width:100%' src='' onclick='VerImagen("+fotoNum+")'></div>");
      $("#selected-foto").append("<div id='"+zoom+"img' style='display:none;'><img id='"+closezoom+"' class='cerrar-zoom' src='img/volver2.png' onclick='CerrarZoom("+fotoNum+")'> <img id='"+zoom+"' class='imagen-zoom' src=''></div>");
      
	  //**********************
	 // $("#input-foto").append("<input type='file' name='"+input+"' value='data:image/jpeg;base64,"+imageURI+"'>");
	  //**********************
	  
	  //FILE_URI
	 /* $("#"+foto).attr("src",imageURI);
	  $("#"+zoom).attr("src",imageURI);
	  alert(imageURI);*/
	  var imagen = document.getElementById(''+foto+'');
	  var imagenzoom = document.getElementById(''+zoom+'');
      imagen.src = imageURI;
	  imagenzoom.src = imageURI;
	  //DATA_URI
	 /* var imagen = document.getElementById(foto);
	  var imagenzoom = document.getElementById(zoom);
      imagen.src = imageURI;
	  imagenzoom.src = imageURI;*/
	  
	  contador += 1;
	  fotoNum+=1;
	  //subirImagen(imageURI);
	 // alert(imageURI);
}
function onFail(message) {
      //alert('Failed because: ' + message);
}

function EliminarFoto(foto){
	var id = "cnt" + foto;
	$("#"+id).remove();
	contador-=1;
}
function VerImagen(foto){
	botonReturn = true;
	ImgZoom = foto;
	var id = "#foto0" + foto;
	$("#Zoom").show();
	$("#zoom"+foto+"img").show();
}

function CerrarZoom(foto){	
	$("#Zoom").hide();
	$("#zoom"+foto+"img").hide();
}
