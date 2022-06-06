import * as nodeApi from '../editor_node/node_api.js';

export const range = {
	center: 'center',
	start: 'start',
	end: 'end',
	collapsed: 'collapsed',
	node: 'node'
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
	let 
			selection = document.getSelection(),
			range = document.createRange();
	range.setStart(startNode, startOffset);
	range.setEnd(endNode, endOffset);
	selection.removeAllRanges(range);
	selection.addRange(range);
}

export function setCollapsedRange(node, offset){
	let range = document.getSelection().getRangeAt(0);
	range.setStart(node, offset);
	range.setEnd(node, offset);
}
// 选择一个节点的最末端
export function endNodeRange(node){
	while( node.childNodes.length > 0 ){
		node = node.childNodes[node.childNodes.length - 1];
	}
	// console.log('endNodeRange:', node);
	if(node.nodeType === Node.TEXT_NODE){
		setCollapsedRange(node, node.length);
	}else if(node.nodeType === Node.ELEMENT_NODE){
		setCollapsedRange(node.parentNode, nodeApi.getNodeIndexOf(node) + 1);
	}else{
		console.error('没有处理的节点类型');
	}
}

// 选择一个节点的最开始
export function startNodeRange(node){
	while( node.childNodes.length > 0 ){
		node = node.childNodes[0];
	}
	if(node.nodeType === Node.TEXT_NODE){
		setCollapsedRange(node, 0);
	}else if(node.nodeType === Node.ELEMENT_NODE){
		setCollapsedRange(node.parentNode, 0);
	}else{
		console.error('没有处理的节点类型');
	}
}


export function isRangeInOneNode(){
	let selection = document.getSelection()
	return selection.anchorNode === selection.focusNode
}

export function getRangeOneNode(){
	let selection = document.getSelection()
	if( selection.anchorNode === selection.focusNode ){
		return selection.anchorNode;
	}else{
		return null;
	}
}
