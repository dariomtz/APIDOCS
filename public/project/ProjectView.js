class ProjectView extends View{
	constructor (fb, id, edit){
		super(fb, id);
		this.model = new ProjectModel(this.fb, this.id);
		this.HTMLid = 'project-info';
		this.edit = edit;
		if (this.edit){
			this.controller = new ProjectController(this.fb, this.model, this);
		}
	}

	async render(){
		let project = await this.model.get();

		if(project === null){
			return '\
			<div id="not-found-project" class="p-5 d-none">\
				<h1> 404 Not Found: This user does not have a project named "' + this.id + '".</h1>\
			</div>'
		}

		return '\
		<div id="project-page" class="p-5 container">\
			<div id="' + this.HTMLid + '" class="pb-2 container-fluid">\
				<h1 id="project-title" class="m-0">' + project.title + '</h1>\
				<div class="row row-cols-1 row-cols-sm-2 m-0">\
					<div class= "py-2 px-0 col">\
						<span id="project-id" class="h6 text-muted">' + project.id +'</span>\
					</div>\
					<button id="btn-copy-link-clipboard" class="col btn btn-light">\
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
			<div id="resources" class="my-2">\
				<div id="resource-list" class=""></div>\
			</div>\
		</div>\
		'
	}

	activate(){
		for (const resource in this.model.object.resources) {
			let r = new ResourceView(this.fb.child(this.id).child('resources'), resource, this.edit);
			r.appendTo($('#resources'));
		}

		//append resoure controller
		
		//append project controller
		if(this.edit){
			this.controller.appendTo($('#project-form-wrapper'));
			$('#edit-project').on('click', $.proxy(this.toggleEdit, this));
		}else{
			$('.edit').remove();
		}
		
		$('#main-spinner').remove();
	}

	toggleEdit(){
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
		return '\
		<div id="confirm-delete-project" class="confirm d-flex fixed-top w-100 h-100 justify-content-center align-items-center">\
			<div class="alert alert-danger m-auto p-5 ">\
				<button id="close-confirm-delete-project" type="button" class="close" aria-label="Close">\
					<span aria-hidden="true">&times;</span>\
				</button>\
				<span class="h3">Are you sure?</span>\
				<hr>\
				<p>Deletion is permanent and all the information of your project cannot be recovered.</p>\
				<span>Type "CONFIRM" and then press delete.</span>\
				<br>\
				<input id="confirm-delete-project-input" class="form-control my-2" type="text">\
				<div class="d-flex justify-content-between align-items-center my-2">\
					<button id="cancel-confirm-delete-project" class="btn btn-outline-secondary bg-light text-secondary w-50 mr-1">Cancel</button>\
					<button id="confirm-delete-project-btn" class="btn btn-secondary active w-50 ml-1">Delete</button>\
				</div>\
			</div>\
		</div>'
	}
}