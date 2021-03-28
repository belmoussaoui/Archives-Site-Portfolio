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
    zoom: 10,
    rotate: {x:-Math.PI/8, y: Math.PI/4}
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
    rotate: {y: -Math.PI/4},
    //translate: { x: -23 },
    value: 'BILAL',
    translate: { y: -7},
    fontSize: 6,
    color: '#E5446D',
    textAlign: 'center',
    fill: true,
    stroke: 0,
});

new Zdog.Text({
    addTo: scene,
    font: myFont,
    value: 'EL MOUSSAOUI',
    fontSize: 6,
    color: '#fff',
    textAlign: 'center',
    fill: true,
    stroke: 0,
    rotate: {y: -Math.PI/4},
    translate: { y: -1 },
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
    translate: { y: 7, z: 2 },
    rotate: {y: -Math.PI/4}
});

// moon
// let moon = new Zdog.Group({
//     addTo: scene
// })

// new Zdog.Shape({
//     addTo: moon,
//     color: "rgba(18, 47, 80, 0.4)",
//     fill: true,
//     stroke: 20,
//     translate: {z:-30}
// });

// new Zdog.Shape({
//     addTo: moon,
//     stroke: 0,
//     stroke: 15,
//     fill: true,
//     color: "#122F50",
//     translate: {z:-30}
// });



// stars

var stars = [];
for (let i = 0; i < 50; i++) {
    star = new Zdog.Rect({
        addTo: scene,
        stroke: 0,
        fill: true,
        width: 1,
        height: 1,
        scale: {x: 0.5, y: 0.5},
        color: white,
        translate : {z:11, x:10, y:-7},
        rotate: {z:TAU/8}
    
    });
    star.translate.x = (Math.random() * 100) - 50;
    star.translate.y = (Math.random() * 100) - 50
    star.translate.z = (Math.random() * 20) - 20
    star.count = Math.floor(-Math.random()*50);
    star.signStar = 1;
    star.scale = {x:0, y:0};
    stars.push(star);
}




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
	ctx.fillStyle = "#2e4482";
	ctx.fillRect(0, 0, w, h);
	ctx.translate( w/2, h/2 );
	ctx.scale( 10, 10 );
	// set lineJoin and lineCap to round
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
    // render scene graph
    stars.forEach(star => {
        star.count++;
        if (star.count >= 0) {
            if (star.scale.x > 1 || star.scale.x <= 0) {
                star.signStar *= -1
            }
            star.scale.x += 0.02 * star.signStar;
            star.scale.x = Math.max(0, star.scale.x);
            star.scale.y = star.scale.x;
        }
        if (star.scale.x === 0) {
            star.count = Math.floor(-Math.random()*200);
        }
    });


	scene.renderGraphCanvas(ctx);
	ctx.restore();
	requestAnimationFrame(loop);
}

// gamecube

let cube = new Zdog.Box({
    addTo: scene,
    width: 15,
    height: 10,
    depth: 15,
    stroke: false,
    color: '#4B0082', // default face color
    leftFace: '#3B0072',
    rightFace: false,
    topFace: '#5C1193',
    bottomFace: '#3A0071',
    topFace: false,
    frontFace: false,
    translate: { z: 0, y: 20 },
});

var topFace = new Zdog.Group({
    addTo: scene,
    translate: { z: 0, y: -10 / 2 + 20 },
    rotate: { x: TAU / 4 }
});

new Zdog.Rect({
    addTo: topFace,
    width: 15,
    color: '#5C1193',
    height: 15,
    stroke: 0,
    fill: true,
});

new Zdog.Ellipse({
    addTo: topFace,
    width: 8,
    height: 8,
    stroke: 0,
    fill: true,
});

// Set up a font to use
let myFont2 = new Zdog.Font({
    src: 'public/fonts/Raleway-Regular.ttf'
});

new Zdog.Text({
    addTo: topFace,
    font: myFont2,
    value: 'Nintendo\nGamecube',
    fontSize: 0.7,
    color: '#fff',
    textAlign: 'center',
    fill: true,
    stroke: 0,
});


new Zdog.Ellipse({
    addTo: topFace,
    width: 1.5,
    height: 1.5,
    color: '#fff',
    stroke: 0,
    fill: true,
    translate: { x: -6, y: -5},
});

new Zdog.Shape({
    addTo: topFace,
    path: [
        { x: -6, y: -7.5 + 0.05 },
        { x: -6, y: -6 },
        {
            arc: [
                { x: -5, y: -6 }, // corner
                { x: -5, y: -5 }, // end point
            ]
        },
        {
            arc: [
                { x: -5, y: -4 }, // corner
                { x: -6, y: -4 }, // end point
            ]
        },
        { x: -6, y: 5 },
        {
            arc: [
                { x: 0, y: 7 }, // corner
                { x: 6, y: 5 }, // end point
            ]
        },
        { x: 6, y: -7.5 + 0.05 }, // line to 2nd point
    ],
    stroke: 0.05,
    closed: false,

    color: '#000',
});

new Zdog.Shape({
    addTo: topFace,
    path: [
        { x: -2, y: 5.8 },
        {arc: [
            { x: 0, y:  7.5}, // corner
            { x: 2, y: 5.8 }, // end point
        ]},
        
    ],
    stroke: 0.05,
    closed: false,
    fill: true,

    color: '#000',
});

var frontFace = new Zdog.Group({
    addTo: scene,
    translate: { z: 15 / 2, y: 0 + 20 },
    rotate: {}
});

new Zdog.Rect({
    addTo: frontFace,
    width: 15,
    color: '#4B0082',
    height: 10,
    stroke: 0,
    fill: true,
});

new Zdog.Rect({
    addTo: frontFace,
    width: 10,
    color: "#fff",
    height: 5,
    fill: true,

});

for (let i = 0; i < 4; i++) {
    new Zdog.Ellipse({
        addTo: frontFace,
        width: 1,
        color: '#000',
        height: 1,
        stroke: 0,
        fill: true,
        translate: {x: -3 + i * 2, z:0.5}
    });
}

let semicircle = new Zdog.Ellipse({
    addTo: scene,
    width: 5,
    height: 10,
    quarters: 2,
    stroke: 1.5,
    color: '#000',
    translate: {z:-7.5, y:-2 + 20},
    rotate: {x:-TAU/4, z:TAU/4}
});

var rightFace = new Zdog.Group({
    addTo: scene,
    translate: { z: 0, x:7.5, y:-0.2+20 },
    rotate: { y:TAU/4 }
});

new Zdog.Rect({
    addTo: rightFace,
    width: 15,
    color: '#4B0082',
    height: 10,
    stroke: 0,
    fill: true,
    translate: {y:0.2}
});

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        new Zdog.Rect({
            addTo: rightFace,
            width: 0.5,
            height: 0.5,
            quarters: 2,
            stroke: 0,
            fill: true,
            color: '#000',
            translate: {x: -3 + 0.8 * i, y: -3 + j * 0.8},
            rotate: {}
        });
    }
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