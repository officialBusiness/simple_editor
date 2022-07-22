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
		return true;
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

	range.setStart(startNode, startOffset);
	range.setEnd(endNode, endOffset);
}

export function setCollapsedRange(node, offset){
	let range = document.getSelection().getRangeAt(0);
	range.setStart(node, offset);
	range.setEnd(node, offset);
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

//	选择 container 的最开始
export function setRangeOfNodeStartInContainer(node){
	if( !node || !node.nodeType || !node.parentNode ){
		console.error('node:', node);
		throw new Error('setRangeOfNodeStartInContainer 传参错误');
	}
	while( node.childNodes.length > 0 ){
		node = node.childNodes[0];
	}
	if( !node ){
		console.error('node不存在, 请检查组件设计是否正确');
	}
	if(node.nodeType === Node.TEXT_NODE){
		setCollapsedRange(node, 0);
	}else if(node.nodeType === Node.ELEMENT_NODE){
		setCollapsedRange(node.parentNode, nodeApi.getNodeIndexOf(node));
	}else{
		console.error('没有处理的节点类型');
	}
}

//	选择 container 的最末端
export function setRangeOfNodeEndInContainer(node){
	if( !node || !node.nodeType || !node.parentNode ){
		console.error('node:', node);
		throw new Error('setRangeOfNodeEndInContainer 传参错误');
	}
	while( node.childNodes.length > 0 ){
		node = node.childNodes[node.childNodes.length - 1];
	}
	if(node.nodeType === Node.TEXT_NODE){
		setCollapsedRange(node, node.length);
	}else if(node.nodeType === Node.ELEMENT_NODE){
		setCollapsedRange(node.parentNode, nodeApi.getNodeIndexOf(node) + 1);
	}else{
		console.error('没有处理的节点类型');
	}
}
