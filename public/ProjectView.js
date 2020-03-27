class ProjectView extends View{
	constructor (user, project){
		super(project);
		this.user = user;		

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
		$('#textarea-description').val(this.description);
	
		this.baseURL = p.baseURL;
		$('#base-url').html(this.baseURL);
		$('#input-baseURL').val(this.baseURL);

		this.id = p.projectId;
		$('#project-id').html(this.id);
		$('#input-project-id').val(this.id);
	}

	async load(){
		var p = await this.controller.getProject();

		this.setProjectInfo(p);	

		var hasResources = false;

		for (const resource in p.resources){
			let r = p.resources[resource];
			hasResources = true;
			this.creteResource(r);
		}

		if(!hasResources && !this.user.auth){
			$('#resource-list').prepend(createNoResourcesCard());
		}

		if(this.user.auth){
			$('#btn-copy-link-clipboard').on('click', $.proxy(this.copyProjectToClipboard , this));

			$('#edit-project').on('click', $.proxy(this.toggleEdit, this));
			$('#btn-close-project-form').on('click', $.proxy(this.toggleEdit, this));
			$('#cancel-project-changes').on('click', $.proxy(this.toggleEdit, this));
			$('#save-project').on('click', $.proxy(this.update, this));

			$('#input-title').on('keypress', $.proxy(this.pressKey, this));
			$('#input-project-id').on('keypress', $.proxy(this.pressKey, this));
			$('#input-baseURL').on('keypress', $.proxy(this.pressKey, this));

			$('#btn-add-resource').on('click', $.proxy(this.toggleAddResource, this));
			$('#btn-close-add-resource').on('click', $.proxy(this.toggleAddResource, this));
			$('#cancel-save-resource').on('click', $.proxy(this.toggleAddResource, this));
			$('#save-resource').on('click', $.proxy(this.addResource, this));

			$('.edit').removeClass('d-none');
		}else{
			$('.edit').remove();
		}
	}

	toggleEdit(){
		this.clearEditProjectForm();
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
		
		const response = await this.controller.updateProject(title, id, description, baseURL);
		
		if (response instanceof Error) {
			this.createErrorAlert(response, 'edit-project-alert', 'project-form');
			return;
		}

		let p = {
			title: title,
			description: description,
			projectId: id,
			baseURL: baseURL,
		}

		this.setProjectInfo(p)

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
			this.createErrorAlert(response, 'add-resource-alert', 'add-resource-form');
		}else{
			this.creteResource(response);
			this.toggleAddResource();
		}

		return;
	}

	creteResource(resource){
		let resourceController = new ResourceController(
			this.controller.firebase, this.controller.owner, this.controller.id, resource.id);
		
		new ResourceView(resourceController, resource, this.user.auth);
	}

	createNoResourcesCard(){
		return '<div class="card">' + 
	  		'<div class="card-body">' +
	   			'<h5 class="card-title">This project does not have any resources. </h5>' +
	    		'<p class="card-text">You can come back later to see if the owner adds something new.</p>' +
	  		'</div>' +
		'</div>';
	}

	copyProjectToClipboard(){
		const el = document.createElement('textarea');
  	el.value = window.location.href;
  	document.body.appendChild(el);
  	el.select();
  	document.execCommand('copy');
  	document.body.removeChild(el);
	
	clearEditProjectForm(){
		$('#project-form :text').each((i, val)=>{
			$(val).val('');
		});
		$('#project-form #textarea-description').each((i, val)=>{
			$(val).val('');
		});
	}
}