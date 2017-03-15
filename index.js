window.onload = (function(){

     var coord = {
        x:-34.397,
        y: 150.644,
    } 

    var selector = "#googleMap";

    var showImage = (function () {
        var flag = true;
        return function(element) {
            var key = element.dataset.id;
            if (key) {
                var src = imageCollection.get(key).img.src;
                $(' #mainPicture > img ').attr('src', src);
                createMap(selector, coord);
                if (flag) {
                    $('#googleMap, #mainPicture, h4').removeClass( "hidden" );
                    flag = false;
                }
            };
        }
    })();


    function createImage(event) {
        var image = new NewImage(event.target.result);
        $( ".container").append('<li>');
        $( ".container li:last-child").append('<a>');
        $( ".container li:last-child a").append(image.img);
        imageCollection.set(image.id, image);
        $('input.form-control.input-lg').val("");
        $('.file').val("");
        $('.container').removeClass( "hidden" );
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
        console.log('modify description');
    })

    $('#browse').on('click', () => {
        $('.file').trigger('click');
    });

    $('.file').on('change', function(){
        $('input.form-control.input-lg').val($('.file').val().replace(/C:\\fakepath\\/i, ''));
    });

    $('#editInfo').on('click', () => {
        $('.description-form').removeClass('hidden');
    });

    $('.description-form button').on('click', (e) => {
        e.preventDefault();
        $('.description-form').addClass('hidden');
    });

    $('.coordinates').on('click', () =>{
        createMap(selector, coord2)
    });

    $('.container').on('click', (e) => {
        showImage(e.target)});

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


