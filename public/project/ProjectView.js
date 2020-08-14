class ProjectView extends View{
	constructor (fb, id, editable){
		super(fb, id);
		this.model = new ProjectModel(this.fb, this.id);
		this.HTMLid = 'project-info';
		this.editable = editable;
		if (this.editable){
			this.controller = new ProjectController(this.fb, this.model, this);
		}
	}

	async render(){
		let project = await this.model.get();

		if(project === null){
			this.notFound = true;
			return '\
			<div id="not-found-project" class="p-5">\
				<h1> 404 Not Found: This user does not have a project named "' + this.id + '".</h1>\
			</div>\
			';
		}

		return '\
		<div id="project-page" class="p-5 container">\
			<div id="' + this.HTMLid + '" class="pb-2 container-fluid">\
				<h1 id="project-title" class="m-0">' + project.title + '</h1>\
				<div class="row row-cols-1 row-cols-sm-2 m-0">\
					<div class= "py-2 px-0 col">\
						<span id="project-id" class="h6 text-muted">' + project.id +'</span>\
					</div>\
					<button id="btn-copy-link" class="col btn btn-light">\
						&#x1f4cb Copy project link to clipboard\
					</button>\
				</div>\
				<hr>\
				<p id="project-description" class="text-justify">' + project.description + '</p>\
				<h6>Author: <a href="/' + project.author + '">@' + project.author + '</a></h6>\
				<h6>Base URI: <span id="project-URI" class="font-italic">' + project.URI + '</span></h6>\
				<h6>Created on: <span id="project-created">' + project.created + '</span></h6>\
				<h6>Last updated on: <span id="project-updated">' + project.updated + '</span></h6>\
				<div class="d-flex justify-content-end edit">\
					<button id="edit-project" type="button" class="btn btn-outline-warning mx-1">Edit</button>\
					<button id="delete-project" type="button" class="btn btn-outline-danger mx-1">Delete</button>\
				</div>\
			</div>\
			<div id="project-form-wrapper"></div>\
			\
			<div id="' + this.HTMLid + '-list" class="my-2"></div>\
			<hr class="edit">\
			<div id="add-resource-wrapper" class="my-2"></div>\
		</div>\
		'
	}

	activate(){
		$('#main-spinner').remove();

		if (this.notFound){
			return;
		}

		$('#btn-copy-link').on('click', $.proxy(this.copyLink, this));
		$('#delete-project').on('click', $.proxy(this.confirmDelete, this));

		for (const resource in this.model.object.resources) {
			let r = new ResourceView(this.fb.child(this.id).child('resources'), resource, this.editable);
			this.addChild(r);
		}

		if(this.editable){
			let resourceCreator =  new AddNewView(this.fb.child(this.id).child('resources'), 'resource', this);
			resourceCreator.appendTo($('#add-resource-wrapper'));

			this.controller.appendTo($('#project-form-wrapper'));

			$('#edit-project').on('click', $.proxy(this.edit, this));
		}else{
			$('.edit').remove();
		}
		
		
	}

	edit(){
		this.controller.show();
	}

	show(){
		super.show();

		let project = this.model.object;
		$('#project-title').html(project.title);
		$('#project-id').html(project.id);
		$('#project-description').html(project.description);
		$('#project-URI').html(project.URI);
		$('#project-updated').html(project.updated);
		$('#project-created').html(project.created);
	}

	confirmDelete(){
		$('#content').append(this.confirmDeleteAlert());
		$('.cancel').on('click', $.proxy(this.closeConfirm, this));
		$('#confirm-delete-btn').on('click', $.proxy(this.delete, this));
		$('#confirm-delete-input').on('keyup', $.proxy(this.checkConfirm, this));
	}

	closeConfirm(){
		$('#confirm-delete-project').remove();
	}

	confirmDeleteAlert(){
		return '\
		<div id="confirm-delete-project" class="confirm d-flex fixed-top w-100 h-100 justify-content-center align-items-center">\
			<div class="alert alert-danger m-auto p-5 ">\
				<button id="close-confirm-delete-project" type="button" class="close cancel" aria-label="Close">\
					<span aria-hidden="true">&times;</span>\
				</button>\
				<span class="h3">Are you sure?</span>\
				<hr>\
				<p>Deletion is permanent and all the information of your project cannot be recovered.</p>\
				<span>Type "CONFIRM" and then press delete.</span>\
				<br>\
				<input id="confirm-delete-input" class="form-control my-2" type="text">\
				<div class="d-flex justify-content-between align-items-center my-2">\
					<button id="cancel-confirm-delete-project" class="btn btn-outline-secondary bg-light text-secondary w-50 mr-1 cancel">Cancel</button>\
					<button id="confirm-delete-btn" class="btn btn-secondary active w-50 ml-1">Delete</button>\
				</div>\
			</div>\
		</div>'
	}

	copyLink(){
		const el = document.createElement('textarea');
		el.value = window.location.href;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		$('#btn-copy-link').removeClass('btn-light');
		$('#btn-copy-link').addClass('btn-outline-success');
		$('#btn-copy-link').html('&#x1f4cb Copied to clipboard!')
	}

	checkConfirm(){
		console.log($('#confirm-delete-input').val());
		if($('#confirm-delete-input').val() === 'CONFIRM'){			
			$('#confirm-delete-btn').removeClass('active');
			$('#confirm-delete-btn').removeClass('btn-secondary');
			$('#confirm-delete-btn').addClass('btn-danger');
		}else if(!$('#confirm-delete-btn').hasClass('active')){
			$('#confirm-delete-btn').addClass('active');
			$('#confirm-delete-btn').addClass('btn-secondary');
			$('#confirm-delete-btn').removeClass('btn-danger');
		}
	}

	async delete(){
		if (!$('#confirm-delete-btn').hasClass('active')) {
			await this.model.delete();
			window.location = '/' + this.model.user;
		}
	}
}