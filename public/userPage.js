function userPage(){
	//identify if the user exists

	userController.exists()
	.then(exists =>{
		if(exists){
			$('#user-page').removeClass('d-none');
			loadProjects()
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

function pressKeyUser(e){
	if(e.which === 13){
		addProject();
	}
}

async function loadProjects(){
	var projects = await userController.getProjects();
	var hasProjects = false;

	for (const project in projects){
		hasProjects = true;
		$('#project-list').append(createCard(projects[project]));
	}

	if(!hasProjects && !userController.auth){
		$('#project-list').prepend(createNoProjectsCard());
	}

	if(userController.auth){
		if(!$('#add-project-card').length){
			$('#project-list').prepend(createAddProjectCard());
		}
		$('#btn-add-project').on('click', toggleAddProjectForm);
		$('#btn-close').on('click', toggleAddProjectForm);
		$('#btn-create-project').on('click', addProject);
		$('#input-title').on('keypress', pressKeyUser);
		$('#input-project-id').on('keypress', pressKeyUser);
	}else{
		if($('#add-project-card').length){
			$('#add-project-card').remove();
		}
	}
}

function toggleAddProjectForm(){
	$('#user-page').toggleClass('d-none');
	$('#add-project-form').toggleClass('d-none');
	$('#input-title').focus();
}

async function addProject(){
	var title = $('#input-title').val();
	var projectId = $('#input-project-id').val();
	var description = $('#textarea-description').val();

	var response = await userController.addProject(title, projectId, description);

	if(response instanceof Error){
		let errorAlert = createErrorAlert(response);

		if($('#create-project-alert').length){
			$('#create-project-alert').remove();
		}
		errorAlert.id = 'create-project-alert';

		$('#new-project-form').prepend(errorAlert);
		return;
	}
}

function createCard(project){

	let desctiptionTooLong;
	if(project.description.length > 110){
		descriptionTooLong = '...';
	}else{
		descriptionTooLong = '';
	}

	return '<div class="col p-2"><div class="card m-auto " style="height: 15rem;">' +
  		'<div class="card-body">' +
   			'<h5 class="card-title">' + project.title + '</h5>' +
    		'<h6 class="card-subtitle mb-2 text-muted">' + project.projectId + '</h6>' +
    		'<p class="card-text text-justify">' + project.description.substring(0,110) + descriptionTooLong + '</p>' +	
  		'</div>' +
  		'<div class="card-footer d-flex justify-content-end">'+
    		'<a href="/' + project.author + '/' + project.projectId + '" class="card-link">View Project</a>' +
		'</div>' +
	'</div></div>';
}

function createNoProjectsCard(){
	return '<div class="col p-2"><div class="card m-auto" style="height: 15rem;">' + 
  		'<div class="card-body">' +
   			'<h5 class="card-title">This user does not have any projects. </h5>' +
    		'<p class="card-text">You can come back later to see if he documents something new.</p>' +
  		'</div>' +
	'</div></div>';
}

function createAddProjectCard(){
	return '<div id="add-project-card" class="col p-2"><div class="card m-auto" style="height: 15rem;">' +
   			'<button id="btn-add-project" class="btn btn-outline-primary btn-block h-100 m-0">' + 
   				'<h5>Add new project</h5> <span class="display-3">+</span>' +
   			'</button>' +
	'</div><div>';
}


