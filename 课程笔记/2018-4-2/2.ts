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

//-------------------------------------------------

class Staff extends Person {
  job: string='';

  constructor(name: string, age: number, job: string){
    super(name, age);

    this.job=job;
  }

  show():void{
    super.show();

    console.log(this.job);
  }
}


let s=new Staff('blue', 18, '随便');
s.show();
