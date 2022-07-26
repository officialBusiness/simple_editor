import { isImgContainer, isImgTitle } from './delete_forward.js';

export default function deleteFragment(startContainer, startOffset, endContainer, endOffset){
	console.log('%c执行 deleteFragment', 'color: #000000; background-color: #ffffff');
	console.log('startContainer:', startContainer, '\nstartOffset:', startOffset, '\nendContainer:', endContainer, '\nendOffset:', endOffset);
	let { rangeApi, nodeApi } = this;

	if( startContainer && endContainer ){
		console.log('fragment 在 container 中');
		let 
				block = nodeApi.getBlock(startContainer),
				preBlock = nodeApi.getPreBlock(block),
				startContainerNode = nodeApi.getContainer(startContainer),
				endContainerNode = nodeApi.getContainer(endContainer);

		if( isImgContainer(startContainerNode) ){
			console.log('startContainer 在 img_container 中');
			if( startOffset === 0 ){
				console.log('startOffset 偏移量为 0');
				let lastContainer = this.executeHelpEvent(preBlock, this.helpEventType.getLastContainer, [preBlock]);
				rangeApi.setRangeOfNodeEnd(lastContainer);
				nodeApi.removeNode(block);
			}else if( isImgTitle(endContainerNode) ){
				console.log('endContainerNode 在 image_title 中');
				if( endContainer.nodeType === Node.TEXT_NODE ){
					console.log('endContainer 类型为 TEXT_NODE');
					if( endOffset === endContainer.length ){
						console.log('移除 image_title');
						rangeApi.setRangeOfNodeEnd(endContainerNode.previousSibling);
						nodeApi.removeNode(endContainerNode);
					}else{
						console.log('删除 text 部分内容');
						rangeApi.setRangeOfNodeEnd(endContainerNode.previousSibling);
						endContainer.deleteData(0, endOffset);
					}
				}else if( endContainer.nodeType === Node.ELEMENT_NODE ){
					console.log('endContainer 类型为 ELEMENT_NODE');
					if( endContainer === endContainerNode ){
						if( endOffset === 0 ){
							if( endContainer.childNodes.length === 0 ){
								console.log('endContainer 节点为空, 移除 image_title');
								rangeApi.setRangeOfNodeEnd(endContainerNode.previousSibling);
								nodeApi.removeNode(endContainer);
							}else{
								console.log('endContainer 存在节点');
								rangeApi.setRangeOfNodeEnd(endContainerNode.previousSibling);
							}
						}else{
							throw new Error('不知道的情况, 需要完善');
						}
					}else{
						console.log('endContainer:', endContainer, '\nendContainerNode:', endContainerNode);
						throw new Error('按道理 endContainer 和 endContainerNode 应该相等');
					}
				}
			}else{
				throw new Error('不知道的情况, 需要完善');
			}
		}else if( isImgTitle(startContainerNode) ){
			console.log('startContainer 在 image_title 中');
			if( isImgTitle(endContainerNode) ){
				console.log('endContainerNode 在 image_title 中');
				if( endContainer.nodeType === Node.TEXT_NODE ){
					if( startOffset === 0 && endOffset === endContainer.length ){
						console.log('删空 text');
						rangeApi.setCollapsedRange(endContainerNode, 0);
						nodeApi.removeNode(endContainer);
					}else{
						console.log('删除 text 部分内容');
						rangeApi.setCollapsedRange(endContainer, startOffset);
						endContainer.deleteData(startOffset, endOffset - startOffset);
					}
				}else{
					throw new Error('目前 image_title 只允许 TEXT_NODE, 应该不会有别的类型节点存在');
				}
			}else{
				throw new Error('不知道的情况, 需要完善');
			}
		}else{
			throw new Error('不知道的情况, 需要完善');
		}

	}else if( startContainer ){
		console.log('container 后半部分在 fragment 中, 需要选择 range');
		let 
				block = nodeApi.getBlock(startContainer),
				preBlock = nodeApi.getPreBlock(block),
				startContainerNode = nodeApi.getContainer(startContainer);

		if( isImgContainer(startContainerNode) ){
			console.log('startContainer 在 img_container 中');
			if( startOffset === 0 ){
				console.log('startOffset 偏移量为 0, 移除 imageBlock');
				let lastContainer = this.executeHelpEvent(preBlock, this.helpEventType.getLastContainer, [preBlock]);
				rangeApi.setRangeOfNodeEnd(lastContainer);
				nodeApi.removeNode(block);
			}else if( startOffset === 1 ){
				console.log('startOffset 偏移量为 1');
				rangeApi.setCollapsedRange(startContainer, startOffset);
				if( startContainerNode.nextSibling ){
					nodeApi.removeNode(startContainerNode.nextSibling);
				}
			}else{
				throw new Error('不知道的情况, 需要完善');
			}
		}else if( isImgTitle(startContainerNode) ){
			console.log('startContainerNode 在 image_title 中');
			if( startContainer.nodeType === Node.TEXT_NODE ){
				console.log('startContainer 类型为 TEXT_NODE');
				if( startOffset === 0 ){
					console.log('startOffset 偏移量为 0, 删空 text');
					rangeApi.setCollapsedRange(startContainerNode, 0);
					nodeApi.removeNode(startContainer);
				}else{
					console.log('删除 text 部分内容');
					rangeApi.setCollapsedRange(startContainer, startOffset);
					startContainer.deleteData(startOffset, startContainer.length - startOffset);
				}
			}else if( startContainer.nodeType === Node.ELEMENT_NODE ){
				console.log('startContainer 类型为 ELEMENT_NODE');
				if( startContainer === startContainerNode && startContainer.childNodes.length === 0 && startOffset === 0 ){
					rangeApi.setCollapsedRange(startContainer, startOffset);
				}else{
					throw new Error('startContainer 的节点应该为空, 不应该打印此信息');
				}
			}else{
				throw new Error('不知道的情况, 需要完善');
			}
		}else{
			throw new Error('不知道的情况, 需要完善');
		}

	}else if( endContainer ){
		console.log('container 前半部分在 fragment 中, 不需要选择 range');
		let 
				block = nodeApi.getBlock(endContainer),
				endContainerNode = nodeApi.getContainer(endContainer);
		if( isImgContainer(endContainerNode) ){
			console.log('endContainer 在 img_container 中');
			if( endOffset === 0 ){
				console.log('endOffset 偏移量为 0, 不操作');
			}else{
				console.log('移除 imageBlock');
				nodeApi.removeNode(block);
			}
		}else if( isImgTitle(endContainerNode) ){
			console.log('endContainer 在 image_title 中, 移除 imageBlock');
			nodeApi.removeNode(block);
		}
	}
}