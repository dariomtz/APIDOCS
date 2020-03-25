class ResourceView{
	constructor (r, ){
		this.id = r.id;
		this.title = r.title;
		this.description = r.description;

		this.controller = new ResourceController(firebase, this.id);

		$('#resource-list').append(this.createHTML());
		$('#dropdown-' + this.id).on('click', function(){
			this.toggleDropdown();
		});

		$('#edit-resource-title-' + this.id).val(this.title);
		$('#edit-resource-description-' + this.id).val(this.description);

		if (editable) {
			$('#btn-add-endpoint-' + this.id).on('click', function() {
				this.toggleAddEndpoint();
			});
			$('#btn-close-add-endpoint' + this.id).on('click', function() {
				this.toggleAddEndpoint();
			});
			$('#cancel-save-endpoint-' + this.id).on('click', function() {
				this.toggleAddEndpoint();
			});
			$('#btn-close-edit-resource-' + this.id).on('click', function(){
				this.toggleEdit();
			});
			$('#edit-resource-' + this.id).on('click', function(){
				this.toggleEdit();
			});
			$('#cancel-save-resource-' + this.id).on('click', function(){
				this.toggleEdit();
			});
			$('#save-resource-' + this.id).on('click', function(){
				this.updateResource();
			});
			
			$('.edit').removeClass('d-none');
		}else{
			$('.edit').remove();
		}
	}

	createHTML(){
		return '\
		<div class="border rounded my-2"> \
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
				      		<button id="edit-resource-' + this.id + '" type="button" class="btn btn-outline-warning d-none edit mx-1">\
				      			Edit\
				      		</button>\
							<button id="delete-resource-' + this.id + '" type="button" class="btn btn-outline-danger d-none edit mx-1">\
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

		      		'<div id="add-endpoint-' + this.id + '" class="m-0 edit d-none d-flex flex-column justify-content-center"> \
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
							    <option selected>Choose...</option>\
							    <option value="GET">GET</option>\
							    <option value="POST">POST</option>\
							    <option value="PUT">PUT</option>\
							  </select>\
							</div>\
							<div class="my-3">\
								<h4>URI Path</h4>\
								<input id="add-endpoint-path-' + this.id + '" class="form-control" type="text" placeholder="Sumary" maxlength="10" size="80">\
							</div>\
							\
							<div class="my-3">\
								<h4>Sumary</h4>\
								<input id="add-endpoint-sumary-' + this.id + '" class="form-control" type="text" placeholder="Sumary" maxlength="10" size="80">\
							</div>\
						    \
						    <div class="my-3">\
								<h4>Description</h4>\
					        	<textarea id="add-endpoint-description" class="form-control rounded" id="input-description" placeholder="Description" rows="2"></textarea>\
							</div>\
							\
							<div class="my-3">\
								<h4>Request</h4>\
					        	<textarea id="add-endpoint-request" class="form-control rounded" id="input-description" placeholder="Request body" rows="2"></textarea>\
							</div>\
							\
							<div class="my-3">\
								<h4>Response</h4>\
								<input id="add-endpoint-code-' + this.id + '" class="form-control my-1" type="text" placeholder="Code" maxlength="20" size="80">\
					        	\
					        	<textarea id="add-endpoint-response" class="form-control rounded" id="input-description my-1" placeholder="Response body" rows="2"></textarea>\
							</div>\
							\
						    <div class="d-flex justify-content-end">\
						    	<button id="cancel-save-endpoint-' + this.id + '" type="button" class="btn btn-secondary mx-1">Cancel</button>\
								<button id="save-endpoint-' + this.id + '" type="button" class="btn btn-primary mx-1">Save</button>\
							</div>\
							<hr>\
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
		$('#edit-resource-title-' + this.id).focus();
	}

	async update(){
		let title = $('#edit-resource-title-' + this.id).val();
		let description = $('#edit-resource-description-' + this.id).val();

		const response = await project.updateResource(this.id, title, description);

		if (response instanceof Error){
			var errorAlert = createErrorAlert(response);

			if($('#edit-resource-' + this.id + '-alert').length){
				$('#edit-resource-' + this.id + '-alert').remove();
			}
			errorAlert.id = '#edit-resource-' + this.id + '-alert';

			$('#edit-resource-form-' + this.id).prepend(errorAlert);
			return;
		}

		$('#resource-title-' + this.id).html(title);
		$('#resource-description-' + this.id).html(title);
		
		$('#edit-resource-title-' + this.id).val(title);
		$('#edit-resource-description-' + this.id).val(description);
		
		this.toggleEdit();
	}

	toggleAddEndpoint(){
		$('#add-endpoint-form-' + this.id).toggleClass('d-none');
		$('#btn-add-endpoint-' + this.id).toggleClass('d-none');
		$('#add-endpoint-method-' + this.id).val('');
		//$('#add-resource-description').val('');
		$('#add-endpoint-method-' + this.id).val('');
	}

	addEndpoint(){

		return;
	}

	toggleDropdown(){
		$('#' + this.id + '-dropdown').toggleClass('dropup');
		$('#' + this.id + '-info').toggleClass('d-none');
		$('#' + this.id + '-info').toggleClass('d-flex');
	}
}