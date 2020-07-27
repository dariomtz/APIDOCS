class EndpointView extends View{
	constructor(controller, endpoint, parentId,  editable = false){
		super(controller);

		this.setEndpoint(endpoint);

		$('#endpoints-' + parentId).append(this.createHTML());

		this.populateEndpoint();

		$('#endpoint-bar-' + this.id).on('click', $.proxy(this.toggleDropdown, this));

		if(editable){
			//on-click events for features that only the owner of the project should have access to must go here
			$('#' + this.id + '-delete-btn').on('click', $.proxy(this.deleteEndpoint, this));
			$('#' + this.id + '-edit-btn').on('click', $.proxy(this.toggleEdit, this));
			$('#' + this.id + '-close-edit-btn').on('click', $.proxy(this.toggleEdit, this));
			$('#' + this.id + '-cancel-save-edit-btn').on('click', $.proxy(this.toggleEdit, this));
			$('#' + this.id + '-save-edit-btn').on('click', $.proxy(this.saveEdit, this));
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

		$('#endpoint-method-' + this.id).html(this.method);
		$('#endpoint-summary-' + this.id).html(this.summary);
		$('#endpoint-description-' + this.id).html(this.parseEndline(this.description));
		$('#endpoint-uriPath-' + this.id).html(this.uriPath);
		$('#endpoint-req-body-' + this.id).html(this.parseEndline(this.requestBody));
		$('#endpoint-res-body-' + this.id).html(this.parseEndline(this.responseBody));
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
		
		if(this.currentColor !== undefined){
			$('#endpoint-bar-' + this.id).removeClass('alert-' + this.currentColor);
			$('#endpoint-method-' + this.id).removeClass('bg-' + this.currentColor);
			$('#endpoint-method-' + this.id).removeClass('border-' + this.currentColor);
			$('#' + this.id + '-wrapper').removeClass('border-' + this.currentColor);
		}

		$('#endpoint-bar-' + this.id).addClass('alert-' + color);
		$('#endpoint-method-' + this.id).addClass('bg-' + color);
		$('#endpoint-method-' + this.id).addClass('border-' + color);
		$('#endpoint-method-' + this.id).addClass('text-light');
		$('#' + this.id + '-wrapper').addClass('border-' + color);
		
		this.currentColor = color;
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
		<div id="' + this.id+ '-wrapper" class="border rounded-lg mb-2">\
			<div id="' + this.id + '" class="container-fluid ">\
				<div id="endpoint-bar-' + this.id  +'" class="row align-items-center p-2">\
					<div class="col-12 col-sm-6 col-md-2 align-middle text-center">\
						<span id="endpoint-method-' + this.id + '" class="h6 border rounded w-100 m-0 py-1 d-block"></span>\
					</div>\
					<div class="col-12 col-sm-6 col-md-3 text-left text-wrap my-md-0 mt-3 mb-2">\
						<span id="endpoint-uriPath-' + this.id + '" class="h6"></span>\
					</div>\
					<div class="col-12 col-md-3 text-left my-md-0 mt-2 mb-3">\
						<span id="endpoint-summary-' + this.id + '" class="small disabled"></span>\
					</div>\
					<div class="col-6 col-md-2 text-center edit">\
						<button id="' + this.id +'-delete-btn" class="btn btn-danger">Delete</button>\
					</div>\
					<div class="col-6 col-md-2 text-center edit">\
						<button id="' + this.id +'-edit-btn" class="btn btn-warning">Edit</button>\
					</div>\
				</div>\
				<div id="' + this.id + '-info" class="p-3 d-none">\
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
			<div id="edit-endpoint-form-' + this.id + '" class="d-none container-fluid my-2">\
				<button id="' + this.id + '-close-edit-btn" type="button" class="close" aria-label="Close">\
					<span aria-hidden="true">&times;</span>\
				</button>\
				\
				<br><br>\
				<div class="input-group mb-3">\
					<div class="input-group-prepend">\
					<label class="input-group-text" for="edit-endpoint-method-' + this.id + '">Method</label>\
					</div>\
					<select class="custom-select" id="edit-endpoint-method-' + this.id + '">\
					<option value="GET">GET</option>\
					<option value="POST">POST</option>\
					<option value="PUT">PUT</option>\
					<option value="DELETE">DELETE</option>\
					<option value="PATCH">PATCH</option>\
					</select>\
				</div>\
				<div class="my-3">\
					<h4>URI Path</h4>\
					<input id="edit-endpoint-path-' + this.id + '" class="form-control" type="text" placeholder="Path" size="80">\
				</div>\
				\
				<div class="my-3">\
					<h4>Summary</h4>\
					<input id="edit-endpoint-summary-' + this.id + '" class="form-control" type="text" placeholder="Summary" size="80">\
				</div>\
				\
				<div class="my-3">\
					<h4>Description</h4>\
					<textarea id="edit-endpoint-description-' + this.id + '" class="form-control rounded" id="input-description" placeholder="Description" rows="2"></textarea>\
				</div>\
				\
				<div class="my-3">\
					<h4>Request</h4>\
					<textarea id="edit-endpoint-req-body-' + this.id + '" class="form-control rounded" id="input-description" placeholder="Request body" rows="2"></textarea>\
				</div>\
				\
				<div class="my-3">\
					<h4>Response</h4>\
					<input id="edit-endpoint-res-status-' + this.id + '" class="form-control my-1" type="text" placeholder="Code" maxlength="10" size="80">\
					\
					<textarea id="edit-endpoint-res-body-' + this.id +'" class="form-control rounded" id="input-description my-1" placeholder="Response body" rows="2"></textarea>\
				</div>\
				\
				<div id="edit-endpoint-error-' + this.id + '"></div>\
				<div class="d-flex justify-content-end">\
					<button id="' + this.id + '-cancel-save-edit-btn" type="button" class="btn btn-secondary mx-1">Cancel</button>\
					<button id="' + this.id + '-save-edit-btn" type="button" class="btn btn-primary mx-1">Save</button>\
				</div>\
			</div>\
		</div>\
		';
	}

	toggleDropdown(){
		$('#' + this.id + '-info').toggleClass('d-none');
	}

	toggleEdit(){
		$('#edit-endpoint-form-' + this.id).toggleClass('d-none');
		$('#' + this.id).toggleClass('d-none');
		$('#' + this.id + '-info').removeClass('d-none');
		this.fillEditForm();
	}

	fillEditForm(){
		$('#edit-endpoint-method-' + this.id).val(this.method);
		$('#edit-endpoint-summary-' + this.id).val(this.summary);
		$('#edit-endpoint-description-' + this.id).val(this.description);
		$('#edit-endpoint-path-' + this.id).val(this.uriPath);
		$('#edit-endpoint-req-body-' + this.id).val(this.requestBody);
		$('#edit-endpoint-res-body-' + this.id).val(this.responseBody);
		$('#edit-endpoint-res-status-' + this.id).val(this.responseStatus);
	}

	saveEdit(){
		let method = $('#edit-endpoint-method-' + this.id).val();
		let summary = $('#edit-endpoint-summary-' + this.id).val();
		let description = $('#edit-endpoint-description-' + this.id).val();
		let path = $('#edit-endpoint-path-' + this.id).val();
		let request = $('#edit-endpoint-req-body-' + this.id).val();
		let responseBody = $('#edit-endpoint-res-body-' + this.id).val();
		let responseStatus = $('#edit-endpoint-res-status-' + this.id).val();

		let update = this.controller.updateEndpoint(
			method, summary, description, path, request, responseBody, responseStatus
		);

		if (update instanceof Error){
			this.createErrorAlert(update, this.id + '-edit-error-alert', 'edit-endpoint-error-' + this.id);
		}else{
			let endpoint = {
				id: this.id,
				method: method,
				summary: summary,
				description: description,
				uriPath: path,
				requestBody: request,
				responseBody: responseBody,
				responseStatus: responseStatus,
			}

			this.setEndpoint(endpoint);
			this.populateEndpoint();
			this.toggleEdit();
		}
	}

	deleteEndpoint(){
		if (confirm('Are you sure you want to delete this?')){
			this.controller.deleteEndpoint();
			$('#' + this.id + '-wrapper').remove();
		}
	}
	
}