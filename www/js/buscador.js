function OcultarProductos(){
	$(".triangulo.buscador").hide();
	$("#Ebay").hide();
	$("#lg-ebay").hide();
	$("#Amazon").hide();
	$("#lg-amazon").hide();
	//$("#Amazon-Productos" ).removeClass( "active" );
	//$("#Ebay-Productos" ).removeClass( "active" );
	//$("#Alibaba").hide();	
}
function Cargando(){
	var loading = $(".load-productos").html();
	$("#Ebay").html("");
	$("#Ebay").append(loading);
	$("#Amazon").html("");
	$("#Amazon").append(loading);
	
}
// --------- BUSCADOR DE PRODUCTOS DE INICIO---------------
$(function() {  
  $("#buscador-inicio").on("keydown", function(e) {
    if (e.keyCode === 13) {
	  BuscadorInicio();
    }
  });  
});

function BuscadorInicio(){
	var keyword = $.trim(document.getElementById("buscador-inicio").value);
	if (keyword==""){
		document.getElementById("buscador-inicio").value="";
		$("#buscador-inicio").focus();
	}
	else{
		menu(3);
		OcultarProductos();
		//$("#Ebay-Productos").addClass( "active" );
		$("#tiendas").val(1);
		$("#lg-ebay").show();
		$(".triangulo.buscador").show();
		$("#Ebay").show();
		Cargando();
		
		document.getElementById("buscar").value = keyword;
		document.getElementById("buscador-inicio").value = "";
		
		Amazon(keyword);
		Ebay(keyword);
		//Alibaba(keyword);
	}
}

// --------- BUSCADOR DE PRODUCTOS ---------------
$(function() { // EVENTO ENTER
	$("#buscar").on("keydown", function(e) {
		if (e.keyCode === 13) {
		  BuscarProducto();
		  document.activeElement.blur(); // ocultar teclado
		}
	});
});
function BuscarProducto(){
	var keyword = $.trim(document.getElementById("buscar").value);
	if (keyword==""){
		document.getElementById("buscar").value="";
		$("#buscar").focus();
	}
	else{
		OcultarProductos();
		$("#tiendas").val(1);
		//$("#Ebay-Productos").addClass( "active" );
		$("#lg-ebay").show();
		$(".triangulo.buscador").show();
		$("#Ebay").show();
		Cargando();
		
		Amazon(keyword);
		Ebay(keyword);
		//Alibaba(keyword);
	}
}

// ------- PESTAÑAS DE TIENDAS ---------------- 
function EbayContent(){
	OcultarProductos();
	//alert("asd ebay");
	//$("#Ebay-Productos").addClass( "active" );
	$(".triangulo.buscador").show();
	$("#lg-ebay").show();
	$("#Ebay").show();
}
function AmazonContent(){
	OcultarProductos();
	//$("#Amazon-Productos").addClass( "active" );
	$(".triangulo.buscador").show();
	$("#lg-amazon").show();
	$("#Amazon").show();
}

// -------- PRODUCTOS POR PESTAÑAS ------------------
function Ebay(producto){
	//Cargando();
	var texto = producto.replace(/ /g,"+");
	var SearchUrl = 'https://m.ebay.com/sch/i.html?_from=R40&_trksid=p2056088.m4084.l1313.TR12.TRC2.A0.H0.X'+texto+'.TRS0&_nkw='+texto;
	//var SearchUrl = 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2056088.m4084.l1313.TR12.TRC2.A0.H0.X'+texto+'.TRS0&_nkw='+texto;
	var Url = ''+SearchUrl+' #srp-river-main';
	
	$('#Ebay').load(Url, function() {
		$( "#srp-river-results-message1" ).remove();
		$( "#srp-river-results-message2" ).remove();
		$( "#srp-river-results-SEARCH_STATUS_MODEL_V2" ).remove();
		$( "#srp-river-results-query_answer1" ).remove();
		$( "#srp-river-results-SEARCH_PAGINATION_MODEL_V2" ).remove();
		$( "#srp-river-results-query_answer2" ).remove();
		var element = $('.s-item').length;
		//var element = $('#srp-river-main .s-item').length;
		//alert(element);
		if (element == 0){
			Ebay(producto);
		}
		else{
			var index = 0;
			
			$( "#srp-river-main .s-item" ).each(function( index ) {			
				if( index < element){	
					var id="eb"+index;			
					var enlace = $('.s-item__link').attr('href');
					var contenido = $('.s-item__wrapper').html();
					$( this ).html("<div id='ebay-"+index+"' class='info-producto'>"+ contenido + "<div id='enlace-"+id+"' style='display:none;'><span>"+enlace+"</span></div></div><div class='select-producto'><div class='div-boton'><div id='lbl-onn-"+id+"' class='boton-seleccionar' onclick='ListaEbay("+index+")'>Me Interesa</div><div id='lbl-off-"+id+"' style='display:none;'>Agregado a Lista</div> </div><div class='div-boton espacio'></div> <div class='div-boton'><div id='btn-onn-"+id+"' class='boton-seleccionar' onclick='ListaEbay("+index+")'>Seleccionar</div><div id='btn-off-"+id+"' class='boton-seleccionado' style='display:none;' onclick='QuitarListaEbay("+index+")'>Eliminar</div></div></div>");
				}
			});	
		}		
	});
}
function Amazon(producto){
	//Cargando();
	var texto = producto.replace(/ /g,"+");
	var SearchUrl = 'https://www.amazon.com/gp/aw/s/ref=is_s?k='+texto;
	//var SearchUrl = 'https://www.amazon.com/s?k='+texto+'&ref=is_s';
	//alert(SearchUrl);
	var Url = ''+SearchUrl+' #resultItems';
	//var Url = ''+SearchUrl+'';
	//alert("amazon");
	$('#Amazon').load(Url, function() {
		
	//alert("cargA");
		//$( ".sx-acs" ).remove();
		var element = $('#resultItems .sx-table-item').length;
		//var element = $('#rightResultsATF .s-result-item').length;
		//alert(element+" amazon");
		if (element == 0){
			//alert("nada");
			Amazon(producto);
		}
		else{
			//alert("encontro");
			var index = 0;
			$( "#resultItems .sx-table-item" ).each(function( index ) {			
				if( index <= element){
					var id="am"+index;
					var enlace = $('.aw-search-results').attr('href');
					var link ="https://www.amazon.com" + enlace;
					var contenido = $('.sx-table-row').html();
					$( this ).html("<div id='amazon-"+index+"' class='info-producto'>"+ contenido + "<div id='enlace-"+id+"' style='display:none;'><span>"+link+"</span></div></div><div class='select-producto'><div class='div-boton'><div id='lbl-onn-"+id+"' class='boton-seleccionar' onclick='ListaAmazon("+index+")'>Me Interesa</div><div id='lbl-off-"+id+"' style='display:none;'>Agregado a la lista</div></div><div class='div-boton espacio'></div> <div class='div-boton'><div id='btn-onn-"+id+"' class='boton-seleccionar' onclick='ListaAmazon("+index+")'>Seleccionar</div><div id='btn-off-"+id+"' class='boton-seleccionado' style='display:none;' onclick='QuitarListaAmazon("+index+")'>Eliminar</div></div></div>");
				}
			});	
		}		
	});
}

/*
function Alibaba(producto){	
	var SearchUrl = 'https://m.alibaba.com/trade/search?SearchText=';
	var Url = ''+SearchUrl+producto+' #page';	
		
	$('#Alibaba').load(Url, function() {
		$( ".app-banner" ).remove();
		var element = $('.product-item').length;
		alert("total: "+element);
		var index = 0;
		
		/*$( "#page .product-item" ).each(function( index ) {
			
			if( index < element){				
			//	var enlace = $('.aw-search-results').attr('href');
			//	var link ="https://www.amazon.com" + enlace;
				var contenido = $('.product-item').html();
				$(this).html(contenido);
			//	$( this ).html(contenido + "<div class='select-producto'><label>Me Interesa</label> <button id='"+index+"' value='"+link+"'>Seleccionar</button></div>");
			}
		});*/
	/*	
	});
}*/



