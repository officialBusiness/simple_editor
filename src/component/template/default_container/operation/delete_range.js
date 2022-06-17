import { deleteOneNode } from './delete_one.js';

export default function deleteRange(startNode, startOffset, endNode, endOffset){
	console.info('deleteRange:', startNode, startOffset, endNode, endOffset);
	let	{ rangeApi, nodeApi } = this;
	
	if( startNode === endNode ){//	在同一个 dom 中
		console.log('在同一个 dom 中');
		if( startNode.nodeType === Node.TEXT_NODE ){//	是 text
			console.log('是 text');
			if( startOffset === 0 && endOffset === startNode.length ){//	需要删空 text
				console.log('需要删空 text');
				// 与 deleteOne 中的删空 text 代码相同
				deleteOneNode.call(this, startNode);
			}else{
				console.log('正常删除 text 中的部分字符');
				rangeApi.setCollapsedRange(startNode, startOffset);
				startNode.deleteData(startOffset, endOffset - startOffset);
			}
		}else if( startNode.nodeType === Node.ELEMENT_NODE ){
			console.log('是 element');
			if( startOffset === 0 && endOffset === startNode.childNodes.length ){
				console.log('需要删空 element');
				deleteOneNode.call(this, startNode);
			}else{
				console.log('正常的删除多个元素')
				if( startOffset === 0 ){
					console.log('偏移量为 0');
					let	preNode = nodeApi.getPreNodeInContainer(startNode.childNodes[0]),
							nextNode = nodeApi.getNextNodeInContainer(startNode.childNodes[endOffset - 1]);
					if( preNode ){
						console.log('前面有节点');
						rangeApi.endNodeRange(preNode);
					}else{
						console.log('前面没有节点');
						if( nextNode ){//	后面有节点
							console.log('后面有节点');
							rangeApi.startNodeRange(nextNode);
						}else{
							console.error('不知道的特殊情况,按照常理,后面应该是存在节点,不会打印此信息');
						}
					}
				}else{
					console.log('偏移量不为 0:', startOffset);
					rangeApi.endNodeRange(startNode.childNodes[startOffset - 1]);
				}
				for(let i = endOffset - 1; i >= startOffset; i--){
					nodeApi.removeNode(startNode.childNodes[i]);
				}
			}
		}else{
			console.error('不知道的特殊情况');
		}
	}else{
		console.log('在同一个 container 中的不同的 dom ');
		
	}
}