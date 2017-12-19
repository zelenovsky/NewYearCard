export default function snow() {
  var Snow = function () {

    this.canvas = document.getElementById('snow');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.aFlakes = [];

    this.mouse = {
      vx: 0,
      vy: 0,
      px: 0,
      py: 0,
      x: 0,
      y: 0,
      r: guiControls.mouseSize
    }

    this.init();

  }




  Snow.prototype.init = function () {

    this.addFlake();

    this.canvas.addEventListener('mousemove', this.updateMouse.bind(this), false);

  }

  Snow.prototype.addFlake = function () {

    for (var i = this.aFlakes.length; i < guiControls.density; i++) {
      this.aFlakes.push(new Flake(i));
    }

  }

  Snow.prototype.popFlake = function () {

    for (var i = this.aFlakes.length - 1; i >= 0; i--) {

      if (this.aFlakes[i].isOut())
        this.aFlakes.splice(i, 1);

    }

  }

  Snow.prototype.getDist = function (flake) {

    const tx = this.mouse.x - flake.x;
    const ty = this.mouse.y - flake.y;
    return Math.sqrt(tx * tx + ty * ty);

  }


  Snow.prototype.updateMouse = function (e) {

    this.mouse.px = this.mouse.x;
    this.mouse.py = this.mouse.y;

    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    this.mouse.vx = this.mouse.x - this.mouse.px;
    this.mouse.vy = this.mouse.y - this.mouse.py;

    this.makeWind();

  }


  Snow.prototype.makeWind = function () {

    for (var i = this.aFlakes.length - 1; i >= 0; i--) {

      this.aFlakes[i].getWind(this.getDist(this.aFlakes[i]), this.mouse);

    }

  }

  Snow.prototype.update = function () {

    this.mouse.r = guiControls.mouseSize;

    if (this.aFlakes.length < guiControls.density)
      this.addFlake();
    else if (this.aFlakes.length > guiControls.density)
      this.popFlake();

    for (var i = this.aFlakes.length - 1; i >= 0; i--) {

      this.aFlakes[i].update();

    }

  }

  Snow.prototype.draw = function () {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = this.aFlakes.length - 1; i >= 0; i--) {

      this.aFlakes[i].draw(this.ctx);

    }

  }

  Snow.prototype.run = function () {

    this.update();
    this.draw();

    if (this.bRuning) {

      var run = this.run.bind(this);
      requestAnimationFrame(run);

    }

  }

  Snow.prototype.start = function () {

    this.bRuning = true;
    this.run();

  }
  Snow.prototype.stop = function () {

    this.bRuning = false;

  }



  var Flake = function (_i) {

    this.id = _i;
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.w = 0;
    this.c = "rgba(0,0,0,1)";
    this.img = 0;
    this.vx = 0.1;
    this.bInc = true;

    this.init();

  }

  Flake.prototype.init = function () {

    this.x = rand(0, window.innerWidth);
    this.y = rand(-1000, -10);
    this.r = rand(0, 360);
    this.w = rand(5, 10);
    this.vx = rand(-1, 1);
    this.vy = this.w * .05;
    this.vr = rand(-1, 1);
    this.bInc = true;
    this.gravity = 0.005;

    this.img = Math.floor(rand(1, 3));
    this.img = document.getElementById('flake_' + this.img);


  }

  Flake.prototype.update = function () {

    this.r += this.vr;

    if (this.isOut()) {

      this.init();

    } else {

      //update vy
      this.vy += this.gravity;

      //update vx
      if (this.vx > 1)
        this.vx -= .03;
      else if (this.vx < -1)
        this.vx += .03;

      //update vr
      if (this.vr > 5)
        this.vr -= .03;
      else if (this.vr < -5)
        this.vr += .03;

      this.y += this.vy;
      this.x += this.vx;



    }

  }

  Flake.prototype.isOut = function () {

    if ((this.y - this.w * 2) > window.innerHeight || this.x < -100 || this.x > (window.innerWidth + 100))
      return true;
    else
      return false;

  }

  Flake.prototype.getWind = function (dist, mouse) {

    if (dist < mouse.r) {
      var pcDist = 100 - ((dist * 100) / mouse.r);
      this.vx += (((mouse.vx * pcDist) / 100) * (this.w / 15)) * (guiControls.windForce / 100);
      this.vy += ((mouse.vy * pcDist) / 100 * (this.w / 15)) * (guiControls.windForce / 100);
      this.vr += ((mouse.vx * pcDist) / 100 * (this.w / 15)) * (guiControls.windForce / 150);
    }

  }
  Flake.prototype.draw = function (ctx) {

    ctx.save();
    ctx.translate(this.x - (this.w / 2), this.y - (this.w / 2));

    ctx.rotate(this.r * Math.PI / 180);

    ctx.drawImage(
      this.img, 				//Specifies the image, canvas, or video element to use
      0, 						//The x coordinate where to start clipping
      0,			 			//The y coordinate where to start clipping
      25, 				//The width of the clipped image
      25, 				//The height of the clipped image
      0, 						//The x coordinate where to place the image on the canvas
      0, 						//The y coordinate where to place the image on the canvas
      this.w, 				//The width of the image to use (stretch or reduce the image)
      this.w  				//The height of the image to use (stretch or reduce the image)
    );


    ctx.restore();

  }



  const rand = function (min, max) { return Math.random() * (max - min) + min; };
  const onresize = function () { oSnow.canvas.width = window.innerWidth; oSnow.canvas.height = window.innerHeight; };



  /** DAT GUI **/
  var guiControls = new function () {

    this.density = 800;
    this.windForce = 6;
    this.mouseSize = 200;

  }
  var datGUI = new dat.GUI();
  //j'ajoute a mon ui les variable
  datGUI.add(guiControls, 'density', 100, 2000);
  datGUI.add(guiControls, 'windForce', 1, 10);
  datGUI.add(guiControls, 'mouseSize', 100, 500);




  var oSnow;
  const init = function () {

    oSnow = new Snow();
    oSnow.start();

  }


  window.onload = init;
}
