class ResourceView extends View{
	constructor (fb, id, editable, model = null){
		super(fb, id, editable, model);
		
		if (!this.model){
			this.model = new ResourceModel(fb, id);
		}
		
		if (this.editable){
			this.controller = new ResourceController(null, this.model, this);
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
		  			<div id="' + this.HTMLid + '-dropdown" class="dropup py-2">\
			  			<button id="dropdown-' + this.HTMLid + '"type="button" class="btn dropdown-toggle" >\
						    <span class="sr-only">Toggle Dropdown</span>\
						</button>\
					</div>\
		      	</div>\
		      	<div id="' + this.HTMLid + '-info" class="d-flex flex-column m-0 p-3 border-top">\
		      		<p id="description-' + this.HTMLid + '" class="text-left">'+ resource.description +'</p>\
		      		\
					<div id="' + this.HTMLid + '-list"></div>\
					<div id="add-endpoint-wrapper-' + this.HTMLid + '"></div>\
					\
		      	</div>\
		  	</div>\
		</div>';
	}

	activate(){		
		$('#dropdown-' + this.id).on('click', $.proxy(this.toggleDropdown, this));

		for (const endpoint in this.model.object.endpoints) {
			let endpointView = new EndpointView(this.fb.child(this.id).child('endpoints'), endpoint, this.editable);
			this.addChild(endpointView);
		}

		if (this.editable) {
			let endpointCreator = new AddNewView(this.fb.child(this.id).child('endpoints'), this.HTMLid, this);

			endpointCreator.appendTo($('#add-endpoint-wrapper-' + this.HTMLid));
			this.controller.appendTo($('#' + this.HTMLid + '-wrapper'));

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