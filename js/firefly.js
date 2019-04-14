function firefly(id, num, sz, color) {
    if (document.getElementById("fireflyLayer") != null) {
        var canvas = document.getElementById('fireflyLayer');
    } else {
        var canvas = document.createElement('canvas');
        div = document.getElementById(id);
        div.style.position = "relative";
        canvas.id = "fireflyLayer";
        canvas.height = div.offsetHeight;
        canvas.width = div.offsetWidth;
        canvas.style.position = "fixed";
        canvas.style.zIndex = -1;
        canvas.style.left = "0";
        canvas.style.top = "0";
        div.appendChild(canvas);
    }
    const h = canvas.height;
    const w = canvas.width;
    sketch(num, sz, color, h, w);
}

function sketch(num, sz, color, h, w) {
    var mainCanvas = document.getElementById("fireflyLayer");
    var mainContext = mainCanvas.getContext('2d');
    mainContext.clearRect(0, 0, w, h);

    let circles = [];

    const requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    function Circle(radius, speed, width, xPos, yPos) {
        this.radius = radius;
        this.speed = speed;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.opacity = .05 + Math.random() * .8;

        this.counter = 0;

        const signHelper = Math.floor(Math.random() * 2);

        if (signHelper === 1) {
            this.sign = -1;
        } else {
            this.sign = 1;
        }
    }

    Circle.prototype.update = function () {
        this.counter += this.sign * this.speed;

        mainContext.beginPath();

        mainContext.arc(this.xPos + Math.cos(this.counter / w) * this.radius,
            this.yPos + Math.sin(this.counter / h) * this.radius,
            this.width,
            0,
            Math.PI * 2,
            false);

        mainContext.closePath();

        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        mainContext.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + this.opacity + ')';
        mainContext.fill();
    };

    let szNum;

    switch (sz) {
        case 'big':
            szNum = 10;
            break;
        case 'medium':
            szNum = 5;
            break;
        case 'small':
            szNum = 3;
            break;
        case 'tiny':
            szNum = 1;
            break;
        default:
            szNum = 5;
    }

    function drawCircles() {
        for (let i = 0; i < num; i++) {
            const randomX = Math.round(Math.random() * w);
            const randomY = Math.round(Math.random() * h);
            const speed = .2 + Math.random() * 3;
            const size = Math.random() * szNum;

            const circle = new Circle(100, speed, size, randomX, randomY);

            circles[i] = circle;
        }
        draw();
    }

    drawCircles();

    function draw() {
        mainContext.clearRect(0, 0, w, h);

        for (let i = 0; i < circles.length; i++) {
            let myCircle = circles[i];
            myCircle.update();
        }
        requestAnimationFrame(draw);
    }
};