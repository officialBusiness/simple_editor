// 向 container 中插入文字

export default function insertText(string, node, offset){
	let { rangeApi, nodeApi } = this,
			collapsed = rangeApi.getRange().collapsed;

	if( collapsed ){
		console.log('光标单个闪烁')

		if( node.nodeType === Node.TEXT_NODE ){
			console.log('node 类型为 text , 直接插入文字');
			node.insertData(offset, string);
			rangeApi.setCollapsedRange(node, offset + string.length);
		}else if( node.nodeType === Node.ELEMENT_NODE ){
			console.log('node 类型为元素');
			// console.log('node.childNodes[offset]:', node.childNodes[offset - 1]);
			if( offset > 0 ){
				let nextStartNode = nodeApi.getNextStartNodeInContainer(node.childNodes[offset- 1]);
				if( nextStartNode ){
					console.log('node 存在后一个叶子节点');
					if( nextStartNode.nodeType === Node.TEXT_NODE ){
						console.log('node 后一个叶子节点是 text');
						nextStartNode.insertData(0, string);
						rangeApi.setCollapsedRange(nextStartNode, string.length);
					}else if( node.nodeType === Node.ELEMENT_NODE ){
						console.log('node 后一个叶子节点是元素');
						let text = nodeApi.createTextNode(string);
						// element 在 container 中为单独的元素，可以直接插入
						nodeApi.insertBefore(text, nextStartNode);
						rangeApi.setCollapsedRange(text, text.length);
					}
				}else{
					console.log('node 不存在后一个叶子节点');
					let text = nodeApi.createTextNode(string);
					nodeApi.insertAfter(text, node.childNodes[offset- 1]);
					rangeApi.setCollapsedRange(text, text.length);
				}
			}else if( offset === 0 ){
				let preEndNode = nodeApi.getPreEndNodeInContainer(node.childNodes[0]);
				if( preEndNode ){
					console.error('按照常理 offset 为 0 时, 不应该存在前一个叶子节点');
				}else{
					console.log('node 不存在前一个叶子节点');
					let text = nodeApi.createTextNode(string);
					nodeApi.insertBefore(text, node.childNodes[0]);
					rangeApi.setCollapsedRange(text, text.length);
				}
			}else{
				console.error('不应该存在的情况');
			}
		}
	}else{

	}
	return this;
}