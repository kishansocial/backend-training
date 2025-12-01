function sanitize(user){
    let count=0;
    for (let key in user){
        // console.log(key,user[key]);
        if(user[key] ==null || user[key] == undefined || user[key] == ""){
          count++;
          // delete user.key   not work because of take key as name
          delete user[key]
        }
    }
    return count;
}

user = {
  id: "U123",
  username: "abc",
  fullName: "",
  email: "abc@example.com",
  phone: null,
  passwordHash: undefined,
}
console.log("Before sanitize user object : \n" ,user)
Removed_key=sanitize(user);
console.log("After sanitize user object : \n" ,user)
console.log("\n Total number of removed key : ",Removed_key)