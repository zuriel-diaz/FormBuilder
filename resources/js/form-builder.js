class FormBuilder{

	constructor(data){
		this.action_uri	= data.action;
		this.class_name	= data.class;
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
				xmlHttp.open("GET".url, false); // false for syncrhonous request
				xmlHttp.send(null);
				return xmlHttp.responseText;
			break;
			case 'post':
			break;
		}
	}

	// Basically here is the key operation.
	generate(container_identifier,table_name){
		
		// get container
		var container 	= document.getElementById(container_identifier);

		if(table_name){
			// create form element & set attributes
			var form 	= document.createElement('form');
			form.setAttribute('action',this.action_uri);
			form.setAttribute('method',this.method);
			form.setAttribute('class',this.class_name);

			// reading fields data & generate component
			for(var position = 0; position < this.fields.length; position++){
				var field = this.generateField(this.fields[position]);
				form.appendChild(field);
			}
		}else{

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