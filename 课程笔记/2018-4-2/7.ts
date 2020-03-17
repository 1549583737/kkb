/*
class Person{
  private name:string;
  private age:number;

  constructor(name: string, age: number){
    this.name=name;
    this.age=age;
  }

  show():void{
    console.log(this.name, this.age);
  }
}
*/

class Person{
  constructor(private name: string, private age: number){
  }

  show():void{
    console.log(this.name, this.age);
  }
}

let p=new Person('blue', 18);
p.show();
