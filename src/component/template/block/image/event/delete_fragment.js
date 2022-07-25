
export default function deleteFragment(startContainer, startOffset, endContainer, endOffset){
	console.log('%c执行 deleteFragment', 'color: #000000; background-color: #ffffff');
	console.log('startContainer:', startContainer, '\nstartOffset:', startOffset, '\nendContainer:', endContainer, '\nendOffset:', endOffset);
	let { rangeApi, nodeApi } = this;
	if( startContainer && endContainer ){
		console.log('fragment 在 container 中');
		let startContainerNode = nodeApi.getContainer(startContainer),
				endContainerNode = nodeApi.getContainer(endContainer);
	}else if( startContainer ){
		console.log('container 后半部分在 fragment 中');
		let startContainerNode = nodeApi.getContainer(startContainer);

	}else if( endContainer ){
		console.log('container 前半部分在 fragment 中');
		let endContainerNode = nodeApi.getContainer(endContainer);

	}
}