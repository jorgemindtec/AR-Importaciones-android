
// ********************************** ENVIAR CORREO **********************************
var IdUsuarioLogin = "";
function IniciarSesion(){
	var hasError = false; 
	var usuario = $("#SesionUsuario").val();
	var pass = $("#SesionPass").val();
	if($.trim(usuario) == "") {
		$("#error-SesionUsuario").show();
		//$("#FotoNombre").focus();
		hasError = true;
	}
	else{
		$("#error-SesionUsuario").hide();
	}
	if($.trim(pass) == "") {
		$("#error-SesionPass").show();
		//$("#FotoTelefono").focus();
		hasError = true;
	}
	else{
		$("#error-SesionPass").hide();
	}
	if(hasError == false) {
		var datos = {
			"usuario" : usuario,
			"pass" : pass
		};
		$.ajax({
			data : datos,
			url: "http://ar-pruebas.mindtec.me/usuario.php",
			type: "POST",
			success: function(response){
				if (response==""){
					$("#loginResponse").html("Error de inicio de sesión. El usuario o la contraseña están incorrectos.");
					$("#loginResponse").show();		
					setTimeout(function() {
						$("#loginResponse").hide();
					}, 3000);
				}
				else {
					$("#resultado").html(response);
					
					$("#form-inicio-sesion")[0].reset();
					$(".boton-sesion-inicio").hide();
					$("#login-usuario").show();					
					$("#usuario-sesion").html($("#CodUsuario").val());
					$("#loginResponse").html("Bienvenido "+$("#CodUsuario").val());
					$("#loginResponse").show();
					$("#menu08").show();
					
					IdUsuarioLogin = $("#IdUsuario").val();
					$("#form-lista-nombre").val($("#NombreUsuario").val());
					$("#form-lista-telefono").val($("#TelefonoUsuario").val());
					$("#form-lista-email").val($("#EmailUsuario").val());
					$("#form-nombre").val($("#NombreUsuario").val());
					$("#form-telefono").val($("#TelefonoUsuario").val());
					$("#form-email").val($("#EmailUsuario").val());
					$("#FotoNombre").val($("#NombreUsuario").val());
					$("#FotoTelefono").val($("#TelefonoUsuario").val());
					$("#FotoEmail").val($("#EmailUsuario").val());
						
					setTimeout(function() {
						$("#sesion-inicio").hide();
						menu(1);
						$("#logout").show();
						$("#loginResponse").hide();
					}, 1500);
				}
			},
			error :function(response){
				alert("Ocurrio un error, por favor intentar mas tarde.");
				return false;
			}
		});
	}
	return false;
}

function CrearCuenta(){
	var hasError = false; 
	var nombre = $("#CuentaNombre").val();
	var telefono = $("#CuentaTelefono").val();
	var email = $("#CuentaEmail").val();
	var usuario = $("#CuentaUsuario").val();
	var pass = $("#CuentaPass").val();
	if($.trim(nombre) == "") {
		$("#error-CuentaNombre").show();
		hasError = true;
	}
	else{
		$("#error-CuentaNombre").hide();
	}
	if($.trim(telefono) == "") {
		$("#error-CuentaTelefono").show();
		hasError = true;
	}
	else{
		$("#error-CuentaTelefono").hide();
	}
	if($.trim(email) == "") {
		$("#error-CuentaEmail").show();
		hasError = true;
	}
	else{
		$("#error-CuentaEmail").hide();
	}
	if($.trim(usuario) == "") {
		$("#error-CuentaUsuario").show();
		hasError = true;
	}
	else{
		$("#error-CuentaUsuario").hide();
	}
	if($.trim(pass) == "") {
		$("#error-CuentaPass").show();
		hasError = true;
	}
	else{
		$("#error-CuentaPass").hide();
	}
	if(hasError == false) {
		var datos = {
			"nombre" : nombre,
			"telefono" : telefono,
			"email" : email,
			"usuario" : usuario,
			"pass" : pass
		};
		$.ajax({
			data : datos,
			url: "http://ar-pruebas.mindtec.me/crear-cuenta.php",
			type: "post",
			success: function(response){
				$("#form-registro-usuario")[0].reset();
				$("#resultado2").html(response);
				$("#resultado2").show();
				setTimeout(function() {
					$("#resultado2").hide();
				}, 1500);
			},
			error :function(response){
				alert("Ocurrio un error, por favor intentar mas tarde." +response);
				return false;
			}
		});
	}
	return false;
	
}
function LogOut(){
	$("#sesion-inicio").show();
	$(".boton-sesion-inicio").show();
	menu(1);
	$("#resultado").html("");
	$("#login-usuario").hide();
	$("#logout").hide();
	$("#menu08").hide();
	
	IdUsuarioLogin = "";
	$("#usuario-sesion").html("");
	$("#loginResponse").html("");
	$("#form-lista-nombre").val("");
	$("#form-lista-telefono").val("");
	$("#form-lista-email").val("");
	$("#form-nombre").val("");
	$("#form-telefono").val("");
	$("#form-email").val("");
	$("#FotoNombre").val("");
	$("#FotoTelefono").val("");
	$("#FotoEmail").val("");
}
function formLogin(){
	$("#formulario-registro-usuario").hide();
	$("#registrate").hide();
	$("#formulario-inicio-sesion").show();
	$("#identificate").show();	
}
function formRegister(){
	$("#formulario-inicio-sesion").hide();
	$("#identificate").hide();
	$("#formulario-registro-usuario").show();
	$("#registrate").show();	
}
