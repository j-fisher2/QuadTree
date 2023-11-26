class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
        var point_size=5;
        fill('red')
        ellipse(this.x,this.y,point_size,point_size)
    }
}

class Rectangle{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    contains(point){
        return (point.x>=this.x-this.w&&point.x<=this.x+this.w&&point.y<=this.y+this.h&&point.y>=this.y-this.h)
    }
}

class QuadTree{
    constructor(boundary,n=4){
        this.boundary=boundary;
        this.capacity=n;
        this.points=[];
        this.divided=false;
    }
    subdivide(){
        let x=this.boundary.x
        let y=this.boundary.y
        let h=this.boundary.h
        let w=this.boundary.w

        let nwb=new Rectangle(x+w/2,y-h/2,w/2,h/2)
        let neb=new Rectangle(x-w/2,y-h/2,w/2,h/2)
        let swb=new Rectangle(x-w/2,y+h/2,w/2,h/2)
        let seb=new Rectangle(x+w/2,y+h/2,w/2,h/2)

        this.nw=new QuadTree(nwb)
        this.ne=new QuadTree(neb)
        this.sw=new QuadTree(swb)
        this.se=new QuadTree(seb)

        this.divided=true;
    }
    insert(point){
        if(!this.boundary.contains(point)){
            return;
        }

        if(this.points.length<this.capacity){
            this.points.push(point)
        }
        else{
            if(!this.divided){
                this.subdivide();
            }
            this.nw.insert(point)
            this.ne.insert(point)
            this.sw.insert(point)
            this.se.insert(point)
        }
    }
    show(){
        stroke(0);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x,this.boundary.y,this.boundary.w*2,this.boundary.h*2)
        if(this.divided){
            this.nw.show()
            this.ne.show()
            this.sw.show()
            this.se.show()
        }
    }
}