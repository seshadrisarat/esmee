function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function imageZoom(imgID, resultID) {

    if(isMobileDevice()){
        return;
    }

    var img, lens, result, cx, cy;

    img = document.getElementById(imgID);
    result = document.getElementById(resultID);

    /* Create lens: */
    lens = document.createElement("div");
    lens.setAttribute("class", "zoom-lens");

    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);

    /* Calculate the ratio between result div and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    /* Set background properties for the result div */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

    /* Set opacity properties for the img div */
    img.style.opacity = "0";

    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);

    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(e) {
        var pos, x, y;

        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();

        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);

        /* Calculate the position of the lens: */
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);

        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
        if (y < 0) {y = 0;}

        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";

        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;

        e = e || window.event;

        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();

        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;

        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return {x : x, y : y};
    }
}

function imageRecover(imgID) {

    if(isMobileDevice()){
        return;
    }

    var img, lens;

    /* Remove lens */
    lens = document.getElementsByClassName('zoom-lens')[0];
    lens.parentElement.removeChild(lens);

    /* Set opacity properties for the img div */
    img = document.getElementById(imgID);
    img.style.opacity = "1";
}

function selectImage(e) {
    /* Remove all small images selected class */
    var smallImages = document.getElementsByClassName('small')[0].children;
    for(var i=0; i<smallImages.length; i++){
        smallImages[i].classList.remove('selected');
    }
    /* Add selected class to currently selected small image */
    e = e || window.event;
    var target = e.target || e.srcElement;
    target.classList.add('selected');

    /* change init image src based on currently selected small image */
    document.getElementById('initImage').src = target.src;
}