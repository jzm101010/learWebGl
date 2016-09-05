//顶点着色器程序
var VSHEADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'attribute float a_PointSize;\n' +
	'void main() {\n' +
	'  gl_Position = a_Position;\n' +
	'  gl_PointSize = a_PointSize;\n' +
	'}\n';

//片元着色器程序
var FSHEADER_SOURCE = 
	'void main() {\n' +
	'  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
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

	//获取attribute变量的存储位置
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

	if(a_Position < 0) {
		console.log('shit! Con not get location');
		return
	}


	//将定点位置传输给attribute变量
	gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
	gl.vertexAttrib1f(a_PointSize, 5.0);

	//设置<canvas>的背景色
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	//清空<canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);

	//绘制一个点
	gl.drawArrays(gl.POINTS, 0, 1);
}