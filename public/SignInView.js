class SignInView extends View{
	constructor(controller){
		super(controller);

		$('#sign-in-form').removeClass('d-none');
		$('#sign-in-email').focus();
		$('#spinner-auth').addClass('d-none');
		$('#spinner-auth').removeClass('d-flex');

		$('#button').on('click', $.proxy(this.submitForm, this));	
		$('#sign-in-email').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-in-password').on('keypress', $.proxy(this.pressKey, this));
	}

	pressKey(e){
		if(e.which === 13){
			this.submitForm();
		}
	}

	async submitForm(){
		var password, email;
		email = (document.getElementById("sign-in-email")).value;
		password = (document.getElementById("sign-in-password")).value;
	
		var response = await this.controller.signIn(email, password);
	
		if (response instanceof Error) {
			
			this.createErrorAlert(response, 'sign-in-alert', 'sign-in-form');
			return;
		}
	}

}





