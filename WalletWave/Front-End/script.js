// this Immediate Invoke Expression function for the active tab and active page
(function () {
    // get all the tab inside a in array format
    [...document.querySelectorAll(".nav-tabs ul li a")].forEach(button => {
        // get the click event
        console.log(button);
        button.addEventListener("click", function () {
            // remove the previous active then add current clicked tab
            document.querySelector(".active-tab").classList.remove("active-tab");
            this.classList.add("active-tab");
            // the same thing like tab remove and add the active page
            document.querySelector('.active-page').classList.remove("active-page");
            document.getElementById(button.dataset.id).classList.add("active-page");
            console.log(button.dataset.id)
            console.log(button);
        })
    });
})();
