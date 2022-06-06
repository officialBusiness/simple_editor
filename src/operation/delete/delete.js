import * as rangApi from '../../operation/range_api.js';
import * as nodeApi from '../../editor_node/node_api.js';

export function deleteOne(node, offset){
	console.log('node:', node, 'offset:', offset);
	if( node.nodeType === Node.TEXT_NODE ){
		let oneChildNodeRoot = nodeApi.findOneChildNodeRoot(node),
				// preNode = oneChildNodeRoot.previousSibling,
				preNode = nodeApi.getPreNodeInContainer(oneChildNodeRoot),
				nextNode = oneChildNodeRoot.nextSibling;

		console.log('oneChildNodeRoot:', oneChildNodeRoot);
		console.log('preNode:', preNode);
		console.log('oneChildNodeRoot.previousSibling:', oneChildNodeRoot.previousSibling);
		console.log('nextNode:', nextNode);
			
		if( offset > 1 || (offset === 1 && node.length > 1) ){//	正常删除一个字符
			console.log('正常删除一个字符');
			rangApi.setCollapsedRange(node, offset - 1);
			node.deleteData(offset - 1, 1);
		}else if( offset === 1 && node.length === 1 ){//	删空 text
			console.log('删空 text');
			if( preNode ){//	前面有节点
				console.log('前面有节点');
				rangApi.endNodeRange(preNode);
				nodeApi.removeNode(oneChildNodeRoot);//	删除text关联空节点
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
					nodeApi.removeNode(oneChildNodeRoot);//删除text关联节点
				}else{//	后面没有节点
					console.log('后面没有节点');
					let parentNode = oneChildNodeRoot.parentNode;
					if( nodeApi.isContainer(parentNode) ){
						rangApi.setCollapsedRange(parentNode, 0);
						nodeApi.removeNode(oneChildNodeRoot);
					}else{
						console.error('不知道的特殊情况,按照常理,前后都没有的话，那应该已经是 container,不会打印此信息')
					}
				}
			}
		}else if( offset === 0 ){//	在 text 头部
			console.log('在 text 头部, text 存在字符');

		}else{//	不知道的特殊情况
			console.error('不知道的特殊情况');
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		let element = node.childNodes[offset - 1],
				oneChildNodeRoot = nodeApi.findOneChildNodeRoot(element),
				parentNode = oneChildNodeRoot ? oneChildNodeRoot.parentNode : null,
				preNode = oneChildNodeRoot ? oneChildNodeRoot.previousSibling : null,
				nextNode = oneChildNodeRoot ? oneChildNodeRoot.nextSibling : null;

		if( offset > 1 || (offset === 1 && node.childNodes.length > 1) ){//	正常删除一个元素
			console.log('正常删除一个元素');
			rangApi.setCollapsedRange(node, offset - 1);
			nodeApi.removeNode(oneChildNodeRoot);//	正常删除独立的叶子节点
		}else if( offset === 1 && node.childNodes.length === 1 ){//	删空元素
			console.log('删空元素', oneChildNodeRoot);
			if( preNode ){
				console.log('前面有节点');
				rangApi.endNodeRange(preNode);
				nodeApi.removeNode(oneChildNodeRoot);
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
					nodeApi.removeNode(oneChildNodeRoot);
				}else{
					console.log('后面没有节点');
					if( nodeApi.isContainer(parentNode) ){
						rangApi.setCollapsedRange(parentNode, 0);
						nodeApi.removeNode(oneChildNodeRoot);
					}else{
						console.error('不知道的特殊情况,按照常理,前后都没有的话，那应该已经是 container,不会打印此信息')
					}
				}
			}
		}else if( offset === 0 ){
			console.log('在元素头部, 元素存在子节点');
			if( nodeApi.isContainer(node) ){
				console.log('元素是 container', '合并');
			}else{

				console.log('元素不是 container ,那就是在 container 子节点')
			}
			// if(){

			// }
		}
		else{
			console.error('不知道的特殊情况');
		}
		// console.log('元素是叶子节点');
		// if(preNode){
		// 	rangApi.endNodeRange(preNode);
		// }else{
		// 	rangApi.setCollapsedRange(node.parentNode, 0);
		// }
		// nodeApi.removeNode(oneChildNodeRoot);//	删除独立的叶子节点
	}else{
		console.error('不知道的特殊情况');
	}
	console.log('range', rangApi.getRange());
}

export function deleteRange(startNode, startOffset, endNode, endOffset){

}
