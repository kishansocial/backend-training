function validateField(key, rule, value) {
  switch (key) {
    case "type":
      // console.log(key,rule,value)
      if (typeof value !== rule) {
        // console.log(typeof value)
        console.log("data types not match");
      }
      break;

    case "required":
      if (
        rule === true &&
        (value === undefined || value === null || value === "")
      )
        console.log("Field is required");
      break;

    case "min":
      if (typeof value === "number" && value < rule) console.log("Value error");
      break;

    case "max":
      if (typeof value === "number" && value > rule) console.log("Value error");
      break;

    case "minLength":
      if (typeof value === "string" && value.length < rule)
        console.log("value error");
      break;

    case "maxLength":
      if (typeof value === "string" && value.length > rule)
        console.log("value error");
      break;

    case "uppercase":
      if (rule && value !== value.toUpperCase()) console.log("Not match");
      break;

    case "lowercase":
      if (rule && value !== value.toLowerCase()) console.log("Not match");
      break;

    case "regex":
      if (!rule.test(value)) {
        console.log("Regex validation failed");
      }
      break;

    default:
      console.log(key);
      console.log("Not handle this key");
  }
}

function validate(data, schema) {
  for (let field in schema) {
    let keys = schema[field];
    let value = data[field];

    if (keys.type === "object" && keys.schema) {
      if (typeof value !== "object" || value === null) {
        console.log("Error object is not null");
      }
      validate(value, keys.schema);
      continue;
    }

    for (let key in keys) {
      validateField(key, keys[key], value);
    }
  }
}

const schema1 = {
  name: { type: "string", required: true, minLength: 2 },
  age: { type: "number", min: 0, max: 120 },
  active: { type: "boolean", required: true },
  address: {
    type: "object",
    schema: {
      city: { type: "string", required: true },
      pin: { type: "string" },
    },
  },
};

const data1 = {
  name: "Keshav",
  age: 25,
  active: true,
  address: {
    city: "Delhi",
    pin: "110001",
  },
};

validate(data1, schema1);

const schema = {
  name: {
    type: "string",
    required: true,
    minLength: 3,
    maxLength: 20,
    uppercase: false,
    lowercase: false,
  },

  age: {
    type: "number",
    required: true,
    min: 18,
    max: 60,
  },

  email: {
    type: "string",
    required: true,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  gender: {
    type: "string",
  },

  tags: {
    type: "object",
  },

  address: {
    type: "object",
    required: true,
    schema: {
      city: { type: "string", required: true, minLength: 3 },
      pincode: { type: "string", regex: /^[0-9]{6}$/ },
    },
  },
};

const data = {
  name: "Keshav",
  age: 25,
  email: "keshav@example.com",
  gender: "male",
  tags: ["js", "dev"],
  address: {
    city: "Mumbai",
    pincode: "400001",
  },
};

validate(data, schema);

console.log(typeof ["s", "s"]);
console.log(Object.prototype.toString.call(["s", "s"])); // "[object Array]"

// typeod possible output
// "undefined";
// "object";
// "boolean";
// "number";
// "bigint";
// "string";
// "symbol";
// "function";
