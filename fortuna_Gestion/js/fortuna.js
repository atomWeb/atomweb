/*
Fecha Creaci—n: 2012 - 07 - 30
Metodos Js para la aplicaci—n Fortuna.
Desarrollado por:
Fecha Modificaci—n: 2012 - 07 - 30
*/
function datosAjax(){	
	//
	require(["dojo/_base/xhr", "dojo/dom", "dojo/_base/array", "dojo/domReady!"],
	    function(xhr, dom, arrayUtil) {
	         
	        // Keep hold of the container node
	        var containerNode = dom.byId("datos_ajax");
	         
	        // Using  xhr.post or xhr.get, as we simply want to retrieve information
	        xhr.post({
	            // The URL of the request
	            url: "../datos/clientes.php",
	            // Handle the result as JSON data
	            handleAs: "json",
	            // The success handler
	            load: function(jsonData) {
	                // Create a local var to append content to
	                var content = "<h1>Clientes.</h1><ul>";
	                var i = 1;
	                var ssep = " | ";
	                var sidcliente = "";
	                // For every news item we received...
	                arrayUtil.forEach(jsonData.items, function(clientes) {
	                    // Build data from the JSON 
	                	sidcliente = "lstCli" + i;
	                    content += "<li id=\"" + sidcliente + "\" class=\"nosel\" onclick=\"datosCliente("+ clientes.idCLIENTE +"," + sidcliente + ");\"><strong>" + i + "</strong><span>&nbsp;&nbsp;" + clientes.NOMBRE+" "+clientes.APELLIDO + "&nbsp;";
	                    content += ssep + clientes.NIF + "</span></li>";
	                    i++;
	                });
	                // Set the content of the news node
	                containerNode.innerHTML = content + "</ul>";
	            },
	            // The error handler
	            error: function() {
	                containerNode.innerHTML = "No es posible obtener datos para la aplicaci&oacute;n."
	            }
	        });	         
	});
	//
	require(["dojo/dom-style"], function(domStyle){
		  domStyle.set("mto", "visibility", "");
	});
	//
	
}
//
function datosCliente(sidCliente, idnodo)
{
	var indFila = idnodo;	
	//
	console.log("datos del cliente id: " + sidCliente + " idfila " + indFila);
	// Require the xhr module
	require(["dojo/_base/xhr", "dojo/dom", "dojo/domReady!"],
	function(xhr, dom) {
		//
		dom.byId("idregistro").value = sidCliente;
		// Get the result node
		var resultNode = dom.byId("datos_detalle");
		
		// Post the form information
		xhr.post({
			// The URL of the request
			url: "../datos/cliente.php",
			// Form to send
			form: dom.byId("formNode"),
			// The success callback with result from server
			load: function(contenidoHtml) {
				resultNode.style.display = "block";
				resultNode.innerHTML = contenidoHtml;
			},
			// The error handler
			error: function() {
				resultNode.innerHTML = "Error - La informaci—n no ha podido ser enviada.";
			}
		});			
	});	
	//
	selRegistro(indFila);
	//
	require(["dojo/ready", "dijit/Menu", "dijit/MenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator", "dijit/PopupMenuItem"], function(ready, Menu, MenuItem, CheckedMenuItem, MenuSeparator, PopupMenuItem){
	    ready(function(){
	        var pMenu;
	        pMenu = new Menu({
	            targetNodeIds: [indFila]
	        });
	        pMenu.addChild(new MenuItem({
	            label: "Editar",
	            iconClass: "EditIcon",	           
	            onClick: function(){alert('i was clicked editar')}	        	
	        }));
	        pMenu.addChild(new MenuItem({
	            label: "Nueva cita",
	            iconClass: "CalendarIcon",	           
	            onClick: function(){alert('i was clicked Nueva cita')}	        	
	        }));
	        pMenu.addChild(new MenuItem({
	            label: "Historial",
	            iconClass: "HistoryIcon",	           
	            onClick: function(){alert('i was clicked Historial')}	        	
	        }));
	        pMenu.addChild(new MenuSeparator());
	        pMenu.addChild(new MenuItem({
	            label: "Eliminar",
	            iconClass: "DeleteIcon",	
	            onClick: function(){alert('i was clicked eliminar')}
	        }));
	        pMenu.startup();
	    });
	});
	//
}
//
function selRegistro(indFila)
{
	// Coloca de otro color el registro(fila) seleccionada
	require(["dojo/query", "dojo/NodeList-dom"], function(query){
	    query("#datos_ajax ul li").removeClass("seleccionado");
	});
	//
	require(["dojo/dom-class"], function(domClass){
	    // Remove a class from some node:
	    domClass.remove(indFila, "nosel");
	    domClass.add(indFila, "seleccionado");
	});	
}