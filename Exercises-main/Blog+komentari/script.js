var users = [
  {
    name: "John Doe",
    email: "john.doe@gmail.com",
    address: "Grbavicka br12",
    username: "johny",
    password: "123456",
  },
];

var loggedUser = {};

var allBlogs = [];

var signupForm = document.getElementById("signup-form");
signupForm.style.display = "none";

function isUserLogged() {
  var userData = localStorage.getItem("loggedUser");
  if (userData) {
    var user = JSON.parse(userData);
    login(user.email, user.password);
  }
}

isUserLogged();

function login(p_email, p_password) {
  var email = p_email || document.getElementById("email").value;
  var password = p_password || document.getElementById("password").value;
  var usersData = localStorage.getItem("users");
  if (usersData) {
    users = JSON.parse(usersData);
  }
  for (var user of users) {
    if (
      (email === user.email || email === user.username) &&
      password === user.password
    ) {
      var loginForm = document.getElementById("login-form");
      loginForm.style.display = "none";
      var nav = document.querySelector(".nav");
      nav.style.display = "block";
      var name = document.getElementById("user-name");
      name.innerHTML = user.name;
      loggedUser = user;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      clearValue("email");
      clearValue("password");
    } else {
      var errorMsg = document.querySelector("#login-form .error-msg");
      errorMsg.style.display = "block";
    }
  }

  displayBlog();
}

function loginOnEnter(e) {
  if (e.keyCode === 13) {
    console.log("User je pritisnuo enter");
    login();
  }
}

function logout() {
  var loginForm = document.getElementById("login-form");
  loginForm.style.display = "block";
  var nav = document.querySelector(".nav");
  nav.style.display = "none";
  document.querySelector("#login-form .error-msg").style.display = "none";
  localStorage.removeItem("loggedUser");
}

function goToSignupForm() {
  var loginForm = document.getElementById("login-form");
  loginForm.style.display = "none";
  signupForm.style.display = "block";
}

function goToLoginForm() {
  var loginForm = document.getElementById("login-form");
  loginForm.style.display = "block";
  signupForm.style.display = "none";
}

function registerNow() {
  console.log("logika za dodavanje korisnika");
  var name = getValue("name");
  var email = getValue("su-email");
  var address = getValue("address");
  var username = getValue("username");
  var password = getValue("su-password");
  if (
    name === "" ||
    email === "" ||
    address === "" ||
    username === "" ||
    password === ""
  ) {
    return alert("Unesite sve podatke");
  }
  var user = {
    name,
    email,
    address,
    username,
    password,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  clearValue("name");
  clearValue("su-email");
  clearValue("address");
  clearValue("username");
  clearValue("su-password");

  goToLoginForm();
}

function getValue(id) {
  return document.getElementById(id).value;
}

function clearValue(id) {
  document.getElementById(id).value = "";
}

function postBLog() {
  var blogTitle = getValue("blog-title");
  var blogDesc = getValue("blog-desc");

  if (blogTitle === "" || blogDesc === "") {
    return alert("Popunite sve podatke");
  }

  var blog = {
    blogTitle,
    blogDesc,
    postDate: new Date(),
    author: loggedUser.name,
    sviKomentari: [],
  };

  allBlogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(allBlogs));
  displayBlog();

  clearValue("blog-title");
  clearValue("blog-desc");
}

function displayBlog() {
  var blogsData = localStorage.getItem("blogs");
  if (blogsData) {
    allBlogs = JSON.parse(blogsData);
  }
  renderBlogs(allBlogs);
}

function searchBlogs(e) {
  var searchBy = e.target.value;
  var filteredBlogs = [];
  for (var blog of allBlogs) {
    if (blog.blogTitle.toLowerCase().indexOf(searchBy.toLowerCase()) > -1) {
      filteredBlogs.push(blog);
    }
  }
  renderBlogs(filteredBlogs);
}

function renderBlogs(blogs) {
  var publishedBlogs = document.getElementById("published-blogs");
  publishedBlogs.innerHTML = "";

  for (var blog of blogs) {
    var h3 = document.createElement("h3");
    h3.innerHTML = blog.blogTitle;
    h3.classList.add("blog-title");
    var div = document.createElement("div");
    div.classList.add("posted-blog");
    var p = document.createElement("p");
    p.innerHTML = blog.blogDesc;
    var span = document.createElement("span");
    span.innerHTML = `Author: ${blog.author}`;
    var datum = document.createElement("i");
    datum.style.paddingLeft = "30px";
    datum.innerHTML = new Date(blog.postDate).toLocaleString();
    var boxKomentar = document.createElement("div");
    boxKomentar.classList.add("posted-blog");

    var Inputkomentar = document.createElement("input");
    Inputkomentar.placeholder = "Unesite komentar";
    Inputkomentar.type = "text";
    Inputkomentar.classList.add("input-komentar");

    for (var i = 0; i < blog.sviKomentari.length; i++) {
      var jedanKomentar = blog.sviKomentari[i];
      var pZaKomentar = document.createElement("p");
      var zaKomentatora = document.createElement("h4");
      var komDatum = document.createElement("i");
      komDatum.style.paddingLeft = "30px";
      komDatum.innerHTML = new Date(jedanKomentar.datum).toLocaleString();
      var divZaKom = document.createElement("div");
      divZaKom.classList.add("kom-div");
      pZaKomentar.classList.add("p-komentar");

      zaKomentatora.innerHTML = jedanKomentar.napisao;
      pZaKomentar.innerHTML = jedanKomentar.komentar;
      divZaKom.appendChild(zaKomentatora);
      divZaKom.appendChild(pZaKomentar);
      divZaKom.appendChild(komDatum);
      boxKomentar.appendChild(divZaKom);
    }
    Inputkomentar.addEventListener("keyup", function handler(e) {
      if (e.key === "Enter") {
        var komentar = {
          napisao: loggedUser.name,
          datum: new Date(),
          komentar: e.target.value,
        };

        for (var jedanBlog of allBlogs) {
          if (this.parentNode.firstChild.innerHTML == jedanBlog.blogDesc) {
            jedanBlog.sviKomentari.push(komentar);
          }
          localStorage.setItem("blogs", JSON.stringify(allBlogs));
        }
        displayBlog();
      }
    });

    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(datum);

    publishedBlogs.appendChild(h3);
    publishedBlogs.appendChild(div);
    div.appendChild(boxKomentar);
    div.appendChild(Inputkomentar);
  }
}
