function login(){

fetch("/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:document.getElementById("email").value,
password:document.getElementById("password").value

})

})

.then(res=>res.json())

.then(data=>{

if(data.status==="fail"){

alert("Wrong email or password")
return

}

if(data.role==="admin"){

window.location.href="admin.html"

}else{

window.location.href="dashboard.html"

}

})

}