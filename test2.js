
class Car {
  constructor(params) {
    this.name = params
    console.log()
    console.dir(Car === this.constructor);
  }

  method(param) {
    this.name = this.name + param;
    return this.name;
  }

  drive() {
    return this.name + "が走ってます";
  }
}

aiueo = new Car("mine")
console.dir(aiueo);
console.log(aiueo.method("mine!!"));
console.log(aiueo.drive());
//console.log(aiueo.__proto__);
console.dir(Car.prototype)
  console.dir(Car.prototype === aiueo.__proto__);
