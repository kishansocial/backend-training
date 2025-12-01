function mergeDeep(a, b) {
  //Those key only present in b , copy to a
  for (let key in b) {
    if (!Object.hasOwn(a, key)) {
      // console.log(Object.hasOwn(b,key))
      // console.log(key);
      a[key]=b[key]
    }
  }
  //  if both has same data type object than it's give to recursive
  for(let key in a){
    if(typeof a[key]=== 'object' 
      &&Object.hasOwn(b,key)
       && (typeof a[key] === typeof b[key])){
        mergeDeep(a[key],b[key]);
       }
  }

  //remain keys those typeof not same , it's override,
  // those keys only exist in "a", it remain as it is. 

    for (let key in a) {
      if (Object.hasOwn(b, key) 
        && typeof a[key] !== typeof b[key]) {
        a[key] = b[key];
      }
    }



}


// Test case Point 
// -1. copy a key from B to A that's not in A
// -2. key present in both but data type not match than override from B
// -3. if both object data type than recursive rule 1,2

user = {
  id: "U123",
  username: "abc",
  fullName: "",
  email: "abc@example.com",
  phone: null,
  passwordHash: undefined,
  address :"xyz"
};
user1 = {
  id: "U123",
  username: "abc",
  fullName: "",
  email: "abc@example.com",
  phone: null,
  passwordHash: undefined,
  dob: "15-5-2000",
};

mergeDeep(user, user1);
console.log(user);

a={
  name:"kishan",
  address:{street : {block:"5",room:7},
    city:"Nadiad"},
  rank:122
}
b = {
  name: "nikunj",
  address: { street: { block: 45 }, city: "Nadiad" },
  cgpa: 7.9,
};

mergeDeep(a,b)
console.log(a)


