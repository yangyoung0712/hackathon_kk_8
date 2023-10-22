//import { user_infor } from "./user_infor";

function initApp() {
    var Email = document.getElementById('Email');
    var Password = document.getElementById('Password');
    var btnLogin = document.getElementById('btnsignin');
    var btnSignUp = document.getElementById('btnsignup');
    var users_info = firebase.database().ref('users_info');
    var this_account = "";

    btnLogin.addEventListener('click', function () {
        //alert('SignIn!!!!')
        var email = Email.value;
        var password = Password.value;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            this_account = email;
            sessionStorage.setItem("this_account", this_account);
            console.log("SignIn!!")
            window.location.href = "main.html";
        }).catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Email.value = "";
            Password.value = "";
            create_alert("error", "account does not exist.");
            console.log(error);
        });
    });

    btnSignUp.addEventListener('click', function () {
        alert('successful to create a new account!')
        var email = Email.value;
        var password = Password.value;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
            Email.value = "";
            Password.value = "";
            var information = {
                email: email,
                password:password,
                timestamp: Date.now()
            };
            users_info.push(information);
            create_alert("success", "account create succeeded");
        }).catch(function (error) {
            Email.value = "";
            Password.value = "";
            create_alert("error", "account create failed");
        });
    });
}
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

window.onload = function () {
    initApp();
};