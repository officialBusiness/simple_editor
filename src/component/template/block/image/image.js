
// const 


export default {
	type: 'image',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'image',
				[this.nodeLabel.block]: true,
				[this.nodeLabel.container]: true
			},
			style: {
				'text-align': obj.alignment
			},
			children: [
				{
					nodeName: 'img',
					attributes: {
						src: obj.src
					},
					style: {
						width: obj.width
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
			img = dom.childNodes[0],
			title = dom.childNodes[1],
			obj = {
				type: 'image',
				src: img.src
			},
			imgStyle = {},
			imageStyle = {};

		if(img.style.width){
			imgStyle.width = img.style.width;
			obj.imgStyle = imgStyle;
		}
		if(dom.style['text-align']){
			imageStyle['text-align'] =  dom.style['text-align'];
			obj.imageStyle = imageStyle;
		}
		if( title ){
			obj.title = title.innerText;
		}
		return obj;
	},
	supportOperation: {
		getLastContainer(image){
			return image.childNodes[1] ? image.childNodes[1] : image.childNodes[0];
		},
	}
}