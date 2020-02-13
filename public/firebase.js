// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCxsAlKPNxlp6S-ThPGrmKzxnoTrMsr-CU",
	authDomain: "api-docs-iteso.firebaseapp.com",
	databaseURL: "https://api-docs-iteso.firebaseio.com",
	projectId: "api-docs-iteso",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var auth = firebase.auth();

