class EndpointView extends View{
	constructor(fb, id, editable, model = null){
		super(fb, id, editable, model);

		if (!this.model){
			this.model = new EndpointModel(fb, id);
		}
		
		if (this.editable){
			this.controller = new EndpointController(fb, this.model, this);
		}

		this.HTMLid = this.id;
	}

	/** 
	 * makes the html match the values of the endpoint.
	 * The values of the endpoint must be set before this method is used.
	 * */
	populateEndpoint(){

		$('#endpoint-method-' + this.id).html(this.method);
		$('#endpoint-summary-' + this.id).html(this.summary);
		$('#endpoint-description-' + this.id).html(this.parseEndline(this.description));
		$('#endpoint-uriPath-' + this.id).html(this.uriPath);
		$('#endpoint-req-body-' + this.id).html(this.parseEndline(this.requestBody));
		$('#endpoint-res-body-' + this.id).html(this.parseEndline(this.responseBody));
		$('#endpoint-res-status-' + this.id).html(this.responseStatus);
		
		
	}

	parseEndline(text){
		let pieces = text.split('\n');
		text = '';
		pieces.forEach(element => {
			text += element + '<br>'
		});
		return text;
	}

	async render(){
		let endpoint = await this.model.get();

		return '\
		<div id="' + this.HTMLid + '-wrapper" class="border rounded-lg mb-2">\
			<div id="' + this.HTMLid + '-controller"></div>\
			<div id="' + this.HTMLid + '" class="container-fluid ">\
				<div id="endpoint-bar-' + this.HTMLid  +'" class="row align-items-center p-2">\
					<div class="col-12 col-sm-6 col-md-2 align-middle text-center">\
						<span id="method-' + this.HTMLid + '" class="h6 border rounded w-100 m-0 py-1 d-block">\
							' + endpoint.method + '\
						</span>\
					</div>\
					<div class="col-12 col-sm-6 col-md-3 text-left text-wrap my-md-0 mt-3 mb-2">\
						<span id="URI-' + this.HTMLid + '" class="h6">' + endpoint.URI + '</span>\
					</div>\
					<div class="col-12 col-md-3 text-left my-md-0 mt-2 mb-3">\
						<span id="summary-' + this.HTMLid + '" class="small disabled">' + endpoint.summary + '</span>\
					</div>\
					<div class="col-6 col-md-2 text-center edit">\
						<button id="' + this.HTMLid +'-delete-btn" class="btn btn-danger">Delete</button>\
					</div>\
					<div class="col-6 col-md-2 text-center edit">\
						<button id="' + this.HTMLid +'-edit-btn" class="btn btn-warning">Edit</button>\
					</div>\
				</div>\
				<div id="' + this.HTMLid + '-info" class="p-3 d-none">\
					<span class="h6">Description </span>\
					<br>\
					<span id="description-' + this.HTMLid + '">' + endpoint.description + '</span>\
					<br><br>\
					<span class="h6">Request Body</span>\
					<br>\
					<div class="bg-light text-dark d-block rounded-lg border bourder-light p-3">\
						<span id="request-' + this.HTMLid + '" >' + endpoint.request + '</span>\
					</div>\
					<br>\
					<span class="h6">Response Status Code </span>\
					<span id="status-code-' + this.HTMLid + '" class="bg-light text-dark rounded-lg border bourder-light px-3 mx-2">\
						' + endpoint.statusCode + '\
					</span>\
					<br><br>\
					<span class="h6" >Response Body </span>\
					<div class="bg-light text-dark d-block rounded-lg border bourder-light p-3">\
						<span id="response-' + this.HTMLid + '">' + endpoint.response + '</span>\
					</div>\
				</div>\
			</div>\
		</div>\
		';
	}

	activate(){
		this.setColor();
		$('#endpoint-bar-' + this.HTMLid).on('click', $.proxy(this.toggleDropdown, this));

		if (this.editable){
			this.controller.appendTo($('#' + this.HTMLid + '-controller'));
			$('#' + this.HTMLid +'-edit-btn').on('click', $.proxy(this.edit, this));
			$('#' + this.HTMLid +'-delete-btn').on('click', $.proxy(this.delete, this));
		}else{
			$('.edit').remove();
		}
	}

	setColor(){
		let color;
		switch (this.model.object.method) {
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
		
		if(this.currentColor !== undefined){
			$('#endpoint-bar-' + this.HTMLid).removeClass('alert-' + this.currentColor);
			$('#method-' + this.HTMLid).removeClass('bg-' + this.currentColor);
			$('#method-' + this.HTMLid).removeClass('border-' + this.currentColor);
			$('#' + this.HTMLid + '-wrapper').removeClass('border-' + this.currentColor);
		}

		$('#endpoint-bar-' + this.HTMLid).addClass('alert-' + color);
		$('#method-' + this.HTMLid).addClass('bg-' + color);
		$('#method-' + this.HTMLid).addClass('border-' + color);
		$('#method-' + this.HTMLid).addClass('text-light');
		$('#' + this.HTMLid + '-wrapper').addClass('border-' + color);
		
		this.currentColor = color;
	}

	toggleDropdown(){
		$('#' + this.id + '-info').toggleClass('d-none');
	}

	edit(){
		this.controller.show();		
	}

	show(){
		super.show();

		$('#' + this.id + '-info').removeClass('d-none');
		
		let endpoint = this.model.object
		$('#method-' + this.HTMLid).html(endpoint.method);
		$('#summary-' + this.HTMLid).html(endpoint.summary);
		$('#description-' + this.HTMLid).html(endpoint.description);
		$('#URI-' + this.HTMLid).html(endpoint.URI);
		$('#request-' + this.HTMLid).html(endpoint.request);
		$('#response-' + this.HTMLid).html(endpoint.response);
		$('#status-code-' + this.HTMLid).html(endpoint.statusCode);

		this.setColor();
	}

	delete(){
		if (confirm('Are you sure you want to delete this?')){
			this.model.delete();
			$('#' + this.id + '-wrapper').remove();
		}
	}
	
}