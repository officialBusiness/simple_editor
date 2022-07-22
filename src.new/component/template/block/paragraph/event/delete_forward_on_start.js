
export default function deleteForwardOnStart(node, offset){
	console.log('执行 deleteForwardOnStart:', 'node:', node, 'offset:', offset);

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
			if( nodeApi.isEmpty(block) ){
				console.log('当前 Block 为空, 删除当前 Block, range 选择前一个 Block 最后一个 container 的的最后一个位置');
				let lastContainer = this.executeHelpEvent(preBlock, this.helpEventType.getLastContainer, [preBlock]);
				rangeApi.setRangeOfNodeEndInContainer(lastContainer);
				nodeApi.removeNode(block);
			}else{
				console.log('当前 Block 不为空, 执行 mergeTwoBlock, 根据不同情况合并两个 Block');
				this.mergeTwoBlock(preBlock, block);
			}
		}
	}else{
		console.log('不存在前一个 Block , 为第一个 Block , 不做任何操作');
	}
}