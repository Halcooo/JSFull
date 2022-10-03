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

      var name = document.getElementById("user-name");
      name.innerHTML = user.name;
      loggedUser = user;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      clearValue("email");
      clearValue("password");
      var postBLog = document.getElementById("post-blog");
      postBLog.style.display = "block";
    } else {
      var errorMsg = document.querySelector("#login-form .error-msg");
      errorMsg.style.display = "block";
    }
  }
  var logOutBlock = document.getElementsByClassName("logout-block");
  for (var item of logOutBlock) {
    item.style.display = "block";
  }
  var blogArea = document.getElementsByClassName("blog-area");
  for (var item of blogArea) {
    item.style.display = "block";

    var signBtn = document.getElementById("sign-btn");
    signBtn.style.display = "none";
  }
}

function loginOnEnter(e) {
  if (e.keyCode === 13) {
    console.log("User je pritisnuo enter");
    login();
  }
}

function logout() {
  localStorage.removeItem("loggedUser");
  var loginForm = document.getElementById("login-form");
  loginForm.style.display = "none";

  var logOutBlock = document.getElementsByClassName("logout-block");
  for (var item of logOutBlock) {
    item.style.display = "none";

    var postBlog = document.getElementById("post-blog");
    postBlog.style.display = "none";
  }

  var signBtn = document.getElementById("sign-btn");
  signBtn.style.display = "block";
  var errorMsg = document.querySelector("#login-form .error-msg");
  errorMsg.style.display = "none";
  loggedUser = {};

  displayBlog();
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
  if (loggedUser) {
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
      comments: [],
    };

    allBlogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(allBlogs));
    displayBlog();

    clearValue("blog-title");
    clearValue("blog-desc");
  }
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
  blogs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
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
    var btn = document.createElement("button");
    btn.innerText = "Izbriši";
    btn.addEventListener;
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(datum);
    publishedBlogs.appendChild(h3);
    deleteBlog(blog);
    publishedBlogs.appendChild(div);
    showComments(blog.comments);
    publishedBlogs.appendChild(addComment(blog));
  }
}
function isLogged() {
  var userData = localStorage.getItem("loggedUser");
  console.log(userData);
  if (userData) {
    return true;
  } else {
    return false;
  }
}
function addComment(blog) {
  var input = document.createElement("input");
  input.classList.add("blog-input");
  input.placeholder = "Leave a comment....";
  input.style = "width:50%;margin-left:50%;margin-top:5px";
  input.addEventListener("keyup", function (e) {
    var text = e.target.value;
    if (e.keyCode != 13) return;

    var comment = {
      text,
      author: loggedUser.name,
      postedDate: new Date(),
    };
    if (!blog.comments) {
      blog.comments = [];
    }
    if (isLogged() == false) {
      goToLoginForm();
      var pBlogs = document.getElementById("posted-blogs");
      pBlogs.style.display = "none";
    } else {
      blog.comments.push(comment);
      localStorage.setItem("blogs", JSON.stringify(allBlogs));
      input.value = "";

      renderBlogs(allBlogs);
    }
  });
  return input;
}
function showComments(comments) {
  var publishedBlogs = document.getElementById("published-blogs");
  for (var comment of comments) {
    var div = document.createElement("div");
    div.style = "width:60%;margin-left:40%;padding=7px;margin-top:5px;";
    div.classList.add("posted-blog");
    var p = document.createElement("p");
    p.innerHTML = comment.text;
    p.style = "margin-bottom:5px;padding:3px";
    var span = document.createElement("span");
    span.innerHTML = `Author: ${comment.author}`;
    var datum = document.createElement("i");
    datum.style.paddingLeft = "30px";
    datum.innerHTML = new Date(comment.postedDate).toLocaleString();
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(datum);
    publishedBlogs.appendChild(div);
  }
}
function deleteBlog(blog) {
  var publishedBlogs = document.getElementById("published-blogs");

  var btn = document.createElement("button");
  btn.innerText = "X";
  btn.classList.add("delete");

  if (loggedUser.name != blog.author) {
    btn.style = "display:none";
  }

  btn.addEventListener("click", function (e) {
    var response = confirm("Jeste li sigurni?");
    if (loggedUser.name == blog.author) {
      if (!response) return;
      for (var i = 0; i < allBlogs.length; i++) {
        allBlogs.splice(i, 1);

        localStorage.setItem("blogs", JSON.stringify(allBlogs));
        renderBlogs(allBlogs);
      }
    } else {
      alert("Vi nise autor ovog bloga!!");
    }
  });
  publishedBlogs.appendChild(btn);
  return btn;
}

function signBtn() {
  var loginForm = document.getElementById("login-form");
  loginForm.style.display = "block";
  var blogArea = document.getElementsByClassName("blog-area");
  for (var item of blogArea) {
    item.style.display = "none";
  }
}
displayBlog();
