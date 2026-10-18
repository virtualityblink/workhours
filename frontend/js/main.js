const login = document.getElementById("login");
const nameLogin = document.getElementById("nameLoginInput");
const passLogin = document.getElementById("passLoginInput");
const btnLogin = document.getElementById("btnLogin");
const msgLogin = document.getElementById("msgLogin");
const goLogin = document.getElementById("goLogin");

const reg = document.getElementById("reg");
const nameReg = document.getElementById("nameRegInput");
const emailReg = document.getElementById("emailRegInput");
const passReg = document.getElementById("passRegInput");
const btnReg = document.getElementById("btnReg");
const msgReg = document.getElementById("msgReg");
const goReg = document.getElementById("goReg");

btnLogin.addEventListener("click", loginFunc);
goLogin.addEventListener("click", showLogin);

btnReg.addEventListener("click", regFunc);
goReg.addEventListener("click", showReg);

function showLogin() {
    login.style.display = "flex"
    reg.style.display = "none"
    nameReg.value = ""
    emailReg.value = ""
    passReg.value = ""
    msgReg.style.display = "none"
    msgReg.textContent = ""
};

async function loginFunc() {
    if (nameLogin.value == "") {
        msgLogin.style.display = "flex"
        msgLogin.textContent = "Введіть ім'я"
        return
    }
    if (passLogin.value == "") {
        msgLogin.style.display = "flex"
        msgLogin.textContent = "Введіть пароль"
        return
    }

    const response = await fetch("https://workhours-server.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameLogin.value,
            password: passLogin.value
        })
    });

    const data = await response.json();

    if (data.success) {
        console.log(data.message);
        nameLogin.value = ""
        passLogin.value = ""
    } else {
        console.log(data.message);
        msgLogin.style.display = "flex"
        msgLogin.textContent = data.message
    }
};

function showReg() {
    reg.style.display = "flex"
    login.style.display = "none"
    nameLogin.value = ""
    passLogin.value = ""
    msgLogin.style.display = "none"
    msgLogin.textContent = ""
};

async function regFunc() {
    if (nameReg.value == "") {
        msgReg.style.display = "flex"
        msgReg.textContent = "Введіть ім'я"
        return
    }
    if (emailReg.value == "") {
        msgReg.style.display = "flex"
        msgReg.textContent = "Введіть пошту"
        return
    }
    if (passReg.value == "") {
        msgReg.style.display = "flex"
        msgReg.textContent = "Введіть пароль"
        return
    }


    const response = await fetch("https://workhours-server.onrender.com/reg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameReg.value,
            email: emailReg.value,
            password: passReg.value
        })
    });


    const data = await response.json();

    if (data.success) {
        console.log(data.message);
        nameReg.value = ""
        emailReg.value = ""
        passReg.value = ""
        msgReg.style.display = "none"
        msgReg.textContent = ""
    } else {
        console.log(data.message);
        msgReg.style.display = "flex"
        msgReg.textContent = data.message
    }
};
