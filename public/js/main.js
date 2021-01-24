let resizeReset = function() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", function(){
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const TAU = Zdog.TAU;
const white = "#ffffff";

var signCloud1 = 1;
var signCloud2 = -1;

let scene = new Zdog.Anchor({
	zoom: 10
});

var cloud = new Zdog.Ellipse({
    // addTo: cloud1,
    color: white,
    stroke: 0,
    quarters: 2,
    closed: true,
    fill: true,
    rotate: { z: -TAU / 4 }
});

// cloud1

var cloud1 = new Zdog.Anchor({
    addTo: scene,
    translate: { x: 5, y: -16, z: -5 },
    rotate: { y: Math.PI / 12}
});

cloud.copy({
    addTo: cloud1,
    diameter: 10,
});

cloud.copy({
    addTo: cloud1,
    translate: { x: 7 },
    diameter: 5,
});


new Zdog.Shape({
    addTo: cloud1,
    path: [
        { x: -3, y: -4 },
        { x: -3, y:  -100 },
    ],
    stroke: 0,
    stroke: 0.1,
    color: white,
});

new Zdog.Shape({
    addTo: cloud1,
    path: [
        { x: 7, y: -2 },
        { x: 7, y:  -100 },
    ],
    stroke: 0,
    stroke: 0.1,
    color: white,
});

// cloud2

let cloud2 = new Zdog.Anchor({
    addTo: scene,
    translate: { x: -10, y: -20, z: -10 },
    rotate: { y: -Math.PI / 12}
});

cloud.copy({
    addTo: cloud2,
    width: 12,
    height: 10,
});

cloud.copy({
    addTo: cloud2,
    translate: { x: 7 },
    width: 5,
    height: 8,
});

cloud.copy({
    addTo: cloud2,
    translate: { x: -7 },
    width: 7,
    height: 7,
});


new Zdog.Shape({
    addTo: cloud2,
    path: [
        { x: -6, y: -3 },
        { x: -6, y:  -100 },
    ],
    stroke: 0,
    stroke: 0.1,
    color: white,
});

new Zdog.Shape({
    addTo: cloud2,
    path: [
        { x: 7, y: -2 },
        { x: 7, y:  -100 },
    ],
    stroke: 0,
    stroke: 0.1,
    color: white,
});

// windmill


Zfont.init(Zdog);
// Set up a font to use
let myFont = new Zdog.Font({
    src: 'public/fonts/Raleway-SemiBold.ttf'
});

// Create a text object
// This is just a Zdog.Shape object with a couple of extra parameters!
new Zdog.Text({
    addTo: scene,
    font: myFont,
    translate: { x: -23 },
    value: 'BILAL',
    fontSize: 6,
    color: '#E5446D',
    textAlign: 'center',
    fill: true,
    stroke: 0,
    rotate: { }
});

new Zdog.Text({
    addTo: scene,
    font: myFont,
    value: 'EL MOUSSAOUI',
    fontSize: 6,
    color: '#32324c',
    textAlign: 'center',
    fill: true,
    stroke: 0,
    rotate: { },
    translate: { x: 10 }
});

new Zdog.Text({
    addTo: scene,
    font: myFont,
    value: 'Game developer\nWeb developer',
    fontSize: 2.5,
    color: '#000',
    textAlign: 'center',
    fill: true,
    stroke: 0,
    translate: { y: 8, z: 2 }
});




// update & render
function loop() {
	resizeReset();
    if (cloud1.translate.x > 20 || cloud1.translate.x < 0) {
        signCloud1 *= -1
    }
    if (cloud2.translate.x > 0 || cloud2.translate.x < -20) {
        signCloud2 *= -1
    }

    cloud1.translate.x += 0.02 * signCloud1;
	cloud2.translate.x += 0.01 * signCloud2;
	

	scene.updateGraph();

	ctx.clearRect( 0, 0, w, h );
	ctx.save();
	ctx.fillStyle = "#FDB";
	ctx.fillRect(0, 0, w, h);
	ctx.translate( w/2, h/2 );
	ctx.scale( 10, 10 );
	// set lineJoin and lineCap to round
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	// render scene graph
	scene.renderGraphCanvas(ctx);
	ctx.restore();
	requestAnimationFrame(loop);
}



// start animation
loop();



let dragStartRX, dragStartRY;
let minSize = Math.min( w, h );

// add drag-rotatation with Dragger
new Zdog.Dragger({
  startElement: canvas,
  onDragStart: function() {
    isSpinning = false;
    dragStartRX = scene.rotate.x;
    dragStartRY = scene.rotate.y;
  },
  onDragMove: function( pointer, moveX, moveY ) {
    scene.rotate.x = dragStartRX - ( moveY / minSize * TAU );
    scene.rotate.y = dragStartRY - ( moveX / minSize * TAU );
  },
});