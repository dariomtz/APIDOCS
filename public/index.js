var session, locationList, username, projectId, user, project, stateOfSession;

$(document).ready(main);

function main(){
	session = new Session(firebase, 'session');
	locationList = window.location.pathname.toString().split('/');
	username = null;
	projectId = null;
	user = null;
	project = null;

	switch(locationList.length){
		case 3:
			projectId = locationList[2];
		case 2:
			username = locationList[1];
			break;
	}

	if(username){
		user = new User(firebase, username);
	}

	if(projectId){
		project = new ProjectController(firebase, username, projectId);
	}
	
	stateOfSession = document.getElementById('session');
	stateOfSession.onchange = () => {
		if (stateOfSession.checked){
			$('#btn-sign-out').removeClass("d-none");
			$('#btn-sign-in').addClass("d-none");
			$('#btn-sign-up').addClass("d-none");

			if(user){
				user.auth = (session.user.displayName === user.userName);
			}
			
			$('#navbar-brand').attr("href", '/'+ session.user.displayName);
		}else{

			if(user){
				user.auth = false;
			}

			$('#btn-sign-in').removeClass("d-none");
			$('#btn-sign-up').removeClass("d-none");
			$('#btn-sign-out').addClass("d-none");
		}

		$('#navbar-spinner').addClass('d-none');
		
		if(project){
			new ProjectView(user, project);
		}else if(user){
			userPage();
		}
	}

	$('#btn-sign-out').on('click', () => {
		$('#navbar-spinner').removeClass('d-none');
		$('#btn-sign-out').addClass("d-none");
		session.signOut();
	});

	if (locationList[1] === 'signup') {
		signUp();
	}else if(locationList[1] === 'signin'){
		signIn();
	}
}

function validateSlug(slug){
	if(typeof slug !== "string"  || slug === ''){
    	var e = new Error('This field must be a non empty string with only lower case letters, numbers and hyphens.');
		return e;
	}
	
	var validCharacters = '1234567890qwertyuiopasdfghjklzxcvbnm-';

	for (var i = 0; i < slug.length; i++) {
		var flag = false;

		for (var j = 0; j < validCharacters.length; j++) {
			if(slug[i] == validCharacters[j]){
				flag = true
			}
		}

		if (!flag) {
			var e = new Error('This field must have only lower case letters, numbers and hyphens.');
			return e;
		}
	}

	return true;
}

function createErrorAlert(error){
	var errorAlert = document.createElement('div');
	errorAlert.className = 'alert alert-danger';
	errorAlert.innerHTML = error.name + ': ' + error.message;
	return errorAlert;
}
