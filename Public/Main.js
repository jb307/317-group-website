document.addEventListener('DOMContentLoaded', function () {
    // Check the login state in localStorage
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'false') {
        var loginNavItem = document.getElementById("loginNavbar");
        if (loginNavItem) {
            loginNavItem.innerHTML = '<a href="Login.html">Login</a>';
        }
    }

    if (isLoggedIn === 'true') {
        var loginNavItem = document.getElementById("loginNavbar");
        if (loginNavItem) {
            loginNavItem.innerHTML = '<a href="Home.html" onclick="signOut()">Sign Out</a>';
        }
    }
});

function signOut() {
    // Perform any sign-out logic here
    // Clear the login state in localStorage
    localStorage.removeItem('isLoggedIn');
}