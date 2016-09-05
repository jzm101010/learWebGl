//顶点着色器程序
var VSHEADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'  gl_Position = a_Position;\n' +
	'  gl_PointSize = 10.0;\n' +
	'}\n';

//片元着色器程序
var FSHEADER_SOURCE = 
	'precision mediump float;\n' +
	'uniform vec4 u_FragColor;\n' +
	'void main() {\n' +
	'  gl_FragColor = u_FragColor;\n' +
	'}\n';

function main() {
	var canvas = document.getElementById('webgl');

	var gl = getWebGLContext(canvas);
	if(!gl) {
		console.log('shit! Can not find context for WebGL');
		return;
	}

	//初始化着色器
	if(!initShaders(gl, VSHEADER_SOURCE, FSHEADER_SOURCE)) {
		console.log('shit! Can not initialize shaders');
		return
	}

	//获取变量的存储位置
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

	if(a_Position < 0) {
		console.log('shit! Can not get location');
		return
	}

	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

	if(!u_FragColor) {
		console.log('shit! Can not get color');
		return
	}

	//将定点位置传输给attribute变量
	gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

	//注册鼠标点击事件响应函数
	canvas.onmousedown = function (ev) {click(ev, gl, canvas, a_Position, u_FragColor);};

	//设置<canvas>的背景色
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	//清空<canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = [];
var g_colors = [];

function click (ev, gl, canvas, a_Position, u_FragColor) {
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

	//将坐标存储到数组中
	g_points.push([x, y]);

	if(x >= 0.0 && y >= 0.0) {
		g_colors.push([1.0, 0.0, 0.0, 1.0]);
	}else if(x <= 0.0 && y >= 0.0) {
		g_colors.push([0.0, 0.0, 1.0, 1.0]);
	}else if(x >= 0.0 && y<= 0.0) {
		g_colors.push([0.0, 1.0, 0.0, 1.0]);
	}else {
		g_colors.push([1.0, 1.0, 1.0, 1.0]);
	}

	gl.clear(gl.COLOR_BUFFER_BIT);

	var len = g_points.length;

	for(var i=0; i<len; i++) {
		gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
		gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3]);
		gl.drawArrays(gl.POINTS, 0, 1);
	}

}






