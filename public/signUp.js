function signUp(){
	$('#sign-up-form').removeClass('d-none');
	$('#sign-up-email').focus();
	$('#spinner-auth').addClass('d-none');
	$('#spinner-auth').removeClass('d-flex');

	var username, password, confirmation, email;

	document.getElementById('sign-up-submit').addEventListener("click", submitSignUpForm);
	$('#sign-up-email').on('keypress', pressKeySignUp);
	$('#sign-up-username').on('keypress', pressKeySignUp);
	$('#sign-up-password').on('keypress', pressKeySignUp);
	$('#sign-up-confirmation').on('keypress', pressKeySignUp);
}

function pressKeySignUp(e){
	if(e.which === 13){
		submitSignUpForm();
	}
}

async function submitSignUpForm(){
	email = (document.getElementById("sign-up-email")).value;
	username = (document.getElementById("sign-up-username")).value;
	password = (document.getElementById("sign-up-password")).value;
	confirmation = (document.getElementById("sign-up-confirmation")).value;

	var error = null;
	if (password !==confirmation) {
		error = new Error('The password does not match with the confirmation.');
		error.name = 'Invalid password';
	}

	var response = await session.signUp(email, password, username);

	if(response instanceof Error){
		error = response;
	}

	if(error){
		let errorAlert = createErrorAlert(error);

		if($('#sign-up-alert').length){
			$('#sign-up-alert').remove();
		}
		errorAlert.id = 'sign-up-alert';

		$('#sign-up-form').prepend(errorAlert);
		
		return;
	}
}
