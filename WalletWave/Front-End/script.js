// this Immediate Invoke Expression function for the active tab and active page
(function () {
    // get all the tab inside a in array format
    [...document.querySelectorAll(".nav-tabs ul li a")].forEach(button => {
        // get the click event
        // console.log(button);
        button.addEventListener("click", function () {
            // remove the previous active then add current clicked tab
            document.querySelector(".active-tab").classList.remove("active-tab");
            this.classList.add("active-tab");
            // the same thing like tab remove and add the active page
            document.querySelector('.active-page').classList.remove("active-page");
            document.getElementById(button.dataset.id).classList.add("active-page");
            // console.log(button.dataset.id)
            // console.log(button);
        })
    });
})();
(function () {
    // to get the two switch login and signup
    [...document.querySelectorAll(".main-container .second-container .toggle-switch .switch")].forEach(click_switch => {
        // console.log(click_switch)
        // get the clicked switch using this
        click_switch.addEventListener("click", function () {
            // let parent = this.parentNode;
            // while (parent) {
            //     if (parent.classList.contains("login-container") || parent.classList.contains("signup-container")) {
            //         console.log(parent);
            //         break;
            //     }
            //     parent = parent.parentNode;
            // }
            console.log(this);
            // if the class name contain signup show the singup same as login
            if (this.classList.contains("signup")) {
                console.log("signup");
                document.querySelector(".login-container").classList.remove("active");
                document.querySelector(".signup-container").classList.add("active");
            }
            else if (this.classList.contains("login")) {
                console.log("login");
                document.querySelector(".login-container").classList.add("active");
                document.querySelector(".signup-container").classList.remove("active");
            }
        })
    });
})();

// login and signup function
// Function to handle login
function login() {
    console.log("login");
    document.querySelector(".login-container").classList.remove("active");
    // Get form data
    // const formData = new FormData(document.getElementById('loginForm'));

    // // Send login request to login.php
    // fetch('login.php', {
    //     method: 'POST',
    //     body: formData
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Check login response
    //         if (data.success) {
    //             // Login successful, display success message or redirect to dashboard
    //             console.log('Login successful!');
    //         } else {
    //             // Login failed, display error message
    //             console.error(data.message);
    //         }
    //     })
    //     .catch(error => console.error('Error:', error));
}

// Function to handle signup
function signup() {
    console.log("signup");
    document.querySelector(".signup-container").classList.remove("active");
    // Get form data
    // const formData = new FormData(document.getElementById('signupForm'));

    // // Send signup request to signup.php
    // fetch('signup.php', {
    //     method: 'POST',
    //     body: formData
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Check signup response
    //         if (data.success) {
    //             // Signup successful, display success message or redirect to login page
    //             console.log('Signup successful!');
    //         } else {
    //             // Signup failed, display error message
    //             console.error(data.message);
    //         }
    //     })
    //     .catch(error => console.error('Error:', error));
}
