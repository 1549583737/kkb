//类
class Person{
  private name: string='';
  protected age: number=0;

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
