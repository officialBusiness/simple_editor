// 默认的 当前 block 为 paragraph 类型, block 即为 container

export default function deleteForwardOnStart(){
	let { rangeApi, nodeApi } = this,
			range = rangeApi.getRange(),
			node = range.startContainer,
			offset = range.startOffset,
			container = nodeApi.getContainer(node),
			block = nodeApi.getBlock(node),
			preBlock = nodeApi.getPreBlock(block);

	console.log('执行 deleteForwardOnStart:', 'node:', node, 'offset:', offset);
	if( block !== container ){
		console.error('默认的 paragraph 类型, container 即为 block, 不应该出现 block !== container 的情况')
		return ;
	}

	if( preBlock ){//	存在前一个 Block
		console.log('存在前一个 Block');
		if( nodeApi.isEmpty(block)  ){//	block 为空
			console.log('当前 block 为空');
			// console.log('preBlock:', preBlock);
			if( nodeApi.isEmpty(preBlock) ){
				console.log('前一个 Block 为空, 删除前一个 Block, range 不变');
				nodeApi.removeNode(preBlock);
			}else{
				console.log('前一个 Block 不为空, 删除当前 Block, range 选择前一个 Block 最后一个 container 的 range 标准的最后一个位置');
				let lastContainer = this.supportOperation(this.supportOperationType.getLastContainer, preBlock);
				rangeApi.setRangeOfNodeEnd(lastContainer);
				nodeApi.removeNode(block);
			}
		}else{
			console.log('当前 block 不为空');
			if( nodeApi.isEmpty(preBlock) ){
				console.log('前一个 Block 为空, 删除前一个 Block, range 不变');
				nodeApi.removeNode(preBlock);
			}else{
				console.log('前一个 Block 不为空');
				if( nodeApi.isSingle(preBlock) ){
					console.log('前一个 Block 是单独整体的 Block, 删除前一个 Block, range 不变');
					nodeApi.removeNode(preBlock);
				}else{
					console.log('前一个 Block 不是单独整体的 Block , 删除当前 Block, 并将内部节点合并到前一个 Block 最后一个的 container');
					let lastContainer = this.supportOperation(this.supportOperationType.getLastContainer, preBlock);
					if( nodeApi.isMergeText(lastContainer) ){
						console.log('只合并文字, 目前暂时没有这样的 container , 暂时放过')
					}else{
						console.log('合并所有节点');
						let 
							startNode = nodeApi.getStartNodeInContainer(block),
							endNode = nodeApi.getEndNodeInContainer(lastContainer);

						rangeApi.setRangeOfNodeEnd(lastContainer);
						nodeApi.appendChildren(lastContainer, block.childNodes);
						nodeApi.removeNode(block);
						if(startNode && startNode.nodeType === Node.TEXT_NODE &&
								endNode && endNode.nodeType === Node.TEXT_NODE){
							console.log('存在需要合并的 text');
							block.normalize();//	合并前后 text
						}
					}
				}
				// else{
				// 	console.error('不知道的特殊情况');
				// }
			}
		}
	}else{//	不存在前一个 Block , 为第一个 Block , 不做任何操作
		console.log('不存在前一个 Block , 为第一个 Block , 不做任何操作');
	}
}