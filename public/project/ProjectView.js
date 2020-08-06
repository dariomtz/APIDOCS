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
			//create resource view
		}

		//append resoure controller
		
		//append project controller
		if(this.edit){
			this.controller.appendTo($('#project-form-wrapper'));
			$('#edit-project').on('click', $.proxy(this.toggleEdit, this));
		}else{
			$('.edit').remove();
		}
		
		$('#spinner-project').remove();
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
}