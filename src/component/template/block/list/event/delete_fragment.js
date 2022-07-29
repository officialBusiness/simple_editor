import { resetListLabel } from '../list.js';
import { isLabel, isLiContent } from './delete_forward_on_start.js'
import { deleteStartFragment, deleteCenterFragment, deleteEndFragment } from '../../paragraph/event/delete_fragment.js';

export default function deleteFragment(startContainer, startOffset, endContainer, endOffset){
	console.log('%c执行 deleteFragment', 'color: #000000; background-color: #ffffff');
	console.log('startContainer:', startContainer, '\nstartOffset:', startOffset, '\nendContainer:', endContainer, '\nendOffset:', endOffset);
	let { rangeApi, nodeApi } = this;
	if( startContainer && endContainer ){
		console.log('fragment 在 container 中');
		let startContainerNode = nodeApi.getContainer(startContainer),
				startContainerNodeLi = startContainerNode.parentNode,
				endContainerNode = nodeApi.getContainer(endContainer),
				endContainerNodeLi = endContainerNode.parentNode;

		if( startContainerNode === endContainerNode ){
			console.log('range 在同一个 container 中');
			if( rangeApi.isStartInContainer(startContainer, startOffset) ){
				console.log('startContainer 光标在 container 最前端');
				if( rangeApi.isEndInContainer(endContainer, endOffset) ){
					console.log('endContainer 光标在 container 最未端, 清空 container');
					rangeApi.setCollapsedRange(container, 0);
					nodeApi.emptyAllChild(container);
				}else{
					console.log('endContainer 光标不在 container 最未端');
					deleteStartFragment.call(this, startContainerNode, endContainer, endOffset);
				}
			}else{
				console.log('startContainer 光标不在 container 最前端');
				if( rangeApi.isEndInContainer(endContainer, endOffset) ){
					console.log('endContainer 光标在 container 最未端');
					deleteEndFragment.call(this, startContainerNode, startContainer, startOffset);
				}else{
					console.log('endContainer 光标不在 container 最未端');
					deleteCenterFragment.call(this, startContainerNode, startContainer, startOffset, endContainer, endOffset);
				}
			}
		}else if( startContainerNodeLi === endContainerNodeLi ){
			console.log('range 在不同的 container 中, 但是在同一个 liContainer 中');
			if( isLabel(startContainerNode) && isLiContent(endContainerNode) ){
				if( rangeApi.isStartInContainer(startContainer, startOffset) ){
					console.log('startContainer 光标在 label container 最前端, 删空 li label');
					emptyLiLabel.call(this, startContainerNodeLi);
					rangeApi.setCollapsedRange(startContainerNode, 0)
				}else if( rangeApi.isEndInContainer(startContainer, startOffset) ){
					console.log('startContainer 光标在 label container 最未端, 无操作');
					rangeApi.setRangeOfNodeEnd(startContainerNode);
				}else{
					console.log('startContainer 光标在 label container 中间');
					deleteEndFragment.call(this, startContainerNode, startContainer, startOffset);
				}

				if( rangeApi.isStartInContainer(endContainer, endOffset) ){
					console.log('startContainer 光标在 li container 最前端, 无操作');

				}else if( rangeApi.isEndInContainer(endContainer, endOffset) ){
					console.log('startContainer 光标在 li container 最未端, 删空 li content');
					emptyLiContent.call(this, startContainerNodeLi);
				}else{
					console.log('endContainer 光标在 li container 中间');
					deleteStartFragment.call(this, endContainerNode, endContainer, endOffset, false);
				}
			}else{
				console.error('startContainerNode:', startContainerNode, '\nendContainerNode:', endContainerNode);
				throw new Error('这种情况 startContainer 应该咋 label, endContainer 应该在 liContainer 中, 不应该打印此信息');
			}
		}else{
			console.log('range 在不同的 liContainer 中');
			while( startContainerNodeLi.nextSibling !== endContainerNodeLi ){
				nodeApi.removeNode(startContainerNodeLi.nextSibling);
			}

			if( rangeApi.isStartInContainer(startContainer, startOffset) ){
				nodeApi.emptyAllChild(startContainerNode);
				rangeApi.setCollapsedRange(startContainerNode, 0);
			}else if( rangeApi.isEndInContainer(startContainer, startOffset) ){
				rangeApi.setRangeOfNodeEnd(startContainerNode);
			}else{
				deleteEndFragment.call(this, startContainerNode, startContainer, startOffset);
			}
			if( isLabel(startContainerNode) ){
				console.log('startContainerNode 是 label');
				emptyLiContent.call(this, startContainerNodeLi);
			}

			if( rangeApi.isStartInContainer(endContainer, endOffset) ){

			}else if( rangeApi.isEndInContainer(endContainer, endOffset) ){
				nodeApi.emptyAllChild(endContainerNode);
			}else{
				deleteStartFragment.call(this, endContainerNode, endContainer, endOffset, false);
			}

			if( isLiContent(endContainerNode) ){
				console.log('endContainerNode 是 liContainer');
				emptyLiLabel.call(this, endContainerNodeLi);
			}
			nodeApi.mergeTwoNodes(startContainerNodeLi.childNodes[1], endContainerNodeLi.childNodes[1]);
			nodeApi.removeNode(endContainerNodeLi);
		}
		resetListLabel(startContainerNodeLi.parentNode);
	}else if( startContainer ){
		console.log('container 后半部分在 fragment 中, 需要选择 range');
		let startContainerNode = nodeApi.getContainer(startContainer),
				startContainerNodeLi = startContainerNode.parentNode;

		while( startContainerNodeLi.nextSibling ){
			nodeApi.removeNode(startContainerNodeLi.nextSibling);
		}

		if( isLabel(startContainerNode) ){
			console.log('startContainerNode 是 label');
			emptyLiContent.call(this, startContainerNodeLi);
			if( rangeApi.isStartInContainer(startContainer, startOffset) ){
				console.log('startContainer 光标在 container 最前端');
				emptyLiLabel.call(this, startContainerNodeLi);
				rangeApi.setCollapsedRange(startContainerNode, 0);
			}else if( rangeApi.isEndInContainer(startContainer, startOffset) ){
				console.log('startContainer 光标在 container 最未端');
				rangeApi.setRangeOfNodeEnd(startContainerNode);
			}else{
				console.log('startContainer 光标在 container 中间');
				deleteEndFragment.call(this, startContainerNode, startContainer, startOffset);
			}
		}else if(isLiContent(startContainerNode)){
			console.log('startContainerNode 是 liContainer');
			if( rangeApi.isStartInContainer(startContainer, startOffset) ){
				console.log('startContainer 光标在 container 最前端');
				emptyLiContent.call(this, startContainerNodeLi);
				rangeApi.setCollapsedRange(startContainerNode, 0);
			}else if( rangeApi.isEndInContainer(startContainer, startOffset) ){
				console.log('startContainer 光标在 container 最未端');
				rangeApi.setRangeOfNodeEnd(startContainerNode);
			}else{
				console.log('startContainer 光标在 container 中间');
				deleteEndFragment.call(this, startContainerNode, startContainer, startOffset);
			}
		}

	}else if( endContainer ){
		console.log('container 前半部分在 fragment 中, 不需要选择 range');
		let endContainerNode = nodeApi.getContainer(endContainer),
				endContainerNodeLi = endContainerNode.parentNode;

		while( endContainerNodeLi.previousSibling ){
			nodeApi.removeNode(endContainerNodeLi.previousSibling);
		}

		if( isLabel(endContainerNode) ){
			console.log('endContainerNode 是 label');
			if( rangeApi.isStartInContainer(endContainer, endOffset) ){
				console.log('endContainerNode 光标在 container 最前端');
			}else if( rangeApi.isEndInContainer(endContainer, endOffset) ){
				console.log('endContainerNode 光标在 container 最未端');
				emptyLiLabel.call(this, endContainerNodeLi);
			}else{
				console.log('endContainerNode 光标在 container 中间');
				deleteStartFragment.call(this, endContainerNode, endContainer, endOffset, false);
			}
		}else if( isLiContent(endContainerNode) ){
			console.log('endContainerNode 是 liContainer');
			emptyLiLabel.call(this, endContainerNodeLi);
			if( rangeApi.isStartInContainer(endContainer, endOffset) ){
				console.log('endContainerNode 光标在 container 最前端');

			}else if( rangeApi.isEndInContainer(endContainer, endOffset) ){
				console.log('endContainerNode 光标在 container 最未端');
				emptyLiContent.call(this, endContainerNodeLi);
			}else{
				console.log('endContainerNode 光标在 container 中间');
				deleteStartFragment.call(this, endContainerNode, endContainer, endOffset, false);
			}
		}


	}else{
		console.error('startContainer:', startContainer, 'startOffset:', startOffset, 'endContainer:', endContainer, 'endOffset:', endOffset);
		throw new Error('不知道的特殊情况');
	}
}

export function emptyLi(li){
	this.nodeApi.emptyAllChild(li.childNodes[0]);
	this.nodeApi.emptyAllChild(li.childNodes[1]);
}

export function emptyLiContent(li){
	this.nodeApi.emptyAllChild(li.childNodes[1]);
}

export function emptyLiLabel(li){
	this.nodeApi.emptyAllChild(li.childNodes[0]);
}


