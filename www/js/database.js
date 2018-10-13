// global variables
var db;
var shortName = 'AR';
var version = '1.0';
var displayName = 'AR';
var maxSize = 500000000;

function CrearBD(){
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
 $('#Reporte').html("");
 var nuevalista = 0;
 var fechanueva = "";
 //Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha
 db.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM ListaBD WHERE Usuario = ? Order by Fecha', [IdUsuarioLogin],
    function(transaction, result) {
      if (result != null && result.rows != null) {
          var row = result.rows.item(0);
        for (var i = 0; i < result.rows.length; i++) {
          var row2 = result.rows.item(i);
			if(nuevalista == 0){
				fechanueva = row2.Fecha;
				$('#Reporte').append('<tr><td colspan=2><b>Fecha:</b> '+row2.Fecha+'</td></tr>');
				$('#Reporte').append('<tr><td colspan=2><b>Nombre:</b> '+row2.Nombre+'</td></tr>');
				$('#Reporte').append('<tr><td><span style="width: 50%;display: inline-table;"><b>Telefono:</b> '+row2.Telefono+'</span><span style="width: 50%;display: inline-table;"><b>Email:</b> '+row2.Email+'</span></td></tr>');
				$('#Reporte').append('<tr><td colspan=2><b>Mensaje:</b> '+row2.Mensaje+'</td></tr>');
				nuevalista += 1;
			}
			else if(fechanueva != row2.Fecha){
				fechanueva = row2.Fecha;
				$('#Reporte').append('<tr style="height: 10px;background: rgba(216, 216, 216, 0.4);"><td colspan=2></td></tr>');
				$('#Reporte').append('<tr><td colspan=2><b>Fecha:</b> '+row2.Fecha+'</td></tr>');
				$('#Reporte').append('<tr><td colspan=2><b>Nombre:</b> '+row2.Nombre+'</td></tr>');
				$('#Reporte').append('<tr><td><span style="width: 50%;display: inline-table;"><b>Telefono:</b> '+row2.Telefono+'</span><span style="width: 50%;display: inline-table;"><b>Email:</b> '+row2.Email+'</span></td></tr>');
				$('#Reporte').append('<tr><td colspan=2><b>Mensaje:</b> '+row2.Mensaje+'</td></tr>');				
			}
          $('#Reporte').append('<tr><td><span class="producto-importaciones" style="width: calc(100% - 90px);display: inline-table;vertical-align: top;"><div><b>Tienda:</b> '+row2.Tienda+'</div><b>Producto:</b> '+row2.Producto+'</span><span class="img-importaciones" style="width: 80px;display: inline-table;padding-left: 5px;"><img src='+row2.Imagen+'></span></td></tr>');
          $('#Reporte').append('<tr><td colspan=2><span style="width: 50%;display: inline-table;"><b>Cantidad:</b> '+row2.Cantidad+'</span><span style="width: 50%;display: inline-table;"><b>Precio:</b> '+row2.Precio+'</span></td></tr>');			
		  $('#Reporte').append('<tr style="height: 10px;background: rgba(216, 216, 216, 0.4);"><td colspan=2></td></tr>');
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

	var resultado = "";
	var row = "";
	var upnombre = "";
	var uptelefono = "";
	var upcorreo = "";
	var upmensaje = "";
	var idproducto = "";
	var qtproducto = "";	
	var d = "";
	var dateupdate = "";
	
function UpdateBD(){
	if (IdUsuarioLogin != ""){ //usuario logeado
		 if (!window.openDatabase) {
		   alert('Error con la Base de Datos');
		   return;
		 }
//Usuario,Nombre,Telefono,Email,Mensaje,Tienda,IdProducto,Producto,Imagen,Precio,Enlace,Cantidad,Fecha
//["","","","","","Ebay",id,titulo,img,precio,url,1,Fecha]
		
		 upnombre = $("#form-lista-nombre").val();
		 uptelefono = $("#form-lista-telefono").val();
		 upcorreo = $("#form-lista-email").val();
		 upmensaje = $("#form-lista-mensaje").val();
		//alert(mensaje);
		 d = new Date();
		 dateupdate = d.getDate() + "-" + (d.getMonth() +1) + "-" + d.getFullYear();
		 
		Buscar();
	}
}	
function Buscar(){
	var contadorProducto = 0;
db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM ListaBD WHERE Usuario = ? ', [""],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				resultado = result.rows.length;
				row = result.rows.item(contadorProducto);
				idproducto = row.IdProducto;
				qtproducto = $("#cantidad-"+row.IdProducto).val();
			}			
		},errorHandler);
},errorHandler,Actualizar);
}
function Actualizar(){
	if (resultado > 0){
		db.transaction(function(tx) {
			tx.executeSql('UPDATE ListaBD SET Usuario = ?, Nombre = ?, Telefono = ?, Email = ?, Mensaje = ?, Cantidad = ? WHERE Usuario = ? and IdProducto = ?',
						[IdUsuarioLogin,upnombre,uptelefono,upcorreo,upmensaje,qtproducto,"",idproducto],nullHandler,errorHandler);
		});
		resultado-=1;
	}
	if (resultado > 0){
		Buscar();
	}
}
/*function Actualizar(){
	if (resultado > 0){
		db.transaction(function(tx) {
			tx.executeSql('UPDATE ListaBD SET Usuario = ?, Cantidad = ? WHERE Usuario = ? and IdProducto = ?',
						[IdUsuarioLogin,qtproducto,"",idproducto],nullHandler,errorHandler);
		});
		resultado-=1;
	}
	if (resultado > 0){
		Buscar();
	}
}*/
