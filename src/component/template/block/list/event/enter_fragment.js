

export default function enterFragment(startContainer, startOffset, endContainer, endOffset){
	console.log('%c执行 enterFragment', 'color: #000000; background-color: #ffffff');
	console.log('startContainer:', startContainer, '\nstartOffset:', startOffset, '\nendContainer:', endContainer, '\nendOffset:', endOffset);
	let { rangeApi, nodeApi } = this;

	if( startContainer && endContainer ){
		console.log('fragment 在 container 中');

	}else if( startContainer ){
		console.log('container 后半部分在 fragment 中, 不需要选择 range');

	}else if( endContainer ){
		console.log('container 前半部分在 fragment 中, 需要选择 range');

	}else{
		console.error('startContainer:', startContainer, 'startOffset:', startOffset, 'endContainer:', endContainer, 'endOffset:', endOffset);
		throw new Error('不知道的特殊情况');
	}
}