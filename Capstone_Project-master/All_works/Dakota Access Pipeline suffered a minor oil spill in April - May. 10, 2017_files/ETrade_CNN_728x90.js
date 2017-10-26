(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.laptop_728x90 = function() {
	this.initialize(img.laptop_728x90);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,302,82);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.mc_laptop_728x90 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.laptop_728x90();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_laptop_728x90, new cjs.Rectangle(0,0,302,82), null);


(lib.mc_copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgJAJQgDgDgBgGQABgGADgDQADgDAGAAQAHAAADADQAEADgBAGQABAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape.setTransform(187,26.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgtBQIgKgCIAEgRIAHACIAIABIAFgBIAGgCIAGgFQADgEACgGIAFgNIgvhxIAWAAIAiBdIAkhdIAVAAIg3CFQgFAQgLAGQgKAGgNAAg");
	this.shape_1.setTransform(178.9,24.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAgA4IgCgXQgCAGgEADQgEAFgFADQgKAGgOAAQgJAAgHgCQgHgCgFgEQgLgKAAgPQAAgIADgHQACgHAGgDQAGgGAJgDQAJgDANAAIAdAAQAAgPgHgFQgIgGgOABQgMgBgIAEQgHADgFAGIgLgKQAGgJALgEQALgFAQAAQALAAAJACQAIADAHAEQAGAGAEAJQADAIAAANIAABCgAgWAGQgDADgCAEQgCAEAAAFQAAAJAGAEQAGAGAMAAQAPAAAJgLQAKgKAAgUIgdAAQgPAAgHAGg");
	this.shape_2.setTransform(166.5,22.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAjBQIgBgVIgGAKQgFAEgEACQgGADgGACIgMAAQgXAAgNgOQgFgHgDgLQgDgKAAgNQAAgbAMgPQANgNAYAAQAYgBAMAUIAAhFIAVAAIAACggAgOgMQgHACgDAFQgFAEgCAIQgBAHAAALQgBAUAJAKQAHAKARAAQAHAAAGgCQAGgCAEgGQAFgFADgHQACgIAAgLQAAgLgCgHQgDgGgFgGQgEgEgGgCQgHgDgGAAQgIAAgGADg");
	this.shape_3.setTransform(153.1,19.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgnAqQgHgGgEgLQgDgLAAgOQAAgdAOgNQAHgGAKgEQAKgDAMAAQAcAAANANQANANAAAdQAAAOgDALQgDAKgHAHQgOAOgbAAQgZAAgOgOgAgZgeQgIAIAAAWQAAAWAIAKQAJAIAQABQASgBAIgIQAJgKAAgWQAAgWgJgIQgIgKgSABQgRgBgIAKg");
	this.shape_4.setTransform(140,22.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_5.setTransform(129.5,20.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("Ag6BQIAAigIBzAAIAAASIhfAAIAAA1IBTAAIAAARIhTAAIAAA3IBhAAIAAARg");
	this.shape_6.setTransform(113.7,19.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhABQIAAigIA8AAQARABANAEQAOAFAIAJQARATAAAqQAAAUgEAPQgEAQgJAKQgJAKgNAEQgNAGgRgBgAgrA/IAnAAQAKAAAJgDQAJgDAHgHQAGgIAEgMQAEgNAAgRQgBgRgDgMQgDgMgGgHQgGgHgJgEQgJgDgLAAIgoAAg");
	this.shape_7.setTransform(97.3,19.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAwBQIgLghIhJAAIgLAhIgVAAIA4igIAZAAIA4CggAAfAeIgfhbIgeBbIA9AAg");
	this.shape_8.setTransform(81.4,19.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAmBQIghg9IgsAAIAAA9IgUAAIAAigIA/AAQAbAAANANQAHAGADAJQAEAJAAALQAAAUgJAMQgIALgPAFIAiBAgAgnACIAqAAQAQAAAJgIQAJgHAAgRQAAgIgCgGQgCgGgEgEQgEgEgHgCQgGgCgIAAIgrAAg");
	this.shape_9.setTransform(67.6,19.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgJBQIAAiOIg1AAIAAgSIB9AAIAAASIg1AAIAACOg");
	this.shape_10.setTransform(52.8,19.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAAAPIgOAaIgNgIIAOgaIgdAAIAAgNIAdAAIgOgaIANgIIAOAaIAPgaIANAIIgPAaIAeAAIAAANIgeAAIAPAaIgNAIg");
	this.shape_11.setTransform(41.8,15.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("Ag6BQIAAigIBzAAIAAASIhfAAIAAA1IBTAAIAAARIhTAAIAAA3IBhAAIAAARg");
	this.shape_12.setTransform(30.5,19.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAgBQIAAg/QAAgIgCgGQgCgGgDgEQgHgHgOAAQgHAAgGADQgHACgFAGQgKAJAAAUIAAA2IgUAAIAAigIAUAAIAABKQAGgOAMgFIAMgEIALgBQALgBAIADQAIADAFAFQAKAMAAAUIAABEg");
	this.shape_13.setTransform(198.3,-4.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_14.setTransform(187.1,-4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgJBQIAAhvIATAAIAABvgAgJg4QgEgEAAgGQAAgHAEgDQAEgDAFAAQAGAAAEADQAEADAAAHQAAAGgEAEQgEADgGAAQgFAAgEgDg");
	this.shape_15.setTransform(180.2,-4.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAaA4IgahYIgZBYIgVAAIgkhvIAUAAIAbBYIAahYIAUAAIAaBYIAbhYIATAAIgkBvg");
	this.shape_16.setTransform(168.9,-2.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgSBPQgHgBgGgDQgMgGgHgPIAOgKIAGAKIAIAGQAIAFAMAAQAHAAAHgCQAGgCAFgEQAFgFADgGQADgHAAgJIAAgUQgDAFgEAEQgEAEgFADQgKAFgMAAQgXAAgNgOQgGgIgDgJQgDgLAAgOQAAgNADgKQADgKAGgIQAMgOAYAAIAMABIALAEQAFADAEAEIAGAJIACgVIARAAIAABsQAAAOgEAKQgEAKgHAHQgIAGgKADQgLADgLAAQgIAAgIgCgAgYg3QgEAFgCAHQgCAIAAAKQAAALACAHQACAIAEAEQAIAKAQAAQAGAAAHgCQAGgCAFgFQAEgFADgHQADgIAAgLQAAgLgDgHQgDgIgEgFQgFgEgGgDQgHgCgGAAQgRAAgHAKg");
	this.shape_17.setTransform(148.3,0.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAgA4IAAg+QAAgJgCgHQgCgFgDgEQgHgHgOgBQgHABgGACQgHADgFAFQgKALAAATIAAA2IgUAAIAAhvIARAAIACAYQAEgGAEgFQAFgFAFgCQAGgDAGgCIAMgBQALAAAIADQAIADAFAFQAKALAAAVIAABEg");
	this.shape_18.setTransform(134.8,-2.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgJBQIAAhvIATAAIAABvgAgJg4QgEgEAAgGQAAgHAEgDQAEgDAFAAQAGAAAEADQAEADAAAHQAAAGgEAEQgEADgGAAQgFAAgEgDg");
	this.shape_19.setTransform(124.7,-4.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAjBQIgBgVIgHAKQgEADgFADQgFADgGABIgMABQgXABgNgOQgFgIgEgKQgDgLAAgOQABgaANgPQAMgOAZABQAYgBAMAUIAAhFIATAAIAACggAgPgMQgFACgFAFQgDAEgCAHQgDAIAAAKQABAWAHAJQAJAKAQAAQAHAAAGgDQAGgBAFgGQAFgEACgJQACgHABgLQgBgKgCgIQgCgGgFgFQgFgGgGgBQgGgDgHAAQgIAAgHADg");
	this.shape_20.setTransform(114.4,-4.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAgA4IgCgXQgCAFgEAEQgEAFgFADQgKAGgOAAQgJAAgHgCQgHgCgFgEQgLgKAAgPQAAgIADgHQACgHAGgEQAGgFAJgDQAJgDANAAIAdAAQAAgOgHgGQgIgFgOgBQgMABgIADQgHADgFAGIgLgKQAGgJALgEQALgFAQAAQALAAAJACQAIACAHAFQAGAGAEAJQADAIAAANIAABCgAgWAGQgDADgCAEQgCADAAAGQAAAJAGAEQAGAGAMgBQAPAAAJgKQAKgKAAgTIgdAAQgPgBgHAGg");
	this.shape_21.setTransform(101.1,-2.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgeA5IAAhvIARAAIACAYQAGgOAKgGQALgHAPABIAAATQgVgCgKALQgKALAAAUIAAA2g");
	this.shape_22.setTransform(91.6,-2.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_23.setTransform(82.6,-4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_24.setTransform(69.5,-4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgeA5IAAhvIARAAIACAYQAGgOAKgGQALgHAPABIAAATQgVgCgKALQgKALAAAUIAAA2g");
	this.shape_25.setTransform(62.2,-2.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAgA4IgCgXQgCAFgEAEQgEAFgFADQgKAGgOAAQgJAAgHgCQgHgCgFgEQgLgKAAgPQAAgIADgHQACgHAGgEQAGgFAJgDQAJgDANAAIAdAAQAAgOgHgGQgIgFgOgBQgMABgIADQgHADgFAGIgLgKQAGgJALgEQALgFAQAAQALAAAJACQAIACAHAFQAGAGAEAJQADAIAAANIAABCgAgWAGQgDADgCAEQgCADAAAGQAAAJAGAEQAGAGAMgBQAPAAAJgKQAKgKAAgTIgdAAQgPgBgHAGg");
	this.shape_26.setTransform(50.4,-2.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_27.setTransform(40.3,-4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AghBKQgJgDgGgGQgHgGgFgJIAQgJQAJAMALAGQAFADAGACQAHABAIAAQAKAAAIgCQAHgBAFgEQAJgHAAgNQAAgGgCgEQgBgFgEgDQgEgDgHgDIgQgEIgOgEQgXgGgMgKQgMgLAAgSQAAgSAOgLQAOgMAbAAQALAAAJACQAJACAGAEQAHAEAFAFQAFAGAEAHIgQAJQgHgLgJgGIgLgEQgGgCgHAAQgKAAgGACQgIACgDAEQgFADgCAEQgCAFABAFIABAJQACAEADAEQADAEAHADQAFADAJACIAOADQAaAGAMAJQANALAAASQAAALgEAIQgEAIgHAGQgJAFgKADQgLADgOAAQgTAAgQgHg");
	this.shape_28.setTransform(29,-4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_copy3, new cjs.Rectangle(20,-21,352,56.1), null);


(lib.mc_copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgJAKQgDgEAAgGQAAgGADgDQADgDAGAAQAGAAAEADQADADABAGQgBAGgDAEQgEADgGAAQgGAAgDgDg");
	this.shape.setTransform(107.9,24.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_1.setTransform(101.5,18.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgJBQIAAhvIATAAIAABvgAgJg4QgEgEAAgGQAAgHAEgDQAEgDAFAAQAGAAAEADQAEADAAAHQAAAGgEAEQgEADgGAAQgFAAgEgDg");
	this.shape_2.setTransform(94.7,17.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAgA4IAAg/QAAgIgCgGQgCgHgDgDQgHgIgOABQgHAAgGACQgHADgFAFQgKALAAASIAAA3IgUAAIAAhvIARAAIACAYQAEgGAEgFQAFgFAFgDQAGgCAGgCIAMgBQALAAAIACQAIADAFAGQAKALAAAWIAABDg");
	this.shape_3.setTransform(79.8,20.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgnArQgHgHgEgKQgDgMAAgOQAAgcAOgOQAHgHAKgDQAKgDAMAAQAcAAANANQANANAAAdQAAAOgDALQgDAKgHAIQgOANgbAAQgZAAgOgNgAgZgeQgIAIAAAWQAAAWAIAKQAJAIAQABQASgBAIgIQAJgKAAgWQAAgWgJgIQgIgJgSAAQgRAAgIAJg");
	this.shape_4.setTransform(66.1,20.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_5.setTransform(50.7,18.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgkArQgGgHgEgKQgDgLAAgPQAAgOADgLQAEgKAGgHQAIgHAJgDQALgDALAAQARAAAMAGQAKAGAIANIgPAIQgFgIgHgFQgJgFgLABQgIAAgGACQgGACgEAFQgFAEgBAIQgCAIAAAKQAAALACAIQACAIAEAFQAIAIAQABQAMAAAIgFQAIgEAEgKIAQAHQgHAPgMAGQgGADgIABQgGACgJAAQgZAAgOgNg");
	this.shape_6.setTransform(41.1,20.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAgA4IgCgXQgCAFgEAFQgEAEgFADQgKAGgOAAQgJAAgHgCQgHgCgFgFQgLgIAAgQQAAgIADgHQACgGAGgEQAGgGAJgDQAJgDANAAIAdAAQAAgPgHgFQgIgGgOABQgMAAgIADQgHAEgFAFIgLgJQAGgKALgFQALgEAQAAQALAAAJACQAIADAHAFQAGAFAEAIQADAJAAANIAABCgAgWAGQgDACgCAEQgCAFAAAFQAAAJAGAFQAGAEAMABQAPAAAJgLQAKgKAAgUIgdAAQgPABgHAFg");
	this.shape_7.setTransform(28.3,20.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAiA4IgBgWQgHAMgLAFIgLAEIgLABQgLAAgJgDQgIgCgFgHQgFgFgDgJQgCgJAAgKIAAhCIATAAIAAA+QAAARAHAIQAHAIAOAAQAQAAAJgKQAJgKABgUIAAg3IATAAIAABvg");
	this.shape_8.setTransform(158.4,-2.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgnAqQgHgGgEgLQgDgKAAgPQAAgdAOgNQAHgHAKgDQAKgDAMAAQAcAAANANQANANAAAdQAAAOgDALQgDALgHAGQgOAOgbAAQgZAAgOgOgAgZgfQgIAJAAAWQAAAWAIAJQAJAKAQgBQASABAIgKQAJgJAAgWQAAgWgJgJQgIgJgSAAQgRAAgIAJg");
	this.shape_9.setTransform(144.9,-2.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AguBQIgJgCIAEgRIAHACIAHABIAGgBIAGgCIAGgFQADgEACgGIAFgNIgvhxIAWAAIAiBdIAkhdIAVAAIg3CFQgFAQgLAGQgKAGgNAAg");
	this.shape_10.setTransform(132.9,0.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("Ag0BOIAAiaIARAAIACAWQAFgMALgFQAKgGANABQAXgBAMAOQAGAIADAKQADALAAANQAAAOgDAKQgDAKgHAHQgMAOgZAAQgLABgJgFQgKgEgGgKIAAA+gAgMg6QgGABgFAGQgEAFgDAHQgDAIAAAKQAAAVAKAJQAKAKANAAQAJAAAGgDQAGgCAEgFQAJgJAAgVQAAgKgDgIQgCgIgEgEQgEgFgGgCQgGgDgIAAQgGAAgHADg");
	this.shape_11.setTransform(115.9,-0.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgJBQIAAigIATAAIAACgg");
	this.shape_12.setTransform(105.7,-4.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgkAqQgHgGgDgLQgEgLAAgOQAAgMAEgLQADgKAHgIQANgOAaAAQAMAAAJAEQAJADAGAHQAGAHADAJQADAJAAALIgBAEIAAAFIhQAAQABATAJAJQAEAEAGADQAGABAHAAQAMABAIgEQAHgFAGgLIAOAIQgDAHgFAFQgFAGgGADQgMAGgRAAQgYAAgOgOgAAfgLQAAgHgCgGQgCgGgEgDQgEgDgFgCQgGgBgGgBQgOABgIAGQgEADgDAGQgCAGgBAHIA9AAIAAAAg");
	this.shape_13.setTransform(96.7,-2.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAgBQIAAg/QAAgIgCgGQgCgGgDgEQgHgHgOAAQgHAAgGADQgHACgFAGQgKAJAAAUIAAA2IgUAAIAAigIAUAAIAABKQAGgOAMgFIAMgEIALgBQALgBAIADQAIADAFAFQAKAMAAAUIAABEg");
	this.shape_14.setTransform(83.6,-4.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgJBQIAAigIATAAIAACgg");
	this.shape_15.setTransform(68.6,-4.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgJBQIAAigIATAAIAACgg");
	this.shape_16.setTransform(62.7,-4.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgNASQAHgCAEgFQADgFABgHQgFABgEgDQgGgDAAgHQABgHADgDQADgDAGgBQAGABAEAEQAEAFgBAKIgBALQgBAGgDAFQgFAKgLACg");
	this.shape_17.setTransform(57.4,-10.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgkAqQgHgGgDgLQgEgLAAgOQAAgMAEgLQADgKAHgIQANgOAaAAQAMAAAJAEQAJADAGAHQAGAHADAJQADAJAAALIgBAEIAAAFIhQAAQABATAJAJQAEAEAGADQAGABAHAAQAMABAIgEQAHgFAGgLIAOAIQgDAHgFAFQgFAGgGADQgMAGgRAAQgYAAgOgOgAAfgLQAAgHgCgGQgCgGgEgDQgEgDgFgCQgGgBgGgBQgOABgIAGQgEADgDAGQgCAGgBAHIA9AAIAAAAg");
	this.shape_18.setTransform(48.9,-2.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAkBQIgkiCIgjCCIgUAAIgvigIAVAAIAkCEIAkiEIATAAIAlCDIAkiDIAUAAIgvCgg");
	this.shape_19.setTransform(32.5,-4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_copy2, new cjs.Rectangle(20,-21,292,54.1), null);


(lib.mc_copy1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgJAKQgEgEABgGQgBgGAEgDQADgDAGAAQAHAAADADQADADABAGQgBAGgDAEQgDADgHAAQgGAAgDgDg");
	this.shape.setTransform(131.2,24.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgkArQgHgHgDgLQgEgKAAgPQAAgMAEgMQADgJAHgIQANgOAaAAQAMAAAJADQAJAEAGAHQAGAGADAJQADAKAAAKIgBAGIAAADIhQAAQABAUAJAJQAEAEAGACQAGACAHABQAMgBAIgEQAHgDAGgMIAOAHQgDAIgFAFQgFAGgGADQgMAGgRAAQgYAAgOgNgAAfgLQAAgHgCgGQgCgGgEgDQgEgDgFgCQgGgBgGAAQgOgBgIAHQgEADgDAGQgCAGgBAHIA9AAIAAAAg");
	this.shape_1.setTransform(122.7,20.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgeA5IAAhvIARAAIACAYQAGgOAKgGQALgHAPABIAAATQgVgCgKALQgKALAAAUIAAA2g");
	this.shape_2.setTransform(113.1,20.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgkArQgHgHgDgLQgEgKAAgPQAAgMAEgMQADgJAHgIQANgOAaAAQAMAAAJADQAJAEAGAHQAGAGADAJQADAKAAAKIgBAGIAAADIhQAAQABAUAJAJQAEAEAGACQAGACAHABQAMgBAIgEQAHgDAGgMIAOAHQgDAIgFAFQgFAGgGADQgMAGgRAAQgYAAgOgNgAAfgLQAAgHgCgGQgCgGgEgDQgEgDgFgCQgGgBgGAAQgOgBgIAHQgEADgDAGQgCAGgBAHIA9AAIAAAAg");
	this.shape_3.setTransform(102,20.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAgBRIAAg/QAAgJgCgHQgCgFgDgDQgHgIgOAAQgHAAgGACQgHAEgFAEQgKALAAATIAAA3IgUAAIAAigIAUAAIAABJQAGgNAMgGIAMgFIALgBQALAAAIADQAIADAFAGQAKAKAAAVIAABFg");
	this.shape_4.setTransform(88.8,17.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgaA0QgGgDgFgEQgFgFgEgGIAPgJQAFAJAJADQAIAEALAAQAOAAAGgFQAGgEAAgHQAAgIgFgDQgFgDgMgDIgJgCQgVgEgIgHQgIgJAAgLQAAgGACgFQADgHAFgDQAGgFAHgCQAJgCAKAAQAOAAAKAEQAJAFAHAJIgMALQgGgGgHgEQgGgDgLAAQgKAAgGADQgGAEABAHQAAAFADAFQAFAEAMADIALACQALACAHAEQAHABAEAFQAEAEACAEQABAEAAAGQAAAGgCAGQgCAGgFAEQgFAFgJACQgIADgOAAQgPAAgMgEg");
	this.shape_5.setTransform(70.5,20.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAaA4IgahYIgZBYIgVAAIgkhvIAUAAIAbBZIAahZIAUAAIAaBZIAbhZIATAAIgkBvg");
	this.shape_6.setTransform(56.8,20.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgkArQgHgHgDgLQgEgKAAgPQAAgMAEgMQADgJAHgIQANgOAaAAQAMAAAJADQAJAEAGAHQAGAGADAJQADAKAAAKIgBAGIAAADIhQAAQABAUAJAJQAEAEAGACQAGACAHABQAMgBAIgEQAHgDAGgMIAOAHQgDAIgFAFQgFAGgGADQgMAGgRAAQgYAAgOgNgAAfgLQAAgHgCgGQgCgGgEgDQgEgDgFgCQgGgBgGAAQgOgBgIAHQgEADgDAGQgCAGgBAHIA9AAIAAAAg");
	this.shape_7.setTransform(42.5,20.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAgA4IAAg/QAAgIgCgGQgCgHgDgDQgHgIgOABQgHAAgGACQgHADgFAFQgKALAAASIAAA3IgUAAIAAhvIARAAIACAYQAEgGAEgFQAFgFAFgDQAGgCAGgCIAMgBQALAAAIACQAIADAFAGQAKALAAAWIAABDg");
	this.shape_8.setTransform(29.3,20.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgJBQIAAigIATAAIAACgg");
	this.shape_9.setTransform(247.9,-4.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AAgA4IgCgXQgCAFgEAEQgEAFgFADQgKAGgOAAQgJAAgHgCQgHgCgFgEQgLgKAAgPQAAgIADgHQACgHAGgEQAGgFAJgDQAJgDANAAIAdAAQAAgOgHgGQgIgFgOgBQgMABgIADQgHADgFAGIgLgKQAGgJALgEQALgFAQAAQALAAAJACQAIACAHAFQAGAGAEAJQADAIAAANIAABCgAgWAGQgDADgCAEQgCADAAAGQAAAJAGAEQAGAGAMgBQAPAAAJgKQAKgKAAgTIgdAAQgPgBgHAGg");
	this.shape_10.setTransform(238.1,-2.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgJBQIAAhvIATAAIAABvgAgJg4QgEgEAAgGQAAgHAEgDQAEgDAFAAQAGAAAEADQAEADAAAHQAAAGgEAEQgEADgGAAQgFAAgEgDg");
	this.shape_11.setTransform(229,-4.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgkArQgGgHgEgLQgEgKABgPQgBgOAEgKQAEgLAGgHQAHgHAKgDQALgDALAAQARAAAMAGQAKAHAIALIgPAJQgFgIgHgFQgJgEgLgBQgIAAgGACQgGADgEAEQgFAFgCAIQgBAHAAALQAAAMABAHQACAIAFAEQAIAKAQgBQAMAAAIgEQAIgEAEgKIAQAHQgHAOgMAHQgGADgIACQgGABgJAAQgZAAgOgNg");
	this.shape_12.setTransform(220.3,-2.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAgA4IAAg+QAAgJgCgHQgCgFgDgEQgHgHgOgBQgHABgGACQgHADgFAFQgKALAAATIAAA2IgUAAIAAhvIARAAIACAYQAEgGAEgFQAFgFAFgCQAGgDAGgCIAMgBQALAAAIADQAIADAFAFQAKALAAAVIAABEg");
	this.shape_13.setTransform(207.1,-2.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAgA4IgCgXQgCAFgEAEQgEAFgFADQgKAGgOAAQgJAAgHgCQgHgCgFgEQgLgKAAgPQAAgIADgHQACgHAGgEQAGgFAJgDQAJgDANAAIAdAAQAAgOgHgGQgIgFgOgBQgMABgIADQgHADgFAGIgLgKQAGgJALgEQALgFAQAAQALAAAJACQAIACAHAFQAGAGAEAJQADAIAAANIAABCgAgWAGQgDADgCAEQgCADAAAGQAAAJAGAEQAGAGAMgBQAPAAAJgKQAKgKAAgTIgdAAQgPgBgHAGg");
	this.shape_14.setTransform(193.2,-2.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAgA4IAAg+QAAgJgCgHQgCgFgDgEQgHgHgOgBQgHABgGACQgHADgFAFQgKALAAATIAAA2IgUAAIAAhvIARAAIACAYQAEgGAEgFQAFgFAFgCQAGgDAGgCIAMgBQALAAAIADQAIADAFAFQAKALAAAVIAABEg");
	this.shape_15.setTransform(180.1,-2.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgJBQIAAhvIATAAIAABvgAgJg4QgEgEAAgGQAAgHAEgDQAEgDAFAAQAGAAAEADQAEADAAAHQAAAGgEAEQgEADgGAAQgFAAgEgDg");
	this.shape_16.setTransform(170,-4.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgQBRIAAhgIgUAAIAAgPIAUAAIAAgNQAAgTAKgJQAJgJAQAAIAKABIAIADIgDAQIgGgCIgHAAQgJAAgEAEQgFAEAAANIAAALIAgAAIAAAPIggAAIAABgg");
	this.shape_17.setTransform(163.3,-4.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgeA5IAAhvIARAAIACAYQAGgOAKgGQALgHAPABIAAATQgVgCgKALQgKALAAAUIAAA2g");
	this.shape_18.setTransform(150.7,-2.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAiA4IgBgWQgHAMgLAFIgLAEIgLABQgLAAgJgDQgIgCgFgHQgFgFgDgJQgCgJAAgKIAAhCIATAAIAAA+QAAARAHAIQAHAIAOAAQAQAAAJgKQAJgKABgUIAAg3IATAAIAABvg");
	this.shape_19.setTransform(138.5,-2.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgnAqQgHgGgEgLQgDgKAAgPQAAgdAOgNQAHgHAKgDQAKgDAMAAQAcAAANANQANANAAAdQAAAOgDALQgDALgHAGQgOAOgbAAQgZAAgOgOgAgZgfQgIAJAAAWQAAAWAIAJQAJAKAQgBQASABAIgKQAJgJAAgWQAAgWgJgJQgIgJgSAAQgRAAgIAJg");
	this.shape_20.setTransform(125,-2.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgtBQIgKgCIADgRIAIACIAIABIAFgBIAGgCIAGgFQADgEACgGIAFgNIguhxIAVAAIAiBdIAkhdIAUAAIg2CFQgGAQgKAGQgKAGgNAAg");
	this.shape_21.setTransform(112.8,0.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgHBBQgKgJAAgVIAAg5IgTAAIAAgPIATAAIAAgkIATAAIAAAkIAgAAIAAAPIggAAIAAA4QAAAHABAFQACAEACADQADACADABIAIABIAHgBIAGgBIADAQIgKACIgJABQgQAAgJgJg");
	this.shape_22.setTransform(98.1,-4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgkAqQgHgGgDgLQgEgLAAgOQAAgMAEgLQADgKAHgIQANgOAaAAQAMAAAJAEQAJADAGAHQAGAHADAJQADAJAAALIgBAEIAAAFIhQAAQABATAJAJQAEAEAGADQAGABAHAAQAMABAIgEQAHgFAGgLIAOAIQgDAHgFAFQgFAGgGADQgMAGgRAAQgYAAgOgOgAAfgLQAAgHgCgGQgCgGgEgDQgEgDgFgCQgGgBgGgBQgOABgIAGQgEADgDAGQgCAGgBAHIA9AAIAAAAg");
	this.shape_23.setTransform(88.1,-2.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgSBPQgHgBgGgDQgMgGgHgPIAOgKIAGAKIAIAGQAIAFAMAAQAHAAAHgCQAGgCAFgEQAFgFADgGQADgHAAgJIAAgUQgDAFgEAEQgEAEgFADQgKAFgMAAQgXAAgNgOQgGgIgDgJQgDgLAAgOQAAgNADgKQADgKAGgIQAMgOAYAAIAMABIALAEQAFADAEAEIAGAJIACgVIARAAIAABsQAAAOgEAKQgEAKgHAHQgIAGgKADQgLADgLAAQgIAAgIgCgAgYg3QgEAFgCAHQgCAIAAAKQAAALACAHQACAIAEAEQAIAKAQAAQAGAAAHgCQAGgCAFgFQAEgFADgHQADgIAAgLQAAgLgDgHQgDgIgEgFQgFgEgGgDQgHgCgGAAQgRAAgHAKg");
	this.shape_24.setTransform(74.6,0.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAiA4IgBgWQgHAMgLAFIgLAEIgLABQgLAAgJgDQgIgCgFgHQgFgFgDgJQgCgJAAgKIAAhCIATAAIAAA+QAAARAHAIQAHAIAOAAQAQAAAJgKQAJgKABgUIAAg3IATAAIAABvg");
	this.shape_25.setTransform(56,-2.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgnAqQgHgGgEgLQgDgKAAgPQAAgdAOgNQAHgHAKgDQAKgDAMAAQAcAAANANQANANAAAdQAAAOgDALQgDALgHAGQgOAOgbAAQgZAAgOgOgAgZgfQgIAJAAAWQAAAWAIAJQAJAKAQgBQASABAIgKQAJgJAAgWQAAgWgJgJQgIgJgSAAQgRAAgIAJg");
	this.shape_26.setTransform(42.4,-2.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgJBQIAAhAIg6hgIAXAAIAtBQIAuhQIAVAAIg5BgIAABAg");
	this.shape_27.setTransform(29,-4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.mc_copy1, new cjs.Rectangle(20,-21,265,54.1), null);


(lib.logoswf = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#010101").s().p("Ah8B0IAAjnID1AAIAAApIi9AAIAAAzICBAAIAAApIiBAAIAAA2IDBAAIAAAsg");
	this.shape.setTransform(12.5,14.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#010101").s().p("AAFAMIgEgHQgBgDgDAAIgCAAIAAAKIgEAAIAAgXIAJAAQAFAAACACQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQgBAFgGAAIADADIAFAIgAgFgBIAFAAQAEABABgEQgBgEgEAAIgFAAg");
	this.shape_1.setTransform(213.8,5.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#010101").s().p("AgPAQQgHgGAAgKQABgJAGgGQAGgHAJAAQAKABAGAGQAGAGABAJQgBAKgGAGQgGAGgKABQgJgBgGgGgAgMgMQgGAFAAAHQAAAIAGAFQAFAGAHAAQAIAAAFgGQAGgFAAgIQAAgHgGgFQgFgGgIAAQgHAAgFAGg");
	this.shape_2.setTransform(213.7,5.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#010101").s().p("Ah8B0IAAjnID0AAIAAApIi8AAIAAAzICCAAIAAApIiCAAIAAA2IDBAAIAAAsg");
	this.shape_3.setTransform(197,14.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#010101").s().p("AiPB0IAAjnICUAAQBEAAAjAdQAkAdAAA5QAAAigPAYQgOAXgZAQQgSALgZAEQgYAEggAAgAhWBGIBFAAQAiAAAYgFQAYgFAMgQQALgQAAgdQAAglgWgRQgUgRgoABIhcAAg");
	this.shape_4.setTransform(166.1,14.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#010101").s().p("ABmB0IgdguIiZAAIgcAuIg4AAICIjnIA3AAICKDngAAxAaIgzhdIg2BdIBpAAg");
	this.shape_5.setTransform(133.3,14.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#010101").s().p("ABOB0Ig5hSIhoAAIAABSIg4AAIAAjnIC7AAQAnAAAYAVQAWAUABAjQAAA2g1APIA7BWgAhTgKIB9AAQASAAAJgIQAKgIAAgPQAAgNgKgIQgKgIgSgBIh8AAg");
	this.shape_6.setTransform(101.1,14.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#010101").s().p("AgcB0IAAi7IhvAAIAAgsIEWAAIAAAsIhvAAIAAC7g");
	this.shape_7.setTransform(69.4,14.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#634EA0").s().p("AgsB0IAwhVIhhAAIAAg9IBhAAIgwhVIA1ggIBVCTIhVCUg");
	this.shape_8.setTransform(34.8,14.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#99CA3C").s().p("AhdAAIBViTIA1AgIgwBVIBhAAIAAA9IhhAAIAwBVIg1Agg");
	this.shape_9.setTransform(46.4,14.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,216,29.5);


(lib.Purplepointedline = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6633CC").s().p("A82CqIhkioIBkirMA7RAAAIAAFTg");
	this.shape.setTransform(194.7,17);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Purplepointedline, new cjs.Rectangle(0,0,389.4,34), null);


(lib.Purplearrowangle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6633CC").s().p("AnPCqIAAlTIOfAAIgCFTg");
	this.shape.setTransform(-46.3,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Purplearrowangle, new cjs.Rectangle(-92.7,-17,92.7,34.1), null);


(lib.Greenpointedline = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99CC00").s().p("ARpCqI3IAAI4FAAIhkioIBkirIYFAAIXIAAINgAAIAAFTg");
	this.shape.setTransform(199.3,17);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Greenpointedline, new cjs.Rectangle(0,0,398.7,34), null);


(lib.Greenarrowangle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99CC00").s().p("AnPCqIAAlTIOfAAIgCFTg");
	this.shape.setTransform(-46.3,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Greenarrowangle, new cjs.Rectangle(-92.7,-17,92.7,34.1), null);


(lib.ctatext = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{signup:0,learn:1,open:2,fund:3});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_1 = function() {
		this.stop();
	}
	this.frame_2 = function() {
		this.stop();
	}
	this.frame_3 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1));

	// copy
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AghAqIAAhTIAmAAQAHAAAGACQAGACAEAEQAGAIAAANQAAAIgCAFQgCAFgDAEQgJAHgPAAIgRAAIAAAZgAgOACIAQAAIAFgBIAFgCIACgEIABgHQAAgFgDgEIgEgCIgGgBIgQAAg");
	this.shape.setTransform(22.2,0.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgPAoQgHgCgEgFQgFgDgDgHQgCgHAAgJIAAgwIAUAAIAAAwQAAAKAEAFIAGADIAGABQAIAAAFgEQACgCABgEQACgDAAgGIAAgwIATAAIAAAwQAAAJgCAHQgDAGgFAFQgEAEgHACIgQACQgIAAgHgCg");
	this.shape_1.setTransform(13,0.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAUAqIgmg1IABA1IgTAAIAAhTIAPAAIAoA3IAAg3IATAAIAABTg");
	this.shape_2.setTransform(0.8,0.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAYAqIgBgLIgEAEIgGAEQgGADgHAAQgRAAgKgLQgFgEgDgIQgCgIAAgLQAAgVAKgKQAFgFAIgDQAHgCAKAAIALABIAJADQAIAFAEAJIgPAHQgDgFgEgCQgEgCgHAAQgEAAgEACQgEABgCACQgDADgBAFQgCAFAAAHQAAAIACAFQABAFADADQADADAEABQADABAFAAIAGgBQADAAACgCIAEgFIACgIIgRAAIAAgOIAjAAIAAAug");
	this.shape_3.setTransform(-8.6,0.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAqIAAhTIATAAIAABTg");
	this.shape_4.setTransform(-15.2,0.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgJApIgJgCQgFgCgDgDQgEgDgDgFIANgJQADAFAGADQAEADAHAAQAHAAAEgDIADgCIABgEQAAgEgDgDQgCgCgIgCIgGgCQgHgBgFgCQgFgDgDgDQgEgCAAgFQgCgDAAgEQAAgFACgFQACgEAEgDQAEgEAGgCQAFgBAHAAQAMAAAHADQAIAEAFAJIgNAJQgDgFgFgCIgEgCIgGgCIgGACIgEACQgDACAAAEQAAADADADQADADAGABIAIACQANADAHAFQAGAGAAAIQAAAHgCAEQgCAEgFAEQgEADgGACQgHABgIAAIgJgBg");
	this.shape_5.setTransform(-21.2,0.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AggAqIAAhTIA/AAIAAAQIgsAAIAAASIAmAAIAAAPIgmAAIAAATIAuAAIAAAPg");
	this.shape_6.setTransform(37.9,0.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAOAqIgNgcIgQAAIAAAcIgTAAIAAhTIAoAAQAHAAAFACQAGACADADQAHAIAAAMQAAAKgDAFIgFAGIgGAEIAPAfgAgPAAIARAAQAGAAADgEQAEgDAAgGQAAgFgDgEQgDgDgGAAIgSAAg");
	this.shape_7.setTransform(29.6,0.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgeAfQgKgJAAgWQAAgKADgIQACgHAFgGQAKgKAUAAQALAAAHACQAIADAFAFQAKALAAAUQAAAWgKAKQgFAFgIACQgIADgKAAQgUAAgKgLgAgIgYQgEABgDAEQgCADgCAEQgBAGAAAGQAAAIABAEQACAGACACQADADAEACIAIABIAJgBQAEgCACgDQADgCABgGQACgEAAgIQAAgGgCgGQgBgEgDgDQgCgEgEgBQgEgBgFAAQgEAAgEABg");
	this.shape_8.setTransform(20.2,0.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAeAqIAAg1IgYA1IgMAAIgYg0IABA0IgSAAIAAhTIAVAAIAaA9IAbg9IAVAAIAABTg");
	this.shape_9.setTransform(9.6,0.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAUAqIgmg0IABA0IgUAAIAAhTIAQAAIAoA3IAAg3IATAAIAABTg");
	this.shape_10.setTransform(-3.9,0.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAOAqIgNgcIgQAAIAAAcIgTAAIAAhTIAoAAQAHAAAFACQAGACADADQAHAIAAAMQAAAKgDAFIgFAGIgGAEIAPAfgAgPAAIARAAQAGAAADgEQAEgDAAgGQAAgFgDgEQgDgDgGAAIgSAAg");
	this.shape_11.setTransform(-12.7,0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAUAqIgEgNIggAAIgEANIgTAAIAchTIAXAAIAcBTgAALAOIgLgkIgLAkIAWAAg");
	this.shape_12.setTransform(-21.5,0.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AggAqIAAhTIBAAAIAAAQIgsAAIAAASIAlAAIAAAPIglAAIAAATIAtAAIAAAPg");
	this.shape_13.setTransform(-29.5,0.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgfAqIAAhTIAUAAIAABDIArAAIAAAQg");
	this.shape_14.setTransform(-37.4,0.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgIAqIAAhDIgaAAIAAgQIBGAAIAAAQIgaAAIAABDg");
	this.shape_15.setTransform(56.5,0.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAUAqIgmg0IAAA0IgTAAIAAhTIAQAAIAoA3IgBg3IATAAIAABTg");
	this.shape_16.setTransform(48,0.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgPAoQgHgCgEgEQgFgFgDgHQgCgGAAgJIAAgwIAUAAIAAAxQAAAJAEAEIAGAEIAGABQAIAAAFgFQACgCABgDQACgDAAgFIAAgxIATAAIAAAwQAAAJgCAHQgDAGgFAFQgEAEgHACIgQACQgIAAgHgCg");
	this.shape_17.setTransform(38.5,0.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgOAnQgIgCgFgFQgKgKABgWQgBgVAKgKQAFgFAIgDQAIgCAJAAQANAAAIAFQAJADADALIgPAHQgDgFgEgDQgEgCgHAAQgEAAgEABQgDABgDAEQgDADgCAEQgBAGAAAGQAAAHABAGQACAFADADQACADAEABQAEABAEABQAHgBAFgCQAEgCADgGIAPAGQgCAGgDADQgDADgEADQgJAFgOAAQgIAAgIgDg");
	this.shape_18.setTransform(20.3,0.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgOAnQgIgCgEgFQgLgKAAgWQAAgVALgKQAEgFAIgDQAIgCAJAAQANAAAIAFQAIADAFALIgQAHQgDgFgEgDQgEgCgHAAQgEAAgEABQgEABgDAEQgCADgBAEQgCAGAAAGQAAAHACAGQABAFACADQADADAEABQAEABAEABQAHgBAEgCQAFgCADgGIAQAGQgCAGgEADQgDADgFADQgIAFgNAAQgKAAgHgDg");
	this.shape_19.setTransform(11.8,0.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAUAqIgmg0IAAA0IgSAAIAAhTIAPAAIAoA3IgBg3IATAAIAABTg");
	this.shape_20.setTransform(-8.5,0.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAUAqIgEgNIggAAIgEANIgTAAIAchTIAXAAIAcBTgAALAOIgLgkIgLAkIAWAAg");
	this.shape_21.setTransform(-17.5,0.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAUAqIgmg0IAAA0IgSAAIAAhTIAPAAIAoA3IgBg3IATAAIAABTg");
	this.shape_22.setTransform(-29.2,0.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AggAqIAAhTIA/AAIAAAQIgsAAIAAASIAnAAIAAAPIgnAAIAAATIAuAAIAAAPg");
	this.shape_23.setTransform(-37.8,0.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgiAqIAAhTIAnAAQAHAAAGACQAFACAEAEQAIAIgBANQAAAIgBAFQgCAFgFAEQgIAHgPABIgQAAIAAAYgAgNABIAPAAIAFAAIAFgCIADgFIAAgGQAAgFgDgEIgEgDIgGgBIgPAAg");
	this.shape_24.setTransform(-46.1,0.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgeAfQgKgJAAgWQAAgKADgIQACgHAFgGQAKgKAUAAQALAAAHACQAIADAFAFQAKALAAAUQAAAWgKAKQgFAFgIACQgIADgKAAQgUAAgKgLgAgIgYQgEABgDAEQgCADgCAEQgBAGAAAGQAAAIABAEQACAGACACQADADAEACIAIABIAJgBQAEgCACgDQADgCABgGQACgEAAgIQAAgGgCgGQgBgEgDgDQgCgEgEgBQgEgBgFAAQgEAAgEABg");
	this.shape_25.setTransform(-55.4,0.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgHAjIAAg3IgVAAIAAgOIA5AAIAAAOIgVAAIAAA3g");
	this.shape_26.setTransform(54.1,0.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAQAjIgfgrIAAArIgPAAIAAhFIAMAAIAiAuIAAguIAPAAIAABFg");
	this.shape_27.setTransform(47,0.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAhQgGgBgEgEQgEgDgCgGQgCgGAAgHIAAgoIARAAIAAAoQAAAIADAEQACACADABIAFAAQAHAAAEgDQACgCABgDIABgHIAAgoIAQAAIAAAoQAAAHgCAGQgCAGgEADQgEAEgGABIgNACQgHAAgFgCg");
	this.shape_28.setTransform(39.1,0.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgYAbQgJgJAAgSQAAgIACgHQADgHAEgDQAIgJAQAAQAJAAAGACQAHACAEAFQAIAIAAARQAAASgIAJQgFAEgGACQgGACgJAAQgRAAgHgIgAgGgUQgDACgDACQgCADgBAEQgCAEABAFQgBAGACAFQABADACADQADACADACQADABADAAQAFAAADgBQADgCACgCQACgCACgFIABgKIgBgJQgCgEgCgDQgCgCgDgCIgIgBIgGABg");
	this.shape_29.setTransform(31.3,0.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgMAhQgGgCgEgEQgJgJAAgSQAAgRAJgJQAEgEAHgCQAHgCAHAAQALAAAGADQAHAFADAIIgMAGQgDgFgDgBQgEgDgFAAIgHABQgDACgCACQgCADgCAEQgBAEAAAFQAAAHABAEQACAEACADQACACADABIAHABQAFAAAEgCQAEgCADgGIAMAHIgEAHIgGAFQgIAEgKAAQgIAAgHgCg");
	this.shape_30.setTransform(24,0.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgLAhQgHgCgEgEQgIgJAAgSQgBgRAKgJQAEgEAGgCQAGgCAIAAQALAAAGADQAHAFAEAIIgOAGQgCgFgDgBQgEgDgFAAIgHABQgDACgCACQgDADAAAEQgCAEAAAFQAAAHACAEQAAAEADADQACACAEABIAGABQAFAAAEgCQAEgCACgGIAOAHIgFAHIgGAFQgIAEgKAAQgIAAgGgCg");
	this.shape_31.setTransform(16.9,0.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAQAjIgDgLIgaAAIgEALIgPAAIAXhFIATAAIAXBFgAAJAMIgJgeIgJAeIASAAg");
	this.shape_32.setTransform(9.8,0.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AALAjIgKgXIgNAAIAAAXIgQAAIAAhFIAhAAQAGAAAEABQAFACACADQAGAGAAALQAAAIgDAEIgDAEIgFAEIAMAagAgMAAIAOAAQAFAAACgDQADgCAAgGQAAgEgCgDQgDgDgFAAIgOAAg");
	this.shape_33.setTransform(0.8,0.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgMAhQgGgBgEgEQgEgDgCgGQgCgGAAgHIAAgoIARAAIAAAoQAAAIADAEQACACADABIAFAAQAHAAAEgDQACgCABgDIABgHIAAgoIAQAAIAAAoQAAAHgCAGQgCAGgEADQgEAEgGABIgNACQgGAAgGgCg");
	this.shape_34.setTransform(-6.9,0.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgYAbQgJgJAAgSQAAgIACgHQACgHAFgDQAIgJAQAAQAJAAAGACQAHACAEAFQAIAIAAARQAAASgIAJQgFAEgGACQgGACgJAAQgRAAgHgIgAgGgUQgDACgDACQgCADgBAEQgBAEAAAFQAAAGABAFQABADACADQADACADACQADABADAAQAEAAADgBQAEgCACgCQACgCABgFIACgKIgCgJQgBgEgCgDQgCgCgEgCIgHgBIgGABg");
	this.shape_35.setTransform(-14.7,0.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgHAjIAAgaIgZgrIASAAIAOAeIAQgeIARAAIgZAsIAAAZg");
	this.shape_36.setTransform(-21.7,0.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgeAjIAAhFIAeAAQAHAAAGACQAGACAEAFQAEAEACAGQACAHAAAIQAAAIgCAHQgCAGgEAFQgEAEgGADQgHACgHAAgAgOAWIAMAAQADAAADgBQADgCADgCIADgHIABgKIgBgJIgDgHQgCgCgDgCQgDgBgDAAIgNAAg");
	this.shape_37.setTransform(-31.1,0.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAQAjIgfgrIABArIgQAAIAAhFIAMAAIAiAuIgBguIAQAAIAABFg");
	this.shape_38.setTransform(-39.1,0.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgMAhQgGgBgEgEQgEgDgCgGQgCgGAAgHIAAgoIAQAAIAAAoQAAAIAFAEQABACADABIAFAAQAHAAAEgDQACgCAAgDIABgHIAAgoIARAAIAAAoQAAAHgCAGQgCAGgEADQgEAEgGABIgNACQgGAAgGgCg");
	this.shape_39.setTransform(-47,0.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgZAjIAAhFIAzAAIAAANIgjAAIAAAQIAeAAIAAANIgeAAIAAAbg");
	this.shape_40.setTransform(-53.6,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12,p:{x:-21.5}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{x:20.2}},{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_12,p:{x:3.2}},{t:this.shape_19},{t:this.shape_18},{t:this.shape_8,p:{x:29.1}},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27,-9,55.1,18.4);


(lib.ctabase = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6633CC").s().rr(-57.4,-15,114.8,30,15);
	this.shape.setTransform(-1,0,1.289,1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.ctabase, new cjs.Rectangle(-75,-15,148,30), null);


(lib.bigBtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066CC").s().p("A3bTiMAAAgnDMAu3AAAMAAAAnDg");
	this.shape.setTransform(150,150,1,1.2);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.Purplearrowbuild = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_4 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(1));

	// Bottom side
	this.instance = new lib.Purplearrowangle();
	this.instance.parent = this;
	this.instance.setTransform(87.8,71.6,0.21,0.999,-60.1,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,rotation:-60,x:87.9},4).wait(1));

	// Top side
	this.instance_1 = new lib.Purplearrowangle();
	this.instance_1.parent = this;
	this.instance_1.setTransform(87.8,88.7,0.21,0.999,0,59.9,60.1,0.4,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:0.1,regY:-0.1,scaleX:1,scaleY:1,rotation:60,skewX:0,skewY:0,x:87.9,y:88.8},4).wait(1));

	// Point
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6633CC").s().p("An/CqIAAlUIOdAAIBiCpIhjCrg");
	this.shape.setTransform(51.2,80.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,102.5,160.5);


(lib.Greenarrowbuild = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_4 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(1));

	// Bottom side
	this.instance = new lib.Greenarrowangle();
	this.instance.parent = this;
	this.instance.setTransform(87.8,71.6,0.21,0.999,-60.1,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,rotation:-60,x:87.9},4).wait(1));

	// Top side
	this.instance_1 = new lib.Greenarrowangle();
	this.instance_1.parent = this;
	this.instance_1.setTransform(87.8,88.7,0.21,0.999,0,59.9,60.1,0.4,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:0.1,regY:-0.1,scaleX:1,scaleY:1,rotation:60,skewX:0,skewY:0,x:87.9,y:88.8},4).wait(1));

	// Point
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99CC00").s().p("An/CqIAAlUIOdAAIBiCpIhjCrg");
	this.shape.setTransform(51.2,80.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,63.1,102.5,34.3);


(lib.etradelogostarbuild = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_21 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(21).call(this.frame_21).wait(1));

	// Purple arrow
	this.instance = new lib.Purplearrowbuild("synched",0,false);
	this.instance.parent = this;
	this.instance.setTransform(-33,0,1,1,0,0,0,51.2,80.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).to({startPosition:4},9).wait(6));

	// Green arrow
	this.instance_1 = new lib.Greenarrowbuild("synched",0,false);
	this.instance_1.parent = this;
	this.instance_1.setTransform(30.2,0,1,1,0,0,180,51.2,80.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({startPosition:4},9).wait(6));

	// purple line
	this.instance_2 = new lib.Purplepointedline();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-799.9,0,1,1,0,0,180,130.9,17);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:130.8,x:-112.3},7).to({regX:130.4,scaleX:0.31,x:-21.9},9).to({_off:true},1).wait(5));

	// green line
	this.instance_3 = new lib.Greenpointedline();
	this.instance_3.parent = this;
	this.instance_3.setTransform(814.8,0,1,1,0,0,0,130.8,17);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:109.8},7).to({regX:130.9,scaleX:0.3,x:18.4},9).to({_off:true},1).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1058.4,-17,2141.1,34);


(lib.cta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Call to Action
	this.ctaText = new lib.ctatext();
	this.ctaText.parent = this;
	this.ctaText.setTransform(89,14);

	this.timeline.addTween(cjs.Tween.get(this.ctaText).wait(1));

	// cta-base
	this.ctaBase = new lib.ctabase();
	this.ctaBase.parent = this;
	this.ctaBase.setTransform(90,15);

	this.timeline.addTween(cjs.Tween.get(this.ctaBase).wait(1));

}).prototype = getMCSymbolPrototype(lib.cta, new cjs.Rectangle(15,0,148,30), null);


// stage content:
(lib.ETrade_CNN_728x90 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_1 = function() {
		// Enable mouse interaction with the stage 
		stage.enableMouseOver();
		
		// Define variables used in the 
		var root = this;
		var bigBtn = root.bigBtn;
		var cta = root.cta;
		var ctaBase = root.cta.ctaBase;
		var ctaText = root.cta.ctaText;
		
		// Add event listeners
		bigBtn.addEventListener("click", clickTag);
		bigBtn.addEventListener("mouseover", rollOver);
		bigBtn.addEventListener("mouseout", rollOut);
		
		// Define functions to use throughout 
		function rollOver(){
			TweenMax.to(ctaBase, .25, {scaleX:1.1, ease: Back.easeOut.config(4), onComplete:bounceOut}); 
		};
		
		function rollOut(){
		
		};
		
		function bounceOut(){
			TweenMax.to(ctaBase, .5, {scaleX:1, ease: Back.easeOut.config(4)});
		};
		
		function clickTag() {
			window.open(window.clickTag);
		}
		
		ctaText.gotoAndStop("signup");
		//ctaText.gotoAndStop("learn");
		//ctaText.gotoAndStop("open");
		//ctaText.gotoAndStop("fund");
	}
	this.frame_296 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(295).call(this.frame_296).wait(1));

	// bigBtn
	this.bigBtn = new lib.bigBtn();
	this.bigBtn.parent = this;
	this.bigBtn.setTransform(364,37.5,2.427,0.3,0,0,0,150,125);
	new cjs.ButtonHelper(this.bigBtn, 0, 1, 2, false, new lib.bigBtn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.bigBtn).wait(297));

	// Star Logo
	this.instance = new lib.etradelogostarbuild("synched",0,false);
	this.instance.parent = this;
	this.instance.setTransform(362,45.1,0.54,0.54,0,0,0,0.3,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({_off:false},0).wait(23).to({regX:0.1,x:361.9,startPosition:21},0).wait(1).to({regX:12.1,regY:-0.1,scaleX:0.54,scaleY:0.54,x:364.3,y:44.8},0).wait(1).to({scaleX:0.53,scaleY:0.53,x:350.4,y:44.2},0).wait(1).to({scaleX:0.5,scaleY:0.5,x:324.2,y:43.2},0).wait(1).to({scaleX:0.47,scaleY:0.47,x:283,y:41.5},0).wait(1).to({scaleX:0.42,scaleY:0.42,x:227.7,y:39.3},0).wait(1).to({scaleX:0.37,scaleY:0.37,x:165.8,y:36.8},0).wait(1).to({scaleX:0.32,scaleY:0.32,x:110.4,y:34.5},0).wait(1).to({scaleX:0.29,scaleY:0.29,x:69.4,y:32.9},0).wait(1).to({scaleX:0.27,scaleY:0.27,x:43.1,y:31.8},0).wait(1).to({scaleX:0.25,scaleY:0.25,x:29.2,y:31.2},0).wait(1).to({regX:0.4,regY:0.6,scaleX:0.25,scaleY:0.25,x:22.1,startPosition:19},0).wait(259));

	// copy
	this.instance_1 = new lib.mc_copy1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(138.1,79.6,1,1,0,0,0,102.1,49.6);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.instance_2 = new lib.mc_copy2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(137.1,68.3,1,1,0,0,0,102.1,38.3);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.instance_3 = new lib.mc_copy3();
	this.instance_3.parent = this;
	this.instance_3.setTransform(139.1,81.1,1,1,0,0,0,102.1,51.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(48).to({_off:false},0).to({y:89.6,alpha:1},12,cjs.Ease.get(0.5)).wait(56).to({alpha:0},11).to({_off:true},1).wait(169));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(130).to({_off:false},0).to({y:78.3,alpha:1},13,cjs.Ease.get(0.5)).wait(60).to({alpha:0},11).to({_off:true},1).wait(82));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(217).to({_off:false},0).to({y:91.1,alpha:1},13,cjs.Ease.get(0.5)).wait(67));

	// logo
	this.instance_4 = new lib.logoswf("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(635.5,45.3,0.57,0.57,0,0,0,108,14.9);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(38).to({_off:false},0).wait(244).to({startPosition:0},0).wait(1).to({regY:14.8,y:45},0).wait(1).to({y:44},0).wait(1).to({y:42.4},0).wait(1).to({y:40},0).wait(1).to({y:36.9},0).wait(1).to({y:33.4},0).wait(1).to({y:29.8},0).wait(1).to({y:26.8},0).wait(1).to({y:24.9},0).wait(1).to({regY:14.9,y:24.3},0).wait(5));

	// mask2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("AZ3HCIAAleIfQAAIAAFeg");
	var mask_1_graphics_286 = new cjs.Graphics().p("AZ3G4IAAleIfQAAIAAFeg");
	var mask_1_graphics_287 = new cjs.Graphics().p("AZ3GrIAAldIfQAAIAAFdg");
	var mask_1_graphics_288 = new cjs.Graphics().p("AZ3GfIAAleIfQAAIAAFeg");
	var mask_1_graphics_289 = new cjs.Graphics().p("AZ3GSIAAldIfQAAIAAFdg");
	var mask_1_graphics_290 = new cjs.Graphics().p("AZ3GGIAAleIfQAAIAAFeg");
	var mask_1_graphics_291 = new cjs.Graphics().p("AZ3F5IAAldIfQAAIAAFdg");
	var mask_1_graphics_292 = new cjs.Graphics().p("AZ3FtIAAleIfQAAIAAFeg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:365.5,y:45}).wait(286).to({graphics:mask_1_graphics_286,x:365.5,y:44}).wait(1).to({graphics:mask_1_graphics_287,x:365.5,y:42.7}).wait(1).to({graphics:mask_1_graphics_288,x:365.5,y:41.5}).wait(1).to({graphics:mask_1_graphics_289,x:365.5,y:40.2}).wait(1).to({graphics:mask_1_graphics_290,x:365.5,y:39}).wait(1).to({graphics:mask_1_graphics_291,x:365.5,y:37.7}).wait(1).to({graphics:mask_1_graphics_292,x:365.5,y:36.5}).wait(5));

	// cta
	this.cta = new lib.cta();
	this.cta.parent = this;
	this.cta.setTransform(615,38.3,1,1,0,0,0,70,15);

	var maskedShapeInstanceList = [this.cta];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.cta).wait(286).to({y:54.3},6).wait(5));

	// laptop
	this.instance_5 = new lib.mc_laptop_728x90();
	this.instance_5.parent = this;
	this.instance_5.setTransform(517.1,138,1,1,-13,0,0,151.1,41);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(30).to({_off:false},0).wait(1).to({regX:151,rotation:-10.3,x:502.4,y:122.2},0).wait(1).to({rotation:-8,x:490.3,y:109},0).wait(1).to({rotation:-6.1,x:480.2,y:98},0).wait(1).to({rotation:-4.5,x:472.1,y:89.1},0).wait(1).to({rotation:-3.3,x:465.4,y:82},0).wait(1).to({rotation:-2.3,x:460.2,y:76.3},0).wait(1).to({rotation:-1.5,x:456.1,y:71.9},0).wait(1).to({rotation:-1,x:453.1,y:68.6},0).wait(1).to({rotation:-0.6,x:451,y:66.2},0).wait(1).to({rotation:-0.3,x:449.5,y:64.7},0).wait(1).to({rotation:-0.1,x:448.6,y:63.7},0).wait(1).to({rotation:0,x:448.2,y:63.2},0).wait(1).to({x:448,y:63},0).wait(254));

	// legal
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(69,69,69,0.498)").s().p("AgDAdIgFgBIgFgDIgEgDIgCgEIgCgFIgCgGIAAgHIAAgGIACgHIACgEIACgFIAEgCIAFgCIAKgCIAHAAIAGADIAEADIAEAGIgHADIgCgDIgEgDIgDgBIgFgBIgGABQgDABgCADQgCACgBAEIgCAKIACALQABAEACACQACACADACIAGABIAFgBIADgBIAEgDIADgFIAHAFIgEAFIgEAEIgHADIgHAAg");
	this.shape.setTransform(719.2,81.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(69,69,69,0.498)").s().p("AgTAcIAAg3IAJAAIAAAvIAeAAIAAAIg");
	this.shape_1.setTransform(714,81.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(69,69,69,0.498)").s().p("AgTAcIAAg3IAJAAIAAAvIAeAAIAAAIg");
	this.shape_2.setTransform(708.9,81.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(69,69,69,0.498)").s().p("AgEAUIgFgCIgEgBIgDgFIAGgEQACADADABQACACADAAQAEAAACgCQABAAAAAAQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAgBAAAAIgFgCIgDgBIgGgCIgEgBIgCgEIgBgEIABgEIADgFIAFgCIAGAAIAEAAIAFABIADACIADADIgGAFIgEgDQgCgCgEAAIgEABQAAAAgBABQAAAAAAABQgBAAAAABQAAAAAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABAAQABACADABIAEABIAGACIAEABIACAEIABADIgBAFIgDAEIgFACIgIABIgEAAg");
	this.shape_3.setTransform(702.1,82);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(69,69,69,0.498)").s().p("AgGATIgGgDQgDgDgBgEQgBgEAAgFQAAgEABgEQABgEADgDIAGgDIAHgBQAEgBAEACQADABACADIADAGIABAIIAAACIgaAAIABAGQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAIADACIAEABQAEAAACgCQADgBABgDIAGADIgDAFIgEACIgEACIgGAAIgHgBgAAKgCIgBgFIgCgDIgCgCIgEgBIgDABIgDACIgCACIgBAGIASAAIAAAAg");
	this.shape_4.setTransform(697.9,82);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(69,69,69,0.498)").s().p("AgDAcIAAgmIAIAAIAAAmgAgDgSQgBAAAAgBQAAAAAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAQAAABAAAAQAAABgBABQAAAAAAAAQAAABgBAAIgEABIgDgBg");
	this.shape_5.setTransform(694.6,81.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(69,69,69,0.498)").s().p("AABAZIgDgCIgDgFIgBgGIAAgTIgHAAIAAgHIAHAAIAAgLIAIAAIAAALIALAAIAAAHIgLAAIAAASIAAAEIABACQABABAAAAQABAAAAAAQABABAAAAQABAAABAAIAFgBIABAGQgEACgEAAIgFgBg");
	this.shape_6.setTransform(692,81.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(69,69,69,0.498)").s().p("AgDAcIAAgmIAIAAIAAAmgAgDgSQgBAAAAgBQAAAAAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAQAAABAAAAQAAABgBABQAAAAAAAAQAAABgBAAIgEABIgDgBg");
	this.shape_7.setTransform(689.3,81.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(69,69,69,0.498)").s().p("AgLAUIAAgnIAIAAIABAJIACgEIADgDIAEgCIAFAAIAAAIQgEAAgCABIgFADIgCAEIgBAGIAAARg");
	this.shape_8.setTransform(686.9,81.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(69,69,69,0.498)").s().p("AgKATQgCgBgCgCIgDgFIgBgHIAAgXIAJAAIAAAVIABAFIABADIADACIAEABIADgBIAEgCIACgEIABgGIAAgTIAJAAIAAAmIgIAAIgBgHIgCAEIgEACIgEACIgDAAIgHgBg");
	this.shape_9.setTransform(682.6,82);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(69,69,69,0.498)").s().p("AgGATIgGgDQgDgDgBgEQgBgEAAgFQAAgFABgEQABgDADgDQACgCAEgBIAHgBIAGAAIAEABIAEADIADAEIgHAEQgBgDgDgBQgCgBgEAAIgDAAIgEADIgCADIAAAGIAAAGQAAABABAAQAAABAAABQAAAAABABQAAAAAAAAIAEACIADACQAEAAADgCQACgBACgEIAGAEIgDAEIgDADIgFACIgGAAIgHgBg");
	this.shape_10.setTransform(678,82);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(69,69,69,0.498)").s().p("AgGATIgGgDQgDgDgBgEQgBgEAAgFQAAgEABgEQABgEADgDIAGgDIAHgBQAEgBAEACQADABACADIADAGIABAIIAAACIgaAAIABAGQAAAAAAABQAAAAABABQAAAAAAAAQAAABABAAIADACIAEABQAEAAACgCQADgBABgDIAGADIgDAFIgEACIgEACIgGAAIgHgBgAAKgCIgBgFIgCgDIgCgCIgEgBIgDABIgDACIgCACIgBAGIASAAIAAAAg");
	this.shape_11.setTransform(673.6,82);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(69,69,69,0.498)").s().p("AgFAdIgGgCQgDgCgDgCIgEgFIAHgFIADAFIADACIAEACIAEAAIAGAAIAEgCIACgDIABgEIgBgCIgBgDIgEgCIgFgCIgEgBIgHgCIgGgDIgDgFIAAgGIABgGIAEgEQACgDAEgBIAHgBIAHAAIAGADIAEADIAEAEIgHAFIgDgDIgCgDIgEgCIgEAAIgFABIgDABIgCADIgBADQAAAEACACIADACIAFABIAEABIAIADIAGADIADAEIABAFQAAAFgCADQgBADgDACQgCACgEABIgJABIgGAAg");
	this.shape_12.setTransform(668.8,81.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(69,69,69,0.498)").s().p("AgUAcIAAg3IAoAAIAAAHIgfAAIAAARIAbAAIAAAGIgbAAIAAASIAgAAIAAAHg");
	this.shape_13.setTransform(662.1,81.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(69,69,69,0.498)").s().p("AgWAcIAAg3IAWAAIAFABIAFABIAEACIADACIADAFIACAEIABAMIgBAMIgCAFIgDAEIgDADIgFACIgFACIgFAAgAgNAUIAMAAIAGgBIAFgDQACgCABgEQABgEAAgGIgBgIQgBgFgCgBQgCgDgDgBIgFgBIgNAAg");
	this.shape_14.setTransform(656.3,81.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(69,69,69,0.498)").s().p("AAQAcIgEgKIgXAAIgEAKIgJAAIATg3IALAAIATA3gAAKAKIgKgcIgJAcIATAAg");
	this.shape_15.setTransform(650.5,81.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(69,69,69,0.498)").s().p("AAMAcIgLgUIgNAAIAAAUIgJAAIAAg3IAXAAIAIABIAGAEQADACABADQABADAAAEIgBAGIgCAEIgDADIgEADIALAWgAgMAAIANAAIAFAAIADgCIACgDIABgFIgBgDIgCgDIgDgDIgFAAIgNAAg");
	this.shape_16.setTransform(645.5,81.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(69,69,69,0.498)").s().p("AgEAcIAAgvIgSAAIAAgIIAsAAIAAAIIgSAAIAAAvg");
	this.shape_17.setTransform(640.1,81.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(69,69,69,0.498)").s().p("AAAAHIgEAIIgGgEIAEgHIgIAAIAAgHIAIAAIgEgHIAGgEIAEAIIAEgIIAHAEIgFAHIAJAAIAAAHIgJAAIAFAHIgHAEg");
	this.shape_18.setTransform(636.1,79.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(69,69,69,0.498)").s().p("AgUAcIAAg3IAoAAIAAAHIgfAAIAAARIAbAAIAAAGIgbAAIAAASIAgAAIAAAHg");
	this.shape_19.setTransform(632,81.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(297));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(364,45,728,250);
// library properties:
lib.properties = {
	width: 728,
	height: 90,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/laptop_728x90.jpg", id:"laptop_728x90"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;