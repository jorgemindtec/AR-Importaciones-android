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
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
				sourceType: Camera.PictureSourceType.CAMERA,
				saveToPhotoAlbum: true
            }			
      navigator.camera.getPicture(CamaraImagen, onFail, options);
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
     /*navigator.camera.getPicture(CamaraImagen, onFail, { quality: 50, allowEdit: true,
       destinationType: destinationType.DATA_URL });*/
	}
}
// mostrar imagen pequeña
function CamaraImagen(imageData) {
	  var contenedor = "cnt"+fotoNum;
	  var foto = "foto0"+fotoNum+"";
	  var close = "img"+fotoNum+"";
	  var zoom = "zoom"+fotoNum+"";
	  var closezoom = "imgz"+fotoNum+"";
	  $("#contenedor-fotos").append("<div id='"+contenedor+"'class='imagen-camara'><img id='"+close+"' class='eliminar-foto' src='img/close.png' onclick='EliminarFoto("+fotoNum+")'><img id='"+foto+"' class='selected-foto' style='width:100%' src='' onclick='VerImagen("+fotoNum+")'></div>");
      $("#selected-foto").append("<div id='"+zoom+"img' style='display:none;'><img id='"+closezoom+"' class='cerrar-zoom' src='img/close.png' onclick='CerrarZoom("+fotoNum+")'> <img id='"+zoom+"' class='imagen-zoom' src=''></div>");
	  
      // Show the captured photo
	  $("#"+foto).attr("src",imageData);
	  $("#"+zoom).attr("src",imageData);
	 /* alert(imageData);
	  var imagen = document.getElementById(''+foto+'');
	  var imagenzoom = document.getElementById(''+zoom+'');
      imagen.src = "data:image/jpeg;base64," + imageData;
	  imagenzoom.src = "data:image/jpeg;base64," + imageData;*/
	  contador += 1;
	  fotoNum += 1;
}

function ObtenerFoto(source) {
	if (contador == 6){
		alert("no se permiten adjuntar mas de  fotos.");
	}
	else{
      // Retrieve image file location from specified source
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
				sourceType: source
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
	  $("#contenedor-fotos").append("<div id='"+contenedor+"'class='imagen-camara'><img id='"+close+"' class='eliminar-foto' src='img/close.png' onclick='EliminarFoto("+fotoNum+")'><img id='"+foto+"' class='selected-foto' style='width:100%' src='' onclick='VerImagen("+fotoNum+")'></div>");
      $("#selected-foto").append("<div id='"+zoom+"img' style='display:none;'><img id='"+closezoom+"' class='cerrar-zoom' src='img/close.png' onclick='CerrarZoom("+fotoNum+")'> <img id='"+zoom+"' class='imagen-zoom' src=''></div>");
      
	  //**********************
	  $("#input-foto").append("<input type='file' name='"+input+"' value='data:image/jpeg;base64,"+imageURI+"'>");
	  //**********************
	  
	  $("#"+foto).attr("src",imageURI);
	  $("#"+zoom).attr("src",imageURI);
	  
	/*  var imagen = document.getElementById(foto);
	  var imagenzoom = document.getElementById(zoom);
      // Show the captured photo	  
      imagen.src = imageURI;
	  imagenzoom.src = imageURI;*/
	  contador += 1;
	  fotoNum+=1;
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


        



// ********************************** ENVIAR CORREO **********************************
function ValidarFormFotos(){
	var hasError = false; 
	var nombre = $("#FotoNombre").val();
	var telefono = $("#FotoTelefono").val();
	var correo = $("#FotoEmail").val();
	var mensaje = $("#FotoMensaje").val();
	
	var imagen = $("#input1").val();
	
	//alert(imagen);
	if($.trim(nombre) == "") {
		$("#error-FotoNombre").show();
		//$("#FotoNombre").focus();
		hasError = true;
	}
	else{
		$("#error-FotoNombre").hide();
	}
	if($.trim(telefono) == "") {
		$("#error-FotoTelefono").show();
		//$("#FotoTelefono").focus();
		hasError = true;
	}
	else{
		$("#error-FotoTelefono").hide();
	}
	if($.trim(correo) == "") {
		$("#error-FotoEmail").show();
		//$("#FotoEmail").focus();
		hasError = true;
	}
	else{
		$("#error-FotoEmail").hide();
	}
	if($.trim(mensaje) == "") {
		$("#error-FotoMensaje").show();
		//$("#FotoMensaje").focus();
		hasError = true;
	}
	else{
		$("#error-FotoMensaje").hide();
	}
	
//	form DAta -------------------------------------------------*********************

	if(hasError == false) {
		var datos = {
			"nombre" : nombre,
			"telefono" : telefono,
			"correo" : correo,
			"mensaje" : mensaje,
			"imagen" : imagen
		};
		$.ajax({
			data : datos,
			url: "http://ar-pruebas.mindtec.me/form-fotos.php",
			type:"POST",
			success: function(){
				alert("El mensaje ah sido enviado con exito.");
			},
			error :function(){
				alert("Ocurrio un error, por favor intentar mas tarde.");
				return false;
			},
			complete : function(){
				//alert("exito");
				//$("#form-foto")[0].reset();
				//menu(7);
			}
		});
	}	
	return false;
}
