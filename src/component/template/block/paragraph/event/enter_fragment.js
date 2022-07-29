import { deleteStartFragment, deleteEndFragment } from './delete_fragment.js';

export default function enterFragment(startContainer, startOffset, endContainer, endOffset){
	console.log('%c执行 enterFragment', 'color: #000000; background-color: #ffffff');
	console.log('startContainer:', startContainer, '\nstartOffset:', startOffset, '\nendContainer:', endContainer, '\nendOffset:', endOffset);
	let { rangeApi, nodeApi } = this;

	if( startContainer && endContainer ){
		console.log('fragment 在 container 中');
		let container = nodeApi.getContainer(startContainer),
				newContainer = container.cloneNode(false);

		if( rangeApi.isStartInContainer(startContainer, startOffset) ){
			console.log('startContainer 光标在 container 最前端');
			if( rangeApi.isEndInContainer(endContainer, endOffset) ){
				console.log('endContainer 光标在 container 最未端, 清空 container');

				nodeApi.insertAfter( newContainer, container );
				rangeApi.setCollapsedRange(newContainer, 0);
				nodeApi.emptyAllChild(container);
			}else{
				console.log('endContainer 光标不在 container 最未端');

				nodeApi.insertBefore( newContainer, container );
				deleteStartFragment.call(this, container, endContainer, endOffset);
			}
		}else{
			console.log('startContainer 光标不在 container 最前端');
			if( rangeApi.isEndInContainer(endContainer, endOffset) ){
				console.log('endContainer 光标在 container 最未端');

				nodeApi.insertAfter( newContainer, container );
				rangeApi.setCollapsedRange(newContainer, 0);
				deleteEndFragment.call(this, container, startContainer, startOffset, false);
			}else{
				console.log('endContainer 光标不在 container 最未端');
				enterCenterFragment.call(this, container, startContainer, startOffset, endContainer, endOffset);

			}

		}
	}else if( startContainer ){
		console.log('container 后半部分在 fragment 中, 不需要选择 range');
		let container = nodeApi.getContainer(startContainer);
		if( rangeApi.isStartInContainer(startContainer, startOffset) ){
			console.log('startContainer 光标在 container 最前端, 清空 container');
			nodeApi.emptyAllChild(container);
		}else if( rangeApi.isEndInContainer(startContainer, startOffset) ){
			console.log('startContainer 光标在 container 最未端, 无操作');
		}else{
			console.log('startContainer 光标在 container 中间');
			deleteEndFragment.call(this, container, startContainer, startOffset, false);
		}
	}else if( endContainer ){
		console.log('container 前半部分在 fragment 中, 需要选择 range');
		let container = nodeApi.getContainer(endContainer);
		if( rangeApi.isStartInContainer(endContainer, endOffset) ){
			console.log('endContainer 光标在 container 最前端, 光标重叠选择 container 最前端');
			if( endContainer.childNodes.length > 0 ){
				rangeApi.setRangeOfNodeStart(endContainer);
			}else{
				rangeApi.setCollapsedRange(endContainer, 0);
			}
		}else if( rangeApi.isEndInContainer(endContainer, endOffset) ){
			console.log('endContainer 光标在 container 最未端, 清空 container');
			nodeApi.emptyAllChild(container);
			rangeApi.setCollapsedRange(container, 0);
		}else{
			console.log('endContainer 光标在 container 中间');
			deleteStartFragment.call(this, container, endContainer, endOffset);
		}
	}else{
		console.error('startContainer:', startContainer, 'startOffset:', startOffset, 'endContainer:', endContainer, 'endOffset:', endOffset);
		throw new Error('不知道的特殊情况');
	}
}

export function enterCenterFragment(container, startContainer, startOffset, endContainer, endOffset){
	console.log('%c删除 container 中间部分片段', 'color: #000000; background-color: #ffffff');
	let { rangeApi, nodeApi } = this,
			endFragment = nodeApi.splitFromNodeOffsetStillTop(endContainer, endOffset, container);

	deleteEndFragment.call(this, container, startContainer, startOffset, false);

	nodeApi.insertAfter(endFragment, container);
	rangeApi.setRangeOfNodeStart(endFragment);
}
