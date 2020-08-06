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
	
	var stateOfSession = document.getElementById('session');
	stateOfSession.onchange = () => {
		if (stateOfSession.checked){
			let signedUser = session.user.displayName;
			let isOwner = signedUser === username;

			$('#btn-sign-out').removeClass("d-none");
			$('#btn-sign-in').addClass("d-none");
			$('#btn-sign-up').addClass("d-none");

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
			
			if(projectId){
				view = new ProjectView(database.ref(username + '/projects'), projectId, isOwner);
				view.appendTo($('#content'))
			}else {
				view = new UserProjectsView(database.ref(username), isOwner);
				view.appendTo($('#content'))
			}

		}else{

			if(projectId){
				view = new ProjectView(database.ref(username + '/projects'), projectId, false);
				view.appendTo($('#content'))
			} else {
				if (locationList[1] !== 'signin' && locationList[1] !== 'signup') {
					view = new UserProjectsView(database.ref(username), false);
					view.appendTo($('#content'))
				}
			}

			$('#btn-sign-in').removeClass("d-none");
			$('#btn-sign-up').removeClass("d-none");

			$('#btn-sign-out').addClass("d-none");
			$('#home-container').addClass("d-none");
		}

		$('#navbar-spinner').addClass('d-none');
	}

	$('#btn-sign-out').on('click', () => {
		$('#navbar-spinner').removeClass('d-none');
		$('#btn-sign-out').addClass("d-none");
		session.signOut();
	});	
}
