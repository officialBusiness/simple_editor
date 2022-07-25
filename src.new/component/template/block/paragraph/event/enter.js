

export default function enter(node, offset){
	console.log('%c执行 enter', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset);

	let { rangeApi, nodeApi } = this,
			container = nodeApi.getContainer(node),
			newContainer = container.cloneNode(false);

	console.log('paragraph 执行 enter:', node, offset);
	if( rangeApi.isStartInContainer(node, offset) ){
		console.log('在 container 头部');

		nodeApi.insertBefore( newContainer, container );
	}else if( rangeApi.isEndInContainer(node, offset) ){
		console.log('在 container 末端');

		nodeApi.insertAfter( newContainer, container );
		rangeApi.setCollapsedRange(newContainer, 0);
	}else{
		console.log('需要拆分 container:', container);
		let splitedNode = nodeApi.splitFromNodeOffsetStillTop(node, offset, container);

		nodeApi.insertAfter( splitedNode, container );
		rangeApi.setRangeOfNodeStart(splitedNode);
	}
}