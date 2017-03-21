'use strict';

import ImageBase from '../util/ImageBase'
import CircularImage from '../shapes/CircularImage'
import Label from '../../shared/Label'

class CircularOverImageBase extends ImageBase {
	constructor(options, body, labelModule, imageObj, circularImageObj) {
    	super(options, body, labelModule);
    	this.imageObj = imageObj || { src: '', width:0, height: 0};
    	this.ovrImgPropsSet = false;

    	let lblModule = new Label({}, {}); // no label for ovrImg
    	this.circularOverImage = new CircularImage(options, body, lblModule, circularImageObj);
  	}

  	resize() {
    	this._resizeImage();
    	this.circularOverImage.resize();
  	}

  	setOvrImgProps() {
  		this.circularOverImage.width = Math.floor(this.circularOverImage.width 
    		* this.options.ovrImgRatio);
    	this.circularOverImage.height = Math.floor(this.circularOverImage.height 
    		* this.options.ovrImgRatio);

    	this.ovrImgPropsSet = true;
  	}

  	draw(ctx, x, y, selected, hover) {
    	this._drawImage(ctx, x, y, selected, hover);

		if(!this.ovrImgPropsSet) this.setOvrImgProps();    	
    	this.circularOverImage.draw(ctx, x, y, selected, hover);
	}

	updateBoundingBox(x,y) {
		this._updateBoundingBox(x,y);
		this.circularOverImage.updateBoundingBox(x,y);
	}

	distanceToBorder(ctx, angle) {
    	return this._distanceToBorder(ctx,angle);
  	}
}

export default CircularOverImageBase;