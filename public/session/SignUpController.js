class SignUpController extends Controller {
	constructor(model){
		super();
		this.model = model;
	}
	
	render(){
		return '\
		<div id ="sign-up-form" class="m-5 p-5 text-center">\
			<h1 class="">Sign Up</h1>\
			<br>\
			\
			<input id="sign-up-email" type="text" class="form-control m-3"  placeholder="Email">\
			\
			<input id="sign-up-username" class="form-control mx-3 mt-3"  placeholder="Username" aria-describedby="username-description">\
			<small id="username-description" class="form-text text-muted mx-3 mb-3">\
				Your username will be visible in all of your projects and it cannot be changed later.\
			</small>\
			\
			<input id="sign-up-password" type="password" class="form-control m-3" placeholder="Password">\
			\
			<input id="sign-up-confirmation" type="password" class="form-control m-3" placeholder="Confirm password">\
			\
			<button id="sign-up-submit" type="button" class="btn btn-dark m-2">Submit</button>\
			<br>\
			<a href="/signin">\
				<button id="sign-in" class="btn btn-link m-2">Already a member? Sign in!</button>\
			</a>\
		</div>'
	}

	activate(){
		$('#sign-up-email').focus();
		$('#spinner-auth').addClass('d-none');
		$('#spinner-auth').removeClass('d-flex');
		
		$('#sign-up-submit').on('click', $.proxy(this.submit, this));
		$('#sign-up-email').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-up-username').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-up-password').on('keypress', $.proxy(this.pressKey, this));
		$('#sign-up-confirmation').on('keypress', $.proxy(this.pressKey, this));
	}

	async submit(){
		var username, password, confirmation, email;
		email = (document.getElementById("sign-up-email")).value;
		username = (document.getElementById("sign-up-username")).value;
		password = (document.getElementById("sign-up-password")).value;
		confirmation = (document.getElementById("sign-up-confirmation")).value;		
	
		let response = await this.model.signUp(email, password, confirmation, username);
	
		if(response instanceof Error){
			this.createErrorAlert(response, 'sign-up-alert', 'sign-up-form');
		}
	
	}
}




