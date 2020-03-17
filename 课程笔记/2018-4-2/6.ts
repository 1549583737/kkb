//类
class Circle{
  public static PI:number=3.14159269798;
  private radius:number;
  public area:number;

  constructor(radius: number){
    this.radius=radius;

    this.area=Math.pow(this.radius, 2)*Circle.PI;
  }
}

let c=new Circle(10);
console.log(c.area);
