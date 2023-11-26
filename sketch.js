function setup(){
    createCanvas(400,400)

    let boundary=new Rectangle(200,200,200,200)
    let qt=new QuadTree(boundary,4)
    
    for(let i=0;i<100;i++){
        let point=new Point(random(width),random(height))
        qt.insert(point)
    }
    qt.show()
}

setup()