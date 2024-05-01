// Get current date
const currentDate = new Date();

// Get day, month, and year
const day = currentDate.getDate().toString().padStart(2, "0"); // Add leading zero if needed
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
const year = currentDate.getFullYear();

// Format date as dd-mm-yyyy
const formattedDate = `${day}-${month}-${year}`;

// console.log(formattedDate); // Output: e.g., 07-02-2024

let isLogin = false;

// Example usage
// if (isLoggedIn()) {
//   // Hide login form
//   document.querySelector('#signuplogin').style.display = 'none';
// } else {
//   // Show login form
//   document.querySelector('#signuplogin').style.display = 'flex';
//   console.log('show')
// }
// ----------------------------------------------
// this Immediate Invoke Expression function for the active tab and active page
(function () {
  // get all the tab inside a in array format
  [...document.querySelectorAll(".nav-tabs ul li a")].forEach((button) => {
    // get the click event
    // console.log(button);
    button.addEventListener("click", function () {
      if (isLogin) {
        // the bellow 4 line for user logo show and hide bug fix lines
        isClicked = false;

        document.querySelector(".user-logo .options").style.display = "none ";
        if (document.querySelector(".active-option")) {
          document
            .querySelector(".active-option")
            .classList.remove("active-option");
        }
        // the below code for transaction add button
        if (
          document
            .getElementById("transaction-form")
            .classList.contains("active-page")
        ) {
          document
            .querySelector(".add-transaction-button i")
            .classList.remove("fa-xmark");
          document
            .querySelector(".add-transaction-button i")
            .classList.add("fa-pen");
          document
            .getElementById("transaction-form")
            .classList.remove("active-page");
        }
        // remove the previous active then add current clicked tab
        document.querySelector(".active-tab").classList.remove("active-tab");
        this.classList.add("active-tab");
        // the same thing like tab remove and add the active page
        if (document.querySelector(".active-page")) {
          document
            .querySelector(".active-page")
            .classList.remove("active-page");
        }
        document.getElementById(button.dataset.id).classList.add("active-page");
        if (button.dataset.id === "aboutus") {
          startSlideshow();
          document.querySelector(".add-transaction").style.display = "none";
        } else {
          stopSlideshow();
          document.querySelector(".add-transaction").style.display = "flex";
        }
        if(button.dataset.id === "transaction"){
          getCategories();
        }
        if(button.dataset.id === "home"){
          getTransactionData();
        }
        if(button.dataset.id != "home" && button.dataset.id != "aboutus"){
          getAlltransactionData();
        }
        currentPage = button.dataset.id;
        // console.log(button.dataset.id)
        // console.log(button);
      } else {
        popUpmessage(false, "Please Login or Signup to Continue");
      }
    });
  });
})();
// -----------------------------------------------------------------------
// this function execute for user-logo
(function () {
  const useroptions = document.querySelector(" nav .user-logo");
  // this is for user logo options
  [...document.querySelectorAll(".user-logo .options .common-option")].forEach(
    (userButton) => {
      // get the click event
      userButton.addEventListener("click", function () {
        // console.log(userButton.dataset.id);
        if (document.querySelector(".active-option-page")) {
          document
            .querySelector(".active-option-page")
            .classList.remove("active-option-page");
        }
        // remove the previous active then add current clicked tab
        if (useroptions.querySelector(".active-option")) {
          useroptions
            .querySelector(".active-option")
            .classList.remove("active-option");
        }
        this.classList.add("active-option");
        if (userButton.dataset.id) {
          document.querySelector(".user-logo .options").style.display = "none ";
          userDetails();
          // console.log(userdata);
        }
        // the same thing like tab remove and add the active page
        document
          .getElementById(userButton.dataset.id)
          .classList.add("active-option-page");
        // console.log(userButton.dataset.id)
        // console.log(userButton);
      });
    }
  );
})();
// ---------------------------------------------------------
// to get the two switch login and signup
(function () {
  [
    ...document.querySelectorAll(
      ".whole-container .second-container .toggle-switch .switch"
    ),
  ].forEach((click_switch) => {
    // console.log(click_switch)
    // get the clicked switch using this
    click_switch.addEventListener("click", function () {
      // console.log(this);
      // if the class name contain signup show the singup same as login
      if (this.classList.contains("signup")) {
        // console.log("signup");
        document.querySelector(".login-container").classList.remove("active");
        document.querySelector(".signup-container").classList.add("active");
      } else if (this.classList.contains("login")) {
        // console.log("login");
        document.querySelector(".login-container").classList.add("active");
        document.querySelector(".signup-container").classList.remove("active");
      }
    });
  });
})();
// -----------------------------------------------------------------------------
// login and signup function
// check the form data is filled or not
function checkUserform(formName) {
  if (formName === "login") {
    const form = document.getElementById("loginForm");
    const inputs = form.querySelectorAll("input");
    // console.log("login")
    inputs.forEach((input) => {
      // console.log(input)
      if (input.value.trim() === "") {
        input.classList.add("required");
        input.classList.remove("filled");
        setTimeout(() => {
          input.classList.remove("required");
        }, 1000);
        popUpmessage(false, "Please enter the input fields");
      } else {
        input.classList.add("filled");
        input.classList.remove("required");
        setTimeout(() => {
          input.classList.remove("filled");
        }, 1000);
      }
    });
  } else if (formName === "signup") {
    const form = document.getElementById("signupForm");
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("required");
        input.classList.remove("filled");
        setTimeout(() => {
          input.classList.remove("required");
        }, 1000);
        popUpmessage(false, "Please enter the input fields");
      } else {
        input.classList.remove("required");
        input.classList.add("filled");
      }
    });
  }
}
// Function to handle login
function login() {
  checkUserform("login");

  const formData = new FormData(document.getElementById("loginForm"));

  // Extract username/email and password from FormData
  const usernameOrEmail = formData.get("logusername");
  const password = formData.get("logpassword");
  // console.log(usernameOrEmail, password);
  let loginData = {
    username: usernameOrEmail,
    password: password,
  };

  // Check if a user with the provided username or email and password exists
  fetch("api/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(loginData),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log("data:", data);
      if (data.success) {
        // console.log("Response data:", data);
        successLogin(data.message);
        // console.log("Response success:", data.message);
      } else {
        // console.log(data);
        // console.log("Response data:", data);
        errorLogin(data.message);
        // console.log("Response success:", data.message);
      }
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
      errorLogin(error);
    });
  // console.log(user);
  // if (user) {
  //   // User exists
  //   isLogin = true;
  //   // console.log(document.getElementById("home"))
  //   document.querySelector("main #signuplogin").style.display = "none";
  //   loaderSpinner();
  //   popUpmessage(user, "Successfully Login");
  //   setTimeout(() => {
  //     document.getElementById("home").classList.add("active-page");
  //     document.querySelector(".add-transaction").style.display = "flex";
  //   }, 5000);
  // }
  // else {
  //   // User does not exist or incorrect credentials
  //   popUpmessage(user, "Error in Login\nPlease check the details");
  // }
}
// ----------------------------------------------------------
// success and error login function
function successLogin(message) {
  //  User exists
  isLogin = true;
  // console.log(document.getElementById("home"))
  document.querySelector("main #signuplogin").style.display = "none";
  loaderSpinner();
  popUpmessage(isLogin, message);
  checkStatus();
  setTimeout(() => {
    document.getElementById("home").classList.add("active-page");
    document.querySelector(".add-transaction").style.display = "flex";
    getTransactionData();
    fetchImage();
  }, 5000);
}
function errorLogin(message) {
  // User does not exist or incorrect credentials
  popUpmessage(false, message);
}
// -----------------------------------------------------------
// Function to handle signup
function signup() {
  checkUserform("signup");

  const signFormdata = new FormData(document.getElementById("signupForm"));

  const userName = signFormdata.get("signname");
  const userEmail = signFormdata.get("signemail");
  const userPassword = signFormdata.get("signpassword");

  let signupData = {
    username: userName,
    useremail: userEmail,
    userpassword: userPassword,
  };

  // console.log(signupData);

  fetch("api/signup.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(signupData),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log("Response data:", data);
      if (data.success) {
        successSignup(data.message);
      } else {
        // console.log(data);
        errorSignup(data.message);
      }
    })
    .catch(function (error) {
      // console.log(data);
      // console.error("There was a problem with the fetch operation:", error);
      errorSignup(error);
      // console.error('There was a problem with the fetch operation:', error);
    });
}
// -------------------------------------------------------------
// success and error function for signup operation
function successSignup(message) {
  isLogin = true;
  document.querySelector("main #signuplogin").style.display = "none";
  loaderSpinner();
  popUpmessage(isLogin, message);
  setTimeout(() => {
    document.getElementById("home").classList.add("active-page");
    document.querySelector(".add-transaction").style.display = "flex";
    getTransactionData();
  }, 5000);
}

function errorSignup(message) {
  popUpmessage(false, message);
}
// -----------------------------------------------------------------------
// for popup the success and error message
function popUpmessage(value, message) {
  if (value) {
    document.querySelector(".pop-up").classList.add("success");
    document.querySelector(".pop-up .pop-up-message").classList.add("success");
    document.querySelector(".pop-up-message .text-message").textContent =
      message;
    document.querySelector(".pop-up-message .i i").className =
      "fa-solid fa-circle-check";
    setTimeout(() => {
      document
        .querySelector(".pop-up .pop-up-message")
        .classList.remove("success");
      document.querySelector(".pop-up").classList.remove("success");
    }, 6000);
  } else {
    document.querySelector(".pop-up").classList.add("error");
    document.querySelector(".pop-up .pop-up-message").classList.add("error");
    document.querySelector(".pop-up-message .text-message").textContent =
      message;
    document.querySelector(".pop-up-message .i i").className =
      "fa-solid fa-circle-xmark";
    setTimeout(() => {
      document
        .querySelector(".pop-up .pop-up-message")
        .classList.remove("error");
      document.querySelector(".pop-up").classList.remove("error");
    }, 6000);
  }
}
// ---------------------------------------------------------------------------
// this function for start and stop the slide show in aboutus image
let slideshowInterval;

function startSlideshow() {
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const singleImage = document.querySelector(".image img");
  let currentIndex = 0;

  function changeImage() {
    // Slide out previous image to the left

    setTimeout(() => {
      // Change image source
      singleImage.style.transform = "translateX(100%)";
      singleImage.src = `images/${images[currentIndex]}`;
      singleImage.style.opacity = 0;
      setTimeout(() => {
        singleImage.style.transform = "translateX(0)";
        singleImage.style.opacity = 1;
        singleImage.style.scale = 1;
        // console.log(images[currentIndex]);
      }, 500);
      // Slide in new image from the right
    }, 500); // Delay to allow slide out animation to complete
    singleImage.style.transform = "translateX(-100%)";
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Start slideshow loop
  slideshowInterval = setInterval(changeImage, 2000);

  // Change image initially
  changeImage();
}
// ------------
function stopSlideshow() {
  // Clear slideshow interval
  clearInterval(slideshowInterval);
}
// ----------------------------------------------------------------------------------
// this function while execute click the user logo in navigation tab
let isClicked = false;

// Get reference to the container element
const container = document.querySelector("nav .user-logo .user");

// Add click event listener to the container
container.addEventListener("click", function () {
  // Toggle the boolean value
  if (isLogin) {
    isClicked = !isClicked;
    if (isClicked) {
      document.querySelector(".user-logo .options").style.display = "flex";
    } else {
      document.querySelector(".user-logo .options").style.display = "none";
      if (document.querySelector(".active-option-page")) {
        document
          .querySelector(".active-option-page")
          .classList.remove("active-option-page");
      }
      if (document.querySelector(".active-option")) {
        document
          .querySelector(".active-option")
          .classList.remove("active-option");
      }
    }
  } else {
    popUpmessage(false, "Please Login or Signup to Continue");
  }
  // Log the current state (for demonstration)
  // console.log('Container clicked:', isClicked);
});
// -------------------------------------------------------------------
// theme button function
let themeButton = document.querySelectorAll(".theme-color-option");
let rootElement = document.querySelector(":root");

themeButton.forEach((color) => {
  color.addEventListener("click", () => {
    document.querySelector(".active-theme").classList.remove("active-theme");
    let dataColor = color.getAttribute("data-color");
    color.classList.add("active-theme");
    rootElement.style.setProperty("--main-color", dataColor);

    // Call a function to add additional properties based on the data color
    addAdditionalProperties(dataColor);
    // console.log(dataColor)
  });
});

function addAdditionalProperties(dataColor) {
  switch (dataColor) {
    case "#6e52fb":
      // Add additional properties for the "blue" theme
      rootElement.style.setProperty("--table-hover", "#6e52fb8c");
      break;
    case "#04aa6d":
      // Add additional properties for the "green" theme
      rootElement.style.setProperty("--table-hover", "#04aa6d85");
      break;
    case "#2cb3ffb5":
      // Add additional properties for the "green" theme
      rootElement.style.setProperty("--table-hover", "#2cb3ff7a");
      break;
    // Add cases for other data colors as needed
    default:
      // Default case if no specific properties are needed
      break;
  }
}
// -----------------------------------------------
function loaderSpinner() {
  document.querySelector(".loader-spinner").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".loader-spinner").style.display = "none";
  }, 3000);
}
// ------------------------------------
// to click the add transaction button
document.getElementById("transactionDate").innerText = formattedDate;
document
  .querySelector(".add-transaction-button")
  .addEventListener("click", () => {
    // console.log("clicked")
    // console.log(document.getElementById("transaction-form"))
    document.getElementById("transaction-form").classList.add("active-page");
    if (
      document
        .querySelector(".add-transaction-button i")
        .classList.contains("fa-pen")
    ) {
      document
        .querySelector(".add-transaction-button i")
        .classList.remove("fa-pen");
      document
        .querySelector(".add-transaction-button i")
        .classList.add("fa-xmark");
        getTotalbalance();
        categoriesTransactionForm();
    } else {
      if (confirm("Are you sure want to exit Add Transaction")) {
        document
          .querySelector(".add-transaction-button i")
          .classList.remove("fa-xmark");
        document
          .querySelector(".add-transaction-button i")
          .classList.add("fa-pen");
        document
          .getElementById("transaction-form")
          .classList.remove("active-page");
      } else {
        document
          .querySelector(".add-transaction-button i")
          .classList.remove("fa-pen");
        document
          .querySelector(".add-transaction-button i")
          .classList.add("fa-xmark");
          categoriesTransactionForm();
      }
    }
    // console.log("trnasaction button clicked");
  });
  // -------------------------------get the total wallet and bank balance display in transaction form----
  async function getTotalbalance(){
    try {
      const response = await fetch("api/get_total_transaction.php");
      const data = await response.json();
      // console.log(data)
      let totalWallet = parseFloat(data.total_income_wallet).toFixed(2) - parseFloat(data.total_expense_wallet).toFixed(2);
      let totalBank = parseFloat(data.total_income_bank).toFixed(2) - parseFloat(data.total_expense_bank).toFixed(2);
      
      document.getElementById("total-wallet").innerText = parseFloat(totalWallet).toFixed(2);
      document.getElementById("total-bank").innerText = parseFloat(totalBank).toFixed(2);
      document.getElementById('transAmount').addEventListener("input", () => {
          let calculateValue = 0;
          var enteredAmount = document.getElementById('transAmount').value;
          if(!isNaN(parseFloat(enteredAmount)))
          {
            var mode  = document.getElementById("IncomeExpense").innerText;
            var category = document.getElementById("Mode").innerText;
            // console.log(parseInt(enteredAmount), category, mode)
            if (mode === 'Income' && category === 'Wallet'){
              calculateValue = parseFloat(totalWallet) + parseFloat(enteredAmount);
              document.getElementById("total-wallet").innerText = calculateValue;
              document.getElementById("total-wallet").style.color = 'lightgreen';
            }
            else if(mode === 'Income' && category === 'Bank') {
              calculateValue = parseFloat(totalBank) + parseFloat(enteredAmount);
              document.getElementById("total-bank").innerText = calculateValue;
              document.getElementById("total-bank").style.color = 'lightgreen';
            }
            else if (mode === 'Expense' && category === 'Wallet'){
              calculateValue = parseFloat(totalWallet) - parseFloat(enteredAmount);
              if(calculateValue <= parseFloat(totalWallet)){
                document.getElementById("total-wallet").innerText = calculateValue;
                document.getElementById("total-wallet").style.color = 'tomato';
                if(calculateValue < 0){
                  popUpmessage(false, "Your balance is Negative.....");
                }
              }
            }
            else if(mode === 'Expense' && category === 'Bank') {
              calculateValue = parseFloat(totalBank) - parseFloat(enteredAmount);
              if(calculateValue <= parseFloat(totalBank)){
                document.getElementById("total-bank").innerText = calculateValue;
                document.getElementById("total-bank").style.color = 'tomato';
                if(calculateValue < 0){
                  popUpmessage(false, "Your balance is Negative.....");
                }
              }
            }
            else
            {
              popUpmessage(false, "Please choose Income/Expense & Waller/Bank...");
              document.getElementById("total-wallet").innerText =parseFloat(totalWallet).toFixed(2);
              document.getElementById("total-bank").innerText = parseFloat(totalBank).toFixed(2);
            }
          }
          else{
            popUpmessage(false, "Please enter value or correct value...");
            document.getElementById("total-wallet").innerText =parseFloat(totalWallet).toFixed(2);
            document.getElementById("total-bank").innerText = parseFloat(totalBank).toFixed(2);
            document.getElementById("total-bank").style.color = 'white';
            document.getElementById("total-wallet").style.color = 'white';
          }
      });
      
    } catch (error) {
      // console.error("Error fetching categories:", error);
      throw error;
    }
  }
// -----------------------------------------------------------------
// categories display in the transaction form
function categoriesTransactionForm(){
  getCategoriesForm();
}
async function getCategoriesForm() {
  try {
    const response = await fetch("api/allcategories.php");
    const data = await response.json();
    // console.log(data.all_categories);
    displayCategoryForm(data);
    insertCategoryForm(data);
    hoverSubCategories();
  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw error;
  }
}

const addFormlists = document.querySelector(".transactionForm-category-list");

function displayCategoryForm(data){
  // Iterate through the array and access main category name and subcategories
  document.querySelectorAll(".cat-whole-lists").forEach((ul) => ul.remove());

  data.all_categories.forEach(category => {
    // console.log(category);
    let html = `
      <ul class="cat-whole-lists">
          <li class="cat-list-title">
              <span class="cat-title" value="${category.main_category_id}">${category.main_category_name}</span>
              <span class="cat-plus">+</span>
          </li>
          <ul class="cat-list">
  `;
  category.subcategories.forEach(subcategory => {
    html += `
        <li value="${subcategory.id}">${subcategory.sub_cat_name}</li>
    `;
  });

  html += `
        </ul>
    </ul>
    `;
    addFormlists.insertAdjacentHTML("beforeend", html);
  });
  addCategory()
}
// --------------------------------------------Add Category--------
function addCategory(){
  document.querySelectorAll(".cat-whole-lists").forEach( category => {
    // console.log(category.querySelector(".cat-plus"));
    category.querySelectorAll(".cat-plus").forEach(catPlus => {
      catPlus.addEventListener('click', ()=> {
        // console.log(catPlus.parentNode.querySelector('.cat-title').getAttribute('value'));
        catValue = catPlus.parentNode.querySelector('.cat-title');
        catName = catValue.firstChild.nodeValue
        // console.log(catValue.firstChild.nodeValue);
        getClickedcategory(catValue.getAttribute('value'), catName);
      });
    })
  });
}
// ------fetch category
async function getClickedcategory(catValue, catName){
  try {
    const response = await fetch('api/subcategories.php?category_id=' + catValue);
    const data = await response.json();
    displayClickedcategory(data, catName, catValue);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
}
// -------display category clicked form
function displayClickedcategory(data, catName, catValue){
  document.querySelector(".add-category-form").style.display = 'flex';
  const catForm = document.querySelector(".whole-category-form .category-form-content");
  catForm.querySelector(".mainName").innerText = catName;
  catForm.querySelector(".mainName").setAttribute('value',catValue);
  const insertCat = document.querySelector(".category-sub-name");
  document.querySelectorAll(".category-sub-name li").forEach((li) => li.remove());
  data.sub_categories.forEach(item => {
    // console.log("id : "+item.id+"\t sub : " + item.sub_cat_name);
    let catList = `<li value="${item.id}">${item.sub_cat_name}</li>`
    insertCat.insertAdjacentHTML("beforeend", catList);
  });
  document.querySelector('.title-category-form .category-form-close').addEventListener('click', function() {
    document.querySelector(".add-category-form").style.display = 'none';
  });
  document.getElementById('categoryFormsubmit').addEventListener('click', () => {
    let addCat = document.getElementById("addNewCat").value;
    let getMaincat = catForm.querySelector(".mainName");
    // console.log(addCat, getMaincat.getAttribute('value'));
    if(addCat == ""){
      document.querySelector(".category-form-input").classList.add("error");
      popUpmessage(false, "Please fill the input filed");
      setTimeout(() => {
        document.querySelector(".category-form-input").classList.remove("error");
      }, 2000);
    }
    else{
          // Assuming you have the form data in an object named formData
const catformData = {
  sub_cat_name: addCat,
  def_category_id: getMaincat.getAttribute('value'),
};

// Send form data to the PHP script using fetch
fetch('api/insert_subcategory.php', {
method: "POST",
headers: {
  "Content-Type": "application/json; charset=utf-8",
},
body: JSON.stringify(catformData),
})
.then(response => response.json())
.then(data => {
if (data.success) {
  // console.log(data)
  setTimeout(() => {
    getClickedcategory(data.catvalue, data.catname);
    categoriesTransactionForm();
    document.getElementById("addNewCat").value = null;
    // addCat = null;
  }, 2000);
  popUpmessage(data.success, data.message);
} else {
  // console.log(data);
  popUpmessage(data.success, data.message)
  // errorSignup(data.message);
}
})
.catch(error => {
  // Handle errors
  console.error('Error:', error);
});
    }
  });
}
document.querySelector(".addMainCategory").addEventListener('click', function(){
  // console.log("add new one");
  getMainCat();
  document.querySelector(".maincategory-form-close").addEventListener('click', function() {
    document.querySelector(".add-maincategory-form").style.display = 'none';
  });
  document.getElementById('maincategoryFormsubmit').addEventListener('click', () => {
    let addMainCat = document.getElementById("addNewMainCat").value;
    // console.log(addCat, getMaincat.getAttribute('value'));
    if(addMainCat == ""){
      document.querySelector(".maincategory-form-input").classList.add("error");
      popUpmessage(false, "Please fill the input filed");
      setTimeout(() => {
        document.querySelector(".maincategory-form-input").classList.remove("error");
      }, 2000);
    }
    else{
          // Assuming you have the form data in an object named formData
const catformData = {
  def_cat_name: addMainCat,
};

// Send form data to the PHP script using fetch
fetch('api/insert_maincategory.php', {
method: "POST",
headers: {
  "Content-Type": "application/json; charset=utf-8",
},
body: JSON.stringify(catformData),
})
.then(response => response.json())
.then(data => {
if (data.success) {
  // console.log(data)
  popUpmessage(data.success, data.message);
  setTimeout(() => {
    document.getElementById("addNewMainCat").value = null;
    getMainCat();
    categoriesTransactionForm();
  }, 2000);
} else {
  // console.log(data);
  popUpmessage(data.success, data.message)
  // errorSignup(data.message);
}
})
.catch(error => {
  // Handle errors
  console.error('Error:', error);
});
    }
  });
});

const maincatPla = document.querySelector('.maincategoryList');
async function getMainCat(){
  try {
    const response = await fetch('api/categories.php');
    const data = await response.json();
    // console.table(data.categories); // Assuming the server returns an array of subcategoriess
    document.querySelectorAll(".mainList").forEach((span) => span.remove());
    data.categories.forEach(category => {
      // console.log(category);
      let mainCat = `<span class="mainList" data-id="${category.id}" value="${category.def_cat_name}">${category.def_cat_name}</span>`;
      maincatPla.insertAdjacentHTML("beforeend", mainCat);
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    // throw error;
  }
  document.querySelector(".add-maincategory-form").style.display = 'flex';
}
// -----------------------

const insertSelection = document.querySelector(".selection-options-data");

function insertCategoryForm(data){
  document.querySelectorAll(".selection-data").forEach((li) => li.remove());

  data.all_categories.forEach(category => {
    // console.log(category);
    let inSet = `<li class="selection-data" data-id="${category.main_category_id}" value="${category.main_category_name}">${category.main_category_name}</li>`;
    insertSelection.insertAdjacentHTML("beforeend", inSet);
  });
}
// ------------------------
function hoverSubCategories(){
  // console.log("Hover");
  const dropdownItems = document.querySelectorAll('.selection-data');
  dropdownItems.forEach(item => {
    item.addEventListener('mouseover', function () {
      if(document.querySelector('.selection-display-sub .sub-menu li')){
        document.querySelectorAll('.selection-display-sub .sub-menu li').forEach(li => li.remove());
      }
      const listItemValue = this.getAttribute('data-id');
      const listItemName = this.getAttribute('value');
      // console.log(listItemValue);
      generateSubmenu(listItemValue, listItemName);
    });
  })
}
function closeCategoryForm(choosedValue){
  document.querySelector(".transaction-form-main .category .dtitle").innerText = choosedValue;
        if (document.querySelector(".active-drop")) {
          document.querySelector(".transaction-form-main .category .dicon i").classList.remove("fa-caret-up");
          document.querySelector(".transaction-form-main .category .dicon i").classList.add("fa-caret-down");
          document
            .querySelector(".active-drop")
            .classList.remove("active-drop");
        }
}
async function generateSubmenu(mainCategoryId, mainCategoryName) {
  try {
    const response = await fetch('api/subcategories.php?category_id=' + mainCategoryId);
    const data = await response.json();
    // console.log(data.sub_categories); // Assuming the server returns an array of subcategories
    // console.log(mainCategoryName, data.sub_categories[0].sub_cat_name);

    const submenu = document.createElement('ul');
    submenu.classList.add('sub-menu');

    data.sub_categories.forEach(item => {
      // const listItem = document.createElement('li');
      // listItem.textContent = item;
      const listItem = `<li class="selection-data" data-id="${item.id}" value="${item.sub_cat_name}">${item.sub_cat_name}</li>`;
      // console.log(listItem);
      submenu.insertAdjacentHTML("beforeend", listItem);
      // console.log(item);
    });
    // document.querySelector(".selection-display-sub").style.display = "block";
    document.querySelector(".selection-display-sub").appendChild(submenu);
      
    document.querySelectorAll('.selection-display-sub .sub-menu li').forEach(list => {
      list.addEventListener('click', function () {
          var choosedCategory = `${mainCategoryName},${list.textContent}`;
          closeCategoryForm(choosedCategory);
          submenu.remove();
      });
  });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
  // console.log(listItemValue);
}
// --------------------------------------------------
function transactionCheck(tranValue){
  if((tranValue.transfer != 'Income/Expense') && (tranValue.category != 'Category') && (tranValue.mode != 'Mode')){
      return true;
  }

}
// ------------------------------------------
// transcation submit button function and clear button function
function transactionSubmit() {
  const incomeExpense = document.getElementById("IncomeExpense").innerText;
  const category = document.getElementById("Category").innerText;
  const mode = document.getElementById("Mode").innerText;
  const transactionDescription = document.getElementById("transDec").value;
  const transactionAmount = document.getElementById("transAmount").value;

  const sepCategory = category.split(",");

  const transactionValues = {
    user_id: user_ID,
    date: formattedDate,
    transfer: incomeExpense,
    category: sepCategory[0],
    sub_category: sepCategory[1],
    mode: mode,
    description: transactionDescription,
    amount: parseFloat(transactionAmount).toFixed(2)
  };

  // console.log(transactionValues);
  if(transactionCheck(transactionValues)){
      
  // sent the transactionValues to the server
  fetch("api/addTransaction.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(transactionValues),
  })
    .then(function (response) {
      // console.log(response)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log("Response data:", data);
      if (data.success) {
        // console.log(data)
        popUpmessage(data.success, data.message)
        getTotalbalance();
        setTimeout(() => {
          getTransactionData();
        }, 2000);
      } else {
        // console.log(data);
        popUpmessage(data.success, data.message)
        // errorSignup(data.message);
      }
    })
    .catch(function (error) {
      // console.log(data);
      console.error("There was a problem with the fetch operation:", error);
      // console.error('There was a problem with the fetch operation:', error);
    });
  }
  else{
    popUpmessage(false, "Please fill the all field....")
  }
  transactionClear();
}
function transactionClear() {
  let inputElement = document.getElementById("transAmount");
  let textareaElement = document.getElementById("transDec");

  document.getElementById("IncomeExpense").innerText = "Income/Expense";
  document.getElementById("Category").innerText = "Category";
  document.getElementById("Mode").innerText = "Mode";
  // Clear the value of the input field
  inputElement.value = "";
  // Show the placeholder text in the input field
  inputElement.setAttribute(
    "placeholder",
    inputElement.getAttribute("placeholder")
  );

  // Clear the value of the textarea
  textareaElement.value = "";
  // Show the placeholder text in the textarea
  textareaElement.setAttribute(
    "placeholder",
    textareaElement.getAttribute("placeholder")
  );

  // remove the dropdown and change the arrow
  if(document.querySelector(".active-drop")){
    document.querySelector(".active-drop").classList.remove("active-drop");
  }
  let upArrowdropDown = document.querySelector(".fa-caret-up");
  if (upArrowdropDown) {
    upArrowdropDown.classList.remove("fa-caret-up");
    upArrowdropDown.classList.add("fa-caret-down");
  }
}
//-------------------------------------
// drop down show hide in transcation form
const selectLists = document.querySelectorAll(
  ".select-option .select-title .dicon"
);

// Add click event listener to each option list
selectLists.forEach((selectList) => {
  selectList.addEventListener("click", () => {
    // console.log("clicked")
    // console.log(selectList.querySelector("i").classList.contains("fa-caret-up"))

    // if (document.querySelector(".select-option-list").classList.contains("active-drop")) {
    //   console.log("contain")
    // document.querySelector(".active-drop").classList.remove("active-drop"));
    // }

    const allSelectlist = document.querySelectorAll(".select-option-list");

    let parentName = selectList.parentNode;
    for (i = 0; i < 2; i++) {
      parentName = parentName.parentNode;
    }

    // console.log(parentName)
    // console.log(selectList.querySelector("i").classList.contains("fa-caret-up"))
    if (
      parentName.querySelector(".dicon i").classList.contains("fa-caret-up")
    ) {
      cancelDropdown(parentName);
    } else {
      allSelectlist.forEach((otherlist) => {
        otherlist.parentNode
          .querySelector(".dicon i")
          .classList.remove("fa-caret-up");
        otherlist.parentNode
          .querySelector(".dicon i")
          .classList.add("fa-caret-down");
        otherlist.classList.remove("active-drop");
      });
      // console.log("up")
      parentName
        .querySelector(".select-option-list")
        .classList.add("active-drop");
      // console.log(parentName.querySelector(".dicon").parentNode)
      parentName.querySelector(".dicon i").classList.remove("fa-caret-down");
      parentName.querySelector(".dicon i").classList.add("fa-caret-up");
    }
    const listValue = parentName.querySelectorAll("ul li");
    listValue.forEach((element) => {
      element.addEventListener("click", () => {
        // console.log(parentName)
        parentName.querySelector(".dtitle").innerText = element.innerText;
        if (document.querySelector(".active-drop")) {
          parentName.querySelector(".dicon i").classList.remove("fa-caret-up");
          parentName.querySelector(".dicon i").classList.add("fa-caret-down");
          document
            .querySelector(".active-drop")
            .classList.remove("active-drop");
        }
      });
    });
  });
});
function cancelDropdown(parentName) {
  // console.log("Cancel", parentName)
  // console.log("down")
  parentName
    .querySelector(".select-option-list")
    .classList.remove("active-drop");
  parentName.querySelector(".dicon i").classList.remove("fa-caret-up");
  parentName.querySelector(".dicon i").classList.add("fa-caret-down");
}
// ------------------------------------------------------------------
// the below code for the transaction page
// the below code for category container arrow
function transactionListdropDown(){
  const displayCategory = document.querySelectorAll(
    ".transaction-category-lists .transaction-list-title .transaction-arrow"
  );
  displayCategory.forEach((categoryList) => {
    categoryList.addEventListener("click", () => {
      // console.log(categoryList.querySelector("i").classList.contains("fa-caret-up"));
      var cArrow;
      // console.log(categoryList)
      if((document.querySelector(".active-list"))){
        if(categoryList.querySelector("i").classList.contains("fa-caret-up")){
          cArrow = categoryList.parentNode.parentNode;
          // console.log(cArrow.querySelector(".active-list").classList);
          categoryList.querySelector("i").classList.remove("fa-caret-up");
          categoryList.querySelector("i").classList.add("fa-caret-down");
          cArrow.querySelector(".active-list").classList.remove("active-list");
          return;
        }
        else{
          cArrow = document.querySelector(".active-list");
          document.querySelector(".active-list").classList.remove("active-list");
          cArrow.parentNode.querySelector("i").classList.remove("fa-caret-up");
          cArrow.parentNode.querySelector("i").classList.add("fa-caret-down");
        }
      }
      // console.log(document.querySelectorAll(".transaction-arrow i"));
      // console.log(categoryList);
      let parentName = categoryList.parentNode;
      for (i = 0; i < 1; i++) {
        parentName = parentName.parentNode;
      }
      // console.log(parentName.querySelector(".transaction-list"));
      parentName.querySelector(".transaction-list").classList.add("active-list");
      // console.log(parentName);
      parentName.querySelector(".transaction-arrow i").classList.remove("fa-caret-down");
      parentName.querySelector(".transaction-arrow i").classList.add("fa-caret-up");


      // parentName
      // .querySelector(".transaction-list")
      // .classList.toggle("active-list");
      // parentName
      // .querySelector(".transaction-arrow i")
      // .classList.toggle("fa-caret-down");
      // parentName
      // .querySelector(".transaction-arrow i")
      // .classList.toggle("fa-caret-up");
      if(parentName.querySelector(".transaction-list").classList.contains("active-list")){
        // console.log("drop down clicked");
        // console.log("the listed list", parentName);
        let listValue = parentName.querySelector(".transaction-li-title").getAttribute('value')
        // console.log(listValue);
        // console.log(parentName.querySelector(".transaction-li-title").getAttribute('value'));
        // console.log(parentName.querySelector(".transaction-li-title").textContent);
        getInnerlistDetails(listValue, parentName);
      }
    });
  });
}
// -----------------------------------------------
// in transaction section get the inner list detail sub detail
async function getInnerlistDetails(listValue, parentName) {
  try {
    const response = await fetch('api/subcategories.php?category_id=' + listValue);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    // Access default and user-specific categories
    showInnerlistCategories(data, parentName);
    // transactionListdropDown();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // throw error;
  }
}
function showInnerlistCategories(data, parentName){
  const addSublist = parentName.querySelector(`.${parentName.classList.value} .transaction-list`);
  // console.log("sadfsadf"+addSublist);
  // console.log("inner",data.sub_categories.length);
  if(!data) return;
  addSublist.querySelectorAll("li").forEach((li) => li.remove());
  data.sub_categories.forEach((data) => {
    // console.log(data.sub_cat_name);
    let subCategorylist = `
      <li value=${data.id}>${data.sub_cat_name}</li>
    `;
    addSublist.insertAdjacentHTML("beforeend", subCategorylist);
  });
  var container = document.querySelector(".transaction-category-lists");
  var element = addSublist.parentNode.firstElementChild;
  // console.log(addSublist.parentNode)

  // var offsetTop = element.offsetTop - container.offsetTop;

  // Scroll the container to make the element visible without affecting the body
  // element.scrollTo({ top: offsetTop, behavior: 'smooth' });

  //  // Calculate the scroll position to make the element completely visible
  var scrollTop = container.scrollTop + element.getBoundingClientRect().top - container.getBoundingClientRect().top;

  // // Scroll the container to show the element
  container.scrollTo({ top: scrollTop, behavior: 'smooth' });

}

// -----------------------------------------------------------------
// change the url
// function changeURL(url){
//   console.log(url)
//   console.log(location.href)
//   if(url != ""){
//     history.pushState(null, "", url);
//   }
//   else{
//     history.pushState(null, "", url);
//   }
// }
// window.addEventListener("beforeunload", function(event){
//   event.preventDefault();
//   this.history.pushState(null, "", "http://127.0.0.1:5500/");
// });

// -------------------------------------------
// check the user login status frequently every 5 second
function checkStatus() {
  fetch("api/checkstatus.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        console.log("User is logged in with user ID:", data.user);
        user_ID = data.user;
        isLogin = true;
      } else {
        console.log("User is not logged in");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Call the checkStatus function every 5 seconds
setInterval(checkStatus, 500000);

// ----------------------------------------------------
// logout function for logout button and cancel button
document.getElementById("logout-confirm").addEventListener("click", () => {
  fetch("api/logout.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("successfully log out");
        isLogin = false;
        document.getElementById("logout").style.display = "none";
        popUpmessage(true, "Please wait ....");
        popUpmessage(true, "Successfully Log out");
        loaderSpinner();
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        console.log("User is not logged out");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// cancel button
document.getElementById("logout-cancel").addEventListener("click", () => {
  document.querySelector(".active-option").classList.remove("active-option");
  document
    .querySelector(".active-option-page")
    .classList.remove("active-option-page");
  // document.querySelector(".user-logo .options").style.display = "none ";
  isClicked = false;
});
// ------------------------------------------
// get the user data while logout
function userDetails() {
  // console.log("userdata");
  fetch("api/userDetails.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // console.log(data.userName);
        // console.log(data.userID);
        document.getElementById("userName").innerText = data.userName;
        document.getElementById("settingsUsername").innerText = data.userName;
        document.getElementById("userID").innerText = data.userID;
        document.getElementById("settingsUserid").innerText = data.userID;
        document.getElementById("titleUsername").innerText = ` 🙏 Welcome ${data.userName}`;
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// ----------------------------------------------------------
let user_ID;
document.onload = (function () {
  fetch("api/checkstatus.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        console.log("User is logged in with user ID:", data.user);
        user_ID = data.user;
        isLogin = true;
        loaderSpinner();
        setTimeout(() => {
          document.getElementById("home").classList.add("active-page");
          document.querySelector(".add-transaction").style.display = "flex";
          getTransactionData();
          fetchImage();
        }, 5000);
      } else {
        console.log("User is not logged in");
        isLogin = false;
        loaderSpinner();
        setTimeout(() => {
          if (document.querySelector(".active-page")) {
            document
              .querySelector(".active-page")
              .classList.remove("active-page");
          }
          document.querySelector(".add-transaction").style.display = "none";
          document.querySelector("main #signuplogin").style.display = "flex";
        }, 5000);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
})();
// ---------------------------------------------------------------------------------------
// this is for category main category function

async function getCategories() {
  try {
    const response = await fetch("api/categories.php");
    const data = await response.json();
    // console.log(data);
    // Access default and user-specific categories
    showCategories(data);
    transactionListdropDown();
  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw error;
  }
}

const addLists = document.querySelector(".transaction-category-lists");

function showCategories(data){
  // console.log(data.categories);
  if(!data) return; 
  document.querySelectorAll(".transaction-whole-lists").forEach((ul) => ul.remove());
  data.categories.forEach((data) => {
    let categoryList = `<ul class="transaction-whole-lists">
    <li class="transaction-list-title">
      <span class="transaction-li-title" value="${data.id}">${data.def_cat_name}</span>
      <span class="transaction-arrow"
        ><i class="fa-solid fa-caret-down"></i
      ></span>
    </li>
    <ul class="transaction-list">
    </ul>
  </ul>`;
  addLists.insertAdjacentHTML("beforeend", categoryList);
  });
}
// -------------------------report page dynamic addon------
document.getElementById("chooseOne").addEventListener('click', () =>  {
  var filterDiv = document.querySelector('.first_filter');
  filterDiv.classList.toggle("active-filter");
});
document.getElementById("chooseSpecfic").addEventListener('click', () =>  {
  // console.log("click");
  var specificFilter = document.querySelector('.second_filter');
  specificFilter.classList.toggle("active-filter");
});

var checkboxes = document.querySelectorAll('.first_filter input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('click', function() {
          if (checkbox.checked) {
            // console.log('Checkbox is checked');
            checkbox.parentNode.classList.add("checked");
            checkbox.style.display = 'none';
          } else {
            checkbox.parentNode.classList.remove("checked");
            checkbox.style.display = 'inline-block';
            // console.log('Checkbox is not checked');
          }
      });
  });
function applyFilters(){
  var checkboxes = document.querySelectorAll('.first_filter input[type="checkbox"]');
  var checkedValues = [];
  var checkedName = [];
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      checkedName.push(checkbox.dataset.name)
      checkedValues.push(checkbox.value);
    }
  });
  
  var concatenatedString = checkedName.join(', ');
  // console.log(concatenatedString);
  
  if(checkedValues.length === 0){
    popUpmessage(false, "Please select any one to Filter....");
  } else{
    document.querySelector('.search-button').classList.remove('active');
    if(document.querySelector('.report-filter-button')){
      document.querySelector('.report-filter-button').style.display = 'none';
    }
    document.getElementById("chooseSpecfic").innerText = "Select Any One Option..";
    document.getElementById("chooseOne").innerText = concatenatedString;
    // console.log('Checked values:', checkedValues);
    document.querySelector('.first_filter').classList.toggle("active-filter");
    // Select all elements with class 'filterOptions' inside 'second_filter'
    if(document.querySelector('.second_filter .filterOptions')){
      var elementsToRemove = document.querySelectorAll('.second_filter .filterOptions');

      // Loop through each element and remove it from the DOM
      elementsToRemove.forEach(function(element) {
          element.remove();
      });
      if(document.querySelector(".second_filter button")){
        document.querySelector(".second_filter button").remove();
      }
    }
    fetchTransactionOptions(checkedValues);
    document.querySelector('.second_filter').classList.toggle("active-filter");
    
  }
      
}
async function fetchTransactionOptions(checkedValues) {
    // console.log(checkedValues);

    fetch("api/getReport.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(checkedValues),
    })
      .then(function (response) {
        // console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        displayReport(data,checkedValues);
      })
      .catch(function (error) {
        // console.log(data);
        console.error("There was a problem with the fetch operation:", error);
        // console.error('There was a problem with the fetch operation:', error);
      });
}

var secondFliterDisplay = document.querySelector(".second_filter");
function displayReport(data,checkedValues){

  // console.log(data.result)
//   data.result.forEach(entry => {
//     console.log(entry.category);
// });
  var result = data.result.map(function(obj) {
    return checkedValues.map(function(key) {
        return obj[key];
    });
  });

// Flatten the result and remove duplicates
  result = [...new Set(result.flat())];
// console.log(result)
  // console.log(checkedValues);

  result.forEach(outData => {
    // console.log(outData);

    let categoryList = ` <div class="filterOptions">
      <input type="checkbox" id="${'report ' + outData}" name="${outData}" value="${outData}" data-id="${checkedValues}">
      <label for="${'report ' + outData}">${outData}</label>
    </div>`

    secondFliterDisplay.insertAdjacentHTML("beforeend", categoryList);
})
let sumButton = `<button class="button" type="button"  onclick="applyspecFilters()">Apply Filters</button>`;
secondFliterDisplay.insertAdjacentHTML("beforeend", sumButton);
// -------
var specBox = document.querySelectorAll('.second_filter input[type="checkbox"]');
  specBox.forEach(function(spec) {
      spec.addEventListener('click', function() {
          if (spec.checked) {
            // console.log('spec is checked');
            spec.parentNode.classList.add("checked");
            spec.style.display = 'none';
          } else {
            spec.parentNode.classList.remove("checked");
            spec.style.display = 'inline-block';
            // console.log('spec is not checked');
          }
      });
  });

// ------
document.querySelector(".second_filter .button").addEventListener("clicl", () => {
  var specifyBox = document.querySelectorAll('.second_filter input[type="checkbox"]');
  var checkedValues = [];
  specifyBox.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkedValues.push(checkbox.value);
      }
      // console.log(checkedValues)
      document.querySelector('.second_filter').classList.toggle("active-filter");
  });
  // console.log('Checked values:', checkedValues);
});
}

// -----------
function applyspecFilters(){
  var checkboxes = document.querySelectorAll('.second_filter input[type="checkbox"]');
  var checkedValues = [];
  var valueDis = [];
  checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
          var keyValueObject = {
            key: checkbox.getAttribute("data-id"),
            value: checkbox.value
          };
        
          // Push the key-value object into the array
          checkedValues.push(keyValueObject);
        }
      });
      if(checkedValues.length === 0){
        popUpmessage(false, "Please select any one to Filter...");
        if(document.querySelector('.report-filter-button')){
          document.querySelector('.report-filter-button').style.display = 'none';
        }
      }
      else{
        if(document.querySelector('.report-filter-button')){
          document.querySelector('.report-filter-button').style.display = 'flex';
        }
        checkedValues.forEach(element => {
          valueDis.push(element)
        });

        var valuesArray = valueDis.map(function(obj) {
          return obj.value;
        });
        
        // Use join to concatenate values into a single string separated by a comma
        var concatenatedString = valuesArray.join(', ');
        
        // Log the concatenated string
        // console.log(concatenatedString);
        document.getElementById("chooseSpecfic").innerText = concatenatedString;
        // console.log('Checked values:', checkedValues);
        document.querySelector('.second_filter').classList.toggle("active-filter");
        document.querySelector('.report-filter-button').style.display = 'flex';
        // console.log(checkedValues);
        document.querySelector('.search-button').classList.remove('active');

        document.querySelector('.search-button').addEventListener('click', () => {
          document.querySelector('.search-button').classList.add('active');
          displayFilter(checkedValues);
        });
        document.querySelector('.clear-button').addEventListener('click', () => {
          document.querySelector('.search-button').classList.remove('active');
          // console.log("clear button");
          var checkedboxes = [document.querySelectorAll('.second_filter input[type="checkbox"]')
            ,document.querySelectorAll('.first_filter input[type="checkbox"]')];
          
          // Loop through each checkbox and set checked property to false
          checkedboxes.forEach(function(checkbox) {
            checkbox.forEach(function(checkedbox) {
              checkedbox.checked = false;
              checkedbox.style.display = "inline-block";
              checkedbox.parentNode.classList.remove('checked')
            });
          });
          document.getElementById("chooseSpecfic").innerText = "Select Any One Option..";
          document.getElementById("chooseOne").innerText = "Select Any One Field..";

          currentPage = "report";
          getAlltransactionData();
        });
      }
}
async function displayFilter(checkedValues) {
  // console.log(checkedValues);

  fetch("api/getReportfilter.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(checkedValues),
  })
    .then(function (response) {
      // console.log(response)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.table(data);
      displayReporfilter(data);
      // displayReport(data,checkedValues);
    })
    .catch(function (error) {
      // console.log(data);
      console.error("There was a problem with the fetch operation:", error);
      // console.error('There was a problem with the fetch operation:', error);
    });
}
// --------
function displayReporfilter(data){

  // console.table(data);

  // Get the <thead> element
  var thead = reportList.querySelector('thead');

  // Remove the <thead> element
  thead.remove();

  reportList.querySelectorAll('tr').forEach(function(tr) {
    tr.remove();
  });

  reportList.innerHTML = `<thead class="sticky">
  <tr>
    <th>S.No</th>
    <th>Date</th>
    <th>Description</th>
    <th>Method</th>
    <th>Category</th>
    <th>Sub Category</th>
    <th>Mode</th>
    <th>Amount</th>
  </tr>
</thead>`;
  //create a new table row
  var i = 1;
  data.forEach((resultTrans) => {
    if(resultTrans.transfer_method == "Income"){
      textColor = "lightgreen";
    } else if(resultTrans.transfer_method == "Expense"){
      textColor = "tomato";
    }
    const listItem = document.createElement("tr");
    listItem.innerHTML = `
    <td>${i}</td>
    <td>${resultTrans.tran_date}</td>
    <td class="table-description">
      ${resultTrans.trans_description}
    </td>
    <td>${resultTrans.transfer_method}</td>
    <td>${resultTrans.category}</td>
    <td>${resultTrans.sub_category}</td>
    <td>${resultTrans.mode}</td>
    <td style="color:${textColor}" class="trans-amount">${resultTrans.amount}</td>
    `;
      reportList.appendChild(listItem); //append all data into the table
    i = i + 1;
  });
}
//---------------------------------------------------------------
// ------------------Get data from transaction---------------------

var currentPage;
var textColor;

const transactionList = document.getElementById("transactionList"); // transactionList : Table
const reportList = document.getElementById("reportList"); // transactionList : Table

async function getAlltransactionData() {
  try {
    const response = await fetch("api/allTransaction.php");
    const data = await response.json();
    // console.table(data.all_transactions);
    displayTransactioninTable(data.all_transactions, currentPage)
  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw error;
  }
}


function displayTransactioninTable(data, current_Page = "home"){

  const transformedTransactions = [];

  // console.table(data);
  data.forEach(trans_data => {
    const transaction = {
    id : trans_data.trans_id,
    result_date : trans_data.tran_date,
    method : trans_data.transfer_method,
    category : trans_data.category,
    sub_category : trans_data.sub_category,
    mode : trans_data.mode,
    description : trans_data.trans_description,
    amount : trans_data.amount,
    balance : trans_data.balance
    }

    // Push the new object to the array
    transformedTransactions.push(transaction);

    // console.log(currentPage+":"+transaction);

  });
  if(current_Page === "transaction"){
    const totalRows = transformedTransactions.length;
    document.getElementById("totalTransaction").innerText = totalRows;
    transactionPage(transformedTransactions);
    get_total_transaction();
  }
  if(current_Page === "home"){
    const firstThreeTransactions = transformedTransactions.slice(0, 3);
    // console.log(firstThreeTransactions);
    homePage(firstThreeTransactions);
    getTotalIncomeandExpense();
  }
  if(current_Page === "report"){
    reportPage(transformedTransactions);
  }
}
async function getTotalIncomeandExpense(){
  try {
    const response = await fetch("api/totalIncometotalExpense.php");
    const data = await response.json();
    document.getElementById("total-income").innerText = parseFloat(data.income).toFixed(2);
    document.getElementById("total-expense").innerText = parseFloat(data.expense).toFixed(2);

  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw error;
  }
}
// ---------------------------Home Page--------------------------
const homePageTransaction = document.querySelector(".transaction-values");
function homePage(resultData){
  // console.log(resultData.length)
  if(document.querySelector(".transaction-value")){
    var elements = document.querySelectorAll('.transaction-value');

    // Iterate over the selected elements and remove them from the document
    elements.forEach(function(element) {
      element.remove();
    });
  }
  if(resultData.length != 0){
    if(document.querySelector(".noData")){
      document.querySelector(".noData").style.display = "none";
    }
    resultData.forEach(data => {
    if(data.method == "Income"){
      textColor = "lightgreen";
    } else if(data.method == "Expense"){
      textColor = "tomato";
    }
    let hoemTransacList = `
    <div class="transaction-value">
      <span class="c text" id="category">${data.category}</span>
      <span class="e text" id="Expense"  style="color:${textColor}">${data.amount}</span>
      <span class="b text" id="Balance">${data.balance}</span>
    </div>
    `;
    homePageTransaction.insertAdjacentHTML("beforeend", hoemTransacList);
    });
  }
  else{
    document.querySelector(".noData").style.display = "flex";
  }
}

// ------------------------Transaction Page-------------------
async function get_total_transaction(){
  try {
    const response = await fetch("api/get_total_transaction.php");
    const data = await response.json();
    let totalWallet = data.total_income_wallet - data.total_expense_wallet;
    let totalBank = data.total_income_bank - data.total_expense_bank;

    document.getElementById("totalWallet").innerText = parseFloat(totalWallet).toFixed(2);
    document.getElementById("totalBank").innerText = parseFloat(totalBank).toFixed(2);
    
  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw error;
  }
}
function transactionPage(transaction){
  // console.log(transaction);
  // heading for table
  transactionList.innerHTML = `<thead>
  <tr>
    <th>S.No</th>
    <th>Date</th>
    <th>Description</th>
    <th>Category</th>
    <th>
      Amount<br />
      IN/Ex
    </th>
    <th>Balance</th>
  </tr>
</thead>`;
  //create a new table row
  if(transaction.length != 0){
    if(document.querySelector(".noDatatable")){
      document.querySelector(".noDatatable").style.display = "none";
    }
  transaction.forEach((resultTrans) => {
    if(resultTrans.method == "Income"){
      textColor = "lightgreen";
    } else if(resultTrans.method == "Expense"){
      textColor = "tomato";
    }
    const listItem = document.createElement("tr");
    listItem.innerHTML = `
    <td>${resultTrans.id}</td>
    <td>${resultTrans.result_date}</td>
    <td class="table-description">
      ${resultTrans.description}
    </td>
    <td>${resultTrans.method}</td>
    <td style="color:${textColor}" class="trans-amount">${resultTrans.amount}</td>
    <td>${resultTrans.balance}</td>
    `;
      transactionList.appendChild(listItem); //append all data into the table
  });
  }
  else{
    document.querySelector(".noDatatable").style.display = "flex";
  }
}
// ----------------------------------Report--------------------
function reportPage(transaction){
  reportList.innerHTML = `<thead>
  <tr>
    <th>S.No</th>
    <th>Date</th>
    <th>Description</th>
    <th>Method</th>
    <th>Category</th>
    <th>Sub Category</th>
    <th>Mode</th>
    <th>Amount</th>
    <th>Balance</th>
  </tr>
</thead>`;
  //create a new table row
  transaction.forEach((resultTrans) => {
    if(resultTrans.method == "Income"){
      textColor = "lightgreen";
    } else if(resultTrans.method == "Expense"){
      textColor = "tomato";
    }
    const listItem = document.createElement("tr");
    listItem.innerHTML = `
    <td>${resultTrans.id}</td>
    <td>${resultTrans.result_date}</td>
    <td class="table-description">
      ${resultTrans.description}
    </td>
    <td>${resultTrans.method}</td>
    <td>${resultTrans.category}</td>
    <td>${resultTrans.sub_category}</td>
    <td>${resultTrans.mode}</td>
    <td style="color:${textColor}" class="trans-amount">${resultTrans.amount}</td>
    <td>${resultTrans.balance}</td>
    `;
      reportList.appendChild(listItem); //append all data into the table
  });
}
// ---------------------------------------------------------------
// function to get the transaction data -----------------------GRAPH---------------

const optgraph = document.querySelector(".home-graph-option");
const graphHam = optgraph.querySelector(".graph-hamburger");
graphHam.addEventListener('click', () => {
  if(graphHam.querySelector("i").classList.contains("fa-bars")){
    graphHam.querySelector("i").classList.remove("fa-bars");
    graphHam.querySelector("i").classList.add("fa-xmark");
    optgraph.querySelector(".optsGrph").style.display = "block";
  } else{
    graphHam.querySelector("i").classList.add("fa-bars");
    graphHam.querySelector("i").classList.remove("fa-xmark");
    optgraph.querySelector(".optsGrph").style.display = "none";
  }
  optgraph.querySelectorAll('ul li').forEach(list => {
    list.addEventListener('click', function () {
      optgraph.querySelector(".active").classList.remove("active");
      // console.log(list.getAttribute("value"));
      list.classList.add("active");
      optgraph.querySelector(".optsGrph").style.display = "none";
      setTimeout(() => {
        graphHam.querySelector("i").classList.add("fa-bars");
        graphHam.querySelector("i").classList.remove("fa-xmark");
      }, 500);
      resultChartData(list.getAttribute("value"));
    });
  });
});

var jsonData;
var myChart;

function getTransactionData(){
  getTransactionDataforGraph();
}
async function getTransactionDataforGraph() {
  try {
    const response = await fetch("api/getHomechart.php");
    const data = await response.json();
    jsonData = data;
    // console.log(data);
    // console.log(jsonData);
    resultChartData();
  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw error;
  }
}
function resultChartData(grptype='pie'){
  if(myChart){
    myChart.destroy();
  }
  drawGraph(jsonData, grptype);
  getAlltransactionData();
}
// ---------------------------------------------------------
// ----------------------------GRAPH------------------------
function drawGraph(graphdata, grptype){

  var transformedObject = graphdata.reduce((acc, obj) => {
    acc[obj.category] = parseFloat(obj.total_amount); // Convert total_amount to a number
    return acc;
  }, {});

// console.log(transformedObject);



// Get the context of the canvas element we want to select
var barCtx = document.getElementById('barChart');

Chart.defaults.color = '#ffffff';

// Create Bar Chart
myChart = new Chart(barCtx, {
  type: grptype,
    data: {
      labels: Object.keys(transformedObject),
      datasets: [{
        label: 'Category wise',
        data: Object.values(transformedObject),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false
    }
  });
}
// -----------------------------------------ProfileImage-------------
// Function to fetch image data based on username
function fetchImage() {
  fetch('api/fetchProfile.php')
      .then(response => response.json())
      .then(data => {
          // console.log(data)
      if (data.success) {
          // Display the image on the page
          // var image = document.createElement('img');
          // image.src = data.image; // Assuming the image format is JPEG
          // document.getElementById('image-container').innerHTML = ''; // Clear previous image
          // document.getElementById('image-container').appendChild(image);
          const filePath = data.image;
const uploadsPath = 'uploads/';

// Find the index of 'uploads/' in the file path
const startIndex = filePath.indexOf(uploadsPath);
if (startIndex !== -1) {
    // Extract the relative path after 'uploads/'
    const relativePath = filePath.substring(startIndex + uploadsPath.length);
    // console.log(relativePath);  // Outputs: 6614100a1df9b_blackprofile.jpg
    fetchProf(uploadsPath+relativePath);
  } else {
    // console.log('uploads/profile.png');
    fetchProf('uploads/profile.png');
}
      } else {
          // Display error message if image retrieval fails
          console.error('Failed to fetch image:', data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
function fetchProf(profImage){
  // console.log(profImage);
  // Get all elements with the class user-profile-image
  var profileImages = document.querySelectorAll('.user-profile-image');

  // Iterate over the elements and change the src attribute of their child img elements
  profileImages.forEach(function(element) {
      var img = element.querySelector('img'); // Get the child img element
      img.src = profImage; // Replace 'new-image.jpg' with the path to your new image
  });
}
// ----------------------------Settings link click----------------------
var emiCalc = document.querySelector('.emiCalculator');

// Add click event listener to the container
emiCalc.addEventListener('click', function() {
    // Open the link in a new tab when the container is clicked
    window.open('https://g-sabareesh.github.io/EMI-Calculator/', '_blank');
});

var myNot = document.querySelector('.myNotes');

// Add click event listener to the container
myNot.addEventListener('click', function() {
    // Open the link in a new tab when the container is clicked
    window.open('https://g-sabareesh.github.io/MyNotes/', '_blank');
});

var sipCal = document.querySelector('.sipCalculator');

// Add click event listener to the container
sipCal.addEventListener('click', function() {
    // Open the link in a new tab when the container is clicked
    window.open('https://g-sabareesh.github.io/SIP-Calculator/', '_blank');
});

var FDcal = document.querySelector('.fdcalculator');

// Add click event listener to the container
FDcal.addEventListener('click', function() {
    // Open the link in a new tab when the container is clicked
    window.open('https://g-sabareesh.github.io/MyNotes/', '_blank');
});


// -------------------------Setting profile change------------------------
document.querySelector(".setting-profile-change").addEventListener('click', () => {


// Create a file input element
const fileInput = document.getElementById('profile-picture');

fileInput.click();

  // Function to handle file upload
function handleFileUpload(file) {
  const formData = new FormData();
  formData.append('profile_picture', file);

  // Fetch inside the function to send the selected file to the server
  fetch('api/uploadImage.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      // console.log(data); // Response from upload.php
      if (data.success) {
        popUpmessage(true, data.message);
        setTimeout(() => {
          fetchImage();
        },500);
        // Proceed to the next step or perform any other action here
      } else {
        popUpmessage(false, data.message);

      }
  })
  .catch(error => console.error('Error:', error));
}

// Listen for change event on file input to handle file selection
fileInput.addEventListener('change', function() {
  const selectedFile = fileInput.files[0];
  // console.log(selectedFile)
  if (selectedFile) {
      // Call the function to handle file upload
      handleFileUpload(selectedFile);
  }
});

});