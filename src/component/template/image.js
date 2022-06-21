import deleteOne from './default_container/operation/delete_one.js'

let imageComponent = {
	type: 'image',
	isBlock: true,
	eventInterface: {
		mousedown: ()=>{}
	},
	toDom(obj){
		let imageContainer = this.nodeApi.createElement('div', {
					class: 'image',
					block: true,
					singleBlock: true,
					container: true
				}, {
					mousedown: (e)=>{
						imageComponent.eventInterface.mousedown(this, obj);
					},
				}),
				image = this.nodeApi.createElement('img', {
					src: obj.src,
				}, {
					mousedown: (e)=>{
						if( this.editable ){
							this.rangeApi.endNodeRange(image);
						}
					},
				}),
				imageTitle;
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
			[this.customEventType.enterOne]: (e)=>{
				let { startContainer, startOffset } = this.rangeApi.getRange();
				if( startOffset === 0 ){
					console.error('暂时还没完善');
				}else if( startOffset === 1 ){
					if(imageTitle){
						this.rangeApi.startNodeRange(imageTitle);
					}else{
						let newBlock = this.getBlockDom('paragraph');
						this.nodeApi.insertAfter( newBlock, imageContainer );
						this.rangeApi.setCollapsedRange(newBlock, 0);
					}
				}
			}
		});

		if(obj.width){
			image.style.width = obj.width;
		}
		if(obj.alignment){
			imageContainer.style['text-align'] = obj.alignment;
		}

		if( obj.title ){
			imageTitle = this.nodeApi.createElement('div', {
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
				},
				[this.customEventType.enterOne]: ()=>{
					let { startContainer, startOffset } = this.rangeApi.getRange();
					if( startOffset === startContainer.length ){
						let newBlock = this.getBlockDom('paragraph');
						this.nodeApi.insertAfter( newBlock, imageContainer );
						this.rangeApi.setCollapsedRange(newBlock, 0);
					}else if( startOffset === 1 ){
						console.error('暂时还没完善');
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

export default imageComponent;