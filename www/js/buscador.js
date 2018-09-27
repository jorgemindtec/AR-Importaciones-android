function OcultarProductos(){
	$(".triangulo.buscador").hide();
	$("#Ebay").hide();
	$("#lg-ebay").hide();
	$("#Amazon").hide();
	$("#lg-amazon").hide();
	$("#Alibaba").hide();	
	$("#lg-alibaba").hide();
	$("#MadeChina").hide();	
	$("#lg-madechina").hide();
	$("#Aliexpress").hide();	
	$("#lg-aliexpress").hide();
}
function Cargando(){
	var loading = $(".load-productos").html();
	$("#Ebay").html("");
	$("#Ebay").append(loading);
	$("#Amazon").html("");
	$("#Amazon").append(loading);
	$("#Alibaba").html("");
	$("#Alibaba").append(loading);
	$("#MadeChina").html("");
	$("#MadeChina").append(loading);
	$("#Aliexpress").html("");
	$("#Aliexpress").append(loading);
	
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
		Alibaba(keyword);
		MadeChina(keyword);
		Aliexpress(keyword);
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
		$("#lg-ebay").show();
		$("#Ebay").show();
		$(".triangulo.buscador").show();
			Cargando();
		
		Amazon(keyword);
		Ebay(keyword);
		Alibaba(keyword);
		MadeChina(keyword);
		Aliexpress(keyword);
	}
}

// ------- PESTAÑAS DE TIENDAS ---------------- 
/*function EbayContent(){
	OcultarProductos();
	$(".triangulo.buscador").show();
	$("#lg-ebay").show();
	$("#Ebay").show();
}
function AmazonContent(){
	OcultarProductos();
	$(".triangulo.buscador").show();
	$("#lg-amazon").show();
	$("#Amazon").show();
}
function AlibabaContent(){
	OcultarProductos();
	//$("#Amazon-Productos").addClass( "active" );
	$(".triangulo.buscador").show();
	$("#lg-alibaba").show();
	$("#Alibaba").show();
}*/

// -------- PRODUCTOS POR PESTAÑAS ------------------
function Ebay(producto){
	var texto = producto.replace(/ /g,"+");
	var SearchUrl = 'https://m.ebay.com/sch/i.html?_from=R40&_trksid=p2056088.m4084.l1313.TR12.TRC2.A0.H0.X'+texto+'.TRS0&_nkw='+texto;
	var Url = ''+SearchUrl+' #srp-river-main';
	
	$('#Ebay').load(Url, function() {
		$( "#srp-river-results-message1" ).remove();
		$( "#srp-river-results-message2" ).remove();
		$( "#srp-river-results-SEARCH_STATUS_MODEL_V2" ).remove();
		$( "#srp-river-results-query_answer1" ).remove();
		$( "#srp-river-results-SEARCH_PAGINATION_MODEL_V2" ).remove();
		$( "#srp-river-results-query_answer2" ).remove();
		var element = $('.s-item').length;
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
	var texto = producto.replace(/ /g,"+");
	var SearchUrl = 'https://www.amazon.com/gp/aw/s/ref=is_s?k='+texto;
	var Url = ''+SearchUrl+' #resultItems';
	$('#Amazon').load(Url, function() {
		
		var element = $('#resultItems .sx-table-item').length;
		if (element == 0){
			Amazon(producto);
		}
		else{
			var index = 0;
			$( "#resultItems .sx-table-item" ).each(function( index ) {			
				if( index < element){
					var id="am"+index;
					var enlace = $('.aw-search-results').attr('href');
					var link ="https://www.amazon.com" + enlace;
					var imagen = $('.sx-product-image').attr('src');
					var texto = $('.sx-table-detail').html();
					var contenido = "<div class='sx-table-pic'><img src='"+imagen+"'></div><div class='sx-table-detail'>"+texto+"</div>";
					//var contenido = $('.sx-table-row').html();
					$( this ).html("<div id='amazon-"+index+"' class='info-producto'>"+ contenido + "<div id='enlace-"+id+"' style='display:none;'><span>"+link+"</span></div></div><div class='select-producto'><div class='div-boton'><div id='lbl-onn-"+id+"' class='boton-seleccionar' onclick='ListaAmazon("+index+")'>Me Interesa</div><div id='lbl-off-"+id+"' style='display:none;'>Agregado a la lista</div></div><div class='div-boton espacio'></div> <div class='div-boton'><div id='btn-onn-"+id+"' class='boton-seleccionar' onclick='ListaAmazon("+index+")'>Seleccionar</div><div id='btn-off-"+id+"' class='boton-seleccionado' style='display:none;' onclick='QuitarListaAmazon("+index+")'>Eliminar</div></div></div>");
				}
			});
		}		
	});
}

function Alibaba(producto){	
	var texto = producto.replace(/ /g,"+");
	var SearchUrl = 'https://m.alibaba.com/trade/search?SearchText='+texto;
	var Url = ''+SearchUrl+' #page';
	
	$('#Alibaba').load(Url, function() {
		$( ".app-banner" ).remove();
		var element = $('.product-item').length;
		if (element == 0){
			Alibaba(producto);
		}
		else{
			var index = 0;
			
			$( "#page .product-item" ).each(function( index ) {
				if( index < element){	
					var id="alb"+index;			
					var enlace = $('.product-detail').attr('href');
					var imagen = $('.image-wrap img').attr('src');
					var srcimage = "https:"+imagen
					var texto = $('.product-info-wrap').html()
					//alert("index "+index+" | enlace "+enlace+" | imagen "+imagen);
					//var contenido = $('.product-detail').html();
					$( this ).html("<div id='alibaba-"+index+"' class='info-producto'><div class='sx-table-pic'><img src='"+srcimage+"'></div>"+texto+ "<div id='enlace-"+id+"' style='display:none;'><span>"+enlace+"</span></div></div><div class='select-producto'><div class='div-boton'><div id='lbl-onn-"+id+"' class='boton-seleccionar' onclick='ListaAlibaba("+index+")'>Me Interesa</div><div id='lbl-off-"+id+"' style='display:none;'>Agregado a Lista</div> </div><div class='div-boton espacio'></div> <div class='div-boton'><div id='btn-onn-"+id+"' class='boton-seleccionar' onclick='ListaAlibaba("+index+")'>Seleccionar</div><div id='btn-off-"+id+"' class='boton-seleccionado' style='display:none;' onclick='QuitarListaAlibaba("+index+")'>Eliminar</div></div></div>");
				}
			});
		}
	});
		
}

function MadeChina(producto){
	var texto = producto.replace(/ /g,"+");
	var SearchUrl = 'https://m.made-in-china.com/search/product?word='+texto;
	var Url = ''+SearchUrl+' .products-wrap';
	
	$('#MadeChina').load(Url, function() {
		var element = $('.list-item').length;
		if (element == 0){
			MadeChina(producto);
		}
		else{
			var index = 0;
			
			$( ".products-wrap .list-item" ).each(function( index ) {
				if( index < element){	
					var id="mdc"+index;			
					var enlace = $('.products-img').attr('href');
					var imagen = $('.products-img img').attr('data-original');
					//var texto = $('.products-info').html();
					var titulo = $('.pro-name a').html();
					var precio = $('.pro-price').html();
					var qty = $('.pro-moq').html();
					var año = $('.medal').html();
					var texto = "<div class='md-texto'><div class='md-titulo'>"+titulo+"</div><div class='md-precio'>"+precio+"</div><div class='md-qty'>"+qty+"</div><div class='md-año'>"+año+"</div></div>";
					//$(this ).html("<div><img src='"+imagen+"'>"+imagen+" as "+texto+"</div>");
					$( this ).html("<div id='madechina-"+index+"' class='info-producto'><div class='sx-table-pic'><img src='"+imagen+"'></div>"+ texto + "<div id='enlace-"+id+"' style='display:none;'><span>"+enlace+"</span></div></div><div class='select-producto'><div class='div-boton'><div id='lbl-onn-"+id+"' class='boton-seleccionar' onclick='ListaMadeChina("+index+")'>Me Interesa</div><div id='lbl-off-"+id+"' style='display:none;'>Agregado a Lista</div> </div><div class='div-boton espacio'></div> <div class='div-boton'><div id='btn-onn-"+id+"' class='boton-seleccionar' onclick='ListaMadeChina("+index+")'>Seleccionar</div><div id='btn-off-"+id+"' class='boton-seleccionado' style='display:none;' onclick='QuitarListaMadeChina("+index+")'>Eliminar</div></div></div>");
				}
			});
		}	
	});
}


function Aliexpress(producto){
	var texto = producto.replace(/ /g,"-");
	//var SearchUrl = 'https://m.aliexpress.com/wholesale/'+texto+'.html?channel=direct&keywords='+texto;
	var SearchUrl = 'https://www.aliexpress.com/af/'+texto+'.html?SearchText='+texto+'&blanktest=0&origin=n&jump=afs';
	//alert(SearchUrl);
	var Url = ''+SearchUrl+' #hs-below-list-items';
	
	$('#Aliexpress').load(Url, function() {
		var element = $('.list-item').length;
		//alert(element);
		if (element == 0){
			Aliexpress(producto);
		}
		else{
			var index = 0;
			
			$( "#hs-below-list-items .list-item" ).each(function( index ) {
				if( index < 8){	
					var id="ali"+index;			
					var enlace = $('.product-item-list').attr('href');
					
					var imagensrc = $('.img .pic img').attr('src');
					var imagen ='https:'+imagensrc;
					//var texto = $('.products-info').html();
					/*var titulo = $('.pro-name a').html();
					var precio = $('.pro-price').html();
					var qty = $('.pro-moq').html();
					var año = $('.medal').html();*/
					//var texto = "<div class='md-texto'><div class='md-titulo'>"+titulo+"</div><div class='md-precio'>"+precio+"</div><div class='md-qty'>"+qty+"</div><div class='md-año'>"+año+"</div></div>";
					$(this ).html("<div><img src='"+imagen+"'>"+imagen+"</div>");
					//$( this ).html("<div id='aliexpress-"+index+"' class='info-producto'><div class='sx-table-pic'><img src='"+imagen+"'></div>"+ texto + "<div id='enlace-"+id+"' style='display:none;'><span>"+enlace+"</span></div></div><div class='select-producto'><div class='div-boton'><div id='lbl-onn-"+id+"' class='boton-seleccionar' onclick='ListaMadeChina("+index+")'>Me Interesa</div><div id='lbl-off-"+id+"' style='display:none;'>Agregado a Lista</div> </div><div class='div-boton espacio'></div> <div class='div-boton'><div id='btn-onn-"+id+"' class='boton-seleccionar' onclick='ListaMadeChina("+index+")'>Seleccionar</div><div id='btn-off-"+id+"' class='boton-seleccionado' style='display:none;' onclick='QuitarListaMadeChina("+index+")'>Eliminar</div></div></div>");
				}
			});
		}	
	});
}
