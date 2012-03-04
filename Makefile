SOURCES = 	matrix.js \
			matrix3D.js \
			vector.js \
			vector3D.js \
			object3D.js \
			mesh.js \
			box.js \
			polyCone.js \
			polyCylinder.js \
			polySphere.js \
			x3d.js

gllimpx.js: $(SOURCES)
	cat $(SOURCES) > gllimpx.js

all: gllimpx.js

clean:
	rm gllimpx.js
