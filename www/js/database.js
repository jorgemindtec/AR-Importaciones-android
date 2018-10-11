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
 
 db.transaction(function(tx){ //Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha
   tx.executeSql( 'CREATE TABLE IF NOT EXISTS ListaBD (Usuario TEXT NOT NULL, Nombre TEXT NOT NULL, Telefono TEXT NOT NULL, Email TEXT NOT NULL, Mensaje TEXT NOT NULL, Tienda TEXT NOT NULL, IdProducto TEXT NOT NULL, Producto TEXT NOT NULL, Imagen TEXT NULL, Precio TEXT NOT NULL, Enlace TEXT NOT NULL, Cantidad DECIMAL(18,2) NOT NULL, Fecha DATE NOT NULL)',[],nullHandler,errorHandler);
   },errorHandler,successCallBack);
}

function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}

function successCallBack() {
  // alert("DEBUGGING: success");
}
function nullHandler(){}

function borrar(){
	db.transaction(function(transaction) {transaction.executeSql('DROP TABLE IF EXISTS ListaBD');});
	
}
function Reporte() {
 if (!window.openDatabase) {
   alert('Error con la Base de Datos');
  return;
 }
 $('#bd').html('');
 $('#bd').append('<tr><th>'+"1"+'</th><th>'+"2"+'</th><th>'+"3"+'</th><th>'+"4"+'</th></tr>');
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT rowid,Usuario,Tienda,IdProducto,Producto,Precio,Enlace,Cantidad,Fecha FROM ListaBD;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $('#bd').append('<tr id="'+row.rowid+'"><td>' + row.Usuario + '</td><td>' + row.IdProducto+ '</td><td>' + row.Producto+ '</td><td>' + row.Fecha+'</td></tr>');
        } 
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;
}

function BorrarProducto(codigo){
	db.transaction(function(transaction) {
	   transaction.executeSql('SELECT * FROM ListaBD;', [],
		 function(transaction, result) {
		  if (result != null && result.rows != null) {
			for (var i = 0; i < result.rows.length; i++) {
			  var row = result.rows.item(i);			  
			  if(row.Usuario == "" && row.IdProducto == codigo){
				db.transaction(function(tx){
					tx.executeSql('DELETE FROM ListaBD WHERE Usuario = ? and IdProducto= ?',["",codigo],nullHandler,errorHandler);
				});
			  }		
			} 
		  }
		 },errorHandler);
	 },errorHandler,nullHandler);
 }

function ClearBD(){
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM ListaBD WHERE Usuario = ?',[""],nullHandler,errorHandler);
	});
}

function UpdateBD(){
	if (IdUsuarioLogin == ""){
		alert("no usuario "+IdUsuarioLogin)
	}
	else{
		alert("usuario "+IdUsuarioLogin);
	}
	
}


/* ************************** UPDATE
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
}*/





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
