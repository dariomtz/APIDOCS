$(document).ready(main);

function main(){
	var session = new SessionModel(firebase, 'session');
	var locationList = window.location.pathname.toString().split('/');
	var username = null;
	var projectId = null;
	var view = null;

	switch(locationList.length){
		case 3:
			projectId = locationList[2];
		case 2:
			username = locationList[1];
			break;
	}

	if (locationList[1] === 'signup') {
		view = new SignUpController(session);
	}else if(locationList[1] === 'signin'){
		view = new SignInController(session);
	}

	if (view){
		view.appendTo($('#auth-page'));
	}
	
	if(locationList[1] === ''){
		view = true;
	}
	
	var stateOfSession = document.getElementById('session');
	stateOfSession.onchange = () => {
		let isOwner = false;
		if (stateOfSession.checked){
			let signedUser = session.user.displayName;
			isOwner = signedUser === username;

			$('#btn-sign-out').removeClass("d-none");
			$('#home-container').removeClass("d-none");
			$('#username-display').text(signedUser);

			let userUrl = "/" + signedUser;	
			$('#btn-home').on('click', () =>{
				window.location.href = userUrl;
			})

			$('#navbar-brand').attr("href", userUrl);

			if(locationList[1] === ""){
				window.location.href = userUrl;
			}

		}else{			
			$('#btn-sign-in').removeClass("d-none");
			$('#btn-sign-up').removeClass("d-none");
		}

		if (!view){
			if(projectId){
				view = new ProjectView(database.ref(username + '/projects'), projectId, isOwner);
				view.appendTo($('#content'))
			}else {
				view = new UserProjectsView(database.ref(username), isOwner);
				view.appendTo($('#content'))
			}
		}

		$('#navbar-spinner').addClass('d-none');
	}

	$('#btn-sign-out').on('click', () => {
		$('#navbar-spinner').removeClass('d-none');
		$('#btn-sign-out').addClass("d-none");
		session.signOut();
	});	
}
