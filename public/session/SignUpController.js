class SignUpView extends View {
	constructor(controller){
		super(controller);

		$('#sign-up-form').removeClass('d-none');
		$('#sign-up-email').focus();
		$('#spinner-auth').addClass('d-none');
		$('#spinner-auth').removeClass('d-flex');
		
		$('#sign-up-submit').on('click', $.proxy(this.submitForm, this));
		$('#sign-up-email').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-up-username').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-up-password').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-up-confirmation').on('keypress', $.proxy(this.pressKey, this));
	}

	pressKey(e){
		if(e.which === 13){
			this.submitForm();
		}
	}

	async submitForm(){
		var username, password, confirmation, email;
		email = (document.getElementById("sign-up-email")).value;
		username = (document.getElementById("sign-up-username")).value;
		password = (document.getElementById("sign-up-password")).value;
		confirmation = (document.getElementById("sign-up-confirmation")).value;
	
		let error = null;
		if (password !==confirmation) {
			error = new Error('The password does not match with the confirmation.');
			error.name = 'Invalid password';
			this.createErrorAlert(error, 'sign-up-alert', 'sign-up-form');
			return;
		}
	
		let response = await this.controller.signUp(email, password, username);
	
		if(response instanceof Error){
			error = response;
		}
	
		if(error){
			this.createErrorAlert(error, 'sign-up-alert', 'sign-up-form');
			return;
		}
	}
}




