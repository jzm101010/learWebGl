var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'  gl_Position = a_Position;\n' +
	'}\n';

var FSHEADER_SOURCE = 
	'void main() {\n' +
	'  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
	'}\n';

function main() {
	var canvas = document.getElementById('webgl');

	var gl = getWebGLContext(canvas);

	if(!initShaders(gl, VSHADER_SOURCE, FSHEADER_SOURCE)) {
		console.log('shit! Can not find context for WebGL');
		return;
	}

	var n = initVertexBuffers(gl);
	if(n<0) {
		console.log('shit! Failed to set the positions of the vertices');
		return;
	}

	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
	var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
	var n = 3;

	//创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		console.log('Shit! Failed to create the Buffer object');
		return -1;
	}

	//将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	//向缓冲区对象中写入数据
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

	if(a_Position < 0) {
		console.log('shit! Con not get location');
		return
	}

	//将缓冲区对象分配给a_Postion变量
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

	//连接a_Postion变量与分配给它的缓冲区对象
	gl.enableVertexAttribArray(a_Position);

	return n;

}