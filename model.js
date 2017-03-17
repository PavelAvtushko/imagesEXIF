    var imageCollection = new Map();

    function NewImage(src, coord) {
        this.id = 'img' + Date.now();
        this.img = new Image();
        this.img.src = src;
        this.img.dataset['id'] = this.id;
        this.description = '';
        this.coord = coord;
    }