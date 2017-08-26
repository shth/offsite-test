function get_localstorage(name){
	try{
		if(localStorage.getItem(name) != "" || localStorage.getItem(name) != null)
			return localStorage.getItem(name).split(',');
		else
			return null;
	}catch(e){
		if( Cookies.get(name) != null )
			return Cookies.getJSON(name);
		else
			return null;
	}
}

function set_localstorage(name , value){
	try{
		localStorage.setItem(name, value);
	}catch(e){
		Cookies.set(name , JSON.stringify(value) );
	}
}

function remove_localstorage(name){
	if(localStorage.getItem(name) != null || localStorage.getItem(name) != ""){
		localStorage.removeItem(name);
	}
	if(Cookies.get(name) != null){
		Cookies.remove(name);
	}
}

function check_localstorage(name){
		var exist = false;
		if(localStorage.getItem(name) != null || localStorage.getItem(name) != ""){
			exist = true;
		}
		return exist;
}
