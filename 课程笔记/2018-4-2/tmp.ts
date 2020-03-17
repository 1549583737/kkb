class Person{
  name: string;
  age: number;

  constructor(name: string, age: number){
    this.name=name;
    this.age=age;
  }

  show():void{
    console.log(this.name);
    console.log(this.age);
  }
}

let p=new Person('blue', 18);
