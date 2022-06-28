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

export function checkRange(){
	let range = getRange(),
			{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;

	if( startContainer.nodeType === Node.ELEMENT_NODE ){
		let node = startContainer.childNodes[startOffset > 0 ? startOffset - 1 : 0];
		if( node && node.childNodes.length > 0 ){
			console.error('startContainer range 的位置不符合预期, 检查是否是浏览器自动的选择导致的, 如是, 需要优化完善代码');
		}
	}
	if( !collapsed && endContainer.nodeType === Node.ELEMENT_NODE ){
		let node = endContainer.childNodes[endOffset > 0 ? endOffset - 1 : 0];
		if( node && node.childNodes.length > 0 ){
			console.error('endContainer range 的位置不符合预期, 检查是否是浏览器自动的选择导致的, 如是, 需要优化完善代码');
		}
	}

}
//	打印 range 信息
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

//	选择一个节点的最末端
//	默认元素在 container, 且 container 内的元素都可以编辑
export function setRangeOfNodeEnd(node){
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

//	选择一个节点的最开始, 默认元素在 container, 且container 内的元素都可以编辑
export function setRangeOfNodeStart(node){
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
