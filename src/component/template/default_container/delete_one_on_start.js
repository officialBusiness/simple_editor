export default function deleteOneOnStart(){
	let { rangeApi, nodeApi } = this,
			range = this.rangeApi.getRange(),
			node = range.startContainer,
			offset = range.startOffset,
			container = this.nodeApi.getContainer(node);

	// console.log('this:', this);
	console.log( 'deleteOneOnStart:', 'node:', node, 'offset:', offset);

	let preBlock = this.nodeApi.getPreBlock(container);
	if( preBlock ){//	存在前一个 Block
		console.log('存在前一个 Block');
		if( container.childNodes.length === 0 ){//	container 为空
			console.log('container 为空');
			// console.log('preBlock:', preBlock);
			if( this.nodeApi.isEmpty(preBlock) ){
				this.rangeApi.endNodeRange(preBlock);
			}else{
				this.rangeApi.setCollapsedRange(preBlock, 0);
			}
			this.nodeApi.removeNode(container);
		}else{
			
		}
	}

}