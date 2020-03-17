//类
class Person{
  name: string='';
  age: number=0;

  constructor(name: string, age: number){
    this.name=name;
    this.age=age;
  }

  show():void{
    console.log(this.name);
    console.log(this.age);
  }
}

const p=new Person('blue', 18);
p.show();
