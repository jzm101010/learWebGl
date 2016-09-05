//顶点着色器程序
var VSHEADER_SOURCE = 
	'void main() {\n' +
	'  gl_Position = vec4(0.5, 0.5, 0.0, 1.0);\n' +
	'  gl_PointSize = 10.0;\n' +
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

	//设置<canvas>的背景色
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	//清空<canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);

	//绘制一个点
	gl.drawArrays(gl.POINTS, 0, 1);
}