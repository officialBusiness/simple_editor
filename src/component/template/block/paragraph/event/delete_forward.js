export default function deleteForward(node, offset){
	console.log('%c执行 deleteForward', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset);

	let { rangeApi, nodeApi } = this;

	if( node.nodeType === Node.TEXT_NODE ){
		console.log('为 TEXT_NODE');

		let singleNode = nodeApi.getSingleNodeInContainer(node),
				preNode = nodeApi.getPreNodeInContainer(singleNode),
				nextNode = nodeApi.getNextNodeInContainer(singleNode);

		if( offset > 1 || (offset === 1 && node.length > 1) ){
			console.log('删除一个字符');
			if(offset === 1){
				console.log('偏移量为1的特殊位置');
				if( preNode ){
					console.log('跳到前一个节点末端');
					rangeApi.setRangeOfNodeEnd(preNode);
				}else{
					console.log('是 conatiner 内部的第一个叶子节点, 坐标定位到 text 头部');
					rangeApi.setCollapsedRange(node, 0);
				}
			}else{
				console.log('光标进一');
				rangeApi.setCollapsedRange(node, offset - 1);
			}
			node.deleteData(offset - 1, 1);
		}else if( offset === 1 && node.length === 1 ){//	删空 text
			console.log('删空 text');
			deleteNodeInContainer.call(this, node);
		}else if( offset === 0 ){//	在 text 头部
			console.log('偏移量为 0');
			if( nodeApi.isStartInContainer(singleNode) ){
				// console.log('执行 deleteForwardOnStart 事件');
				deleteForwardOnStart.call(this, node, offset);
			}else{
				throw new Error('未知情况, 按照浏览 range 的标准以及之前设置 range 的代码,应该是 container 内的第一个独立节点');
			}
		}else{//	不知道的特殊情况
			throw new Error('在 text 中执行 deleteForward 遇到的不知道的特殊情况');
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		console.log('为 ELEMENT_NODE');
		if( offset === 0 ){
			console.log('偏移量为 0');
			let element = node.childNodes[ 0 ];
			if( element ){
				console.log('元素存在, 应该是 container 内的第一个独立节点');
				if( nodeApi.isStartInContainer(node.childNodes[0]) ){
					deleteForwardOnStart.call(this, node, offset);
				}else{
					throw new Error('未知情况, 按照浏览 range 的标准以及之前设置 range 的代码,应该是 container 内的第一个独立节点');
				}
			}else{
				console.log('元素不存在, 表示是一个空的 container');
				deleteForwardOnStart.call(this, node, offset);
			}
		}else{
			let element = node.childNodes[ offset - 1 ];
			if( element ){
				let singleNode = nodeApi.getSingleNodeInContainer(element);
				console.log('element 存在, 删除元素', element);
				deleteNodeInContainer.call(this, singleNode);
			}else{
				throw new Error('未知情况, 按照常理, element 应该是存在');
			}
		}
	}else{
		throw new Error('deleteForward node 类型未知');
	}
}

export function deleteNodeInContainer(node){
	console.log('%cdeleteNodeInContainer 删除元素', 'color: #000000; background-color: #ffffff');
	console.log('node:', node);
	let 
			{ rangeApi, nodeApi } = this,
			singleNode = nodeApi.getSingleNodeInContainer(node),
			parentNode = singleNode.parentNode,
			preNode = nodeApi.getPreNodeInContainer(singleNode),
			nextNode = nodeApi.getNextNodeInContainer(singleNode);

	if( preNode ){//	前面有节点
		console.log('前面有节点');
		let previousSibling = singleNode.previousSibling,
				nextSibling = singleNode.nextSibling;
		rangeApi.setRangeOfNodeEnd(preNode);
		nodeApi.removeNode(singleNode);//	删除独立节点
		if( previousSibling && nextSibling ){
			nodeApi.mergeTwoNodes(previousSibling, nextSibling);
		}
	}else{//	前面没有节点
		console.log('前面没有节点');
		if( nextNode ){//	后面有节点
			console.log('后面有节点');
			rangeApi.setRangeOfNodeStart(nextNode);
			nodeApi.removeNode(singleNode);//删除text关联节点
		}else{//	后面没有节点
			console.log('后面没有节点');
			if( nodeApi.isContainer(parentNode) ){
				rangeApi.setCollapsedRange(parentNode, 0);
				nodeApi.removeNode(singleNode);
			}else{
				throw new Error('特殊情况,按照常理,前后都没有的话, parentNode 应该是 container,不会打印此信息');
			}
		}
	}
}

export function deleteForwardOnStart(node, offset){
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
			if( nodeApi.isEmpty(block) ){
				console.log('当前 Block 为空, 删除当前 Block, range 选择前一个 Block 最后一个 container 的的最后一个位置');
				let lastContainer = this.executeHelpEvent(preBlock, this.helpEventType.getLastContainer, [preBlock]);
				rangeApi.setRangeOfNodeEnd(lastContainer);
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