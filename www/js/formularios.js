// ********************************** ENVIAR CORREO LISTA PRODUCTOS **********************************

var ebay = "";
var amazon = "";
var alibaba = "";
var madechina = "";
var aliexpress = "";
function ValidarFormLista(){	
				
	Lista_Ebay = [] ;
	Indice_Ebay = 0;
	Lista_Amazon = [];
	Indice_Amazon = 0;
	Lista_Alibaba = [];
	Indice_Alibaba = 0;
	Lista_Madechina = [];
	Indice_Madechina = 0;
	Lista_Aliexpress = [];
	Indice_Aliexpress = 0;
	
	var ProductosEbay = "";
	var ProductosAmazon = "";
	var ProductosAlibaba = "";
	var ProductosMadechina = "";
	var ProductosAliexpress = "";	
	
	ebay = $('#productos-ebay .lista-productos-seleccionados').length;
	amazon = $('#productos-amazon .lista-productos-seleccionados').length;
	alibaba = $('#productos-alibaba .lista-productos-seleccionados').length;
	madechina = $('#productos-madechina .lista-productos-seleccionados').length;
	aliexpress = $('#productos-aliexpress .lista-productos-seleccionados').length;
	
	if(ebay==0 && amazon==0 && alibaba==0 && madechina==0 && aliexpress==0){
		return false;
	}
	else {
		UpdateBD();
		
	var producto = "";
	if (ebay > 0){		
		jQuery.each( EbayList, function( i, valor ) {
			if (valor != 'null'){
				producto = "item-"+valor;			
				//var imagen = $("#"+producto+" .s-item__image-section").html();
				var titulo = $("#"+producto+" .s-item__title").text();
				var precio = $("#"+producto+" span").text();
				var cantidad = $("#cantidad-"+valor).val();
				var url = $("#"+producto+" .link").text();	
				
				Lista_Ebay[Indice_Ebay] = $.trim(titulo);
				Indice_Ebay +=1;
				Lista_Ebay[Indice_Ebay] = $.trim(precio);
				Indice_Ebay +=1;
				Lista_Ebay[Indice_Ebay] = cantidad
				Indice_Ebay +=1;
				Lista_Ebay[Indice_Ebay] = url;
				Indice_Ebay +=1;
			}
		});	
	}
	producto = "";
	if (amazon > 0){
		jQuery.each( AmazonList, function( i, valor ) {
			if (valor != 'null'){
				producto = "item-"+valor;			
				//var imagen = $("#"+producto+" .s-item__image-section").html();
				var titulo = $("#"+producto+" .sx-title.sx-title-inline").text();
				var precio = $("#"+producto+" .price_am").text();
				var cantidad = $("#cantidad-"+valor).val();
				var url = $("#"+producto+" .link").text();
				
				Lista_Amazon[Indice_Amazon] = $.trim(titulo);
				Indice_Amazon +=1;
				Lista_Amazon[Indice_Amazon] = $.trim(precio);
				Indice_Amazon +=1;
				Lista_Amazon[Indice_Amazon] = cantidad
				Indice_Amazon +=1;
				Lista_Amazon[Indice_Amazon] = url;
				Indice_Amazon +=1;
			}
		});	
	}
	producto = "";
	if (alibaba > 0){
		jQuery.each( AlibabaList, function( i, valor ) {
			if (valor != 'null'){
				producto = "item-"+valor;			
				//var imagen = $("#"+producto+" .sx-table-pic").html();
				var titulo = $("#"+producto+" .product-title").text();
				var precio = $("#"+producto+" .price_alb").text();
				var cantidad = $("#cantidad-"+valor).val();
				var url = $("#"+producto+" .link").text();
				
				Lista_Alibaba[Indice_Alibaba] = $.trim(titulo);
				Indice_Alibaba +=1;
				Lista_Alibaba[Indice_Alibaba] = $.trim(precio);
				Indice_Alibaba +=1;
				Lista_Alibaba[Indice_Alibaba] = cantidad
				Indice_Alibaba +=1;
				Lista_Alibaba[Indice_Alibaba] = url;
				Indice_Alibaba +=1;
			}
		});	
	}
	producto = "";
	if (madechina > 0){
		jQuery.each( MadechinaList, function( i, valor ) {
			if (valor != 'null'){
				producto = "item-"+valor;			
				//var imagen = $("#"+producto+" .sx-table-pic").html();
				var titulo = $("#"+producto+" .md-titulo").text();
				var precio = $("#"+producto+" .md-precio .pro-price-fob").text();
				var cantidad = $("#cantidad-"+valor).val();
				var url = $("#"+producto+" .link").text();
				
				Lista_Madechina[Indice_Madechina] = $.trim(titulo);
				Indice_Madechina +=1;
				Lista_Madechina[Indice_Madechina] = $.trim(precio);
				Indice_Madechina +=1;
				Lista_Madechina[Indice_Madechina] = cantidad
				Indice_Madechina +=1;
				Lista_Madechina[Indice_Madechina] = url;
				Indice_Madechina +=1;
			}
		});
	}
	producto = "";
	if (aliexpress > 0){
		jQuery.each( AliexpressList, function( i, valor ) {
			if (valor != 'null'){
				producto = "item-"+valor;			
				//var imagen = $("#"+producto+" .sx-table-pic").html();
				var titulo = $("#"+producto+" .ali-titulo").text();
				var precio = $("#"+producto+" .ali-precio .value").text();
				var cantidad = $("#cantidad-"+valor).val();
				var url = $("#"+producto+" .link").text();
				
				Lista_Aliexpress[Indice_Aliexpress] = $.trim(titulo);
				Indice_Aliexpress +=1;
				Lista_Aliexpress[Indice_Aliexpress] = $.trim(precio);
				Indice_Aliexpress +=1;
				Lista_Aliexpress[Indice_Aliexpress] = cantidad
				Indice_Aliexpress +=1;
				Lista_Aliexpress[Indice_Aliexpress] = url;
				Indice_Aliexpress +=1;
			}
		});
	}
	
	/*jQuery.each( Lista_Ebay, function( i, valor ) {
		if (valor != 'null'){
			alert(valor);
		}
	});*/
	
	ProductosEbay = JSON.stringify(Lista_Ebay);
	ProductosAmazon = JSON.stringify(Lista_Amazon);
	ProductosAlibaba = JSON.stringify(Lista_Alibaba);
	ProductosMadechina = JSON.stringify(Lista_Madechina);
	ProductosAliexpress = JSON.stringify(Lista_Aliexpress);
	
	var hasError = false; 
	var nombre = $("#form-lista-nombre").val();
	var telefono = $("#form-lista-telefono").val();
	var correo = $("#form-lista-email").val();
	var mensaje = $("#form-lista-mensaje").val();
	
	if($.trim(nombre) == "") {
		$("#error-form-lista-nombre").show();
		//$("#FotoNombre").focus();
		hasError = true;
	}
	else{
		$("#error-form-lista-nombre").hide();
	}
	if($.trim(telefono) == "") {
		$("#error-form-lista-telefono").show();
		//$("#FotoTelefono").focus();
		hasError = true;
	}
	else{
		$("#error-form-lista-telefono").hide();
	}
	if($.trim(correo) == "") {
		$("#error-form-lista-email").show();
		//$("#FotoEmail").focus();
		hasError = true;
	}
	else{
		$("#error-form-lista-email").hide();
	}
	if($.trim(mensaje) == "") {
		$("#error-form-lista-mensaje").show();
		//$("#FotoMensaje").focus();
		hasError = true;
	}
	else{
		$("#error-form-lista-mensaje").hide();
	}

	if(hasError == false) {
		$("#mensaje-lista").text("Enviando correo...");
		var datos = {
			"nombre" : nombre,
			"telefono" : telefono,
			"correo" : correo,
			"mensaje" : mensaje,
			data1 : ProductosEbay,
			data2 : ProductosAmazon,
			data3 : ProductosAlibaba,
			data4 : ProductosMadechina,
			data5 : ProductosAliexpress
		};
		$.ajax({
			data : datos,
			url: "http://ar-pruebas.mindtec.me/form-lista.php",
			type:"POST",
			success: function(){
				$("#mensaje-lista").text("Tu solicitud ha sido enviada, un asesor se contactará a la brevedad posible contigo.");
				setTimeout(function() {
					$("#mensaje-lista").text("");
				}, 3000);
				UpdateBD();
			},
			error :function(){
				$("#mensaje-lista").text("Ocurrio un error, por favor intentar más tarde.");
				setTimeout(function() {
					$("#mensaje-lista").text("");
				}, 3000);
				return false;
			},
			complete : function(){
				$("#form-lista")[0].reset();
				$("#lista-ebay").hide();
				$("#productos-ebay").html("");
				$("#lista-amazon").hide();
				$("#productos-amazon").html("");
				$("#lista-alibaba").hide();
				$("#productos-alibaba").html("");
				$("#lista-madechina").hide();
				$("#productos-madechina").html("");
				$("#lista-aliexpress").hide();
				$("#productos-aliexpress").html("");
				EbayList = [];
				NumeroEbay = 0; 
				AmazonList = [];
				NumeroAmazon = 0;
				AlibabaList = [];
				NumeroAlibaba = 0;
				MadechinaList = [];
				NumeroMadechina = 0;
				AliexpressList = [];
				NumeroAliexpress = 0;
				TotalProducto=0;
				$("#total-producto").text(""+TotalProducto+"");
				BuscarProducto();
			}
		});
	}
	return false;
	}
}

// ********************************** ENVIAR CORREO CONTACTO **********************************
function ValidarFormContacto(){
	var hasError = false; 
	var nombre = $("#form-nombre").val();
	var telefono = $("#form-telefono").val();
	var correo = $("#form-email").val();
	var mensaje = $("#form-mensaje").val();
	
	if($.trim(nombre) == "") {
		$("#error-form-nombre").show();
		//$("#FotoNombre").focus();
		hasError = true;
	}
	else{
		$("#error-form-nombre").hide();
	}
	if($.trim(telefono) == "") {
		$("#error-form-telefono").show();
		//$("#FotoTelefono").focus();
		hasError = true;
	}
	else{
		$("#error-form-telefono").hide();
	}
	if($.trim(correo) == "") {
		$("#error-form-email").show();
		//$("#FotoEmail").focus();
		hasError = true;
	}
	else{
		$("#error-form-email").hide();
	}
	if($.trim(mensaje) == "") {
		$("#error-form-mensaje").show();
		//$("#FotoMensaje").focus();
		hasError = true;
	}
	else{
		$("#error-form-mensaje").hide();
	}

	if(hasError == false) {
		$("#mensaje-contacto").text("Enviando correo...");
		var datos = {
			"nombre" : nombre,
			"telefono" : telefono,
			"correo" : correo,
			"mensaje" : mensaje
		};
		$.ajax({
			data : datos,
			url: "http://ar-pruebas.mindtec.me/form-contacto.php",
			type:"POST",
			success: function(){
				$("#mensaje-contacto").text("El mensaje ah sido enviado con éxito.");
				setTimeout(function() {
					$("#mensaje-contacto").text("");
				}, 2000);
			},
			error :function(){
				$("#mensaje-contacto").text("Ocurrio un error, por favor intentar más tarde.");
				setTimeout(function() {
					$("#mensaje-contacto").text("");
				}, 2000);
				return false;
			},
			complete : function(){
				$("#form-contacto")[0].reset();
			}
		});
	}	
	return false;
}

// ********************************** ENVIAR CORREO FOTOS **********************************

var NumEnlacesFotos = 0;
function ValidarFormFotos(){
	if($.trim($("#FotoNombre").val()) == "") {
		$("#error-FotoNombre").show();
	}
	else{
		$("#error-FotoNombre").hide();
	}
	if($.trim($("#FotoTelefono").val()) == "") {
		$("#error-FotoTelefono").show();
	}
	else{
		$("#error-FotoTelefono").hide();
	}
	if($.trim($("#FotoEmail").val()) == "") {
		$("#error-FotoEmail").show();
	}
	else{
		$("#error-FotoEmail").hide();
	}
	if($.trim($("#FotoMensaje").val()) == "") {
		$("#error-FotoMensaje").show();
	}
	else{
		$("#error-FotoMensaje").hide();
	}
	if ( $.trim($("#FotoNombre").val())!="" && $.trim($("#FotoTelefono").val())!="" && $.trim($("#FotoEmail").val())!="" && $.trim($("#FotoMensaje").val())!=""){
		
		NumEnlacesFotos = $('#contenedor-fotos .selected-foto').length;
		
		if (NumEnlacesFotos > 0){
			$("#mensaje-foto").text("Enviando correo...");
					
			$("#contenedor-fotos .selected-foto" ).each(function( index ) {
				if( index < NumEnlacesFotos){
					Enlaces[contadorEnlaces] = $(this).attr("src");
					contadorEnlaces += 1;
				}
			});	
			subirImagen();
			
			var numverificar = 0;
			
			var busquedaEnlace = setInterval(function(){		
				numverificar += 1;
				verificar();
				
				if(ok==true){ //archivos subidos al server
					clearInterval(busquedaEnlace);
					EnviarCorreoFotos();
				}		
				else if(numverificar == 5){
					alert("Se agoto el tiempo de espera, intentar mas tarde.");
					clearInterval(busquedaEnlace);
				}
			}, 4000);		
		}
	}
}
function EnviarCorreoFotos(){
	//var hasError = false; 
	var nombre = $("#FotoNombre").val();
	var telefono = $("#FotoTelefono").val();
	var correo = $("#FotoEmail").val();
	var mensaje = $("#FotoMensaje").val();
	
	var EnlacesCamara = JSON.stringify(EnlacesServerFoto);	
	
	/*if($.trim(nombre) == "") {
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
	}*/
	//if(hasError == false) {
		var datos = {
			"nombre" : nombre,
			"telefono" : telefono,
			"correo" : correo,
			"mensaje" : mensaje,
			data1 : EnlacesCamara
		};
		$.ajax({
			data : datos,
			url: "http://ar-pruebas.mindtec.me/form-fotos.php",
			type:"POST",
			success: function(){
				$("#mensaje-foto").text("El mensaje ah sido enviado con éxito.");
				setTimeout(function() {
					$("#mensaje-foto").text("");
				}, 2500);
			},
			error :function(){
				$("#mensaje-foto").text("Ocurrio un error, por favor intentar más tarde.");
				setTimeout(function() {
					$("#mensaje-foto").text("");
				}, 2500);
				return false;
			},
			complete : function(){
				$("#form-foto")[0].reset();
				$("#FotoMensaje").text("Hola, Estoy interesado en el producto de la imagen. Dar mas detalles: ");
				$("#contenedor-fotos").html('');
				$("#selected-foto").html('');
				Enlaces = [];
				contadorEnlaces=0;
				EnlacesServerFoto = [];
				contadorEnlacesFoto=0;
			}
		});
	//}
	return false;
}
