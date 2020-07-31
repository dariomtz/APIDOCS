class View extends Showable{
	constructor(controller){
		this.controller = controller;
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
}