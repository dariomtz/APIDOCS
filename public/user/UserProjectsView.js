class UserProjectsView extends View{
	constructor(fb, authenticated){
		super(fb);
		this.id = this.fb.key;
		this.auth = authenticated;
		this.model = new UserModel(this.fb);
		this.controller = new ProjectController(this.model.projects, null, this);
	}

	async render(){
		let user = await this.model.getProfile();
		this.projects = await this.model.getProjects();

		if (user === null){
			return'\
			<div id="not-found-page" class="p-5">\
				<h1> 404 Not Found: The username "' + this.id + '" does not belong to any user.</h1>\
			</div>'
		}

		return '\
		<div id="user-page" class="p-5 container">\
			<div id="' + this.HTMLid + '">\
				<h1>' + this.id +'</h1>\
				<hr>\
				<div id="project-list">\
					<div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 align-items-center" style="height: 16rem"></div>\
				</div>\
			</div>\
			<div id="add-project-form-wrapper"></div>\
		</div>\
		'
	}

	activate(){
		if (this.auth) {
			$('#project-list').children('.row').last().prepend(this.createAddProjectCard());
			$('#btn-add-project').on('click', $.proxy(this.openAddProject, this));
			this.controller.appendTo($('#add-project-form-wrapper'));
		}

		if (this.projects === null){
			$('#project-list').prepend(this.createNoProjectsCard());
		}

		for (const project in this.projects){
			if($('#project-list').children('.row').last().children().length == 3){
				$('#project-list').append($(this.newRow()));
			}
			let projectView = new ProjectPreView(this.model.projects.child(project));
			projectView.appendTo($('#project-list').children('.row').last())
		}

		$('#spinner-user').remove();
	}

	newRow(){
		return '\
		<div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 align-items-center" style="height: 16rem">\
		</div>'
	}

	createNoProjectsCard(){
		return '<div class="col p-2"><div class="card m-auto" style="height: 15rem;">' + 
	  		'<div class="card-body">' +
	   			'<h5 class="card-title">This user does not have any projects. </h5>' +
	    		'<p class="card-text">You can come back later to see if he documents something new.</p>' +
	  		'</div>' +
		'</div></div>';
	}

	createAddProjectCard(){
		return '<div id="add-project-card" class="col p-2"><div class="card m-auto" style="height: 15rem;">' +
	   			'<button id="btn-add-project" class="btn btn-outline-primary btn-block h-100">' + 
	   				'<h5>Add new project</h5> <span class="display-3">+</span>' +
	   			'</button>' +
		'</div><div>';
	}

	openAddProject(){
		this.controller.show();
	}
}


