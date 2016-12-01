class URLParameter {

	getData(url){
		var data = {};
		var hashes = url.slice(url.indexOf('?')+1).split('&');
		if(hashes.length > 1){
			for(var i = 0; i < hashes.length; i++){
				var temp = hashes[i].split('=');
				data[ temp[0] ] = temp[1] ;
			}
		}

		// check if JS object is empty
		if(Object.keys(data).length === 0 && data.constructor === Object){return null;}
		return data;
	}

}