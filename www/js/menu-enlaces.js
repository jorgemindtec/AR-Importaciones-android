function clean(){
	$("#pantalla-sesion").hide();
	
	$("#inicio").hide();
	$("#menu01").removeClass( "m-active" );
	$("#pantalla-ar").hide();
	$("#menu02").removeClass( "m-active" );
	$("#pantalla-buscador").hide();
	$("#menu03").removeClass( "m-active" );
	$("#pantalla-lista-productos").hide();
	$("#menu04").removeClass( "m-active" );
	$("#pantalla-como-importar").hide();
	$("#menu05").removeClass( "m-active" );
	$("#pantalla-contacto").hide();
	$("#menu06").removeClass( "m-active" );
	$("#pantalla-foto").hide();
	$("#menu07").removeClass( "m-active" );
    touchSideSwipe.tssClose();
}
function menu(dato){
	if (dato==0){
		clean();
		$("#pantalla-sesion").show();
	}
	if (dato==1){
		clean();
		$("#menu01").addClass( "m-active" );
		$("#inicio").show();
	}
	if (dato==2){
		clean();
		$("#menu02").addClass( "m-active" );
		$("#pantalla-ar").show();
	}
	if (dato==3){
		clean();
		$("#menu03").addClass( "m-active" );
		$("#pantalla-buscador").show();
	}
	if (dato==4){
		clean();
		$("#menu04").addClass( "m-active" );
		if(TotalProducto == 0){
			$("#lista-vacia").show()
		}
		else{
			$("#lista-vacia").hide()
		}
		$("#pantalla-lista-productos").show();
	}
	if (dato==5){
		clean();
		$("#menu05").addClass( "m-active" );
		$("#pantalla-como-importar").show();
	}
	if (dato==6){
		clean();
		$("#menu06").addClass( "m-active" );
		$("#pantalla-contacto").show();
	}
	if (dato==7){
		clean();
		$("#menu07").addClass( "m-active" );
		$("#pantalla-foto").show();
	}
	
}