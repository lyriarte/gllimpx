/*
 * Copyright (c) 2010, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */
PolyCone.prototype = new Object3D();
PolyCone.prototype.constructor = Object3D;

function PolyCone(nTotal, n, h, r)
{
	if (n < 3)
		n = 3;
	if (nTotal < n)
		nTotal = n;
	var dh = h / 2;
	var step = 2 * Math.PI / nTotal;
	var v = new Array(n + 1);
	var e = new Array(n * 2);
	var i;
	for (i = 0; i < n * 2; i++)
		e[i] = new Array(2);
	for (i = 0; i < n; i++) {
		// polygon
		v[i] = new Vector3D(r * Math.cos(i * step), -dh, r
				* Math.sin(i * step));
		e[i][0] = i;
		e[i][1] = (i + 1) % n;
		// vertical lines
		e[i + n][0] = n;
		e[i + n][1] = i;
	}
	v[n] = new Vector3D(0, dh, 0);
	this.mesh = new Mesh(n + 1, n * 2, v, e);
	return this;
};

