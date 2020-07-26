class ResourceView extends View{
	constructor (controller, r, editable){
		super(controller);
		this.editable = editable;
		this.setResource(r);

		$('#resource-list').append(this.createHTML());
		$('#dropdown-' + this.id).on('click', $.proxy(this.toggleDropdown, this));

		$('#edit-resource-title-' + this.id).val(this.title);
		$('#edit-resource-description-' + this.id).val(this.description);

		for (const endpoint in r.endpoints) {
			let e = r.endpoints[endpoint];
			this.createEndpoint(e);
		}

		if (editable) {
			$('#btn-add-endpoint-' + this.id).on('click', $.proxy(this.toggleAddEndpoint, this));
			$('#btn-close-add-endpoint' + this.id).on('click', $.proxy(this.toggleAddEndpoint, this));
			$('#cancel-save-endpoint-' + this.id).on('click', $.proxy(this.toggleAddEndpoint, this));
			$('#save-endpoint-'+ this.id).on('click', $.proxy(this.addEndpoint, this));

			$('#btn-close-edit-resource-' + this.id).on('click', $.proxy(this.toggleEdit, this));
			$('#edit-resource-' + this.id).on('click', $.proxy(this.toggleEdit, this));
			$('#cancel-save-resource-' + this.id).on('click', $.proxy(this.toggleEdit, this));
			$('#save-resource-' + this.id).on('click', $.proxy(this.update, this));
			$('#delete-resource-' + this.id).on('click', $.proxy(this.delete, this));

		}else{
			$('.edit-resource').remove();
		}
	}

	setResource(resource){
		this.id = resource.id;
		this.title = resource.title;
		this.description = resource.description;
	}

	createHTML(){
		return '\
		<div id="' + this.id + '-wrapper" class="border rounded my-2"> \
			<div id="edit-resource-form-' + this.id + '" class="d-none container-fluid my-2">\
				<button id="btn-close-edit-resource-' + this.id + '" type="button" class="close" aria-label="Close">\
					<span aria-hidden="true">&times;</span>\
				</button>\
				<div class="my-3">\
					<h4>Title</h4>\
			    	<input id="edit-resource-title-' + this.id + '" class="form-control" placeholder="Title" maxlength="70">\
				</div>\
			    \
				<div class="my-3">\
					<h4>Description</h4>\
		        	<textarea id="edit-resource-description-' + this.id + '" class="form-control rounded" placeholder="Description" rows="2">\
		        	</textarea>\
				</div>\
				\
			    <div class="d-flex justify-content-end">\
			    	<button id="cancel-save-resource-' + this.id + '" type="button" class="btn btn-secondary mx-1">Cancel</button>\
					<button id="save-resource-' + this.id + '" type="button" class="btn btn-primary mx-1">Save</button>\
				</div>\
			</div>\
			\<div id="' + this.id + '">\
		    	<div class="d-flex justify-content-between align-items-center py-1 m-0">\
		      		<div class="mx-3">\
			      		<div class="container">\
				      		<span id="resource-title-' + this.id + '" class="h5 mr-2">'+this.title+'</span>\
				      		<button id="edit-resource-' + this.id + '" type="button" class="btn btn-outline-warning edit-resource mx-1">\
				      			Edit\
				      		</button>\
							<button id="delete-resource-' + this.id + '" type="button" class="btn btn-outline-danger edit-resource mx-1">\
								Delete\
							</button>\
		      			</div>\
		      		</div>\
		  			<div id="' + this.id + '-dropdown" class="dropup py-2">' +
			  			'<button id="dropdown-' + this.id + '"type="button" class="btn dropdown-toggle" >' +
						    '<span class="sr-only">Toggle Dropdown</span>' +
						'</button>' +
					'</div>' +
		      	'</div>' +
		      	'<div id="' + this.id + '-info" class="d-flex flex-column m-0 p-3 border-top">' +
		      		'<p id="resource-description-' + this.id + '" class="text-left">'+this.description+'</p>'+
		      		
		      		'<div id="endpoints-' + this.id + '">' +

		  			'</div>' +

		      		'<div id="add-endpoint-' + this.id + '" class="m-0 edit-resource d-flex flex-column justify-content-center"> \
		  			\
						<div id="add-endpoint-form-' + this.id + '" class="d-none container-fluid my-2">\
							<hr>\
							<button id="btn-close-add-endpoint' + this.id + '" type="button" class="close" aria-label="Close">\
								<span aria-hidden="true">&times;</span>\
							</button>\
							\
							<br><br>\
							<div class="input-group mb-3">\
							  <div class="input-group-prepend">\
							    <label class="input-group-text" for="add-endpoint-method-' + this.id + '">Method</label>\
							  </div>\
							  <select class="custom-select" id="add-endpoint-method-' + this.id + '">\
							    <option value="GET">GET</option>\
							    <option value="POST">POST</option>\
								<option value="PUT">PUT</option>\
								<option value="DELETE">DELETE</option>\
								<option value="PATCH">PATCH</option>\
							  </select>\
							</div>\
							<div class="my-3">\
								<h4>URI Path</h4>\
								<input id="add-endpoint-path-' + this.id + '" class="form-control" type="text" placeholder="Path" size="80">\
							</div>\
							\
							<div class="my-3">\
								<h4>Summary</h4>\
								<input id="add-endpoint-summary-' + this.id + '" class="form-control" type="text" placeholder="Summary" size="80">\
							</div>\
						    \
						    <div class="my-3">\
								<h4>Description</h4>\
					        	<textarea id="add-endpoint-description-' + this.id + '" class="form-control rounded" id="input-description" placeholder="Description" rows="2"></textarea>\
							</div>\
							\
							<div class="my-3">\
								<h4>Request</h4>\
					        	<textarea id="add-endpoint-request-' + this.id + '" class="form-control rounded" id="input-description" placeholder="Request body" rows="2"></textarea>\
							</div>\
							\
							<div class="my-3">\
								<h4>Response</h4>\
								<input id="add-endpoint-code-' + this.id + '" class="form-control my-1" type="text" placeholder="Code" maxlength="10" size="80">\
					        	\
					        	<textarea id="add-endpoint-response-' + this.id +'" class="form-control rounded" id="input-description my-1" placeholder="Response body" rows="2"></textarea>\
							</div>\
							\
							<div id="add-endpoint-error-' + this.id + '"></div>\
						    <div class="d-flex justify-content-end">\
						    	<button id="cancel-save-endpoint-' + this.id + '" type="button" class="btn btn-secondary mx-1">Cancel</button>\
								<button id="save-endpoint-' + this.id + '" type="button" class="btn btn-primary mx-1">Save</button>\
							</div>\
						</div>\
						\
						<button id="btn-add-endpoint-' + this.id + '" type="button" class="btn btn-outline-primary btn-block"><span class="h3">+</span></button>\
					</div>' +
		      	'</div>' +
		  	'</div>' +
		'</div>';
	}

	toggleEdit(){
		$('#edit-resource-form-' + this.id).toggleClass('d-none');
		$('#' + this.id).toggleClass('d-none');
		$('#edit-resource-title-' + this.id ).val(this.title);
		$('#edit-resource-description-' + this.id ).val(this.description);
		$('#edit-resource-title-' + this.id).focus();
	}

	async update(){
		let title = $('#edit-resource-title-' + this.id).val();
		let description = $('#edit-resource-description-' + this.id).val();
		
		const response = await this.controller.updateResource(title, description);
		
		if (response instanceof Error){
			createErrorAlert(response, 'edit-resource-' + this.id + 'alert', 'edit-resource-form-' + this.id);
			return;
		}

		this.setResource(response);

		$('#resource-title-' + this.id).html(this.title);
		$('#resource-description-' + this.id).html(this.description);

		$('#edit-resource-title-' + this.id).val(this.title);
		$('#edit-resource-description-' + this.id).val(this.description);
		
		this.toggleEdit();
	}

	toggleAddEndpoint(){
		$('#add-endpoint-form-' + this.id).toggleClass('d-none');
		$('#btn-add-endpoint-' + this.id).toggleClass('d-none');
		$('#add-endpoint-method-' + this.id).val('');
		$('#add-endpoint-path-' + this.id).val('');
		$('#add-endpoint-description-' + this.id).val('');
		$('#add-endpoint-summary-' + this.id).val('');
		$('#add-endpoint-request-' + this.id).val('');
		$('#add-endpoint-response-' + this.id).val('');
		$('#add-endpoint-code-' + this.id).val('');
		$('#add-endpoint-error-' + this.id).children('.alert-danger').remove();
	}

	async addEndpoint(){
		let method = $('#add-endpoint-method-' + this.id).val();
		let summary = $('#add-endpoint-summary-' + this.id).val();
		let description = $('#add-endpoint-description-' + this.id).val();
		let uriPath = $('#add-endpoint-path-' + this.id).val();
		let requestBody = $('#add-endpoint-request-' + this.id).val();
		let responseBody = $('#add-endpoint-response-' + this.id).val();
		let responseStatus = $('#add-endpoint-code-' + this.id).val();
		
		let response = await this.controller.addEndpoint(
			method, summary, description, uriPath, requestBody, responseBody, responseStatus);
		
		if (response instanceof Error){
			this.createErrorAlert(response, 'create-endpoint-error-' + this.id, 'add-endpoint-error-' + this.id);
		}else{
			this.createEndpoint(response);
			this.toggleAddEndpoint();
		}
	}

	createEndpoint(endpoint){
		let controller = new EndpointController(this.controller.firebase, this.controller.dbRef, endpoint.id);
		new EndpointView(controller, endpoint, this.id, this.editable);
	}

	toggleDropdown(){
		$('#' + this.id + '-dropdown').toggleClass('dropup');
		$('#' + this.id + '-info').toggleClass('d-none');
		$('#' + this.id + '-info').toggleClass('d-flex');
	}

	delete(){
		if (confirm('Are you sure you want to delete this?')){
			this.controller.deleteResource();
			$('#' + this.id + '-wrapper').remove();
		}
	}
}