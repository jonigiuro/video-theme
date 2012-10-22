var fadeLength = 800;
var wait = 3000;
var pixelSize = 20;
can = document.getElementById('canvas');


$(window).resize(function(){
	contW = $('#window').width();
	$('.slide').css('width', contW);
})

function setTheme(r,g,b){
	$('body').css('background-color','rgba(' + r + ',' + g + ',' + b + ', 1)');
	$('.title').css('color','rgba(' + (255 - r) + ',' + (255 - g) + ',' + (255 - b) + ', 1)');
}

function getPixelMedian(slide){
	var ctx = can.getContext('2d');
	imageTag = slide.find('img');
	var image = new Image();
	image.src = imageTag.attr('src');
	image.onload = function() {

    	ctx.drawImage(image,0,0);

		for(var p = 0 ; p < 900; p += pixelSize){
			for(var q = 0; q < 400; q += pixelSize){
				var red = 0; var green = 0; var blue = 0;
				total = 0;
				var imgd = ctx.getImageData(p, q, pixelSize, pixelSize);
				var pix=imgd.data;
				//console.log(p,q)
				for (var i = 0, n = pix.length; i < n; i += 4) {
				    red += pix[i];
				    green += pix[i+1];
				    blue += pix[i+2];
				    total++;
				}
				red = Math.round(red / total);
				green = Math.round(green / total);
				blue = Math.round(blue / total);
			}

		}
		setTheme(red,green,blue);
	};
}

$(window).load(function(){
	$('#loader').remove();
	//hide images
	$('.slide').fadeOut(0)
	curSlide = $('.active');
	var slides = $('.slide');
	for(var i = 0 ; i < slides.length ; i++){
		curS = $(slides[i]);
		if(curS.hasClass('active')){
			//show the first image
			curS.fadeIn(0);
		}
	}
	getPixelMedian($('.active'));
})

function changeSlide(){
	var theSlide = $('.active');
	var nextSlide = theSlide.next();
	if(nextSlide.length == 0){
		nextSlide = $('.slide').first();
	}
	theSlide.removeClass('active').fadeOut(fadeLength);
	nextSlide.addClass('active').fadeIn(fadeLength);
	getPixelMedian(nextSlide);
	//setTheme()
}
setInterval(function(){changeSlide()},wait);
