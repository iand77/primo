
// Set up our characters
var characters = new Array();
var c1 = {};
c1.sourceSVG = 'assets/character1_1.svg';
c1.blink = true;
c1.glare = true;
c1.groupName = 'character1';
c1.jumpHeight = 5;
c1.left = 20;
c1.top = 90;
var c2 = {};
c2.sourceSVG = 'assets/character2_1.svg';
c2.blink = true;
c2.glare = false;
c2.groupName = 'character2';
c2.jumpHeight = 5;
c2.left = 215;
c2.top = 10;
var c3 = {};
c3.sourceSVG = 'assets/character3_1.svg';
c3.blink = true;
c3.groupName = 'character3';
c3.jumpHeight = 5;
c3.left = 415;
c3.top = 55;
characters.push(c1);
characters.push(c2);
characters.push(c3);
			
// Create the SVG canvas
var s = new Snap('#svg');
			
// Set the viewbox attribute for responsive scaling
s.attr({viewBox:"0 0 600 350"});
			
var i;
for(i = 0; i < characters.length; i++)
{
				
	var groupName = '#'+characters[i].groupName;
	var sourceSVG = characters[i].sourceSVG;
	Snap.load(sourceSVG, function (svg) {
					
	var c = svg.select('g');
	var spec = characters[c.attr('id').substr(-1,1)-1];
	var interval;
	var hoverover = function() {
		jump(1, 10, 200);
		interval=setInterval(jump, 2000, 2, spec.jumpHeight, 200);
	};
	var hoverout = function() {
		clearInterval(interval)
	}
						
	c.transform('t'+spec.left+','+spec.top);
	function jump(t, h, d) 
	{
		var jumpDistance = spec.top - spec.jumpHeight;
		c.stop().animate({transform: 't'+spec.left+','+jumpDistance}, d, mina.backin, function () {
			c.animate({transform: 't'+spec.left+','+spec.top}, d, mina.backout, function() {
				if (t>1) jump(--t, h, d);
			});				        
		});
	}
					
	if (spec.blink)
	{
		var eyeElem = c.select('#eyes');
						
		// Animate eyes only if they exist and path is correctly labelled with id 'eyes' in SVG
		if (eyeElem !== null) {
							
			var eyeOpenPath = eyeElem.attr('d');
								
			setTimeout(blink, 2000);
			function blink() {
										
				var eyeBlinkPath = c.select('#eyes').attr('d');
									
				// We do a scale transform on the vertical y axis for blink animation
				eyeElem.animate({ transform: 's1,0'}, 300,
						function() {
							eyeElem.animate({transform: 's1,1'}, 300, mina.bounce);
							setTimeout(blink, Math.random() * 7500);
						}
				);		
			}
		}
	}
					
	if (spec.glare)
	{
		var eyeElem = c.select('#eyes');
						
		if (eyeElem !== null) {
							
			var eyeOpenPath = eyeElem.attr('d');
								
			setTimeout(glare, 2000);
			function glare() {
									
				// We do a a horizontal translation on the eyes
				eyeElem.animate({ transform: 't10,0'}, 300,
						function() {
							eyeElem.animate({transform: 't0,0'}, 300, mina.bounce);
							setTimeout(glare, Math.random() * 7500);
						}
				);		
			}
		}
	}
					
	c.hover(hoverover, hoverout);
	c.transform('s0.5,1'+'t'+spec.left+','+spec.top);
	s.append(c);
	c.animate({transform: 's1,1'+'t'+spec.left+','+spec.top}, 300, mina.backout);
					
					
	});
}
/*
Snap.load("assets/logo.svg", onSVGLoaded ) ;
			
function onSVGLoaded( data ){ 
	s.append( data );
}
			
var t = s.text("50%",40,'Welcome to Primo Toys');
t.attr({
	"text-anchor": "middle",
	fill: '#692D55',
	fillOpacity: 1,
	fontSize: '40px',
	alignmentBaseline: "central"
});
*/