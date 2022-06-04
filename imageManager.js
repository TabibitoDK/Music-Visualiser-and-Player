class imageManagerCLASS {
    constructor () {}

    init () {
        this.imageRenderer = createGraphics(Myimage.width, Myimage.height);
        this.imageRenderer.ellipse((Myimage.width/100) * 50, (Myimage.height/100) * 50, (Myimage.width/100) * 55, (Myimage.width/100) * 55);
        Myimage.mask(this.imageRenderer);
    }

    update () {
        image(Myimage, CW * 50 - 250, RH * 50 - 140, 500, 280);
    }
}

let imageManager = new imageManagerCLASS();

