document.addEventListener('DOMContentLoaded', function () {
    // Checks if the user wants dark mode
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // if the user wants dark mode then it adds dark mode to the 'body'
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }

    // changes between dark and light modes
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // looks for thr toogle-button in the html when that is clicked this code then exicutes.
    const toggleButton = document.getElementById('toggle-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
});
