let element = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let user_entries = [];

let username = element("name"),
  email = element("email"),
  password = element("password"),
  cpassword = element("cpassword"),
  tc = element("tc"),
  dob = element("dob");

let errormsg = classes("errormsg");

let form = element("form");

function verify(elem,message,cnd){
    if(cnd){
        elem.style.border = "2px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    }else{
        elem.style.border = "2px solid green";
        elem.setCustomValidity('');

    }
}

let message_name = "Username must be at least 3 characters long";
let message_email = "Email must be valid";
let message_pass = "Passwords must match";
let message_agree = "You must agree to the terms and conditions";

username.addEventListener("input", (e) => {
    let cond_name = username.value.length < 3;
    e.preventDefault();
    verify(username,message_name,cond_name);
});

email.addEventListener("input", (e) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    verify(email,message_email,cond_email);
});

cpassword.addEventListener("input", (e) => {
    let cond_pass = password.value != cpassword.value;
    e.preventDefault();
    verify(cpassword,message_pass,cond_pass);
});

function makeObject(){
    let obj = {
        name: username.value,
        email: email.value,
        password: password.value,
        dob: dob.value
    }
    return obj;
}

function fillTable(){
    let obj = localStorage.getItem("user_entries");
    if(obj){
        user_entries = JSON.parse(obj);
    }else{
        user_entries = [];
    }
    return user_entries;
}
function displayTable(){
    let table = element("user-table");
    let entries = fillTable();
    if (entries.length > 0) {
        element("table-box").style.display = "flex";
    }
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date of Birth</th>
                </tr>`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                </tr>`;
    }
    table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    verify(tc,message_agree,cond_agree);
    if (!cond_agree) {
        let obj = makeObject();
        user_entries.push(obj);
        localStorage.setItem("user_entries", JSON.stringify(user_entries));
    }
    displayTable();
});

