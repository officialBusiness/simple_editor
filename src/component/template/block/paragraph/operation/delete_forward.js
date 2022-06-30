import deleteForwardOnStart from './delete_forward_on_start.js';

// container 的默认操作
export default function deleteForward(node, offset){
	let { rangeApi, nodeApi } = this;

	console.log('执行 deleteForward:', 'node:', node, 'offset:', offset);
	if( node.nodeType === Node.TEXT_NODE ){
		let singleNode = nodeApi.getSingleNodeInContainer(node),
				preNode = nodeApi.getPreNodeInContainer(singleNode),
				nextNode = nodeApi.getNextNodeInContainer(singleNode);
		if( offset > 1 || (offset === 1 && node.length > 1) ){//	正常删除一个字符
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
			console.log('在 text 头部, text 存在字符');
			if( nodeApi.isStartInContainer(singleNode) ){
				console.log('根据 container 所在的组件, 触发对应的 deleteForwardOnStart 事件');
				deleteForwardOnStart.call(this, node, offset);
			}else{
				console.error('不知道的特殊情况,按照浏览 range 的标准以及之前设置 range 的代码,应该是 container 内的第一个独立节点')
			}
		}else{//	不知道的特殊情况
			console.error('不知道的特殊情况');
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		let element = node.childNodes[ offset !== 0 ? offset - 1 : 0 ],
				singleNode = element ? nodeApi.getSingleNodeInContainer(element) : null,
				parentNode = singleNode ? singleNode.parentNode : null,
				preNode = singleNode ? nodeApi.getPreNodeInContainer(singleNode) : null,
				nextNode = singleNode ? nodeApi.getNextNodeInContainer(singleNode) : null;
		if( offset > 1 || (offset === 1 && node.childNodes.length > 1) ){//	正常删除一个元素
			console.log('删除一个元素');
			if(offset === 1){
				console.log('偏移量为1的特殊位置');
				if( preNode ){
					console.log('跳到前一个节点末端');
					let previousSibling = singleNode.previousSibling,
							nextSibling = singleNode.nextSibling;
					rangeApi.setRangeOfNodeEnd(preNode);
					nodeApi.removeNode(singleNode);	//	正常删除独立的叶子节点
					if( previousSibling &&
							previousSibling.nodeType === Node.TEXT_NODE &&
							nextSibling &&
							nextSibling.nodeType === Node.TEXT_NODE ){//	前后节点都是text
						console.log('前后节点都是 text');
						parentNode.normalize();//	合并前后 text
					}
				}else if(nextNode){
					console.log('跳到后一个节点前端');
					rangeApi.setRangeOfNodeStart(nextNode);
					nodeApi.removeNode(singleNode);//	正常删除独立的叶子节点
				}else{
					console.error('按道理必定有后一个节点,不会打印此信息')
				}
			}else{
				console.log('正常删除一个元素');
					let previousSibling = singleNode.previousSibling,
							nextSibling = singleNode.nextSibling;
					rangeApi.setRangeOfNodeEnd(node.childNodes[offset - 2]);
					nodeApi.removeNode(singleNode);//	正常删除独节点
					if( previousSibling &&
							previousSibling.nodeType === Node.TEXT_NODE &&
							nextSibling &&
							nextSibling.nodeType === Node.TEXT_NODE ){//	前后节点都是text
						console.log('前后节点都是 text');
						parentNode.normalize();//	合并前后 text
					}
			}
		}else if( offset === 1 && node.childNodes.length === 1 ){//	删空元素
			console.log('删空元素', singleNode);
			deleteNodeInContainer.call(this, singleNode);
		}else if( offset === 0 ){
			console.log('在元素头部');
			if( nodeApi.isContainer(node) ){
				console.log('元素是 container, 根据 container 所在的组件, 触发对应的 deleteForwardOnStart 事件');
				deleteForwardOnStart.call(this, node, offset);
			}else{
				if( nodeApi.isStartInContainer(singleNode) ){
					console.log('根据 container 所在的组件, 触发对应的 deleteForwardOnStart 事件');
					deleteForwardOnStart.call(this, node, offset);
				}else{
					console.error('不知道的特殊情况,按照常理, node 应该是 container 内的第一个独立节点');
				}
			}
		}else{
			console.error('不知道的特殊情况');
		}
	}else{
		console.error('不知道的特殊情况');
	}
}


export function deleteNodeInContainer(node){
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
			rangeApi.setRangeOfNodeStart(nextNode);
			nodeApi.removeNode(singleNode);//删除text关联节点
		}else{//	后面没有节点
			console.log('后面没有节点');
			if( nodeApi.isContainer(parentNode) ){
				rangeApi.setCollapsedRange(parentNode, 0);
				nodeApi.removeNode(singleNode);
			}else{
				console.error('不知道的特殊情况,按照常理,前后都没有的话, 那应该已经是 container,不会打印此信息');
			}
		}
	}
}