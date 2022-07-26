import imageEvent from './event/image_event.js';

export function getImageTitleDom(title){
	return this.nodeApi.createDom({
		nodeName: 'div',
		attributes: {
			class: 'image_title',
			[this.nodeLabel.container]: true
		},
		children: title
	})
}

export default {
	type: 'image',
	event: imageEvent,
	toDom(obj){
		return this.nodeApi.createDom({
			nodeName: 'div',
			attributes: {
				class: 'image',
				[this.nodeLabel.block]: true,
			},
			style: obj.imageStyle,
			children: [
				{
					nodeName: 'div',
					attributes: {
						class: 'img_container',
						[this.nodeLabel.container]: true,
					},
					children: {
						nodeName: 'img',
						attributes: {
							src: obj.src,
						},
						style: obj.imgStyle,
					}
				},
				{
					if: !!obj.title,
					nodeName: 'div',
					attributes: {
						class: 'image_title',
						[this.nodeLabel.container]: true,
					},
					children: obj.title
				}
			]
		});
	},
	toObj(dom){
		let 
			img = dom.childNodes[0].childNodes[0],
			title = dom.childNodes[1],
			obj = {
				type: 'image',
				src: img.src
			},
			imageStyle = this.nodeApi.getNodeStyle(dom),
			imgStyle = this.nodeApi.getNodeStyle(img);

		if( title ){
			obj.title = title.innerText;
		}
		if( imageStyle ){
			obj.imageStyle = imageStyle;
		}
		if( imgStyle ){
			obj.imgStyle = imgStyle;
		}
		return obj;
	},
	helpEvent: {
		getFirstContainer(paragraph){
			return imageBlock.childNodes[0];
		},
		getLastContainer(imageBlock){
			return imageBlock.childNodes[1];
		},
		getMergeContainer(imageBlock){
			return false;
		},
		getMergedNodes(imageBlock){
			return false;
		}
	}
}