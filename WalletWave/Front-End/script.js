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
    // Get form data
    const formData = new FormData(document.getElementById('loginForm'));
    for (const [key, value] of formData) {
        console.log('»', key, value)
    }
    // hide the loginpage
    document.querySelector(".login-container").classList.remove("active");
    popUpmessage("Login Successfully");
}

// Function to handle signup
function signup() {
    console.log("signup");
    // Get form data
    const formData = new FormData(document.getElementById('signupForm'));
    for (const [key, value] of formData) {
        console.log('»', key, value)
    }
    // hide the signup page
    document.querySelector(".signup-container").classList.remove("active");
    popUpmessage("Your Account Created Successfully");
}

function popUpmessage(message) {
    document.querySelector("main .pop-up-message").style.display = "flex";
    document.querySelector(".pop-up-message .success-message .text-message").textContent = message;
    setTimeout(() => {
        document.querySelector("main .pop-up-message").style.display = "none";
    }, 5000);
}
