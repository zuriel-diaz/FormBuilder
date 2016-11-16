class FormBuilder{

	constructor(data){
		this.action_uri	= data.action;
		this.class_name	= data.class;
		this.method 	= data.method;
	}

	setFields(fields){
		console.log(fields);
	}

	generate(container_identifier){
		console.log('container identifier->'+container_identifier);
	}


}