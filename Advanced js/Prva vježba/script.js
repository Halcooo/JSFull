function getValue() {
  return this.value;
}

var obj = {
  value: "Audi",
  getValue,
};

var obj2 = {
  value: "Lenovo",
  getValue,
};

console.log(obj.getValue());
