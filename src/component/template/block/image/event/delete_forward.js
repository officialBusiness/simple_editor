
export default function deleteForward(node, offset){
	console.log('%c执行 deleteForward', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset);

	let { rangeApi, nodeApi } = this,
			block = nodeApi.getBlock(node),
			preBlock = nodeApi.getPreBlock(block),
			container = nodeApi.getContainer(node);

	if( isImgContainer(container) ){
		console.log('在 img_container 中');
		let lastContainer = this.executeHelpEvent(preBlock, this.helpEventType.getLastContainer, [preBlock]);
		rangeApi.setRangeOfNodeEnd(lastContainer);
		if( offset === 0 ){
		}else if( offset === 1 ){
			nodeApi.removeNode(block);
		}else{
			throw new Error('offset 应该是 0 或者 1');
		}
	}else if( isImgTitle(container) ){
		console.log('在 image_title 中');
		if( node.nodeType === Node.TEXT_NODE ){
			if( nodeApi.isStartInContainer(node) ){
				if( offset === 0 ){
					console.log('偏移量为 0');
					rangeApi.setRangeOfNodeEnd(container.previousSibling);
				}else{
					if( offset === 1 && node.length === 1 ){
						console.log('删空 text');
						rangeApi.setCollapsedRange(container, 0);
						nodeApi.removeNode(node);
					}else{
						console.log('光标进一');
						rangeApi.setCollapsedRange(node, offset - 1);
						node.deleteData(offset - 1, 1);
					}
				}
			}else{
				throw new Error('node 应该为 container 的第一个节点');
			}
		}else if( node.nodeType === Node.ELEMENT_NODE ){
			if( offset === 0 ){
				console.log('偏移量为 0, 移除 image_title');
				rangeApi.setRangeOfNodeEnd(container.previousSibling);
				nodeApi.removeNode(container);
			}else{
				throw new Error('image_title 只有偏移量为 0 ,节点内容为空时, node 类型才会是 ELEMENT_NODE');
			}
		}
	}else{
		throw new Error('image 内不应该有别的类型 container');
	}
}

export function isImgContainer(container){
	return container.className === 'img_container';
}

export function isImgTitle(container){
	return container.className === 'image_title';
}