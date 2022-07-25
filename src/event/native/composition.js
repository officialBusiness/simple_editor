

// compositionstart 时期的 range 是原始没变化的情况
// 可以作为模板在 compositionend 中恢复
export function handleCompositionStart(e){
	console.log('compositionstart:', e);

	let range = this.rangeApi.getRange(),
			{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;

	if( collapsed ){

	}else{
		
	}

	this.event.compositionStartRange.collapsed = collapsed;
	this.event.compositionStartRange.startContainer = startContainer;
	this.event.compositionStartRange.startOffset = startOffset;
	this.event.compositionStartRange.endContainer = endContainer;
	this.event.compositionStartRange.endOffset = endOffset;
}


export function handleCompositionEnd(e){
	console.log('compositionstart:', e);

	console.log('compositionStartRange:', this.event.compositionStartRange.collapsed);
	console.log('compositionStartRange:', this.event.compositionStartRange.startContainer);
	console.log('compositionStartRange:', this.event.compositionStartRange.startOffset);
	console.log('compositionStartRange:', this.event.compositionStartRange.endContainer);
	console.log('compositionStartRange:', this.event.compositionStartRange.endOffset);

	console.log('this:', this);

}