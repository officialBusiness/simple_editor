
export default function deleteForwardOnStart(node, offset){
	console.log('%c执行 deleteForwardOnStart', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset);


	let { rangeApi, nodeApi } = this,
			container = nodeApi.getContainer(node);

	

}


export function isLabel(container){
	return container.className === 'label';
}

export function isLiContent(container){
	return container.className === 'li_content';
}