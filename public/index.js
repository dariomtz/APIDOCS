$(document).ready(main);

function main(){
	var session = new Session(firebase, 'session');
	var locationList = window.location.pathname.toString().split('/');
	var username = null;
	var projectId = null;
	var userController = null;
	var projectController = null;

	switch(locationList.length){
		case 3:
			projectId = locationList[2];
		case 2:
			username = locationList[1];
			break;
	}

	if(username){
		userController = new UserController(firebase, username);
	}

	if(projectId){
		projectController = new ProjectController(firebase, username, projectId);
	}
	
	stateOfSession = document.getElementById('session');
	stateOfSession.onchange = () => {
		if (stateOfSession.checked){
			$('#btn-sign-out').removeClass("d-none");
			$('#btn-sign-in').addClass("d-none");
			$('#btn-sign-up').addClass("d-none");

			if(userController){
				userController.auth = (session.user.displayName === userController.userName);
			}
			
			$('#navbar-brand').attr("href", '/'+ session.user.displayName);
		}else{

			if(userController){
				userController.auth = false;
			}

			$('#btn-sign-in').removeClass("d-none");
			$('#btn-sign-up').removeClass("d-none");
			$('#btn-sign-out').addClass("d-none");
		}

		$('#navbar-spinner').addClass('d-none');
		
		if(projectController){
			new ProjectView(userController, projectController);
		}else if(userController){
			new UserView(userController);
		}
	}

	$('#btn-sign-out').on('click', () => {
		$('#navbar-spinner').removeClass('d-none');
		$('#btn-sign-out').addClass("d-none");
		session.signOut();
	});

	if (locationList[1] === 'signup') {
		new SignUpView(session);
	}else if(locationList[1] === 'signin'){
		new SignInView(session);
	}
}
