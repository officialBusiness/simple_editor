

export default function deleteForward(){
	let { rangeApi, nodeApi, editorEvent } = this,
			range = rangeApi.getRange(),
			node = range.startContainer,
			offset = range.startOffset;

	console.log('执行 deleteForward:', 'node:', node, 'offset:', offset);

	if( node.nodeType === Node.TEXT_NODE ){
		let singleNode = nodeApi.getSingleNodeInContainer(node),
				preNode = nodeApi.getPreNodeInContainer(singleNode),
				nextNode = nodeApi.getNextNodeInContainer(singleNode);

	}else if( node.nodeType === Node.ELEMENT_NODE ){
		
	}
}


export function deleteElement(node){
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
		rangeApi.endNodeRange(preNode);
		nodeApi.removeNode(singleNode);//	删除text独立节点
		if( previousSibling &&
				previousSibling.nodeType === Node.TEXT_NODE &&
				nextSibling &&
				nextSibling.nodeType === Node.TEXT_NODE ){//	前后节点都是text
			console.log('前后节点都是 text');
			parentNode.normalize();//	合并前后 text
		}
	}else{//	前面没有节点
		console.log('前面没有节点');
		if( nextNode ){//	后面有节点
			console.log('后面有节点');
			rangeApi.startNodeRange(nextNode);
			nodeApi.removeNode(singleNode);//删除text关联节点
		}else{//	后面没有节点
			console.log('后面没有节点');
			if( nodeApi.isContainer(parentNode) ){
				rangeApi.setCollapsedRange(parentNode, 0);
				nodeApi.removeNode(singleNode);
			}else{
				console.error('不知道的特殊情况,按照常理,前后都没有的话，那应该已经是 container,不会打印此信息');
			}
		}
	}
}