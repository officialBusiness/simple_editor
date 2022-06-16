export default function deleteOneOnStart(t){
	let { rangeApi, nodeApi } = this,
			range = rangeApi.getRange(),
			node = range.startContainer,
			offset = range.startOffset,
			container = nodeApi.getContainer(node);

	// console.log('this:', this);
	console.log( 'deleteOneOnStart:', 'node:', node, 'offset:', offset);

	let preBlock = nodeApi.getPreBlock(container);
	if( preBlock ){//	存在前一个 Block
		console.log('存在前一个 Block');
		if( container.childNodes.length === 0 ){//	container 为空
			console.log('当前 container 为空');
			// console.log('preBlock:', preBlock);
			if( nodeApi.isEmpty(preBlock) ){
				console.log('前一个 Block 为空');
				rangeApi.setCollapsedRange(preBlock, 0);
			}else{
				console.log('前一个 Block 不为空');
				rangeApi.endNodeRange(preBlock);
			}
			nodeApi.removeNode(container);
		}else{
			console.log('当前 container 不为空');
			if( nodeApi.isEmpty(preBlock) ){
				console.log('前一个 Block 为空');
				nodeApi.removeNode(preBlock);
			}else if(nodeApi.isMerge(preBlock)) {
				
				let 
					startNode = nodeApi.getEndNode(preBlock),
					endNode = nodeApi.getStartNode(container);
				rangeApi.endNodeRange(preBlock);
				nodeApi.appendChildren(preBlock, container.childNodes);
				nodeApi.removeNode(container);
				if(startNode && startNode.nodeType === Node.TEXT_NODE &&
						endNode && endNode.nodeType === Node.TEXT_NODE){
					console.log('需要合并');
					preBlock.normalize();//	合并前后 text
				}

			}else if(nodeApi.isSingle(preBlock)){
				nodeApi.removeNode(preBlock);
			}else{
				console.error('不知道的特殊情况');
			}
		}
	}
}