 var TotalProducto = 0;
 
 var EbayList = [];
 var NumeroEbay = 0; 
 var AmazonList = [];
 var NumeroAmazon = 0;
 var AlibabaList = [];
 var NumeroAlibaba = 0;
 var MadechinaList = [];
 var NumeroMadechina = 0;
 var AliexpressList = [];
 var NumeroAliexpress = 0;

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

//var NumProEbay = 0;
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
	
	var imagen = $("#"+id+" .s-item__image-section").html();
	var titulo = $("#"+id+" .s-item__title").html();
	var precio = $("#"+id+" .s-item__price span").html();
	var url = $("#"+id+" .link span").html();	
	$("#productos-ebay").append("<div id='item-"+id+"' class='lista-productos-seleccionados'><div style='text-align:right;position: relative;'><img class='eliminarlista producto' src='img/eliminar.png' onclick='QuitarListaEbay("+producto+")'></div><div class='s-item__image-section'>"+imagen+"</div><div class='s-item__info clearfix'><h3 class='s-item__title'>"+titulo+"</h3><span>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+id+"' min='1' max='999' step='1' value='1'></div></div>");	
	
	var f = new Date();
	var Fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
					["","","","","","Ebay",id,titulo,"",precio,url,"",Fecha],nullHandler,errorHandler);
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
	
	var id = "item-ebay-"+producto;		
	$("#"+id).remove();	
	var pr = "ebay-"+producto; 
	
	var element = $('#productos-ebay .lista-productos-seleccionados').length;
	if (element == 0){
		$("#lista-ebay").hide();
	}	
	jQuery.each( EbayList, function( i, valor ) {
		if (valor == pr){
			EbayList[i] = 'null';			
		}
	});
	BorrarProducto(pr);
	//$("#productos-ebay").html("");
	/*jQuery.each( EbayList, function( i, valor ) {
		if (valor !='null'){
			existe = true;
			var imagen = $("#"+valor+" .s-item__image-section").html();
			var titulo = $("#"+valor+" .s-item__title").html();
			var precio = $("#"+valor+" .s-item__price span").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-ebay").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='s-item__image-section'>"+imagen+"</div><div class='s-item__info clearfix'><h3 class='s-item__title'>"+titulo+"</h3><span class='price_am'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
			//var informacion = $("#"+valor).html();
			//$("#productos-ebay").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'>"+informacion+"<div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' value='1'></div></div>");
		}
	});
	if (existe == false){
		$("#lista-ebay").hide();
	}*/
} 
 //* ************** ** * * ** *
function ListaAmazon(producto){
	MostrarMensajeCarrito();
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
	
	var imagen = $("#"+id+" .sx-table-pic").html();
	var titulo = $("#"+id+" .sx-title.sx-title-inline").html();
	var precio = $("#"+id+" .a-size-small.a-color-price.a-text-bold").html();
	var url = $("#"+id+" .link span").html();			
	$("#productos-amazon").append("<div id='item-"+id+"' class='lista-productos-seleccionados'><div style='text-align:right;position: relative;'><img class='eliminarlista producto' src='img/eliminar.png' onclick='QuitarListaAmazon("+producto+")'></div><div class='sx-table-pic'>"+imagen+"</div><div class='sx-table-detail'><h5 class='sx-title sx-title-inline'>"+titulo+"</h5><span class='price_am'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+id+"' min='1' max='999' step='1' value='1'></div></div>");
	
	var f = new Date();
	var Fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
					["","","","","","Amazon",id,titulo,"",precio,url,"",Fecha],nullHandler,errorHandler);
	});		
	/*$("#productos-amazon").html("");
	jQuery.each( AmazonList, function( i, valor ) {
		if (valor != 'null'){
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .sx-title.sx-title-inline").html();
			var precio = $("#"+valor+" .a-size-small.a-color-price.a-text-bold").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-amazon").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='sx-table-detail'><h5 class='sx-title sx-title-inline'>"+titulo+"</h5><span class='price_am'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
			//var informacion = $("#"+valor).html();
			//$("#productos-amazon").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'>"+informacion+"<div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});	*/
}
function QuitarListaAmazon(producto){
	var existe = false;
	TotalProducto-=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-am"+producto).show();
	$("#lbl-off-am"+producto).hide();
	$("#btn-onn-am"+producto).show();
	$("#btn-off-am"+producto).hide();
	
	var id = "item-amazon-"+producto;	
	$("#"+id).remove();
	
	var pr = "amazon-"+producto; 
	
	var element = $('#productos-amazon .lista-productos-seleccionados').length;
	if (element == 0){
		$("#lista-amazon").hide();
	}	
	jQuery.each( AmazonList, function( i, valor ) {
		if (valor == pr){
			AmazonList[i] = 'null';
		}	
	});
	BorrarProducto(pr);
/*	$("#productos-amazon").html("");
	jQuery.each( AmazonList, function( i, valor ) {
		if (valor !='null'){
			existe = true;
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .sx-title.sx-title-inline").html();
			var precio = $("#"+valor+" .a-size-small.a-color-price.a-text-bold").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-amazon").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='sx-table-detail'><h5 class='sx-title sx-title-inline'>"+titulo+"</h5><span>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
			//var informacion = $("#"+valor).html();
			//$("#productos-amazon").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'>"+informacion+"<div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' value='1'></div></div>");
		}		
	});
	if (existe == false){
		$("#lista-amazon").hide();
	}*/	
} 
 //* ************** ** * * ** *
function ListaAlibaba(producto){
	MostrarMensajeCarrito();
	TotalProducto+=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-alb"+producto).hide();
	$("#lbl-off-alb"+producto).show();
	$("#btn-onn-alb"+producto).hide();
	$("#btn-off-alb"+producto).show();
	
	var id = "alibaba-"+producto;	
	AlibabaList[NumeroAlibaba] = id;
	NumeroAlibaba+=1;
	$("#lista-alibaba").show();
	
	var imagen = $("#"+id+" .sx-table-pic").html();
	var titulo = $("#"+id+" .product-title").html();
	var precio = $("#"+id+" .product-price").html();
	var url = $("#"+id+" .link span").html();			
	$("#productos-alibaba").append("<div id='item-"+id+"' class='lista-productos-seleccionados'><div style='text-align:right;position: relative;'><img class='eliminarlista producto' src='img/eliminar.png' onclick='QuitarListaAlibaba("+producto+")'></div><div class='sx-table-pic'>"+imagen+"</div><div class='s-item__info clearfix'><h3 class='product-title'>"+titulo+"</h3><span class='price_alb'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+id+"' min='1' max='999' step='1' value='1'></div></div>");
	
	var f = new Date();
	var Fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
					["","","","","","Alibaba",id,titulo,"",precio,url,"",Fecha],nullHandler,errorHandler);
	});	
	/*$("#productos-alibaba").html("");
	jQuery.each( AlibabaList, function( i, valor ) {
		if (valor != 'null'){
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .product-title").html();
			var precio = $("#"+valor+" .product-price").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-alibaba").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='s-item__info clearfix'><h3 class='product-title'>"+titulo+"</h3><span class='price_alb'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});*/
}
function QuitarListaAlibaba(producto){
	var existe = false;
	TotalProducto-=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-alb"+producto).show();
	$("#lbl-off-alb"+producto).hide();
	$("#btn-onn-alb"+producto).show();
	$("#btn-off-alb"+producto).hide();
	
	var id = "item-alibaba-"+producto;			
	$("#"+id).remove();	
	var pr = "alibaba-"+producto;	
	
	var element = $('#productos-alibaba .lista-productos-seleccionados').length;
	if (element == 0){
		$("#lista-alibaba").hide();
	}	
	jQuery.each( AlibabaList, function( i, valor ) {
		if (valor == pr){
			AlibabaList[i] = 'null';			
		}
	});
	BorrarProducto(pr);
	
	/*$("#productos-alibaba").html("");
	jQuery.each( AlibabaList, function( i, valor ) {
		if (valor !='null'){
			existe = true;
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .product-title").html();
			var precio = $("#"+valor+" .product-price").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-alibaba").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='s-item__info clearfix'><h3 class='product-title'>"+titulo+"</h3><span class='price_alb'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});
	if (existe == false){
		$("#lista-alibaba").hide();
	}*/
} 
 //* ************** ** * * ** *
function ListaMadechina(producto){
	MostrarMensajeCarrito();
	TotalProducto+=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-mdc"+producto).hide();
	$("#lbl-off-mdc"+producto).show();
	$("#btn-onn-mdc"+producto).hide();
	$("#btn-off-mdc"+producto).show();
	
	var id = "madechina-"+producto;	
	MadechinaList[NumeroMadechina] = id;
	NumeroMadechina+=1;
	$("#lista-madechina").show();
	
	var imagen = $("#"+id+" .sx-table-pic").html();
	var titulo = $("#"+id+" .md-titulo").html();
	var precio = $("#"+id+" .md-precio").html();
	var url = $("#"+id+" .link span").html();
	$("#productos-madechina").append("<div id='item-"+id+"' class='lista-productos-seleccionados'><div style='text-align:right;position: relative;'><img class='eliminarlista producto' src='img/eliminar.png' onclick='QuitarListaMadeChina("+producto+")'></div><div class='sx-table-pic'>"+imagen+"</div><div class='md-texto'><div class='md-titulo'>"+titulo+"</div><span class='md-precio'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+id+"' min='1' max='999' step='1' value='1'></div></div>");
	
	var f = new Date();
	var Fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
					["","","","","","MadeChina",id,titulo,"",precio,url,"",Fecha],nullHandler,errorHandler);
	});
	/*$("#productos-madechina").html("");
	jQuery.each( MadechinaList, function( i, valor ) {
		if (valor != 'null'){
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .md-titulo").html();
			var precio = $("#"+valor+" .md-precio").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-madechina").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='md-texto'><div class='md-titulo'>"+titulo+"</div><span class='md-precio'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});*/
}
function QuitarListaMadeChina(producto){
	var existe = false;
	TotalProducto-=1;
	$("#total-producto").text(""+TotalProducto+"");

	$("#lbl-onn-mdc"+producto).show();
	$("#lbl-off-mdc"+producto).hide();
	$("#btn-onn-mdc"+producto).show();
	$("#btn-off-mdc"+producto).hide();
	
	var id = "item-madechina-"+producto;		
	$("#"+id).remove();	
	var pr = "madechina-"+producto;	
	
	var element = $('#productos-madechina .lista-productos-seleccionados').length;
	if (element == 0){
		$("#lista-madechina").hide();
	}	
	jQuery.each( MadechinaList, function( i, valor ) {
		if (valor == pr){
			MadechinaList[i] = 'null';			
		}
	});
	BorrarProducto(pr);
	
/*	$("#productos-madechina").html("");
	jQuery.each( MadechinaList, function( i, valor ) {
		if (valor !='null'){
			existe = true;
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .md-titulo").html();
			var precio = $("#"+valor+" .md-precio").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-madechina").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='md-texto'><div class='md-titulo'>"+titulo+"</div><span class='md-precio'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});
	if (existe == false){
		$("#lista-madechina").hide();
	}*/
}
 //* ************** ** * * ** *
function ListaAliexpress(producto){
	MostrarMensajeCarrito();
	TotalProducto+=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-ali"+producto).hide();
	$("#lbl-off-ali"+producto).show();
	$("#btn-onn-ali"+producto).hide();
	$("#btn-off-ali"+producto).show();
	
	var id = "aliexpress-"+producto;	
	AliexpressList[NumeroAliexpress] = id;
	NumeroAliexpress+=1;
	$("#lista-aliexpress").show();
	
	var imagen = $("#"+id+" .sx-table-pic").html();
	var titulo = $("#"+id+" .ali-titulo").html();
	var precio = $("#"+id+" .ali-precio").html();
	var url = $("#"+id+" .link span").html();
	$("#productos-aliexpress").append("<div id='item-"+id+"' class='lista-productos-seleccionados'><div style='text-align:right;position: relative;'><img class='eliminarlista producto' src='img/eliminar.png' onclick='QuitarListaAliexpress("+producto+")'></div><div class='sx-table-pic'>"+imagen+"</div><div class='ali-texto'><h3 class='ali-titulo'>"+titulo+"</h3><span class='ali-precio'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+id+"' min='1' max='999' step='1' value='1'></div></div>");
	
	var f = new Date();
	var Fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
					["","","","","","Aliexpress",id,titulo,"",precio,url,"",Fecha],nullHandler,errorHandler);
	});	
	/*$("#productos-aliexpress").html("");
	jQuery.each( AliexpressList, function( i, valor ) {
		if (valor != 'null'){
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .ali-titulo").html();
			var precio = $("#"+valor+" .ali-precio").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-aliexpress").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='ali-texto'><h3 class='ali-titulo'>"+titulo+"</h3><span class='ali-precio'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});*/
}
function QuitarListaAliexpress(producto){
	var existe = false;
	TotalProducto-=1;
	$("#total-producto").text(""+TotalProducto+"");
	
	$("#lbl-onn-ali"+producto).show();
	$("#lbl-off-ali"+producto).hide();
	$("#btn-onn-ali"+producto).show();
	$("#btn-off-ali"+producto).hide();
	
	var id = "item-aliexpress-"+producto;		
	$("#"+id).remove();	
	var pr = "aliexpress-"+producto; 
	
	var element = $('#productos-aliexpress .lista-productos-seleccionados').length;
	if (element == 0){
		$("#lista-aliexpress").hide();
	}
	jQuery.each( AliexpressList, function( i, valor ) {
		if (valor == pr){
			AliexpressList[i] = 'null';			
		}
	});
	BorrarProducto(pr);
	
	/*$("#productos-aliexpress").html("");
	jQuery.each( AliexpressList, function( i, valor ) {
		if (valor !='null'){
			existe = true;
			var imagen = $("#"+valor+" .sx-table-pic").html();
			var titulo = $("#"+valor+" .ali-titulo").html();
			var precio = $("#"+valor+" .ali-precio").html();
			var url = $("#"+valor+" .link span").html();
			
			$("#productos-aliexpress").append("<div id='item-"+valor+"' class='lista-productos-seleccionados'><div class='sx-table-pic'>"+imagen+"</div><div class='ali-texto'><h3 class='ali-titulo'>"+titulo+"</h3><span class='ali-precio'>"+precio+"</span><div class='link' style='display:none;'>"+url+"</div></div><div class='cantidad-producto'><label>Cantidad: </label><input type='number' id='cantidad-"+valor+"' min='1' max='999' step='1' value='1'></div></div>");
		}
	});
	if (existe == false){
		$("#lista-aliexpress").hide();
	}*/
} 


 
 
