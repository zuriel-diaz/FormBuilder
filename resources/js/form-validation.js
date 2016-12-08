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
	$("form").submit(function(evt){
		var data = {};
		evt.preventDefault();

		// get data table name & action type (this means 'insert' or 'update' action).
        data.table_name   = $(this).attr("data-tn");
        data.action_type  = $(this).attr("data-action-type");

        var html_controls = ["input", "textarea"];

        for(var position = 0; position < html_controls.length; position++){
        	var html_control = "form "+html_controls[position];

        	$(html_control).each(function(key,field){
	            var key = $(field).attr("data-field-name");
	            var value = $(field).val();
	            if(key && value){ data[key] = value; }
       		 });
        }

		// send data through AJAX
		sendData(data);
	});
}

$(document).ready(main);