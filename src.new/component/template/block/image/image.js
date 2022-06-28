
function imgContainerDeleteForward(){

}

export default {
	type: 'image',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'image',
				[this.nodeLabel.block]: true,
				[this.nodeLabel.single]: true,
				[this.nodeLabel.container]: true
			},
			style: {
				'text-align': obj.alignment
			},
			// on: {

			// },
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
					// on: {

					// },
					children: obj.title
				}
			]
		});
	},
	toObj(dom){
		let 
			image = dom.childNodes[0],
			title = dom.childNodes[1],
			obj = {
				type: 'image',
				src: image.src
			};

		if(image.style.width){
			obj.width = image.style.width;
		}
		if(dom.style['text-align']){
			obj.alignment =  dom.style['text-align'];
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