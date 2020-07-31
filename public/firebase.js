// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCxsAlKPNxlp6S-ThPGrmKzxnoTrMsr-CU",
	authDomain: "api-docs-iteso.firebaseapp.com",
	databaseURL: "https://api-docs-iteso.firebaseio.com",
	projectId: "api-docs-iteso",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = firebase.auth();

