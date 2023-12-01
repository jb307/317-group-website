const bcrypt = require('bcrypt');


function match(){
    var username = document.getElementById("reg-username").value;
    var name = document.getElementById("name").value;
    var password1=document.getElementById("psw1").value;
    var password2=document.getElementById("psw2").value;
    let alert = "";

    if(password1=="" || password2=="" || name=="" || username=="" ){
        alert = ("Please fill out all fields.");
        localStorage.setItem("alert", alert);
        showAlert()
        return false;}

    else if(password1 == password2){
        document.getElementById('Reg').style.display='none' 
        const password = password1;
          fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, name }),
          })
            .then(response => response.text())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
              alert = ("Username has already been taken.");
              localStorage.setItem("alert", alert);
              showAlert()
            });
        return false;
    }
    else{
        alert = ("Passwords dont match.");
        localStorage.setItem("alert", alert);
        showAlert()
        return false;
    }
}

// let alert = "";
// localStorage.setItem("alert", alert);
// showAlert()

function showAlert() {
    var alertBox = document.getElementById("custom-alert");
    var alertText = document.getElementById("alert-text");
    var alert = localStorage.getItem("alert");
    alertText.innerHTML = (alert);
    alertBox.style.display = "flex";
}

function showAlert2() {
    var alertBox = document.getElementById("custom-alert2");
    var alertText = document.getElementById("alert-text2");
    var alert = localStorage.getItem("alert");
    alertText.innerHTML = (alert);
    alertBox.style.display = "flex";
}

function closeAlert() {
    var alertBox = document.getElementById("custom-alert");
    alertBox.style.display = "none";
}

function signedin() {
    var loginNavItem = document.getElementById("loginNavbar");
    if (loginNavItem) {
        loginNavItem.innerHTML = '<a href="#" onclick="signOut()">Sign Out</a>';
        // Store the login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
    }
}

function signOut() {
    // Clear the login state in localStorage
    localStorage.removeItem('isLoggedIn');
}


function log() {
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  let alertMessage = "";

  if (username === "" || password === "") {
        alertMessage = "Please fill out all the fields.";
        localStorage.setItem("alert", alertMessage);
        showAlert();
        return false;
  } else (loginUser(username, password));

    async function loginUser(username, password) {
        console.log('Calling loginUser function with:', username, password);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            console.log('Response from server:', data);

            if (response.ok) {
                // Login successful
                console.log('Login successful:', data.user.username, data.user.name);
                alertMessage = "Login successful, Welcome back " + data.user.name + ". Redirecting Shortly";
                localStorage.setItem("alert", alertMessage);
                showAlert2();
                setTimeout(function () {
                    location.href = "Home.html";
                    signedin();
                }, 3000);
                // Perform any actions you want after successful login
            } else {
                // Login failed
                console.log('Login failed:', data.message);
                alertMessage = "Incorrect username or password.";
                localStorage.setItem("alert", alertMessage);
                showAlert();
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }



}

    // if (logusername === "" || logpassword === "") {
    //     alertMessage = "Please fill out all the fields.";
    //     localStorage.setItem("alert", alertMessage);
    //     showAlert();
    //     return false;
    // } else if (logusername !== username || logpassword !== password) {
    //     alertMessage = "Incorrect username or password.";
    //     localStorage.setItem("alert", alertMessage);
    //     showAlert();
    //     return false;
    // } else if (logusername === username && logpassword === password) {
    //     console.log("Login data:", username, password);
    //     alertMessage = "Login successful, Welcome back " + name + ". Redirecting Shortly";
    //     localStorage.setItem("alert", alertMessage);
    //     showAlert2();
    //     setTimeout(function () {
    //         location.href = "Home.html";
    //         signedin();
    //     }, 3000);