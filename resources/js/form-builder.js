class FormBuilder{

	constructor(data){
		this.action_uri	= data.action;
		this.class_name	= data.class;
		this.identifier = data.identifier;
		this.method 	= data.method;
	}

	generateField(data){
		var node 		= null;
		var label 		= null;
		var input		= null;
		var select		= null;
		var text 		= null;

		switch(data.type){

			case 'input':

				// generate label
				label 	= document.createElement('label');
				label.setAttribute('for',data.name);
				text 	= document.createTextNode(data.others.label);
				label.appendChild(text);
				
				// generate input 
				input	= document.createElement('input');
				input.setAttribute('type',data.others.input_type);
				input.setAttribute('id',data.name);
				input.setAttribute('data-field-name',data.name);
				input.setAttribute('class','form-control');
				input.setAttribute('placeholder',data.others.placeholder);

				// generate div container & set elements
				node 	= document.createElement('div');
				node.setAttribute('class','form-group');
				node.appendChild(label);
				node.appendChild(input);
			break;
			case 'select':

				// generate label
				label 	= document.createElement('label');
				label.setAttribute('for',data.name);
				text 	= document.createTextNode(data.others.label);
				label.appendChild(text);
				
				// creating select component
				select	= document.createElement('select');
				select.setAttribute('class','form-control');
				select.setAttribute('id',data.name);

				// adding options to previously component
				for(var position = 0; position < data.others.options.length; position++){
					var option 		= document.createElement("option");
					var item 		= data.others.options[position];
					option.value 	= item.value;
					option.text 	= item.text;
					select.appendChild(option);
				}

				// DIV container
				node 	= document.createElement('div');
				node.setAttribute('class','form-group');
				node.appendChild(label);
				node.appendChild(select);

			break;
		}

		return node;
	}

	// save fields data
	setFields(_fields){this.fields=_fields;}

	httpRequest(method,url){

		switch(method){
			case 'get':
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.open("GET",url, false); // false for syncrhonous request
				xmlHttp.send();
				return xmlHttp.responseText;
			break;
			case 'post':
			break;
		}
	}

	generateUIComponents(form,data){
		if(data){
			// reading fields data & generate component
			for(var position = 0; position < data.length; position++){
				var field = this.generateField(data[position]);
				form.appendChild(field);
			}
		}else{
			// reading fields data & generate component
			for(var position = 0; position < this.fields.length; position++){
				var field = this.generateField(this.fields[position]);
				form.appendChild(field);
			}
		}
	}

	// Basically here is the key operation.
	generate(container_identifier,table_name){
		
		// get container
		var container 	= document.getElementById(container_identifier);

		// create form element & set attributes
		var form 	= document.createElement('form');
		form.setAttribute('action',this.action_uri);
		form.setAttribute('method',this.method);
		form.setAttribute('id',this.identifier);
		form.setAttribute('class',this.class_name);
		form.setAttribute('data-tn',table_name);

		// if we have a table name 
		if(table_name){
			
			var url = 'http://127.0.0.1:3600/api/'+table_name;
			var response = this.httpRequest('get',url);
			
			// check if we have data
			if(response){
				var resp = JSON.parse(response);
				var fields = [];
				// now we need to read our data and check if we found problems with this request
				if(!resp.errors){	
					for(var position = 0; position < resp.data.length; position++){
						//console.log('field name->'+resp.data[position].field_name+',field type->'+resp.data[position].field_type+',field length->'+resp.data[position].field_length);
					
						var field = {"others":{}};

						switch(resp.data[position].field_type){
							case 'varchar':
								field.name = resp.data[position].field_name;
								field.type = "input";
								field.others.input_type = "text";
								field.others.label = resp.data[position].field_name;
								field.others.placeholder = resp.data[position].field_name;
							break;
						}
						fields.push(field);
					}

					this.generateUIComponents(form,fields);

				}else{ console.log("Houston we have problems trying to generate current form. table name->"+table_name); }

			}else{console.log("we do not have data.");}

		}else{ 
			// Basically this means that we are getting fields from 'FormBuilder' object initialization.
			this.generateUIComponents(form,null);
		}

		// adding default button
		var text 	= "";
		var button 	= document.createElement('button');
		var text 	= document.createTextNode('Submit');
		button.setAttribute('type','submit');
		button.setAttribute('class','btn btn-default');
		button.appendChild(text);
		form.appendChild(button);

		// finally add form element into container.
		container.appendChild(form);
	}

}