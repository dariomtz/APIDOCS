class Controller extends Showable{
	constructor(fb, model = null,  view = null){
		super();
		this.fb = fb;
		this.view = view;

		if (model){
			this.model = model;
			this.id = this.model.id;
        }else{
			this.id = null;
            this.model = new ProjectModel(this.fb, this.id);
        }
	}

	createErrorAlert(error, alertId, parentId){
		var errorAlert = document.createElement('div');
		errorAlert.className = 'alert alert-danger';
		errorAlert.innerHTML = error.name + ': ' + error.message;

		if($('#' + alertId).length){
			$('#' + alertId).remove();
		}

		errorAlert.id = alertId;

		$('#' + parentId).prepend(errorAlert);
		return;
	}

	show(){
		super.show();
		this.reset();
		
		if (this.view){
			this.view.hide();
		}
	}
	
    hide(){
        super.hide();
		this.reset();

		if (this.view){
			this.view.show();
		}
	}
	
	reset(){
		
	}

	activate(){
		this.hide();
	}
}