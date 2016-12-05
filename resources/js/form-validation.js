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
	var form_prefix = "form#", form_id = "fm-exp";
	$(form_prefix+form_id).submit(function(evt){
		var data = {};

		// get data table name & action type (this means 'insert' or 'update' action).
		data.table_name = $(form_prefix+form_id).attr("data-tn");
		dat.action_type = $(form_prefix+form_id).attr("data-action-type");

		// now we need to get the field names from 'data-field-name' attribute
		$((form_prefix+form_id)+" input[type=text]").each(function(){
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