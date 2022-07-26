

export default function deleteForwardOnStart(node, offset){
	console.log('%c执行 deleteForwardOnStart', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset);

	let { rangeApi, nodeApi } = this,
			container = nodeApi.getContainer(node),
			block = nodeApi.getBlock(node),
			preBlock = nodeApi.getPreBlock(block);

	if( preBlock ){//	存在前一个 Block
		console.log('存在前一个 Block');
		if( nodeApi.isEmpty(preBlock) ){
			console.log('前一个 Block 为空, 删除前一个 Block, range 不变');
			nodeApi.removeNode(preBlock);
		}else{
			console.log('前一个 Block 不为空');
			let lastContainer = this.executeHelpEvent(preBlock, this.helpEventType.getLastContainer, [preBlock]);
			rangeApi.setRangeOfNodeEnd(lastContainer);
			if( nodeApi.isEmpty(block) ){
				console.log('当前 Block 为空, 删除当前 Block');
				nodeApi.removeNode(block);
			}else{
				console.log('当前 Block 不为空, 执行 mergeTwoBlocks, 根据不同情况合并两个 Block');
				this.mergeTwoBlocks(preBlock, block);
			}
		}
	}else{
		console.log('不存在前一个 Block , 为第一个 Block , 不做任何操作');
	}
}
