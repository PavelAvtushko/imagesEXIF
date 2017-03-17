window.onload = (function(){

    var mapSelector = "#googleMap";
    var hiddenClass = 'hidden';
    var map;

    var coord = {
        x:-33.397,
        y: 149.644,
    } 

    var coord2 = {
        x:-36.397,
        y: 147.644,
    } 
    //меняет координаты карты
    // map.changeMapCoord(coord2);

    var showImage = (function () {
        var flag = true;
        return function(element) {
            var key = element.dataset.id;
            if (key) {
                var image = imageCollection.get(key);
                $(' #mainPicture > img ').attr('src', image.img.src);
                $('#mainPicture, h4').removeClass(hiddenClass);
                if (flag && image.coord) {
                    map = new Map(mapSelector, image.coord);
                    $(mapSelector).removeClass(hiddenClass);
                    flag = false;
                }
                if (!image.coord) {
                    $(mapSelector).addClass(hiddenClass);
                }
            };
        }
    })();


    function createImage(event) {
        var image = new NewImage(event.target.result, coord);
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



    $('#editInfo').on('click', (e)=>{
        e.preventDefault();
        //console.log('modify description');
    })

    $('#browse').on('click', () => {
        $('.file').trigger('click');
    });

    $('.file').on('change', function(){
        $('input.form-control.input-lg').val($('.file').val().replace(/C:\\fakepath\\/i, ''));
    });

    $('#editInfo').on('click', () => {
        $('.description-form').removeClass(hiddenClass);
        map.changeMapCoord(coord2);
    });

    $('.description-form button').on('click', (e) => {
        e.preventDefault();
        $('.description-form').addClass(hiddenClass);
    });

    $('.coordinates').on('click', () =>{
        createMap(selector, coord2)
    });

    $('.container').on('click', (e) => {
        showImage(e.target)});

    $('#load').on('click', () => {
        addFileToCollection();
    });



$('.img-responsive').on('click', (e) => {
    // var long = EXIF.getTag(e.target, 'GPSLongitude');
    // console.log(long);
    EXIF.getData(e.target, () => {
        var allMetaData = EXIF.pretty(e.target);
        //var allMetaData = EXIF.getAllTags(e.target);
        //var a = EXIF.getAllTags(e.target);
        $('.ddd').html(allMetaData);

        console.dir(allMetaData);
        // console.dir(typeof a);
    });
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