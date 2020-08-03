class SignInView extends Controller{
	constructor(model){
		super();
		this.model=model;
	}

	render(){
		return'\
		<div id="sign-in-form" class="m-5 p-5 d-none text-center">\
			<h1 class="">Sign In</h1>\
			<br>\
			\
			<input id="sign-in-email" class="form-control m-3" placeholder="Email">\
			\
			<input id = "sign-in-password" class="form-control m-3" placeholder="Password">\
			\
			<button id="button" class="btn btn-dark m-2">Submit</button>\
			<br>\
			<a href="/signup">\
				<button id="Register" class="btn btn-link m-2">Not a member? Register</button>\
			</a>\
		</div>'
	}

	activate(){
		$('#spinner-auth').addClass('d-none');
		$('#spinner-auth').removeClass('d-flex');

		$('#button').on('click', $.proxy(this.submitForm, this));	
		$('#sign-in-email').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-in-password').on('keypress', $.proxy(this.pressKey, this));

		$('#sign-in-email').focus();
	}

	async submit(){
		var password, email;
		email = (document.getElementById("sign-in-email")).value;
		password = (document.getElementById("sign-in-password")).value;
	
		var response = await this.model.signIn(email, password);
	
		if (response instanceof Error) {
			this.createErrorAlert(response, 'sign-in-alert', 'sign-in-form');
			return;
		}
	}

}





