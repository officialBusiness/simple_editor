import * as nodeApi from './node.js';

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

export function consoleRange(){
	let range = getRange();
	if( range ){
		console.log('collapsed:', range.collapsed);
		console.log('startContainer:', range.startContainer);
		console.log('startOffset:', range.startOffset);
		console.log('endContainer:', range.endContainer);
		console.log('endOffset:', range.endOffset);
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

// 选择一个节点的最末端
export function endNodeRange(node){
	while( node.childNodes.length > 0 ){
		node = node.childNodes[node.childNodes.length - 1];
	}
	while( node && nodeApi.isNotEditable(node) ){
		console.log('存在不可编辑的节点,需要跳过:', node);
		node = nodeApi.getPreEndNodeInBlock(node);
	}
	if( !node ){
		console.error('node不存在, 请检查组件设计是否正确');
	}
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
	while( node && nodeApi.isNotEditable(node) ){
		console.log('存在不可编辑的节点,需要跳过:', node);
		node = nodeApi.getNextStartNodeInBlock(node);
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

// 选择一个节点的最末端,清除原来的 range
export function endNodeNewRange(node){
	while( node.childNodes.length > 0 ){
		node = node.childNodes[node.childNodes.length - 1];
	}
	while( node && nodeApi.isNotEditable(node) ){
		console.log('存在不可编辑的节点,需要跳过:', node);
		node = nodeApi.getPreEndNodeInBlock(node);
	}
	if( !node ){
		console.error('node不存在, 请检查组件设计是否正确');
	}
	if(node.nodeType === Node.TEXT_NODE){
		setNewCollapsedRange(node, node.length);
	}else if(node.nodeType === Node.ELEMENT_NODE){
		setNewCollapsedRange(node.parentNode, nodeApi.getNodeIndexOf(node) + 1);
	}else{
		console.error('没有处理的节点类型');
	}
}

// 选择一个节点的最开始,清除原来的 range
export function startNodeNewRange(node){
	while( node.childNodes.length > 0 ){
		node = node.childNodes[0];
	}
	while( node && nodeApi.isNotEditable(node) ){
		console.log('存在不可编辑的节点,需要跳过:', node);
		node = nodeApi.getNextStartNodeInBlock(node);
	}
	if( !node ){
		console.error('node不存在, 请检查组件设计是否正确');
	}
	if(node.nodeType === Node.TEXT_NODE){
		setNewCollapsedRange(node, 0);
	}else if(node.nodeType === Node.ELEMENT_NODE){
		setNewCollapsedRange(node.parentNode, nodeApi.getNodeIndexOf(node));
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
