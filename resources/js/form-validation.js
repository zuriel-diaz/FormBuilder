function sendData(data){
	var data_hub = "http://127.0.0.1:3600/api/datahub";

	$.ajax({
		url: 			data_hub,
		type: 			'POST',
		contentType: 	'application/json',
		data: 			JSON.stringify(data),
		dataType: 		'json',
		success: 		function(responseData, textStatus, jQxhr){
			console.log(responseData);
		},
		error: 			function(jQxhr, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});

}

function main(){
	$("form#fm-exp").submit(function(evt){
		var data = {};

		// get data
		data.table_name = $("form#fm-exp").attr("data-tn");

		$("form#fm-exp input[type=text]").each(function(){
			var key 	= $(this).attr("data-field-name");
			var value 	= $(this).val();
			if(key && value){ data[key] = value; }
		});

		// send data through AJAX
		sendData(data);

		evt.preventDefault();
	});
}

$(document).ready(main);