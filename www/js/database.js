// global variables
var db;
var shortName = 'AR';
var version = '1.0';
var displayName = 'AR';
var maxSize = 500000000;

function CrearBD(){
	
//alert("DEBUGGING: we are in the onBodyLoad() function");
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
   return;
 }
 db = openDatabase(shortName, version, displayName,maxSize);
 
 db.transaction(function(tx){ //Usuario,Nombre,Telefono,Email,Mensaje,Tienda,Producto,Imagen,Precio,Enlace,Cantidad,Fecha
   tx.executeSql( 'CREATE TABLE IF NOT EXISTS ListaBD (Usuario TEXT NOT NULL, Nombre TEXT NOT NULL, Telefono TEXT NOT NULL, Email TEXT NOT NULL, Mensaje TEXT NOT NULL, Tienda TEXT NOT NULL, Producto TEXT NOT NULL, Imagen TEXT NULL, Precio TEXT NOT NULL, Enlace TEXT NOT NULL, Cantidad DECIMAL(18,2) NOT NULL, Fecha DATE NOT NULL)',[],nullHandler,errorHandler);
   },errorHandler,successCallBack);
}

function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}

function successCallBack() {
  // alert("DEBUGGING: success");
}

function nullHandler(){}

	var ProductosEbay = "";
	
var f = "";
var Fecha = "";

var fila = 0;
var bdUsuario = "";
var bdNombre = "";
var bdTelefono =  "";
var bdEmail = "";
var bdProducto = "";
var bdImagen = "";
var bdPrecio = "";
var bdEnlace = "";
var bdCantidad = "";
var bdFecha = "";


function AddValueToDB() {
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
   return;
 }
 f = new Date();
 Fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();

 fila = 0;
 bdUsuario = "";
 bdNombre = $("#form-lista-nombre").val();
 bdTelefono =  $("#form-lista-telefono").val();
 bdEmail = $("#form-lista-email").val();
 bdMensaje = $("#form-lista-mensaje").val();

 bdProducto = "";
 bdImagen = "";
 bdPrecio = "";
 bdEnlace = "";
 bdCantidad = "";
 bdFecha = "";
	
	ProductosEbay = Lista_Ebay.length / 4;
	
	if (Lista_Ebay.length > 0){
		bdProducto = Lista_Ebay[fila];
		fila += 1;
		bdPrecio = Lista_Ebay[fila];
		fila += 1;
		bdCantidad = Lista_Ebay[fila];
		fila += 1;
		bdEnlace = Lista_Ebay[fila];
		fila += 1;
		InsertarProducto();
	}
	/*
	jQuery.each( Lista_Ebay, function( i, valor ) {
		if (valor != 'null'){		
			
			if (fila == 0){
			//	bdProducto = "";
				bdProducto = valor;
				fila += 1;
			}
			else if (fila == 1){
			//	bdPrecio = "";
				bdPrecio = valor;
				fila += 1;
			}
			else if (fila == 2){
			//	bdCantidad = "";
				bdCantidad = valor;
				fila += 1;
			}
			else if (fila == 3){
			//	bdEnlace = "";
				bdEnlace = valor;
				fila += 1;
			}
			
			if (fila == 4){
		//		db.transaction(function(transaction) {transaction.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',["",bdNombre,bdTelefono,bdEmail,bdMensaje,"Ebay",bdProducto,"",bdPrecio,bdEnlace,bdCantidad,Fecha],nullHandler,errorHandler);});
				fila = 0;
			}
		//	alert(bdProducto);

		}
	});*/
	Lista_Ebay = [];
	//Reporte();
	
	//return;
}
function InsertarProducto(){
		db.transaction(function(tx){
			tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',["NA&$$",bdNombre,bdTelefono,bdEmail,bdMensaje,"Ebay",bdProducto,"",bdPrecio,bdEnlace,bdCantidad,Fecha],dbInsert,errorHandler);
		});
		/*db.transaction(function(tx){
			tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',["NA&$$","","","","","","","","","","",""],dbInsert,errorHandler);
		});*/
}
function dbInsert(ctx, result){
	alert("asd");
	if (ProductosEbay > 1){
		
		for (var row = 1; row < ProductosEbay; row++){
			bdProducto = Lista_Ebay[fila];
			fila += 1;
			bdPrecio = Lista_Ebay[fila];
			fila += 1;
			bdCantidad = Lista_Ebay[fila];
			fila += 1;
			bdEnlace = Lista_Ebay[fila];
			fila += 1;
			
			db.transaction(function(tx){
				tx.executeSql('INSERT INTO ListaBD(Usuario,Nombre,Telefono,Email,Mensaje,Tienda,Producto,Imagen,Precio,Enlace,Cantidad,Fecha)VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
							["",bdNombre,bdTelefono,bdEmail,bdMensaje,"Ebay",bdProducto,"",bdPrecio,bdEnlace,bdCantidad,Fecha],nullHandler,errorHandler);
			});
		}
		
	}
   /* var len = result.rows.length;
    var found = false;
    for(var n = 0; n < newsContainer.length; n++){
        for(var r = 0; r < len; r++){
            if(result.rows.item(r).n_title == newsContainer[n].title 
               && result.rows.item(r).n_pubdate == newsContainer[n].pubdate){
                found = r;
            }
        }
        if(found == false){
            var title = newsContainer[n].title;
            var link = newsContainer[n].link;
            var creator = newsContainer[n].creator;
            var pubdate = newsContainer[n].pubdate;
            var description = newsContainer[n].description;
            ctx.executeSql("INSERT INTO NEWS (n_title, n_link, n_creator, n_pubdate, n_description) VALUES (?,?,?,?,?)",
                        [title, link, creator, pubdate, description], insertSuccess, dbErrorCB);
        } else {
            found = false;
        }
    }*/
}


function borrar(){
	db.transaction(function(transaction) {transaction.executeSql('DROP TABLE IF EXISTS ListaBD');});
	
}
function Reporte() {	
//db.transaction(function(transaction) {transaction.executeSql('DROP TABLE IF EXISTS ListaBD');});
			
	/*db.executeSql('DROP TABLE IF EXISTS Lista');
	db.executeSql('DROP TABLE IF EXISTS ListaBD');*/
	
	jQuery.each( Lista_Ebay, function( i, valor ) {
		if (valor != 'null'){
			alert(valor);
		}
	});
	
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
  return;
 }
 $('#bd').html('');
 $('#bd').append('<tr><th>'+"1"+'</th><th>'+"2"+'</th><th>'+"3"+'</th><th>'+"4"+'</th><th>'+"5"+'</th><th>'+"6"+'</th></tr>');
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT rowid,Usuario,Tienda,Producto,Precio,Enlace,Cantidad,Fecha FROM ListaBD;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $('#bd').append('<tr id="'+row.rowid+'"><td>' + row.Usuario + '</td><td>' + row.Producto+ '</td><td>' + row.Precio + '</td><td>' + row.Cantidad+'</td><td>' + row.Enlace+'</td><td>' + row.Fecha+'</td></tr>');
        } 
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;
}







function UpdateValueToDB() {
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
   return;
 }
var kmf=document.getElementById("kilometrajefinal").value;
var viaje=document.getElementById("viajedt").value;
var kini="";
var litros="";
var valor="";
var rendimiento="";
db.transaction(function(transaction) {
   transaction.executeSql('SELECT rowid,Litros,KilometrajeInicial FROM BDViajes WHERE rowid='+viaje+';', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
		  kini = row.KilometrajeInicial;
		  litros = row.Litros;
		  valor = (kmf-kini)/litros;
		  rendimiento = parseFloat(Math.round(valor * 100) / 100).toFixed(2);
		  
        }
db.transaction(function(transaction) {transaction.executeSql('UPDATE BDViajes SET KilometrajeFinal = ?,Rendimiento = ? WHERE rowid = ?',[kmf,rendimiento,viaje],nullHandler,errorHandler);});
      }
     },errorHandler);
 },errorHandler,nullHandler);
 

document.getElementById("viajedt").value='';
document.getElementById("kilometrajefinal").value='';
alert("El viaje ha sido finalizado");
// submenu(1);
 return;
}
/*
function ShowValueToDB() {
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
   return;
 } 
 $('#viajedt').html('');
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT rowid,Ruta FROM BDViajes WHERE kilometrajefinal='+"''"+';', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $('#viajedt').append('<option value="'+row.rowid+'">' + row.Ruta + '</option>');
        } 
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;
}

function Reporte() {
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
  return;
 }
 $('#Datos').html('');
 $('#Datos').append('<tr class="encabezado"><th>'+"RUTA"+'</th><th style="width: 60px;">'+"LITROS"+'</th><th>'+"KM.INICIAL"+'</th><th>'+"KM.FINAL"+'</th><th style="width: 60px;">'+"FECHA"+'</th></tr>');
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT rowid,Ruta,Litros,KilometrajeInicial,KilometrajeFinal,Rendimiento,Fecha FROM BDViajes;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $('#Datos').append('<tr id="'+row.rowid+'" class="dt" onclick="calcular('+row.rowid+')"><td>' + row.Ruta + '</td><td>' + row.Litros+ '</td><td>' + row.KilometrajeInicial+ '</td><td>' + row.KilometrajeFinal + '</td><td>' + row.Fecha+'</td></tr>');
        } 
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;
}

var select=0;
var c=false
function calcular(viaje){
	if(select!=viaje){
		if(c==false){
			select=viaje;
			document.getElementById(viaje).className="datos";
			c=true;
		}
		else {
			document.getElementById(select).className="dt";
			select=viaje;
			document.getElementById(viaje).className="datos";
		}
	}
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
  return;
 }
 var kmi=0;
 var kmf=0;
 var ltr=0;
 var rend=0;
 $('#rendimientolitros').html('');
 
db.transaction(function(transaction) {
   transaction.executeSql('SELECT rowid,Magna,Premium,Diesel,Litros,Combustible,KilometrajeInicial,KilometrajeFinal,Rendimiento FROM BDViajes WHERE rowid ='+viaje+';', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
		  var rend = row.Rendimiento;
		  document.getElementById("rendimientolitros").value = rend +' km x Litro';
        }
      }
     },errorHandler);
 },errorHandler,nullHandler);
 
 return;
}
*/