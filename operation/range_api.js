
export const range = {
	center: 'center',
	start: 'start',
	end: 'end',
	collapsed: 'collapsed',
	node: 'node'
}

export function getRange(){
	return document.getSelection().getRangeAt(0);
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
	let 
			selection = document.getSelection(),
			range = document.createRange();
	range.setStart(node, offset);
	range.setEnd(node, offset);
	selection.removeAllRanges(range);
	selection.addRange(range);
}

export function setCollapsedRangeInNodeBehind(node){

}

export function setCollapsedRangeInNodeFront(node){

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
