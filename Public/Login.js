function match(){
    var regusername = document.getElementById("reg-username").value;
    var name = document.getElementById("name").value;
    var password1=document.getElementById("psw1").value;
    var password2=document.getElementById("psw2").value;
    let alert = "";

    if(password1=="" || password2=="" || name=="" || regusername=="" ){
        alert = ("Please fill out all fields.");
        localStorage.setItem("alert", alert);
        showAlert()
        return false;}
    else if(password1 == password2){
        document.getElementById('Reg').style.display='none' 
        console.log("Sign-up data:", regusername, name, password1);
        localStorage.setItem("username", regusername);
        localStorage.setItem("name", name);
        localStorage.setItem("password", password1);
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


function log() {
    var logusername = document.getElementById("login-username").value;
    var logpassword = document.getElementById("login-password").value;
    var name = localStorage.getItem("name");
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    let alertMessage = "";

    if (logusername === "" || logpassword === "") {
        alertMessage = "Please fill out all the fields.";
        localStorage.setItem("alert", alertMessage);
        showAlert();
        return false;
    } else if (logusername !== username || logpassword !== password) {
        alertMessage = "Incorrect username or password.";
        localStorage.setItem("alert", alertMessage);
        showAlert();
        return false;
    } else if (logusername === username && logpassword === password) {
        console.log("Login data:", username, password);
        alertMessage = "Login successful, Welcome back " + name + ". Redirecting Shortly";
        localStorage.setItem("alert", alertMessage);
        showAlert2();
        
        // Redirect to "Home.html" after a delay (e.g., 3 seconds)
        setTimeout(function () {
            location.href = "Home.html";
        }, 3000);
        
        // Optionally, you might want to return true instead of false
        return true;
    }
}