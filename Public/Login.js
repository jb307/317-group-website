function validate(){
var username=document.getElementById("uname").value;
var password=document.getElementById("psw").value;
if(username=="" || password==""){
    return false;
}
else{
    alert("login successful, welcome back " + username);
    location.href = "Home.html";
    alert("login successful");
    return false;
}
}

function match(){
    var password1=document.getElementById("psw1").value;
    var password2=document.getElementById("psw2").value;

    if(password1=="" || password2==""){
        alert("Please enter password.")
        return false;}
    else if(password1 == password2){
        document.getElementById('Reg').style.display='none'
        return false;
    }
    else{
        alert("Passwords dont match.")
        return false;

    }
    
    }
