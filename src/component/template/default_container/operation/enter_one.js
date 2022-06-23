export default function enterOne(node, offset){
	console.log('enterOne:', node, offset);
	let { rangeApi, nodeApi, customEventType } = this;
	if( node.nodeType === Node.TEXT_NODE ){
		if( offset === node.length && nodeApi.isEndInContainer(node) ){
			console.log('在末端');
			let block = nodeApi.getBlock(node),
					newBlock = this.getBlockDom('paragraph');
			nodeApi.insertAfter( newBlock, block );
			rangeApi.setCollapsedRange(newBlock, 0);
		}else if( offset === 0 && nodeApi.isStartInContainer(node) ){
			console.log('在头部');
			let block = nodeApi.getBlock(node),
					newBlock = this.getBlockDom(block.className);
			nodeApi.insertBefore( newBlock, block );
			rangeApi.setCollapsedRange(node, offset);
		}else{
			console.log('需要拆分 node 节点');
			
			
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		if( offset === 0 && node.childNodes.length === 0 && nodeApi.isBlock(node) ){
			console.log('block 为空');
			let block = nodeApi.getBlock(node),
					newBlock = this.getBlockDom('paragraph');
			nodeApi.insertAfter( newBlock, block );
			rangeApi.setCollapsedRange(newBlock, 0);
		}else if( offset === node.childNodes.length && nodeApi.isEndInContainer(node) ){
			console.log('在末端');
			let block = nodeApi.getBlock(node),
					newBlock = this.getBlockDom('paragraph');
			nodeApi.insertAfter( newBlock, block );
			rangeApi.setCollapsedRange(newBlock, 0);
		}else if( offset === 0 && nodeApi.isStartInContainer(node) ){
			console.log('在头部');
			let block = nodeApi.getBlock(node),
					newBlock = this.getBlockDom(block.className);
			nodeApi.insertBefore( newBlock, block );
			rangeApi.setCollapsedRange(node, offset);
		}else{
			console.log('需要拆分 node 节点');
			let block = nodeApi.getBlock(node),
					newBlock = this.getBlockDom('paragraph'),

					startNode = offset === node.childNodes.length ? this.nodeApi.getNextNodeInContainer(node.childNodes[offset - 1]) : 
												node.childNodes[offset],
					startNodeParent,
					startNodeParentClone,
					rememberStartNodeParentClone;

			while( startNode.parentNode && this.nodeApi.isNotEditor(startNode.parentNode) ){
				let	
					nextSibling = startNode.nextSibling,
					rememberNextSibling;

				startNodeParent = startNode.parentNode;
				startNodeParentClone = startNode.parentNode.cloneNode(false);

				if( rememberStartNodeParentClone ){
					startNodeParentClone.appendChild(rememberStartNodeParentClone);
				}else{
					startNodeParentClone.appendChild(startNode);
				}
				rememberStartNodeParentClone = startNodeParentClone;

				while( nextSibling ){
					rememberNextSibling = nextSibling.nextSibling;
					startNodeParentClone.appendChild( nextSibling );
					nextSibling = rememberNextSibling;
				}

				startNode = startNodeParent;
			}
			nodeApi.insertAfter( startNodeParentClone, block );
			rangeApi.startNodeRange(startNodeParentClone);
		}
	}else{
		console.error('不知道的特殊情况');
	}
}