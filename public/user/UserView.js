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

			$('#btn-add-project').on('click', $.proxy(this.openAddProject, this));

			this.projectController = new ProjectController(this.controller.projects);
			await this.projectController.appendTo($('#add-project-form'));
			this.projectController.setHideShowFunction($.proxy(this.closeAddProject, this));
		}

		let projects = await this.controller.getProjects();
		let hasProjects = false;

		for (const project in projects){
			hasProjects = true;
			if($('#project-list').children('.row').last().children().length == 3){
				$('#project-list').append($('<div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 align-items-center" style="height: 16rem"></div>'));
			}
			const projectView = new ProjectPreView(this.controller.projects.child(project));
			projectView.appendTo($('#project-list').children('.row').last())
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
		this.projectController.show();
	}

	closeAddProject(){
		$('#user-page').toggleClass('d-none');
	}
}


