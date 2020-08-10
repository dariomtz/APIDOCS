class ResourceView extends View{
	constructor (fb, id, editable){
		super(fb, id);
		this.editable = editable;
		this.model = new ResourceModel(fb, id);
		if (this.editable){
			this.controller = new ResourceController(fb, this.model, this);
		}
		this.HTMLid = this.id;
	}

	async render(){
		let resource = await this.model.get();
		return '\
		<div id="' + this.HTMLid + '-wrapper" class="border rounded my-2"> \
			<div id="' + this.HTMLid + '">\
		    	<div class="d-flex justify-content-between align-items-center py-1 m-0">\
		      		<div class="mx-3">\
			      		<div class="container">\
				      		<span id="title-' + this.HTMLid + '" class="h5 mr-2">' + resource.title + '</span>\
				      		<button id="edit-' + this.HTMLid + '" type="button" class="btn btn-outline-warning edit mx-1">\
				      			Edit\
				      		</button>\
							<button id="delete-' + this.HTMLid + '" type="button" class="btn btn-outline-danger edit mx-1">\
								Delete\
							</button>\
		      			</div>\
		      		</div>\
		  			<div id="' + this.HTMLid + '-dropdown" class="dropup py-2">' +
			  			'<button id="dropdown-' + this.HTMLid + '"type="button" class="btn dropdown-toggle" >' +
						    '<span class="sr-only">Toggle Dropdown</span>' +
						'</button>' +
					'</div>' +
		      	'</div>' +
		      	'<div id="' + this.HTMLid + '-info" class="d-flex flex-column m-0 p-3 border-top">' +
		      		'<p id="description-' + this.HTMLid + '" class="text-left">'+ resource.description+'</p>'+
		      		
		      		'<div id="endpoints-' + this.HTMLid + '">' +

		  			'</div>' +

		      		'<div id="add-endpoint-' + this.HTMLid + '" class="m-0 edit d-flex flex-column justify-content-center"> \
		  			\
						<div id="add-endpoint-form-' + this.HTMLid + '" class="d-none container-fluid my-2">\
							<hr>\
							<button id="btn-close-add-endpoint' + this.HTMLid + '" type="button" class="close" aria-label="Close">\
								<span aria-hidden="true">&times;</span>\
							</button>\
							\
							<br><br>\
							<div class="input-group mb-3">\
							  <div class="input-group-prepend">\
							    <label class="input-group-text" for="add-endpoint-method-' + this.HTMLid + '">Method</label>\
							  </div>\
							  <select class="custom-select" id="add-endpoint-method-' + this.HTMLid + '">\
							    <option value="GET">GET</option>\
							    <option value="POST">POST</option>\
								<option value="PUT">PUT</option>\
								<option value="DELETE">DELETE</option>\
								<option value="PATCH">PATCH</option>\
							  </select>\
							</div>\
							<div class="my-3">\
								<h4>URI Path</h4>\
								<input id="add-endpoint-path-' + this.HTMLid + '" class="form-control" type="text" placeholder="Path" size="80">\
							</div>\
							\
							<div class="my-3">\
								<h4>Summary</h4>\
								<input id="add-endpoint-summary-' + this.HTMLid + '" class="form-control" type="text" placeholder="Summary" size="80">\
							</div>\
						    \
						    <div class="my-3">\
								<h4>Description</h4>\
					        	<textarea id="add-endpoint-description-' + this.HTMLid + '" class="form-control rounded" id="input-description" placeholder="Description" rows="2"></textarea>\
							</div>\
							\
							<div class="my-3">\
								<h4>Request</h4>\
					        	<textarea id="add-endpoint-request-' + this.HTMLid + '" class="form-control rounded" id="input-description" placeholder="Request body" rows="2"></textarea>\
							</div>\
							\
							<div class="my-3">\
								<h4>Response</h4>\
								<input id="add-endpoint-code-' + this.HTMLid + '" class="form-control my-1" type="text" placeholder="Code" maxlength="10" size="80">\
					        	\
					        	<textarea id="add-endpoint-response-' + this.HTMLid +'" class="form-control rounded" id="input-description my-1" placeholder="Response body" rows="2"></textarea>\
							</div>\
							\
							<div id="add-endpoint-error-' + this.HTMLid + '"></div>\
						    <div class="d-flex justify-content-end">\
						    	<button id="cancel-save-endpoint-' + this.HTMLid + '" type="button" class="btn btn-secondary mx-1">Cancel</button>\
								<button id="save-endpoint-' + this.HTMLid + '" type="button" class="btn btn-primary mx-1">Save</button>\
							</div>\
						</div>\
						\
						<button id="btn-add-endpoint-' + this.HTMLid + '" type="button" class="btn btn-outline-primary btn-block"><span class="h3">+</span></button>\
					</div>' +
		      	'</div>' +
		  	'</div>' +
		'</div>';
	}

	activate(){
		this.controller.appendTo($('#' + this.HTMLid + '-wrapper'));
		$('#dropdown-' + this.id).on('click', $.proxy(this.toggleDropdown, this));


		//add existing endpoints

		if (this.editable) {
			$('#edit-' + this.id).on('click', $.proxy(this.edit, this));			
			$('#delete-' + this.id).on('click', $.proxy(this.delete, this));
		}else{
			$('.edit').remove();
		}
	}

	show(){
		super.show();

		let resource = this.model.object;
		$('#title-' + this.HTMLid).html(resource.title);
		$('#description-' + this.HTMLid).html(resource.description);
	}

	addEndpoint(){
		this.addController.show();
	}

	createEndpoint(endpoint){

	}

	toggleDropdown(){
		$('#' + this.id + '-dropdown').toggleClass('dropup');
		$('#' + this.id + '-info').toggleClass('d-none');
		$('#' + this.id + '-info').toggleClass('d-flex');
	}

	edit(){
		this.controller.show();
	}

	delete(){
		if (confirm('Are you sure you want to delete this?')){
			this.model.delete();
			$('#' + this.HTMLid + '-wrapper').remove();
		}
	}
}