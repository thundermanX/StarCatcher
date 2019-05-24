// StarCatcher Scripts for the game made by Soft Dev 2015
    // when the web page window loads up, the game scripts will be read
 var star = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,
    _sh: 40,
    _sw: 40,
     // add this to the variable list at the top of the star class
    _visible: true,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._xSpeed=xSpeed;
        obj._ySpeed=ySpeed;
        obj._img = new Image();
        obj._img.src="images/star.png";
        return obj;
    },
     // and this just below the other functions in the star class
    visible: function() {
        return this._visible;
    },
    setImage: function(img){
        this._img.src=img;
    },

    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },
};
window.onload = function() {
    //load canvas
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
        w = canvas.width = 800,
        h = canvas.height = 500;

    //load images
    var background = new Image();
    background.src="images/bg.jpg";
      var ship1 = new Image();
    ship1.src="images/spaceship1.png"
    var ship2 = new Image();
    ship2.src="images/spaceship2.png";

    //load variables
     var p1x=w/2+300, p1y=h/2, p2x=w/2-300, p2y=h/2, size = 40;
       // load variables that are global
    var gameOn=false;
    var p1Score=0, p2Score=0;


        if (gameOn==1) {requestAnimationFrame(main)}


    // moving stars around the screen and update the players movement
   // our stars are created using a single array with a class of information
    var starCount=100;
    var starArray=[];

    // Create an array of stars
    for (var i = 0; i < starCount; i++) {
        // this assigns each element in the array all the information for the star by 
        // using the 'star' class, pass the starting x,y locations 
        //  and speeds into the array.
        starArray.push(star.create(20,i+50,Math.random()*5,Math.random()*5));
    }
           

    function starsUpdate () {
        // to move the stars around
         //  draw star on screen only if visible
        for (var i = 0; i < starCount; i++) {
            // this checks to see if the star is visible
            if (starArray[i].visible()) {
            starArray[i].update(); 
            ctx.drawImage(starArray[i]._img, starArray[i]._x, starArray[i]._y, starArray[i]._sw, starArray[i]._sh);
            if (starArray[i]._x>w || starArray[i]._x<0) {starArray[i]._xSpeed = -starArray[i]._xSpeed}
            if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed}

            if (Math.abs(p1x-starArray[i]._x)<20 & Math.abs(p1y-starArray[i]._y)<20) {scoring(i,1);}
            if (Math.abs(p2x-starArray[i]._x)<20 & Math.abs(p2y-starArray[i]._y)<20) {scoring(i,2);}
        }
        }//endFor  
    } //End StarsUpdate

    //Listens to app for keyboard actions
       // a new array is made to keep track of a button being held down
    var keysDown = [];

    // if the key is held down, the keycode is placed in array
    // then it is deleted upon keyup command.  
    // playerUpdate will now control player movements and use the keysDown array

    addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;
        // start the game with keyboard command
        if (e.keyCode == 32) {
            if (gameOn==0) {
                gameOn = 1;
                main();// (key: space bar to start game)
            }
            else {gameOn=0}
        }//end if

    }, false);


    //  player 2 movement keyboard commands
    addEventListener("keyup", function (e) {

        if (e.keyCode == 87) { //  (key: w )
            p2y-=10;
        }
        else if (e.keyCode == 83) { //  (key: s)
            p2y+=10;
        }
        else if (e.keyCode == 65) { //  (key: a)
            p2x-=10;
        }
        else if (e.keyCode == 68) { //  (key: d)
            p2x+=10;
        }
        //take keycode out of array (not being held down anymore)
        delete keysDown[e.keyCode];
    }, false); 

//player movement
    function playerUpdate() {
        //player two hodling down a key using the array keysDown
        if (87 in keysDown) {// P2 holding down the w key
            p2y -= 5;
        }
        if (83 in keysDown) { // P2 holding down (key: s)
            p2y += 5;
        }
        if (65 in keysDown) { // P2 holding down (key: a)
            p2x -= 5;
        }
        if (68 in keysDown) { // P2 holding down (key: d)
            p2x += 5;
        }

        // player one hodling key down
        if (37 in keysDown) { // P2 holding down (key: left arrow)
            p1x -= 5;
        }
        if (38 in keysDown) { // P2 holding down (key: up arrow)
            p1y -= 5;
        }
        if (39 in keysDown) { // P2 holding down (key: right arrow)
            p1x += 5;
        }
        if (40 in keysDown) { // P2 holding down (key: down arrow)
            p1y += 5;
        }
        if(p1x>w-40) {p1x=-5}
        if(p2x>w-40) {p2x=-5
}
        //draw images of ships
        ctx.drawImage(ship1, p1x, p1y, 40, 40);
        ctx.drawImage(ship2, p2x, p2y, 40, 40);

    } 

    //Our main function which clears the screens 
    //  and redraws it all again through function updates,
    //  then calls itself out again
    function main(){
        ctx.clearRect(0,0,w,h);
        ctx.drawImage(background,0,0,w,h);
        starsUpdate();
        playerUpdate();
        if (gameOn==1){requestAnimationFrame(main)};
    } //close main
    //  scoring functions to place and score stars
    function scoring(k,wp) {
        starArray[k]._visible=false;
        if (wp==1) {
            // need to place a small star next to player 1 score
            p1Score++;
            $("#p1ScoreDisp").text(p1Score);
        }
        else if (wp==2) {
            p2Score++;
            $("#p2ScoreDisp").text(p2Score);
        }
    } //close scoring
}