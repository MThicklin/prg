// Create our 'main' state that will contain the game
var mainState = {
preload: function() { 
    // Load the bird sprite
    //game.load.image(asset name, asset location)
    game.load.image('bird', 'assets/bird.png'); 
    game.load.image('pipe', 'assets/pipe.png')
},

create: function() { 
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Syntax : game.add.sprite(X,Y,Asset name from preload)
    this.bird = game.add.sprite(400, 400, 'bird');

    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    //commented out for test, also line 58.
    //this.bird.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

    this.pipes = game.add.group();
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score=0;
    this.labelScore=game.add.text(20,20,"0", {font: "30px Arial", fill:"#ffffff"});

    this.bird.anchor.setTo(-0.2, 0.5);
},

update: function() {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
    if (this.bird.angle < 20)
        this.bird.angle += 1;
    if (this.bird.x < -800 || this.bird.x > 800)
        this.restartGame();

},


jump: function() {
    if (this.bird.alive == false)
    return;

     this.bird.body.velocity.x=10;
     
     //Create an animation on the bird
     var animation = game.add.tween(this.bird);
     
     //Change the angle of the bird to -20° in 100 milliseconds
     animation.to({angle: -20}, 100);

    // And start the animation
    animation.start(); 
    },
    
restartGame: function() {
    game.state.start('main');
    },

addOnePipe: function(x, y){
    var pipe = game.add.sprite(x, y, 'pipe');
    //pipes is the name of the group we called earlier in create().
    //We make a pipe var a line before, then we put the pipe in the pipes group.
    this.pipes.add(pipe);

    //Pipe var also gets arcade physics
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.y=-200;
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill= true;
},

addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1) 
            this.addOnePipe(i * 60 + 10, 400);
            this.score+=1;
            this.labelScore.text=this.score;   
},

hitPipe: function() {
    // If the bird has already hit a pipe, do nothing
    // It means the bird is already falling off the screen
    if (this.bird.alive == false)
        return;

    // Set the alive property of the bird to false
    this.bird.alive = false;

    // Prevent new pipes from appearing
    game.time.events.remove(this.timer);

    // Go through all the pipes, and stop their movement
    this.pipes.forEach(function(p){
        p.body.velocity.y = 0;
    }, this);
},

 render: function() {

    game.debug.cameraInfo(game.camera, 32, 500);
},

};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(800, 800);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');
