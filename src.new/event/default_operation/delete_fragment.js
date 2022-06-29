import { deleteNodeInContainer } from './delete_forward.js'

export default function deleteFragment(){
	let { rangeApi, nodeApi } = this,
			range = rangeApi.getRange(),
			{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
			

	console.log('执行 deleteFragment:')
	console.log('startContainer:', startContainer, 'startOffset:', startOffset, 'endContainer:', endContainer, 'endOffset:', endOffset);

	if(startContainer === endContainer){//	在同一个 dom 中
		console.log('在同一个 dom 中');
		if(startContainer.nodeType === Node.TEXT_NODE){//	是 text
			console.log('在同一个 text 中');
			if( startOffset === 0 && endOffset === startContainer.length ){//	需要删空 text
				console.log('需要删空 text');
				deleteNodeInContainer.call(this, startContainer);
			}else{
				console.log('删除 text 中的部分字符');
				rangeApi.setCollapsedRange(startContainer, startOffset);
				startContainer.deleteData(startOffset, endOffset - startOffset);
			}
		}else if(startContainer.nodeType === Node.ELEMENT_NODE){
			console.log('在同一个 element 中');
			if( startOffset === 0 && endOffset === startContainer.childNodes.length ){
				console.log('需要删空 element');
				deleteOneNode.call(this, startContainer);
			}else{
				console.log('正常的删除多个元素')
				if( startOffset === 0 ){
					console.log('偏移量为 0');
					let	preNode = nodeApi.getPreNodeInContainer(startContainer.childNodes[0]),
							nextNode = nodeApi.getNextNodeInContainer(startContainer.childNodes[endOffset - 1]);
					if( preNode ){
						console.log('前面有节点');
						rangeApi.setRangeOfNodeEnd(preNode);
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
					rangeApi.setRangeOfNodeEnd(startContainer.childNodes[startOffset - 1]);
				}
				for(let i = endOffset - 1; i >= startOffset; i--){
					nodeApi.removeNode(startContainer.childNodes[i]);
				}
			}
		}
	}else{
		console.log('在同一个 container 中的不同的 dom ');


	}
}