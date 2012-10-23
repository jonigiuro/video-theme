var fadeLength = 800;
var wait = 3000;
var pixelSize = 20;
var can = document.getElementById('canvas');
var ctx = can.getContext('2d');
var v = document.getElementById('video');


function draw(v,c,w,h) {
	var red = 0; var green = 0; var blue = 0;
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    var imgd = ctx.getImageData(0, 0, 854, 480);
		var pix=imgd.data;
		//console.log(p,q)
		for (var i = 0, n = pix.length; i < n; i += 4) {
		    red += pix[i];
		    green += pix[i+1];
		    blue += pix[i+2];

		}
		
		red = Math.round(red / 409920);
		green = Math.round(green / 409920);
		blue = Math.round(blue / 409920);

		setTheme(red,green,blue);
		
    setTimeout(draw,500,v,c,w,h);
}

v.addEventListener('play', function(){
	draw(this,ctx,854,480);
}, false);


function setTheme(r,g,b){
	$('body').css('background-color','rgba(' + r + ',' + g + ',' + b + ', .5)');
	$('#video').css('box-shadow','0 0 20px '+ ((r+g+b)/100) +'px rgba(' + r + ',' + g + ' , ' + b +' , 1)');
}
