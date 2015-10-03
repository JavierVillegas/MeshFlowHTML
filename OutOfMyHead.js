"use strict";
var ctx;
var canvas;
var gl;
var canvasGL;
var theImages =new Array();
var killImage;
var texCoordsArray = [];
var pointsArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
var numVertices  = 6;
var image1;
var image2;
var texture1, texture2;
var texSize = 64;
var program;
 var vertices = [
        vec2(  -1.0,  1.0 ),
        vec2(  -1.0,  -1.0 ),
        vec2( 1.0,  1.0 ),
        vec2(  1.0, -1.0 )
  ];
var texCoord = [
    vec2(0, 1),
    vec2(0, 0),
    vec2(1, 1),
    vec2(1, 0)
];



window.onload = function(){
    canvas = document.getElementById('textcanvas');
    ctx = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.onload = function() {
        ctx.drawImage(imageObj, 0,0, canvas.width,canvas.height);
    };
    imageObj.src = 'Images/paper.jpg';


    canvasGL = document.getElementById( "gl-canvas" ); 
    gl = WebGLUtils.setupWebGL( canvasGL );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    for (var k = 0; k < alphabet.length; k++ ){
        theImages[k] = new Image(36,60);
        theImages[k].src = "ALPHABET/" + alphabet[k] + ".png";
    }
    killImage = new Image();
    killImage.src = "kill.png";


      
}


function configureTexture( ) {
texture1 = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture1 );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
   // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image1);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

 texture2 = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture2 );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,image2);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);



// var TheTextures =[];
//   for (var ii = 0;ii < 2; ii++) {
//       var texture = gl.createTexture();
//       gl.bindTexture( gl.TEXTURE_2D, texture );
//       gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

//       gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, TheTextuImages[ii]);
//       gl.generateMipmap( gl.TEXTURE_2D );
//       // Set the parameters so we can render any size image.
//       // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//       // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 
//       // gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image );
//       // gl.generateMipmap( gl.TEXTURE_2D );
//       // gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
//       //                   gl.NEAREST_MIPMAP_LINEAR );
//       // gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
//       TheTextures.push(texture);
//     }
    
    
//     gl.activeTexture(gl.TEXTURE0);
//     gl.bindTexture(gl.TEXTURE_2D, TheTextures[0]);
//     gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);

//     gl.activeTexture(gl.TEXTURE1);
//     gl.bindTexture(gl.TEXTURE_2D, TheTextures[1]);
//     gl.uniform1i(gl.getUniformLocation(program, "Calendar"), 1);
}



var render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
       gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    requestAnimFrame(render);
}


function quad(a, b, c, d) {
     pointsArray.push(vertices[a]);
     texCoordsArray.push(texCoord[0]);

     pointsArray.push(vertices[b]);
     texCoordsArray.push(texCoord[1]);

     pointsArray.push(vertices[c]);
     texCoordsArray.push(texCoord[2]);

     pointsArray.push(vertices[c]);
     texCoordsArray.push(texCoord[2]);

     pointsArray.push(vertices[b]);
     texCoordsArray.push(texCoord[1]);

     pointsArray.push(vertices[d]);
     texCoordsArray.push(texCoord[3]);
}




function CreateCalendar(){
ctx.fillStyle ='rgba(0,0,0,0.1)';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "#222222";  // This determines the text colour, it can take a hex value or rgba value (e.g. rgba(255,0,0,0.5))
ctx.textAlign = "center"; // This determines the alignment of text, e.g. left, center, right
ctx.textBaseline = "middle";  // This determines the baseline of the text, e.g. top, middle, bottom
ctx.font = "24px monospace";  // This determines the size of the text and the font family used


     var d = new Date();
     var month_name = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
     var month = d.getMonth(); //0-11
     var year = d.getFullYear(); //2014
     var day = d.getDate(); //day

     

     var first_date = month_name[month] + " " + 1 + " " + year;
    ctx.fillText(month_name[month]  + " " + year, canvas.width/2 , 0.4*canvas.height/7); 
     var tmp = new Date(first_date).toDateString();
     //Mon Sep 01 2014 ...
     var first_day = tmp.substring(0, 3); //Mon
     var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
     var day_no = day_name.indexOf(first_day); //1
     var days = new Date(year, month+1, 0).getDate(); //30

     // calculating number of rows

 //var nr = Math.ceil(days + day_no)/7);
var Nr = Math.ceil((days + day_no)/7);
// Grid

  var qside = 0.9296875*canvas.width/7;
  var lmar = (canvas.width - 7*qside)/2;

var yini = canvas.height/6; 
// horizontal lines 
for (var hl = 0; hl < (Nr+1); hl++) {
    ctx.moveTo(lmar,yini + hl*qside);
    ctx.lineTo(canvas.width-lmar,yini + hl*qside);
}

// vertical lines

for (var vl = 0; vl < 8; vl++) {
    ctx.moveTo(lmar+vl*qside,yini);
    ctx.lineTo(lmar+vl*qside,yini + Nr*qside);
}
ctx.strokeStyle = '#999999';
ctx.stroke();


    ctx.font = "12px monospace"
     // First line
     var TheDay;
     for(var c=0; c<=6; c++){
//       var td = document.createElement('td');
       TheDay = "SMTWTFS"[c];
       ctx.fillText(TheDay, lmar +(2*c+1)*qside/2 , 0.95*canvas.height/7); 

      }


// Numbers
ctx.textAlign = "left"; 
ctx.textBaseline = "top";
 //create 2nd row

     var c;
     for(c=0; c<=6; c++){
      if(c == day_no){
          break;
        }
     }
     var count = 1;
     for(; c<=6; c++){
      ctx.fillText(count,  lmar +c*qside + 0.1*qside, yini+ 0.1*qside);
      count++;
     }   
//  //rest of the date rows
  for(var r=3; r<=(Nr+1); r++){
     for(var c2=0; c2<=6; c2++){
        if(count <= days){
           ctx.fillText(count,  lmar +c2*qside + 0.1*qside, yini+ (r-2)*qside +0.1*qside);
           count++;
         }
       }
     }



// Killer message

 var TheMessage = document.getElementById("thename").value;
// var theImages =new Array();
 var xday = (day_no + day-1)%7;
 var yday = Math.floor((day_no + day-1)/7);

        var cordX = lmar +xday*qside + .2*qside;
        var cordY = yini+yday*qside+.3*qside;
ctx.save(); 
ctx.translate(cordX, cordY);
ctx.translate(killImage.width/2, killImage.height/2);
ctx.rotate(0.5);
ctx.drawImage(killImage,-killImage.width/2, -killImage.height/2,18,15);
//killImage.onload = PlotIma(killImage,-killImage.width/2, -killImage.height/2,18,15);
//ctx.rotate(-0.5);
ctx.restore();


ctx.save();
 ctx.translate(cordX-0.4*qside, cordY-0.05*qside);   
 for (var k = 0; k < TheMessage.length; k++ ){

      var cual = alphabet.indexOf(TheMessage[k]);
      ctx.save();   
      ctx.translate(theImages[cual].width/2, theImages[cual].height/2);
      
        //if (cual!= -1){
      ctx.rotate(0.5 + 0.1*Math.random());
      ctx.translate(k*6.5+Math.random(), 0);
      ctx.drawImage(theImages[cual],-theImages[cual].width/2,-theImages[cual].height/2,12,20);   
     // theImages[cual].onload = PlotIma(theImages[cual],cordX+k*6,cordY+.2*qside,12,20);
     //}
    ctx.restore();
    }
  ctx.restore();
}
//      theImages[k] = new Image();
//      theImages[k].src = "ALPHABET/" + TheMessage[k] + ".png";
// }

// for (var k = 0; k < TheMessage.length; k++ ){
//      var cordX = lmar +xday*qside + qside/2+k*8;
//      var cordY = yini+yday*qside+qside/2;
//       theImages[k].onload = PlotIma(theImages[k],ctx,cordX,cordY);
// }



//    }

function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 

function PlotIma(Img,cordX,cordY,sizeX,sizeY){
      setTimeout(function(){
       ctx.drawImage(Img,cordX,cordY,sizeX,sizeY);
       console.log(Img.src)},1000);
}



function Scene1(){

  CreateCalendar();
  TodoWebGl();

}

function TodoWebGl(){

 gl.viewport( 0, 0, canvasGL.width, canvasGL.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
  var program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );
    // a simple  quad 
    quad( 0, 1, 2, 3 );

var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );

    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );
   image1 = document.getElementById("texImage");
    image2 = document.getElementById("textcanvas");
 
    configureTexture();
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture1 );
    gl.uniform1i(gl.getUniformLocation( program, "texture"), 0);

    gl.activeTexture( gl.TEXTURE1 );
    gl.bindTexture( gl.TEXTURE_2D, texture2 );
    gl.uniform1i(gl.getUniformLocation( program, "Calendar"), 1);

    render();


}