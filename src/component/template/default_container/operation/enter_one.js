export default function enterOne(node, offset){
	console.log('enterOne:', node, offset);
	let { rangeApi, nodeApi, customEventType } = this;
	if( node.nodeType === Node.TEXT_NODE ){
		if( offset === node.length && nodeApi.isEndInContainer(node) ){
			let block = nodeApi.getBlock(node),
					newBlock = this.getBlockDom('paragraph');
			nodeApi.insertAfter( newBlock, block );
			rangeApi.setCollapsedRange(newBlock, 0);
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		// if(  )
	}else{
		console.error('不知道的特殊情况');
	}
}