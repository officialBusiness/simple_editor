import deleteOne from './default_container/delete_one.js'

export default {
	type: 'image',
	isBlock: true,
	toDom(obj){
		let imageContainer = this.nodeApi.createElement('div', {
					class: 'image',
					block: true,
					singleBlock: true,
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

		this.bindCustomEvent(imageContainer, {
			[this.customEventType.backspaceOne]: (e)=>{
				let { startContainer, startOffset } = this.rangeApi.getRange();
				if(startOffset === 0){
					let preBlock = this.nodeApi.getPreBlock(imageContainer);
					if( preBlock ){
						this.rangeApi.endNodeRange(preBlock);
					}
				}else if(startOffset === 1){
					this.rangeApi.endNodeRange(this.nodeApi.getPreBlock(imageContainer));
					this.nodeApi.removeNode(imageContainer);
				}else{
					console.error('不知道的特殊情况');
				}
			},
		});

		if(obj.width){
			image.style.width = obj.width;
		}
		if(obj.alignment){
			imageContainer.style['text-align'] = obj.alignment;
		}

		if( obj.title ){
			let imageTitle = this.nodeApi.createElement('div', {
				class: 'image_title',
				container: true,
				// contenteditable: false
			})
			imageTitle.innerText = obj.title;
			imageContainer.appendChild(imageTitle);


			this.bindCustomEvent(imageTitle, {
				[this.customEventType.backspaceOne]: deleteOne.bind(this),
				[this.customEventType.backspaceOnStart]: ()=>{
					this.rangeApi.endNodeRange(image);
					if(this.nodeApi.isEmpty(imageTitle)){
						this.nodeApi.removeNode(imageTitle);
					}
				}
			});
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