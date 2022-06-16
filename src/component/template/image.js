
export default {
	type: 'image',
	isBlock: true,
	toDom(obj){
		let imageContainer = this.nodeApi.createElement('div', {
					class: 'image',
					block: true,
					container: true
				}),
				image = this.nodeApi.createElement('img', {
					src: obj.src,
				}, {
					mousedown: (e)=>{
						this.rangeApi.endNodeRange(image);
					},
				});
		imageContainer.appendChild(image);
		if(obj.width){
			image.style.width = obj.width;
		}
		if(obj.alignment){
			imageContainer.style['text-align'] = obj.alignment;
		}

		if( obj.title ){
			let title = this.nodeApi.createElement('div', {
				class: 'image_title',
				// container: true,
				contenteditable: false
			}, {
					mousedown: (e)=>{
						this.rangeApi.endNodeRange(image);
					},
			})
			title.innerText = obj.title;
			imageContainer.appendChild(title);
		}
		return imageContainer;
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

	}
}