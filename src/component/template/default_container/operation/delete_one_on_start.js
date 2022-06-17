export default function deleteOneOnStart(node, offset){
	let { rangeApi, nodeApi } = this,
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
				console.log('将当前 container 合并到 preBlock 中');
				let merge = this.dispatchCustomEvent(
					preBlock,
					this.customEventType.getMergeNode
				);

				this.dispatchCustomEvent(
					container,
					this.customEventType.mergeNode,
					[merge ? merge : preBlock, container]
				);
			}else if(nodeApi.isSingle(preBlock)){
				console.log('前一个 Block 为 singleBlock');
				nodeApi.removeNode(preBlock);
			}else{
				console.error('不知道的特殊情况');
			}
		}
	}
}