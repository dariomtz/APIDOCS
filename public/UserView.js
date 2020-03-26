class UserView{
	constructor(user){
		this.user=user;
		this.user.exists()
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
		let projects = await this.user.getProjects();
		let hasProjects = false;

		for (const project in projects){
			hasProjects = true;
			$('#project-list').append(this.createCard(projects[project]));
		}

		if(!hasProjects && !this.user.auth){
			$('#project-list').prepend(this.createNoProjectsCard());
		}

		if(this.user.auth){		
			$('#project-list').prepend(this.createAddProjectCard());

			$('#btn-add-project').on('click', $.proxy(this.toggleAddProject, this));
			$('#btn-close').on('click', $.proxy(this.toggleAddProject, this));
			$('#btn-create-project').on('click', $.proxy(this.addProject, this));

			$('#input-title').on('keypress', $.proxy(this.pressKey, this));
			$('#input-project-id').on('keypress', $.proxy(this.pressKey, this));
		}
	}

	pressKey(e){
		if(e.which === 13){
			addProject();
		}
	}

	createCard(project){
		var tooLong = '';
		if(project.description.length > 110){
			tooLong += '...';
		}

		return '<div class="col p-2"><div class="card m-auto " style="height: 15rem;">' +
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
	   			'<button id="btn-add-project" class="btn btn-outline-primary btn-block h-100 m-0">' + 
	   				'<h5>Add new project</h5> <span class="display-3">+</span>' +
	   			'</button>' +
		'</div><div>';
	}

	toggleAddProject(){
		$('#user-page').toggleClass('d-none');
		$('#add-project-form').toggleClass('d-none');
		$('#input-title').focus();
	}

	async  addProject(){
		var title = $('#input-title').val();
		var projectId = $('#input-project-id').val();
		var description = $('#textarea-description').val();

		var response = await this.user.addProject(title, projectId, description);

		if(response instanceof Error){
			let errorAlert = this.createErrorAlert(response);

			if($('#create-project-alert').length){
				$('#create-project-alert').remove();
			}
			errorAlert.id = 'create-project-alert';

			$('#new-project-form').prepend(errorAlert);
			return;
		}
	}

	createErrorAlert(error){
		var errorAlert = document.createElement('div');
		errorAlert.className = 'alert alert-danger';
		errorAlert.innerHTML = error.name + ': ' + error.message;
		return errorAlert;
	}
}


