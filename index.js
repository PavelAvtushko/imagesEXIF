window.onload = (function(){

    var mapSelector = "#googleMap";
    var hiddenClass = 'hidden';
    var exifDataContainer = ".exif-data"
    var map;


    //меняет координаты карты
    // map.changeMapCoord(coord2);

function showImage(element) {

    var image = findImage(element);
    if (!image) {
        return;
    }
    $(' #mainPicture > img ').attr('src', image.img.src);
    $('#mainPicture, h4').removeClass(hiddenClass);
    $(exifDataContainer).html(image.exifData);

    if (image.coord.x && image.coord.y && !map) {
        map = new Map(mapSelector, image.coord);
        $(mapSelector).removeClass(hiddenClass);
        map.changeMapCoord(image.coord);
    }
    else if (image.coord.x && image.coord.y && map) {
        map.changeMapCoord(image.coord);
        $(mapSelector).removeClass(hiddenClass);
    }
    else {
        $(mapSelector).addClass(hiddenClass);
    }

}


function findImage(element) {
    var key = element.dataset.id;
    return key ? imageCollection.get(key) : null;
}



    function addDescriptionData(event) {

    };


    function createImage(event) {
        var image = new NewImage(event.target.result);
        $( ".container").append('<li>');
        $( ".container li:last-child").append('<a>');
        $( ".container li:last-child a").append(image.img);
        imageCollection.set(image.id, image);
        $('input.form-control.input-lg').val("");
        $('.file').val("");
        $('.container').removeClass(hiddenClass);
    };


    function addFileToCollection(){
        var file = document.querySelector('.file').files[0];
        var reader  = new FileReader();
        reader.onloadend = function (event) {
           createImage(event);
        }
        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        }
    }

    $('#browse').on('click', () => {
        $('.file').trigger('click'); //искусственно вызывает клик;
    });

    $('.file').on('change', function(){
        $('input.form-control.input-lg').val($('.file').val().replace(/C:\\fakepath\\/i, ''));
    });

    $('#editInfo').on('click', (e) => {
        e.preventDefault();
        $('.description-form input').val('');
        $('.description-form').removeClass(hiddenClass);
    });

    $('.description-form button').on('click', (e) => {
        e.preventDefault();
        $('.description-form').addClass(hiddenClass);
    });

    $('.description-form button[type="submit"]').on('click', (e) => {
        
    });

    $('.container').on('click', (e) => {
        showImage(e.target)
    });

    $('#load').on('click', () => {
        addFileToCollection();
    });




    // function request(file){
    //     var data = new FormData();
    //     data.append('file0', file);

    //     var xhr = new XMLHttpRequest();
    //     xhr.open("POST", "Handler.ashx");

    //     xhr.send(data);

    //     xhr.onreadystatechange = function(){
    //         if (xhr.readystate ===4 && xhr.status === 200) {
    //             console.log('ok')
    //         }
    //     }

    //     xhr.onerror = function(){
    //         console.log('error');
    //         //div произошла ошибка при загрузке файла
    //     }
    // }

})()


//http://blogs.microsoft.co.il/ranw/2015/01/07/reading-gps-data-using-exif-js/