//import EXIF

var imageCollection = new Map();

function NewImage(src) {
    this.id = 'img' + Date.now();
    this.img = new Image();
    this.img.src = src;
    this.img.dataset['id'] = this.id;
    this.description = '';
    this.coord = extractGPSData(this.img) || {};
    this.exifData = extractExifData(this.img) || "";
}

function extractGPSData(img) {
    var result;
    EXIF.getData(img, () => {
        var yCoord  = EXIF.getTag(img, 'GPSLongitude') || null;
        var xCoord = EXIF.getTag(img, 'GPSLatitude') || null;
        result = {
                    x: coordinatesToDecimal(xCoord),
                    y: coordinatesToDecimal(yCoord) 
                }
    });
    return result;
};

function extractExifData(img) {

        var allMetaData = EXIF.getAllTags(img);
        return JSON.stringify(allMetaData, null, "\t");
};

function coordinatesToDecimal(number) {
    if (number) {
        return number[0].numerator + number[1].numerator /
            (60 * number[1].denominator) + number[2].numerator /
            (3600 * number[2].denominator);
    }
    return;
};
