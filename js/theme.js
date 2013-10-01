var Theme = function() {

	this.fadeLength = 500;
	this.can = null;
	this.ctx = null;
	this.v = document.getElementById('video');
	this.vWidth = $(this.v).width();
	this.vHeight = $(this.v).height();
	this.smallWidth = this.vWidth / 10;
	this.smallHeight = this.vHeight / 10;
	this.totPixels = this.smallWidth * this.smallHeight;
	this.canvasContainer = $('#canvas-container');
	this.targetElement = $('#wrapper');
	this.colorOpacity = .7;

	this.init = function() {
		can = document.createElement('canvas');
		can.id     = "the-canvas";
		can.width  = this.smallWidth;
		can.height = this.smallHeight;

		ctx = can.getContext("2d");
		this.canvasContainer.append(can);
		this.attachEvents();
	}

	this.attachEvents = function() {
		var self = this;
		$('#start-btn').click(function(e){
			e.preventDefault();
			self.initWebcam();
		});

		this.v.addEventListener('play', function(){
			self.collectColorInformation(this)
		}, false);
	}

	this.initWebcam = function() {
		navigator.webkitGetUserMedia({
			"video": true, "audio": true
			}, 
		  function(s){
		    document.querySelector('video').src = 
		    window.webkitURL.createObjectURL(s);
		  }, 
		  function(e){
		  	alert('You blocked access to the webcam');
		  }
		);
	}

	this.collectColorInformation = function(v) {
		var self = this;

		var red = 0;
		    green = 0;
		    blue = 0;

		if(v.paused || v.ended) return false;

		setInterval(function() {
			ctx.drawImage(v,0,0, self.smallWidth, self.smallHeight); 					//copy the current frame on the canvas
			var imgd = ctx.getImageData(0, 0, self.smallWidth, self.smallHeight);
			var pix = imgd.data;
			//console.log(p,q)
			for (var i = 0, n = pix.length; i < n; i += 4) {
			    red += pix[i];
			    green += pix[i+1];
			    blue += pix[i+2];

			}
			
			red = Math.round(red / self.totPixels);
			green = Math.round(green / self.totPixels);
			blue = Math.round(blue / self.totPixels);

			self.setTheme(red,green,blue);
		}, this.fadeLength)

		
	}

	this.setTheme = function(r, g, b) {
		this.targetElement.css('background-color','rgba(' + r + ',' + g + ',' + b + ', ' + this.colorOpacity + ')');
	} 

	this.init();
}

var theme = new Theme();