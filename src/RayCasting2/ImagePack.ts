export class ImagePack {
    image = new Image()
    width = 0
    height = 0
    constructor (src: string, width: number, height: number) {
        this.image.src = src
        this.width = width
        this.height = height
    }
}