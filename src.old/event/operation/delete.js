import * as rangApi from './range_api.js';
import * as nodeApi from '../../editor_node/node_api.js';

export function deleteOne(node, offset){
	console.log('node:', node, 'offset:', offset);
	if( node.nodeType === Node.TEXT_NODE ){
		let singleNode = nodeApi.getSingleNodeInContainer(node),
				preNode = singleNode.previousSibling,
				nextNode = singleNode.nextSibling;

		if( offset > 1 || (offset === 1 && node.length > 1) ){//	正常删除一个字符
			console.log('删除一个字符');
			if(offset === 1){
				let preNodeInContainer = nodeApi.getPreNodeInContainer(node);
				if( preNodeInContainer ){
					console.log('跳到前一个节点末端');
					rangApi.endNodeRange(preNodeInContainer);
				}else{
					console.log('光标进一');
					rangApi.setCollapsedRange(node, 0);
				}
			}else{
				console.log('光标进一');
				rangApi.setCollapsedRange(node, offset - 1);
			}
			node.deleteData(offset - 1, 1);
		}else if( offset === 1 && node.length === 1 ){//	删空 text
			console.log('删空 text');
			if( preNode ){//	前面有节点
				console.log('前面有节点');
				rangApi.endNodeRange(preNode);
				nodeApi.removeNode(singleNode);//	删除text关联空节点
				if( preNode.nodeType === Node.TEXT_NODE &&
						nextNode && nextNode.nodeType === Node.TEXT_NODE ){//	前后节点都是text
					console.log('前后节点都是text');
					preNode.parentNode.normalize();//	合并前后 text
				}
			}else{//	前面没有节点
				console.log('前面没有节点');
				if( nextNode ){//	后面有节点
					console.log('后面有节点');
					rangApi.startNodeRange(nextNode);
					nodeApi.removeNode(singleNode);//删除text关联节点
				}else{//	后面没有节点
					console.log('后面没有节点');
					let parentNode = singleNode.parentNode;
					if( nodeApi.isContainer(parentNode) ){
						rangApi.setCollapsedRange(parentNode, 0);
						nodeApi.removeNode(singleNode);
					}else{
						console.error('不知道的特殊情况,按照常理,前后都没有的话，那应该已经是 container,不会打印此信息')
					}
				}
			}
		}else if( offset === 0 ){//	在 text 头部
			console.log('在 text 头部, text 存在字符');
			if( nodeApi.isStartInContainer(singleNode) ){
				console.log('根据 container 所在的组件, 触发对应的 backspaceOnStart 事件');
			}else{
				console.error('不知道的特殊情况,按照常理,应该是 container 内的第一个独立节点')
			}
		}else{//	不知道的特殊情况
			console.error('不知道的特殊情况');
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		let element = node.childNodes[ offset !== 0 ? offset - 1 : 0],
				singleNode = nodeApi.getSingleNodeInContainer(element),
				parentNode = singleNode ? singleNode.parentNode : null,
				preNode = singleNode ? singleNode.previousSibling : null,
				nextNode = singleNode ? singleNode.nextSibling : null;

		if( offset > 1 || (offset === 1 && node.childNodes.length > 1) ){//	正常删除一个元素
			console.log('删除一个元素');
			if(offset === 1){
				let preNodeInContainer = nodeApi.getPreNodeInContainer(element);
				if( preNodeInContainer ){
					console.log('跳到前一个节点末端');
					rangApi.endNodeRange(preNodeInContainer);
					nodeApi.removeNode(singleNode);//	正常删除独立的叶子节点
					if( preNodeInContainer.nextSibling &&
						preNodeInContainer.nodeType === Node.TEXT_NODE && 
						preNodeInContainer.nextSibling.nodeType === Node.TEXT_NODE ){
						console.log('前后节点都是 text');
						parentNode.normalize();
					}
				}else{
					console.log('光标到 container 头部');
					rangApi.setCollapsedRange(node, 0);
					nodeApi.removeNode(singleNode);//	正常删除独立的叶子节点
				}
			}else{
				console.log('光标进入前一个元素的末端:', node.childNodes[offset - 2]);
				rangApi.endNodeRange(node.childNodes[offset - 2]);
				nodeApi.removeNode(singleNode);//	正常删除独立的叶子节点
				if( preNode ){
					if(preNode.nodeType === Node.TEXT_NODE && 
							nextNode && nextNode.nodeType === Node.TEXT_NODE){
						console.log('前后节点都是 text');
						parentNode.normalize();
					}
				}
			}
		}else if( offset === 1 && node.childNodes.length === 1 ){//	删空元素
			console.log('删空元素', singleNode);
			if( preNode ){
				console.log('前面有节点');
				rangApi.endNodeRange(preNode);
				nodeApi.removeNode(singleNode);
				if(preNode.nodeType === Node.TEXT_NODE && 
						nextNode && nextNode.nodeType === Node.TEXT_NODE){
					console.log('前后节点都是 text');
					parentNode.normalize();
				}
			}else{
				console.log('前面没有节点');
				if( nextNode ){
					console.log('后面有节点');
					rangApi.startNodeRange(nextNode);
					nodeApi.removeNode(singleNode);
				}else{
					console.log('后面没有节点');
					if( nodeApi.isContainer(parentNode) ){
						rangApi.setCollapsedRange(parentNode, 0);
						nodeApi.removeNode(singleNode);
					}else{
						console.error('不知道的特殊情况,按照常理,前后都没有的话，那应该已经是 container,不会打印此信息')
					}
				}
			}
		}else if( offset === 0 ){
			console.log('在元素头部');
			if( nodeApi.isContainer(node) ){
				console.log('元素是 container');
			}else{
				if( nodeApi.isStartInContainer(singleNode) ){
				console.log('根据 container 所在的组件, 触发对应的 backspaceOnStart 事件');
				}else{
					console.error('不知道的特殊情况,按照常理,应该是 container 内的第一个独立节点');
				}
			}
		}else{
			console.error('不知道的特殊情况');
		}
	}else{
		console.error('不知道的特殊情况');
	}
}

export function deleteRange(startNode, startOffset, endNode, endOffset){
	
}
