export default function backspace(){
	let 
		{ rangeApi, nodeApi, customEventType } = this,
		range = rangeApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
	// console.log('range:', range);
	if(collapsed){
			this.dispatchCustomEvent(
				nodeApi.getContainer(startContainer),
				customEventType.backspaceOne,
				[startContainer, startOffset]
			);

	}else{
		let startC = nodeApi.getContainer(startContainer),
				endC= nodeApi.getContainer(endContainer);
		if( startC === endC ){//	在同一个 container 中
			console.log('在同一个 container 中');
			this.dispatchCustomEvent(
				nodeApi.getContainer(startContainer),
				customEventType.backspaceRange,
				[startContainer, startOffset, endContainer, endOffset]
			);
		}else{//	不同的 container
			console.log('不同的 container ');
			let startBlock = nodeApi.getBlock(startContainer),
					endBlock = nodeApi.getBlock(endContainer);
			if( startBlock === endBlock ){//	在同一个 block 中
				console.log('在同一个 block 中');
			}else{
				console.log('不同的 block ');
			}
		}
		// this.nodeApi.getContainer(startContainer)
		// .dispatchEvent(this.customEvent.backspaceRange);
	}
}