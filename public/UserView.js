class UserView extends View{
	constructor(controller){
		super(controller);
		this.controller.exists()
		.then(exists =>{
			if(exists){
				$('#user-page').removeClass('d-none');
				this.loadProjects()
				.then(() => {
					$('#spinner-user-page').addClass('d-none');
					$('#spinner-user-page').removeClass('d-flex');
				});
			}else{
				$('#not-found-page').removeClass('d-none');
				$('#spinner-user-page').addClass('d-none');
				$('#spinner-user-page').removeClass('d-flex');
			}
		});	
	}

	async loadProjects(){

		if(this.controller.auth){		
			$('#project-list').children('.row').last().prepend(this.createAddProjectCard());

			$('#btn-add-project').on('click', $.proxy(this.toggleAddProject, this));
			$('#btn-close').on('click', $.proxy(this.toggleAddProject, this));
			$('#btn-cancel-create-project').on('click', $.proxy(this.toggleAddProject, this));
			$('#btn-create-project').on('click', $.proxy(this.addProject, this));

			$('#input-title').on('keypress', $.proxy(this.pressKey, this));
			$('#input-project-id').on('keypress', $.proxy(this.pressKey, this));
		}

		let projects = await this.controller.getProjects();
		let hasProjects = false;

		for (const project in projects){
			hasProjects = true;
			if($('#project-list').children('.row').last().children().length == 3){
				$('#project-list').append($('<div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 align-items-center" style="height: 16rem"></div>'));
			}
			$('#project-list').children('.row').last().append(this.createCard(projects[project]));
		}

		if(!hasProjects && !this.controller.auth){
			$('#project-list').prepend(this.createNoProjectsCard());
		}

	}

	pressKey(e){
		if(e.which === 13){
			this.addProject();
		}
	}

	createCard(project){
		var tooLong = '';
		if(project.description.length > 110){
			tooLong += '...';
		}

		return '<div class="col p-2"><div class="card m-auto" style="height: 15rem;">' +
	  		'<div class="card-body">' +
	   			'<h5 class="card-title">' + project.title + '</h5>' +
	    		'<h6 class="card-subtitle mb-2 text-muted">' + project.projectId + '</h6>' +
	    		'<p class="card-text text-justify">' + project.description.substring(0,110) + tooLong + '</p>' +	
	  		'</div>' +
	  		'<div class="card-footer d-flex justify-content-end">'+
	    		'<a href="/' + project.author + '/' + project.projectId + '" class="card-link">View Project</a>' +
			'</div>' +
		'</div></div>';
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

	toggleAddProject(){
		this.clearNewProjectForm();
		$('#user-page').toggleClass('d-none');
		$('#add-project-form').toggleClass('d-none');
		$('#input-title').focus();
	}

	async addProject(){
		var title = $('#input-title').val();
		var projectId = $('#input-project-id').val();
		var description = $('#textarea-description').val();

		var response = await this.controller.addProject(title, projectId, description);

		if(response instanceof Error){
			this.createErrorAlert(response, 'create-project-alert', 'new-project-form');
			return;
		}
	}
	
	clearNewProjectForm(){
		$('#new-project-form :text').each((i, val) => {
			$(val).val('');
		});
		$('#new-project-form #textarea-description').val('');
	}
}


