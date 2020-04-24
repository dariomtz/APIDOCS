class EndpointView extends View{
	constructor(controller, endpoint, parentId,  editable = false){
		super(controller);

		this.setEndpoint(endpoint);

		$('#endpoints-' + parentId).append(this.createHTML());

		this.populateEndpoint();

		$('#endpoint-bar-' + this.id).on('click', $.proxy(this.toggleDropdown, this));

		if(editable){
			//on-click events for features that only the owner of the project should have access to must go here

		}else{
			$('.edit-endpoint').remove();
		}
	}

	setEndpoint(endpoint){
		this.id = endpoint.id;
		this.method = endpoint.method;
		this.summary = endpoint.summary;
		this.description = endpoint.description;
		this.uriPath = endpoint.uriPath;
		this.requestBody = endpoint.requestBody;
		this.responseBody = endpoint.responseBody;
		this.responseStatus = endpoint.responseStatus;
	}

	/** 
	 * makes the html match the values of the endpoint.
	 * The values of the endpoint must be set before this method is used.
	 * */
	populateEndpoint(){
		this.description = this.parseEndline(this.description);
		this.requestBody = this.parseEndline(this.requestBody);
		this.responseBody = this.parseEndline(this.responseBody);

		$('#endpoint-method-' + this.id).html(this.method);
		$('#endpoint-summary-' + this.id).html(this.summary);
		$('#endpoint-description-' + this.id).html(this.description);
		$('#endpoint-uriPath-' + this.id).html(this.uriPath);
		$('#endpoint-req-body-' + this.id).html(this.requestBody);
		$('#endpoint-res-body-' + this.id).html(this.responseBody);
		$('#endpoint-res-status-' + this.id).html(this.responseStatus);
		
		let color;
		switch (this.method) {
			case "GET":
				color = 'primary';
				break;
			case "POST":
				color = 'success';
				break;
			case "PUT":
				color = 'warning';
				break;
			case "DELETE":
				color = 'danger';
				break;
			case "PATCH":
				color = 'info';
				break;
			default:
				color = 'secondary';
				break;
		}

		$('#endpoint-bar-' + this.id).addClass('alert-' + color);
		$('#endpoint-method-' + this.id).addClass('bg-' + color);
		$('#endpoint-method-' + this.id).addClass('border-' + color);
		$('#endpoint-method-' + this.id).addClass('text-light');
		$('#' + this.id).addClass('border-' + color);
		
	}

	parseEndline(text){
		let pieces = text.split('\n');
		text = '';
		pieces.forEach(element => {
			text += element + '<br>'
		});
		return text;
	}

	createHTML(){
		return '\
		<div id="' + this.id + '" class="border rounded-lg mb-2">\
			<div id="endpoint-bar-' + this.id  +'" class="d-flex justify-content-left align-items-center pl-3 py-2 btn">\
				<div class="d-inline-block my-auto mx-2 w-25">\
					<span id="endpoint-method-' + this.id + '" class="h6 border rounded w-100 m-0 py-1 d-block"></span>\
				</div>\
				<div class="d-inline-block my-0 mx-2 p-0 w-50 text-left">\
					<span id="endpoint-uriPath-' + this.id + '" class="h6"></span>\
				</div>\
				<div class="d-inline-block my-0 mx-2 p-0 w-25 text-left">\
					<span id="endpoint-summary-' + this.id + '" class="small disabled"></span>\
				</div>\
			</div>\
			<div id="' + this.id + '-info" class="p-3 border-top d-none">\
				<span class="h6">Description </span>\
				<br>\
				<span id="endpoint-description-' + this.id + '"></span>\
				<br>\
				<span class="h6">Request Body</span>\
				<br>\
				<div class="bg-light text-dark d-block rounded-lg border bourder-light p-3">\
					<span id="endpoint-req-body-' + this.id + '" ></span>\
				</div>\
				<br>\
				<span class="h6">Response Status Code </span>\
				<span id="endpoint-res-status-' + this.id + '" class="bg-light text-dark rounded-lg border bourder-light px-3 mx-2"></span>\
				<br><br>\
				<span class="h6" >Response Body </span>\
				<div class="bg-light text-dark d-block rounded-lg border bourder-light p-3">\
					<span id="endpoint-res-body-' + this.id + '"></span>\
				</div>\
			</div>\
		</div>\
		';
	}

	toggleDropdown(){
		$('#' + this.id + '-dropdown').toggleClass('dropup');
		$('#' + this.id + '-info').toggleClass('d-none');
	}

	
}