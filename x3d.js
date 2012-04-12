/*
 * Copyright (c) 2012, Luc Yriarte
 * All rights reserved.
 * 
 * License: BSD <http://www.opensource.org/licenses/bsd-license.php>
 * 
 */


function x3dNode(object3D) {
	this.object3D = object3D;
	return this;
}


function x3d() {
	this.xmlDoc = null;
	this.scene = null;
	this.defNodes = new Array();
	return this;
}

x3d.prototype.defKey = function(aNode) {
	for (var iatt=0; iatt < aNode.attributes.length; iatt++) {
		if (aNode.attributes.item(iatt).name == "DEF") {
			this.defNodes[aNode.attributes.item(iatt).value] = aNode;
			return aNode.attributes.item(iatt).value;
		}
	}
	return null;
}

x3d.prototype.useKey = function(aNode) {
	for (var iatt=0; iatt < aNode.attributes.length; iatt++) {
		if (aNode.attributes.item(iatt).name == "USE") {
			return this.defNodes[aNode.attributes.item(iatt).value];
		}
	}
	return aNode;
}

x3d.prototype.getObject3D = function(aTransformGroup) {
	var objName = this.defKey(aTransformGroup);
	aTransformGroup = this.useKey(aTransformGroup);
	var obj = null;
	var child = aTransformGroup.firstChild;
	while(child) {
		if (child.tagName == "Shape") {
			if (!obj)
				obj = this.getShape(child);
			else
				obj.addChild(this.getShape(child));
		}
		child = child.nextSibling;
	}
	if (!obj)
		obj = new Object3D();
	var scale = null;
	for (var iatt=0; iatt < aTransformGroup.attributes.length; iatt++) {
		if (aTransformGroup.attributes.item(iatt).name == "translation") {
			obj.setPosition(x3d.getTranslation(aTransformGroup.attributes.item(iatt).value));
		}
		else if (aTransformGroup.attributes.item(iatt).name == "rotation") {
			obj.setOrientation(x3d.getRotation(aTransformGroup.attributes.item(iatt).value));
		}
		else if (aTransformGroup.attributes.item(iatt).name == "scale") {
			scale = x3d.getScale(aTransformGroup.attributes.item(iatt).value);
		}
	}
	child = aTransformGroup.firstChild;
	while(child) {
		if (child.tagName == "Transform" || child.tagName == "Group")
			obj.addChild(this.getObject3D(child));
		child = child.nextSibling;
	}
	if (scale)
		obj.setScale(scale);
	if (objName)
		obj.name = objName;
	return obj;
}


x3d.getColorString = function(fr, fg, fb) {
	var r = (Math.round(255*fr)).toString(16);
	if (r.length < 2) r = "0" + r;
	var g = (Math.round(255*fg)).toString(16);
	if (g.length < 2) g = "0" + g;
	var b = (Math.round(255*fb)).toString(16);
	if (b.length < 2) b = "0" + b;
	return "#" + r + g + b;
}
	
x3d.prototype.getColor = function(aAppearance) {
	this.defKey(aAppearance);
	aAppearance = this.useKey(aAppearance);
	var child = aAppearance.firstChild;
	while(child) {
		if (child.tagName == "Material") {
			for (var iatt=0; iatt < child.attributes.length; iatt++) {
				if (child.attributes.item(iatt).name == "diffuseColor") {
					var rgb = child.attributes.item(iatt).value.match(/\S+/g);
					return x3d.getColorString(parseFloat(rgb[0]),parseFloat(rgb[1]),parseFloat(rgb[2]));
				}
			}
		}
		child = child.nextSibling;
	}
	return color;
}


x3d.prototype.getShape = function(aShape) {
	var objName = this.defKey(aShape);
	aShape = this.useKey(aShape);
	var obj = null;
	var color = null;
	var child = aShape.firstChild;
	while(child) {
		if (child.tagName == "Appearance") {
			color = this.getColor(child);
		}
		else if (child.tagName == "Cone") {
			obj = this.getCone(child);
		}
		else if (child.tagName == "Cylinder") {
			obj = this.getCylinder(child);
		}
		else if (child.tagName == "Sphere") {
			obj = this.getSphere(child);
		}
		else if (child.tagName == "Box") {
			obj = this.getBox(child);
		}
		child = child.nextSibling;
	}
	if (!obj)
		obj = new Object3D();
	if (color)
		obj.color = color;
	if (objName)
		obj.name = objName;
	return obj;
}

x3d.prototype.getCone = function(aNode) {
	var h=1;
	var r=1;
	for (var iatt=0; iatt < aNode.attributes.length; iatt++) {
		if (aNode.attributes.item(iatt).name == "height") {
			h=parseFloat(aNode.attributes.item(iatt).value);
		}
		else if (aNode.attributes.item(iatt).name == "bottomRadius") {
			r=parseFloat(aNode.attributes.item(iatt).value);
		}
	}
	return new PolyCone(6,6,h,r);
}

x3d.prototype.getCylinder = function(aNode) {
	var h=1;
	var r=1;
	for (var iatt=0; iatt < aNode.attributes.length; iatt++) {
		if (aNode.attributes.item(iatt).name == "height") {
			h=parseFloat(aNode.attributes.item(iatt).value);
		}
		else if (aNode.attributes.item(iatt).name == "radius") {
			r=parseFloat(aNode.attributes.item(iatt).value);
		}
	}
	return new PolyCylinder(6,6,h,r);
}

x3d.prototype.getSphere = function(aNode) {
	var r=1;
	for (var iatt=0; iatt < aNode.attributes.length; iatt++) {
		if (aNode.attributes.item(iatt).name == "radius") {
			r=parseFloat(aNode.attributes.item(iatt).value);
		}
	}
	return new PolySphere(6,6,r,1);
}

x3d.prototype.getBox = function(aNode) {
	var x=1;
	var y=1;
	var z=1;
	for (var iatt=0; iatt < aNode.attributes.length; iatt++) {
		if (aNode.attributes.item(iatt).name == "size") {
			var xyz = aNode.attributes.item(iatt).value.match(/\S+/g);
			x=parseFloat(xyz[0]);
			y=parseFloat(xyz[1]);
			z=parseFloat(xyz[2]);
		}
	}
	return new Box(x,y,z,1);
}


x3d.getTranslation = function(tosplit) {
	var xyz = tosplit.match(/\S+/g);
	return x3d.getTranslationMatrix(parseFloat(xyz[0]),parseFloat(xyz[1]),parseFloat(xyz[2]));
}

x3d.getTranslationMatrix = function(x, y, z) {
	var m3d = Matrix3D.translation(x, y, -z);
	return m3d;
}

x3dNode.prototype.translation = function(x, y, z) {
	this.object3D.transformation = this.object3D.transformation.mul(x3d.getTranslationMatrix(x, y, z));
	return this;
}


x3d.getRotation = function(tosplit) {
	var xyza = tosplit.match(/\S+/g);
	var fx = parseFloat(xyza[0]);
	var fy = parseFloat(xyza[1]);
	var fz = parseFloat(xyza[2]);
	var teta = parseFloat(xyza[3]);
	return x3d.getRotationMatrix(fx, fy, fz, teta);
}

x3d.getRotationMatrix = function(fx, fy, fz, teta) {
	var m3d = new Matrix3D();	
	if (fx != 0)
		m3d = m3d.mul(Matrix3D.rotationX(teta * fx));
	if (fy != 0)
		m3d = m3d.mul(Matrix3D.rotationY(teta * fy));
	if (fz != 0)
		m3d = m3d.mul(Matrix3D.rotationZ(teta * -fz));
	return m3d;
}

x3dNode.prototype.rotation = function(fx, fy, fz, teta) {
	this.object3D.transformation = this.object3D.transformation.mul(x3d.getRotationMatrix(fx, fy, fz, teta));
	return this;
}


x3d.getScale = function(tosplit) {
	var xyz = tosplit.match(/\S+/g);
	return x3d.getScaleMatrix(parseFloat(xyz[0]),parseFloat(xyz[1]),parseFloat(xyz[2]));
}

x3d.getScaleMatrix = function(x, y, z) {
	var m3d = Matrix3D.scale(x, y, -z);
	return m3d;
}

x3dNode.prototype.scale = function(x, y, z) {
	this.object3D.transformation = this.object3D.transformation.mul(x3d.getScaleMatrix(x, y, z));
	return this;
}

x3dNode.prototype.color = function(r, g, b) {
	this.object3D.color = x3d.getColorString(r, g, b);
	return this;
}


x3d.prototype.getScene = function(xmlDoc) {
	this.xmlDoc = xmlDoc;
	var jScene = this.xmlDoc.getElementsByTagName("Scene")[0];
	var child = jScene.firstChild;
	while(child) {
		if (child.tagName == "Appearance")
			this.getColor(child);
		child = child.nextSibling;
	}
	this.scene = new x3dNode(this.getObject3D(jScene));
	return this.scene;
}


x3d.prototype.findObjectChildByName = function(defName, rootObj) {
	var obj = null;
	if (rootObj.name && rootObj.name == defName)
		return rootObj;
	for (var i=0; i<rootObj.nChild; i++) {
		obj = this.findObjectChildByName(defName, rootObj.child[i]);
		if (obj)
			return obj;
	}
	return null;
}


x3d.prototype.findObjectByPath = function(defPath) {
	var obj = this.scene.object3D;
	for (var i=0; i<defPath.length; i++) {
		obj = this.findObjectChildByName(defPath[i],obj);
		if (!obj)
			return null;
	}
	return new x3dNode(obj);
}
