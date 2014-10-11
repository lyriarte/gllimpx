gllimpx
=======

gllimpx  (Gl-Less IMPlementation of X3d) is a Javascript library that draws a x3d model on the HTML5 canvas.


Example
-------

  * [Live interpreter](http://lyriarte.github.io/gllimpx/) on a 3 axis model.
  * Simple [house model](http://lyriarte.github.io/gllimpx/maison3D.html)

License
-------

  * http://www.opensource.org/licenses/bsd-license.php


Supported tags
--------------

  * DEF / USE
  * Transfom: translation, rotation, scale
  * Viewpoint: position, orientation
  * Appearance.Material.diffuseColor
  * Shape: Sphere, Cylinder, Cone, Box, IndexedFaceSet


API Documentation
-----------------

A gllimpx object draws a wireframe view of a x3d model on a HTML5 canvas. 
The model can be examined by mouse drag on the canvas.
Named elements of the model (with a DEF tag) are accessible from Javascript and can be manipulated by translation, rotation, scale and color.


### gllimpx object

#### attributes

  * x3d : a x3d object holding the DOM tree for the x3d model.
  * model : a x3DNode object, initially at the scene node. 
  * canvas : a HTML5 canvas to draw the model.


#### functions

  * parseX3d(x3dStr) : creates the x3d DOM tree and the model from a x3d string, returns the model.
  * setCanvas(aCanvas)
  * redrawCanvas()
  * onMouseDown(event) : canvas onmousedown handle
  * onMouseUp(event) : canvas onmouseup / onmouseout handle
  * rotateOnMouseMove(event) : canvas onmousemove handle to rotate the model on the x and y axes.
  * translateOnMouseMove(event) : canvas onmousemove handle to translate the model on the x and y axes.
  * zoomOnMouseMove(event) : canvas onmousemove handle to translate the model on the z axis.


### x3d object

#### attributes

  * scene : a x3DNode object
  * circlelines : number of lines to approximate a circle, set to 6 by default.

#### functions

  * getScene(xmlDoc) : returns the x3dNode object corresponding to the Scene node of the document.
  * findObjectByPath(defPath) : returns the x3dNode object addressed by an array of nested nodes DEF names.

### x3dNode object

#### functions

  * rotation(fx, fy, fz, teta) : rotates the object as defined by the rotation attribute of a Transform x3d tag.
  * translation(x, y, z) : translates the object as defined by the translation attribute of a Transform x3d tag.
  * scale(x, y, z) : scales the object as defined by the scale attribute of a Transform x3d tag.
  * color(r, g, b) : changes the object's color as defined by the diffuseColor attribute of a Appearance x3d tag.


