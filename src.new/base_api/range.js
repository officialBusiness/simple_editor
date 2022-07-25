import * as nodeApi from './node.js';

// 判断 range 是否是 container 的开端
export function isStartInContainer(node, offset){
	if( offset === 0 ){
		let parentNode = node.parentNode;
		while( nodeApi.isNotContainer(node) ){
			if( parentNode.childNodes[0] !== node ){
				return false;
			}
			node = parentNode;
			parentNode = node.parentNode;
		}
		return nodeApi.isStartInContainer(node);
	}else{
		return false;
	}
}

// 判断 range 是否是 container 的末端
export function isEndInContainer(node, offset){
	if( node.nodeType === Node.TEXT_NODE ){
		if( offset !== node.length ){
			return false;
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		if( offset !== node.childNodes.length ){
			return false;
		}
	}
	let parentNode = node.parentNode;
	while( nodeApi.isNotContainer(node) ){
		let len = parentNode.childNodes.length;
		if( parentNode.childNodes[len - 1] !== node ){
			return false;
		}
		node = parentNode;
		parentNode = node.parentNode;
	}
	return true;
}

export function getRange(){
	let selection = document.getSelection();
	if( selection.type !== 'None' ){
		return document.getSelection().getRangeAt(0);
	}else{
		return null;
	}
}

export function setRange(startNode, startOffset, endNode, endOffset){
	let range = document.getSelection().getRangeAt(0);
	// console.log('startNode:', startNode, '\nstartOffset:', startOffset, '\nendNode:', endNode, '\nendOffset:', endOffset);
	// console.log('range.startContainer:', range.startContainer, '\nrange.startOffset:', range.startOffset, '\nrange.endContainer:', range.endContainer, '\nrange.endOffset:', range.endOffset);

	if( range.startContainer === startNode && range.startOffset === startOffset ){
		console.log('start range 一样不需要设置');
	}else{
		range.setStart(startNode, startOffset);
	}
	if( range.endContainer === endNode && range.endOffset === endOffset ){
		console.log('end range 一样不需要设置');
	}else{
		range.setEnd(endNode, endOffset);
	}
}

export function setCollapsedRange(node, offset){
	let range = document.getSelection().getRangeAt(0);
	// console.log('%crange setCollapsedRange', 'color: #000000; background-color: #ffffff');
	// console.log('node:', node, '\noffset:', offset);
	// console.log('range.startContainer:', range.startContainer, '\nrange.startOffset:', range.startOffset, '\nrange.endContainer:', range.endContainer, '\nrange.endOffset:', range.endOffset);
	if( range.startContainer === node && range.startOffset === offset ){
		console.log('start range 一样不需要设置');
	}else{
		range.setStart(node, offset);
	}
	if( range.endContainer === node && range.endOffset === offset ){
		console.log('end range 一样不需要设置');
	}else{
		range.setEnd(node, offset);
	}
}

export function setNewRange(startNode, startOffset, endNode, endOffset){
	let 
			selection = document.getSelection(),
			range = document.createRange();
	range.setStart(startNode, startOffset);
	range.setEnd(endNode, endOffset);
	selection.removeAllRanges(range);
	selection.addRange(range);
}

export function setNewCollapsedRange(node, offset){
		let 
			selection = document.getSelection(),
			range = document.createRange();
	range.setStart(node, offset);
	range.setEnd(node, offset);
	selection.removeAllRanges(range);
	selection.addRange(range);
}

//	选择 node 节点最开始的位置
export function setRangeOfNodeStart(node){
	if( !node || !node.nodeType || !node.parentNode ){
		console.error('node:', node);
		throw new Error('setRangeOfNodeStart 传参错误');
	}
	while( node.childNodes.length > 0 ){
		node = node.childNodes[0];
	}
	if( !node ){
		console.error('node不存在, 请检查组件设计是否正确');
	}
	let rangeNode, rangeOffset;
	if(node.nodeType === Node.TEXT_NODE){
		rangeNode = node;
		rangeOffset = 0;
	}else if(node.nodeType === Node.ELEMENT_NODE){
		rangeNode = node.parentNode;
		rangeOffset = nodeApi.getNodeIndexOf(node);
	}else{
		console.error('节点:', node);
		throw new Error('没有处理的节点类型');
	}
	setCollapsedRange(rangeNode, rangeOffset);
	return [rangeNode, rangeOffset];
}

//	选择 node 节点最末端的位置
export function setRangeOfNodeEnd(node){
	if( !node || !node.nodeType || !node.parentNode ){
		console.error('node:', node);
		throw new Error('setRangeOfNodeEnd 传参错误');
	}
	while( node.childNodes.length > 0 ){
		node = node.childNodes[node.childNodes.length - 1];
	}
	let rangeNode, rangeOffset;
	if(node.nodeType === Node.TEXT_NODE){
		rangeNode = node;
		rangeOffset = node.length;
	}else if(node.nodeType === Node.ELEMENT_NODE){
		rangeNode = node.parentNode;
		rangeOffset = nodeApi.getNodeIndexOf(node) + 1;
	}else{
		console.error('节点:', node);
		throw new Error('没有处理的节点类型');
	}
	setCollapsedRange(rangeNode, rangeOffset);
	return [rangeNode, rangeOffset];
}
