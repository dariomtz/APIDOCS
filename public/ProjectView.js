class ProjectView {
	constructor (user, project){ 
		this.user = user;
		this.controller = project;

		this.user.exists()
		.then(exists =>{
			if(exists){
				this.controller.exists()
				.then(projectExists => {
					if (projectExists) {
						this.load()
						.then(() => {
							$('#project-page').removeClass('d-none');
							$('#spinner-user-page').addClass('d-none');
							$('#spinner-user-page').removeClass('d-flex');
						});
					}else{
						$('#not-found-project').removeClass('d-none');
						$('#spinner-user-page').addClass('d-none');
						$('#spinner-user-page').removeClass('d-flex');
					}
				});
			}else{
				$('#not-found-user').removeClass('d-none');
				$('#spinner-user-page').addClass('d-none');
				$('#spinner-user-page').removeClass('d-flex');
			}
		});
	}

	setProjectInfo(p){
		this.title = p.title;
		$('#project-title').html(this.title);
		$('#input-title').val(this.title);
	
		this.description = p.description;
		$('#project-description').html(this.description);
		$('#input-description').val(this.description);
	
		this.baseURL = p.baseURL;
		$('#project-baseURL').html(this.baseURL);
		$('#input-baseURL').val(this.baseURL);

		this.id = p.projectId;
		$('#project-id').html(this.id);
		$('#input-id').val(this.id);
	}

	async load(){
		var p = await this.controller.getProject();

		this.setProjectInfo(p);	

		var hasResources = false;

		for (const resource in p.resources){
			let r = p.resources[resource];
			hasResources = true;
			new ResourceView(r, p.projectId, this.user);
		}

		if(!hasResources && !user.auth){
			$('#resource-list').prepend(createNoResourcesCard());
		}

		if(user.auth){
			$('#edit-project').on('click', this.toggleEdit);
			$('#btn-close-project-form').on('click', this.toggleEdit);
			$('#save-project').on('click', this.update);

			$('#input-title').on('keypress', this.pressKey);
			$('#input-project-id').on('keypress', this.pressKey);
			$('#input-baseURL').on('keypress', this.pressKey);

			$('#btn-add-resource').on('click', this.toggleAddResource);
			$('#btn-close-add-resource').on('click', this.toggleAddResource);
			$('#cancel-save-resource').on('click', this.toggleAddResource);
			$('#save-resource').on('click', this.addResource);

			$('.edit').removeClass('d-none');
		}else{
			$('.edit').remove();
		}
	}

	toggleEdit(){
		$('#project-info').toggleClass('d-none');
		$('#project-form').toggleClass('d-none');
		$('#input-title').focus();
	}

	pressKey(e){
		if(e.which === 13){
			this.update();
		}
	}

	async update(){
		let title = $('#input-title').val();
		let id = $('#input-project-id').val();
		let baseURL = $('#input-baseURL').val();
		let description = $('#textarea-description').val();
		
		const response = await project.updateProject(title, id, description, baseURL);

		if (response instanceof Error) {
			var errorAlert = createErrorAlert(response);

			if($('#edit-project-alert').length){
				$('#edit-project-alert').remove();
			}
			errorAlert.id = 'edit-project-alert';

			$('#project-form').prepend(errorAlert);
			return;
		}

		let p = {
			title: title,
			description: description,
			projectId: id,
			baseURL: baseURL,
		}

		setProjectInfo(p)

		this.toggleEdit();
	}

	toggleAddResource(){
		$('#add-resource-form').toggleClass('d-none');
		$('#btn-add-resource').toggleClass('d-none');
		$('#add-resource-title').val('');
		$('#add-resource-description').val('');
		$('#add-resource-title').focus();
	}

	async addResource(){
		let title = $('#add-resource-title').val();
		let description = $('#add-resource-description').val();
		
		const response = await this.controller.addResource(title, description);

		if (response instanceof Error){
			let errorAlert = createErrorAlert(response);

			if($('#add-resource-alert').length){
				$('#add-resource-alert').remove();
			}
			errorAlert.id = 'add-resource-alert';

			$('#add-resource-form').prepend(errorAlert);
			return;
		}else{
			new ResourceView(response, this.user.auth);
			this.toggleAddResource();
		}

		return;
	}

	createNoResourcesCard(){
		return '<div class="card">' + 
	  		'<div class="card-body">' +
	   			'<h5 class="card-title">This project does not have any resources. </h5>' +
	    		'<p class="card-text">You can come back later to see if the owner adds something new.</p>' +
	  		'</div>' +
		'</div>';
	}
}