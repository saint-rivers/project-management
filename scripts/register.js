let data = {};

function uuid() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

async function getData() {
  const data = await fetch("../data/data.json");
  console.log(data);
  return data.json();
}

async function insertNewUser(e) {
  e.preventDefault();
  const result = await getData();

  var newUser = {
    _id: uuid(),
    username: "tom",
    password: "asd",
  };
  result.users && result.users.push(newUser);
  console.log(result);
  data = result;

  // var json = JSON.stringify(obj);
  // var fs = require(['fs']);
  // fs.writeFile('../data/data.json', json, 'utf8', ()=>{
  // 	alert("inserted user successfully");
  // });
}

function validateUser(email, password) {
  var a = data.users.find((user) => {
    return user.email == email && user.password == password;
  });
  if (a != undefined) return true;
  return false;
}

async function login(e, email, password) {
  e.preventDefault();
  data = await getData();

  validateUser(email, password)
    ? (window.location.href = "./pages/main.html")
    : alert("Wrong email or password.");
}

$("#create-user").on("click", (event) => insertNewUser(event));

$("#login-btn").on("click", (event) => {
  var email = $("#login-email").val();
  var password = $("#login-password").val();

  var email = "joy@gmail.com";
  var password = "asd"
  login(event, email, password);
});
