import { isImgContainer, isImgTitle } from './delete_forward.js';

export default function enterFragment(startContainer, startOffset, endContainer, endOffset){
	console.log('%c执行 enterFragment', 'color: #000000; background-color: #ffffff');
	console.log('startContainer:', startContainer, '\nstartOffset:', startOffset, '\nendContainer:', endContainer, '\nendOffset:', endOffset);
	let { rangeApi, nodeApi } = this;

	if( startContainer && endContainer ){
		console.log('fragment 在 container 中');
		let 
				block = nodeApi.getBlock(startContainer),
				nextBlock = nodeApi.getNextBlock(block),
				startContainerNode = nodeApi.getContainer(startContainer),
				endContainerNode = nodeApi.getContainer(endContainer);

		if( isImgContainer(startContainerNode) ){
			console.log('startContainer 在 img_container 中');
			if( startOffset === 0 ){
				console.log('startOffset 偏移量为 0');
				let firstContainer = this.executeHelpEvent(nextBlock, this.helpEventType.getLastContainer, [nextBlock]);
				rangeApi.setRangeOfNodeStart(firstContainer);
				nodeApi.removeNode(block);
			}else if( isImgTitle(endContainerNode) ){
				console.log('endContainerNode 在 image_title 中');
				if( endContainer.nodeType === Node.TEXT_NODE ){
					console.log('endContainer 类型为 TEXT_NODE');
					if( endOffset === endContainer.length ){
						console.log('移除 image_title');
						let firstContainer = this.executeHelpEvent(nextBlock, this.helpEventType.getLastContainer, [nextBlock]);
						rangeApi.setRangeOfNodeStart(firstContainer);
						nodeApi.removeNode(endContainerNode);
					}else{
						console.log('删除 text 部分内容');
						rangeApi.setCollapsedRange(endContainer, endOffset);
						endContainer.deleteData(0, endOffset);
					}
				}else if( endContainer.nodeType === Node.ELEMENT_NODE ){
					console.log('endContainer 类型为 ELEMENT_NODE');
					if( endContainer === endContainerNode ){
						if( endOffset === 0 ){
							if( endContainer.childNodes.length === 0 ){
								console.log('endContainer 节点为空, range 选择 endContainer');
								rangeApi.setCollapsedRange(endContainerNode, 0);
							}else{
								console.log('endContainer 存在节点 range 选择 endContainer中的 text 头部');
								rangeApi.setRangeOfNodeStart(endContainerNode);
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

		}
	}else if( startContainer ){
		console.log('container 后半部分在 fragment 中, 不需要选择 range');
		let 
			block = nodeApi.getBlock(startContainer),
			startContainerNode = nodeApi.getContainer(startContainer);

		if( isImgContainer(startContainerNode) ){
			console.log('startContainer 在 img_container 中');
			if( startOffset === 0 ){
				console.log('startOffset 偏移量为 0, 移除 imageBlock');
				let lastContainer = this.executeHelpEvent(preBlock, this.helpEventType.getLastContainer, [preBlock]);
				nodeApi.removeNode(block);
			}else if( startOffset === 1 ){
				console.log('startOffset 偏移量为 1');
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
					console.log('startOffset 偏移量为 0, 删除 image_title');
					nodeApi.removeNode(startContainerNode);
				}else{
					console.log('删除 text 部分内容');
					startContainer.deleteData(startOffset, startContainer.length - startOffset);
				}
			}else if( startContainer.nodeType === Node.ELEMENT_NODE ){
				console.log('startContainer 类型为 ELEMENT_NODE 无操作');
			}else{
				throw new Error('不知道的情况, 需要完善');
			}
		}else{
			throw new Error('不知道的情况, 需要完善');
		}

	}else if( endContainer ){
		console.log('container 前半部分在 fragment 中, 需要选择 range');
		let 
			block = nodeApi.getBlock(endContainer),
			nextBlock = nodeApi.getNextBlock(block),
			endContainerNode = nodeApi.getContainer(endContainer);

		if( isImgContainer(endContainerNode) ){
			console.log('endContainer 在 img_container 中');
			if( endOffset === 0 ){
				console.log('endOffset 偏移量为 0, range 选择 img_container 头部');
				rangeApi.setRangeOfNodeStart(endContainerNode);
			}else{
				console.log('移除 imageBlock');
				let firstContainer = this.executeHelpEvent(nextBlock, this.helpEventType.getLastContainer, [nextBlock]);
				rangeApi.setRangeOfNodeStart(firstContainer);
				nodeApi.removeNode(block);
			}
		}else if( isImgTitle(endContainerNode) ){
			console.log('endContainer 在 image_title 中, 移除 imageBlock');
			let firstContainer = this.executeHelpEvent(nextBlock, this.helpEventType.getLastContainer, [nextBlock]);
			rangeApi.setRangeOfNodeStart(firstContainer);
			nodeApi.removeNode(block);
		}
	}
}