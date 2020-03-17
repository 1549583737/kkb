//类
class Person{
  private _name: string;

  get name():string{
    return this._name;
  }

  set name(newVal){
    if(!newVal || newVal.length<6){
      throw new Error('参数不对');
    }else{
      this._name=newVal;
    }
  }
}

let p=new Person();
p.name='blue';
