abstract class Shape{
  abstract area():number;
  abstract draw(gd):void;
  hello():void{
    console.log('你好哇');
  }
}

//-------------------------------------------

class Circle extends Shape{
  constructor(private radius: number){
    super();
  }

  area():number{
    return Math.PI*Math.pow(this.radius, 2);
  }

  draw(gd):void{
    gd.beginPath();

    gd.arc(100, 100, this.radius, 0, Math.PI*2, true);
  }
}

class Rect extends Shape{
  constructor(private width: number, private height: number){
    super();
  }

  area():number{
    return this.width*this.height;
  }

  draw(gd):void{
    gd.fillRect(100,100,this.width,this.height);
  }
}

let c=new Circle(50);
c.hello();
console.log(c.area());

let r=new Rect(400, 300);
r.hello();
console.log(r.area());
