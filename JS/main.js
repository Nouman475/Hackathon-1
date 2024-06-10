const notify = (msg, type) => {
  switch (type) {
    case "success": {
      Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #000000, #0f9b0f)",
        },
        onClick: function () {},
      }).showToast();
      break;
    }
    case "error": {
      Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)",
        },
        onClick: function () {},
      }).showToast();
    }
  }
};

let users = [];

const getFieldsVal = (id) => document.getElementById(id);

const toggler = () => {
  let registerForm = getFieldsVal("form-1");
  let loginForm = getFieldsVal("form-2");
  if (registerForm.style.display === "flex") {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
  } else {
    registerForm.style.display = "flex";
    loginForm.style.display = "none";
  }
};

const handleRegister = () => {
  event.preventDefault();
  let password = getFieldsVal("password").value;
  let rePassword = getFieldsVal("retypedPassword").value;
  const user = {
    firstName: getFieldsVal("firstName").value,
    lastName: getFieldsVal("lastName").value,
    email: getFieldsVal("email").value,
    password: password,
  };
  let duplicateUSer = users.find((el) => el.email === user.email);
  if (password != rePassword) {
    notify("your password and retyped password dont match!", "error");
  } else if (duplicateUSer) {
    notify("Email already exist!", "error");
  } else {
    notify("Registered successfuly!", "success");
    users.push(user);
  }
};
const handleLogin = () => {
  event.preventDefault();
  let email = getFieldsVal("lEmail").value;
  let password = getFieldsVal("lPassword").value;
  let user = users.find((user) => user.email === email);

  if (!user) {
    notify("Email not found.", "error");
  } else if (user.password !== password) {
    notify("Incorrect password.", "error");
  } else {
    let firstName = user.firstName;
    let email = user.email;
    localStorage.setItem("email", email);
    localStorage.setItem("firstName", firstName);
    notify("Login successful!", "success");
    window.location.href = "app.html"
  }
};

getFieldsVal("currYear").innerHTML = new Date().getFullYear();
