class RequestHandler{

	execute(method,data){
		var endpoint = "http://127.0.0.1:3600/api/getData", xhr = new XMLHttpRequest(), responseData = null;

		/*
		switch(method){
			case 'get':
			break;
			case 'post':

				$.ajax({
					url: 			endpoint,
					type: 			'POST',
					contentType: 	'application/json',
					data: 			JSON.stringify(data),
					dataType: 		'json',
					success: 		function(respData, textStatus, jQxhr){
						console.log(respData.fields);
						return respData.fields;
					},
					error: 			function(jQxhr, textStatus, errorThrown){
						console.log(errorThrown);
					}
				});
			break;
		}
		*/

		xhr.open('POST',endpoint);
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.onload = function(){
			if (xhr.status == 200 && xhr.responseText){
				console.log(xhr.responseText);
				console.log('text');
				responseData = xhr.responseText;
			}else{'status->'+xhr.status;}
		}
		xhr.send(JSON.stringify(data));
		console.log(responseData);

	}

}