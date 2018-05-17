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
    this.bird = game.add.sprite(100, 245, 'bird');

    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

    this.pipes = game.add.group();
},

update: function() {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();
},
    
jump: function() {
    this.bird.body.velocity.y=-350;
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
    pipe.body.velocity.x=-200;
    pipe.checkWorldBOunds = true;
    pipe.outOfBoundsKill=
}
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');
