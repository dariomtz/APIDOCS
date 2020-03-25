function signIn(){
	$('#sign-in-form').removeClass('d-none');
	$('#sign-in-email').focus();
	$('#spinner-auth').addClass('d-none');
	$('#spinner-auth').removeClass('d-flex');

	document.getElementById("button").addEventListener("click", submitSignInForm);	
	$('#sign-in-email').on('keypress', pressKey);
	$('#sign-in-password').on('keypress', pressKey);
}

function pressKey(e){
	if(e.which === 13){
		submitSignInForm();
	}
}

async function submitSignInForm(){
	var password, email;
	email = (document.getElementById("sign-in-email")).value;
	password = (document.getElementById("sign-in-password")).value;

	var response = await session.signIn(email, password);

	if (response instanceof Error) {

		let errorAlert = createErrorAlert(response);

		if($('#sign-in-alert').length){
			$('#sign-in-alert').remove();
		}
		errorAlert.id = 'sign-in-alert';

		$('#sign-in-form').prepend(errorAlert);
		
		return;
	}
}