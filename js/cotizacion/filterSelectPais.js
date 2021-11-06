
var optionsCache = [];

function filterItems(el) {
	var value = el.value.toLowerCase();
	var form = el.form;
	var opt, sel = form.ciudades;
	if (value == '') {

		restoreOptions();

	} else {
	// Loop backwards through options as removing them modifies the next
	// to be visited if go forwards
	for (var i=sel.options.length-1; i>=0; i--) {
		  opt = sel.options[i];
		  if (opt.text.toLowerCase().indexOf(value) == -1){
		    sel.removeChild(opt)
		  }
		}
	}
}

// Restore select to original state
function restoreOptions(){
	var sel = document.getElementById('ciudades');
	sel.options.length = 0;

	for (var i=0, iLen=optionsCache.length; i<iLen; i++) {

		sel.appendChild(optionsCache[i]);

	}
}


function laodCache () {

	var sel = document.getElementById('ciudades');

	for (var i=0, iLen=sel.options.length; i<iLen; i++) {

		optionsCache.push(sel.options[i]);
	}

}



/*$( "#codPais" ).focusout(function() {
	// Load cache

	var sel = document.getElementById('ciudades');

	for (var i=0, iLen=sel.options.length; i<iLen; i++) {

		optionsCache.push(sel.options[i]);
	}
	
	 	
});
*/