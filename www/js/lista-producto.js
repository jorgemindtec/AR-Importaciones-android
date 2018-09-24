 var TotalProducto = 0;
 
 var EbayList = [];
 var NumeroEbay = 0;
 
 var AmazonList = [];
 var NumeroAmazon = 0;

function MostrarMensajeCarrito() {
	$("#mensaje-carrito").show();
	$("#contenedor-mensaje").addClass( "active" );
 }
function CerrarMensajeProducto(){
	$("#contenedor-mensaje" ).removeClass( "active" );
	setTimeout(function() {
		$("#mensaje-carrito").hide();
	}, 800);
}
 function IrCarrito() {	
	CerrarMensajeProducto();
	setTimeout(function() {
		menu(4);
	}, 800);
}
function ListaEbay(producto){
	MostrarMensajeCarrito();
	TotalProducto+=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-eb"+producto).hide();
	$("#lbl-off-eb"+producto).show();
	$("#btn-onn-eb"+producto).hide();
	$("#btn-off-eb"+producto).show();
	
	var id = "ebay-"+producto;	
	EbayList[NumeroEbay] = id;
	NumeroEbay+=1;
	$("#lista-ebay").show();
	$("#productos-ebay").html("");
	jQuery.each( EbayList, function( i, valor ) {
		if (valor != 'null'){
			var informacion = $("#"+valor).html();
			$("#productos-ebay").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'>"+informacion+"<div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});	
}
function QuitarListaEbay(producto){
	var existe = false;
	TotalProducto-=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-eb"+producto).show();
	$("#lbl-off-eb"+producto).hide();
	$("#btn-onn-eb"+producto).show();
	$("#btn-off-eb"+producto).hide();
	
	var id = "ebay-"+producto;
	$("#productos-ebay").html("");
	jQuery.each( EbayList, function( i, valor ) {
		if (valor == id){
			EbayList[i] = 'null';			
		}
	});
	jQuery.each( EbayList, function( i, valor ) {
		if (valor !='null'){
			existe = true;
			var informacion = $("#"+valor).html();
			$("#productos-ebay").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'>"+informacion+"<div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' value='1'></div></div>");
		}
	});
	if (existe == false){
		//alert("lista vacia");
		$("#lista-ebay").hide();
	}
} 

function ListaAmazon(producto){
	MostrarMensajeCarrito();
	$("#mensaje-carrito").show();	 
	TotalProducto+=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-am"+producto).hide();
	$("#lbl-off-am"+producto).show();
	$("#btn-onn-am"+producto).hide();
	$("#btn-off-am"+producto).show();
	
	var id = "amazon-"+producto;	
	AmazonList[NumeroAmazon] = id;
	NumeroAmazon+=1;	
	$("#lista-amazon").show();
	$("#productos-amazon").html("");
	jQuery.each( AmazonList, function( i, valor ) {
		if (valor != 'null'){
			var informacion = $("#"+valor).html();
			$("#productos-amazon").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'>"+informacion+"<div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});	
}
function QuitarListaAmazon(producto){
	var existe = false;
	TotalProducto-=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-am"+producto).show();
	$("#lbl-off-am"+producto).hide();
	$("#btn-onn-am"+producto).show();
	$("#btn-off-am"+producto).hide();
	
	var id = "amazon-"+producto;
	$("#productos-amazon").html("");
	jQuery.each( AmazonList, function( i, valor ) {
		if (valor == id){
			AmazonList[i] = 'null';
		}	
	});
	jQuery.each( AmazonList, function( i, valor ) {
		if (valor !='null'){
			existe = true;
			var informacion = $("#"+valor).html();
			$("#productos-amazon").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'>"+informacion+"<div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' value='1'></div></div>");
		}		
	});
	if (existe == false){
		//alert("lista vacia");
		$("#lista-amazon").hide();
	}
} 
 
 
 
 