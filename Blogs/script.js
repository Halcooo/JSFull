var logoutBlock = document.querySelector(".logout-block");
var addForm = document.querySelector(".add-blog-form");
var signIn = document.querySelector(".sign-in");

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
  } else {
    hide(logoutBlock);
    hide(addForm);
    displayBlog();
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
      hide(signIn);
      var nav = document.querySelector(".wrapper");
      nav.style.display = "block";
      var name = document.getElementById("user-name");
      name.innerHTML = user.name;
      addForm.style.display = "block";
      logoutBlock.style.display = "flex";
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
  var nav = document.querySelector(".wrapper");
  nav.style.display = "none";
  document.querySelector("#login-form .error-msg").style.display = "none";
  loggedUser = {};
  localStorage.removeItem("loggedUser");
  var profil = document.querySelector(".wrapper-profil");
  profil.style.display = "none";
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
    comments: [],
    likes: [],
    dislikes: [],
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
var wrapperProfil = document.createElement("div");

function renderBlogs(blogs) {
  blogs.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
  var publishedBlogs = document.getElementById("published-blogs");
  publishedBlogs.innerHTML = "";
  for (var blog of blogs) {
    var h3 = document.createElement("h3");
    h3.innerHTML = blog.blogTitle;
    h3.classList.add("blog-title");
    h3.appendChild(createDeleteBtn(blog));
    var div = document.createElement("div");
    div.classList.add("posted-blog");
    var p = document.createElement("p");
    p.innerHTML = blog.blogDesc;
    var span = document.createElement("span");
    span.innerHTML = `Author: <span style="font-weight:bold;">${blog.author}</span>`;
    span.classList.add("user");
    span.addEventListener("click", function userPage(e) {
      var usersStorage = localStorage.getItem("users");
      var users = JSON.parse(usersStorage);
      for (var user of users) {
        if (user.name === `${e.target.innerHTML}`) {
          addForm.style.display = "none";
          var blogArea = document.querySelector(".blog-area");
          blogArea.style.display = "none";
          wrapperProfil.classList.add("wrapper-profil");
          var title = document.createElement("h2");
          title.innerHTML = `Name: ${user.name}`;
          var username = document.createElement("p");
          username.innerHTML = `Username: ${user.username}`;
          var address = document.createElement("p");
          address.innerHTML = `Address: ${user.address}`;
          var email = document.createElement("p");
          email.innerHTML = `Email: ${user.email}`;
          var img = document.createElement("img");
          img.src =
            "https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg";
          img.style =
            "padding: 10px 20px;height:100px;float:right;border-radius:50%";
          wrapperProfil.appendChild(img);
          wrapperProfil.appendChild(title);
          wrapperProfil.appendChild(username);
          wrapperProfil.appendChild(email);
          wrapperProfil.appendChild(address);
          wrapperProfil.style.display = "block";
          document.body.appendChild(wrapperProfil);

          var filteredBlogs = [];
          for (var blog of allBlogs) {
            if (blog.author === user.name) {
              filteredBlogs.push(blog);
            }
          }
          renderBlogs(filteredBlogs);
          blogArea.style.display = "block";
          blogArea.style = "float:right;width:50%;margin-right:50px";
        }
      }
    });
    var datum = document.createElement("i");
    datum.style.paddingLeft = "30px";
    datum.innerHTML = new Date(blog.postDate).toLocaleString();
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(datum);
    div.appendChild(addLike(blog));
    publishedBlogs.appendChild(h3);
    publishedBlogs.appendChild(div);
    showComments(blog.comments);
    publishedBlogs.appendChild(addComment(blog));
  }
}

function addComment(blog) {
  var input = document.createElement("input");
  input.classList.add("blog-input");
  input.placeholder = "Leave a comment...";
  input.style = "width:40%;margin-left:60%;margin-top:5px;";
  input.addEventListener("keyup", function (e) {
    var text = e.target.value;
    if (e.keyCode !== 13) return;
    if (isGuest()) return alert("Molimo Vas registrujte se");
    var comment = {
      text,
      author: loggedUser.name,
      postedDate: new Date(),
    };
    if (!blog.comments) {
      blog.comments = [];
    }

    blog.comments.push(comment);
    localStorage.setItem("blogs", JSON.stringify(allBlogs));
    input.value = "";
    renderBlogs(allBlogs);
  });
  return input;
}

function showComments(comments) {
  var publishedBlogs = document.getElementById("published-blogs");
  for (var comment of comments) {
    var div = document.createElement("div");
    div.classList.add("posted-blog");
    div.style = "width:60%;margin-left:40%;margin-top:4px;padding:7px 15px;";
    var p = document.createElement("p");
    p.innerHTML = comment.text;
    p.style = "margin-bottom:5px;margin-top:5px;";
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

function createDeleteBtn(blog) {
  var btn = document.createElement("button");
  btn.classList.add("blog-delete-btn");
  btn.style.display = loggedUser.name === blog.author ? "block" : "none";
  btn.innerHTML =
    '<i class="fa fa-trash" style="font-size:22px;cursor: pointer;"></i>';
  btn.addEventListener("click", function () {
    var index = allBlogs.indexOf(blog);
    var response = confirm("Jeste li sigurni?");
    if (!response) return;
    allBlogs.splice(index, 1);
    //localStorage.setItem('blogs',JSON.stringify(allBlogs));
    renderBlogs(allBlogs);
  });
  return btn;
}

function isGuest() {
  return !loggedUser.name;
}

function hide(el) {
  el.style.display = "none";
}

function addLike(blog) {
  var id = allBlogs.indexOf(blog);
  var licon = isUserLiked(blog) ? "up" : "o-up";
  var dicon = isUserDisliked(blog) ? "down" : "o-down";
  var likeWrapper = document.createElement("div");
  likeWrapper.classList.add("like-icons");
  likeWrapper.innerHTML = isGuest()
    ? ""
    : `
        <i data-id="${id}" style="color:blue;" onclick="likeBlog(event)" class="fa fa-thumbs-${licon}"></i>
        <span title="${
          blog.likes ? blog.likes.join(", ").toUpperCase() : "Nema lajkova"
        }" style="color:blue;">${blog.likes ? blog.likes.length : 0}</span>
        <i data-id="${id}" style="color:red;"  onclick="dislikeBlog(event)" class="fa fa-thumbs-${dicon}"></i>
        <span style="color:red;" >${
          blog.dislikes ? blog.dislikes.length : 0
        }</span>
    `;
  return likeWrapper;
}

function likeBlog(e) {
  var index = e.target.getAttribute("data-id");
  var blog = allBlogs[index];
  if (!blog.likes) {
    blog.likes = [];
  }

  if (blog.likes.includes(loggedUser.username)) {
    var i = blog.likes.indexOf(loggedUser.username);
    blog.likes.splice(i, 1);
  } else blog.likes.push(loggedUser.username);

  localStorage.setItem("blogs", JSON.stringify(allBlogs));
  renderBlogs(allBlogs);
}

function dislikeBlog(e) {
  var index = e.target.getAttribute("data-id");
  var blog = allBlogs[index];
  if (!blog.dislikes) {
    blog.dislikes = [];
  }

  if (blog.dislikes.includes(loggedUser.username)) {
    var i = blog.dislikes.indexOf(loggedUser.username);
    blog.dislikes.splice(i, 1);
  } else blog.dislikes.push(loggedUser.username);

  localStorage.setItem("blogs", JSON.stringify(allBlogs));
  renderBlogs(allBlogs);
}

function isUserLiked(blog) {
  if (blog.likes && blog.likes.includes(loggedUser.username)) return true;
  return;
}

function isUserDisliked(blog) {
  if (blog.dislikes && blog.dislikes.includes(loggedUser.username)) return true;
  return;
}
