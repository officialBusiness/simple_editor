
// compositionstart 时期的 range 是原始没变化的情况
// 可以作为模板在 compositionend 中恢复
export function handleCompositionStart(e){
	console.log('compositionstart:', e);
	let range = this.editor.rangeApi.getRange(),
			{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
	this.editor.rangeApi.consoleRange();

	this.compositionStartRange = {
		collapsed,
		startContainer,
		startOffset,
		endContainer,
		endOffset
	};
}


export function handleCompositionEnd(e){
	// console.log('compositionend:', e);
	// this.editor.rangeApi.consoleRange();
	let range = this.editor.rangeApi.getRange(),
			{ collapsed, startContainer, startOffset, endContainer, endOffset } = this.compositionStartRange;

	if( !range.collapsed ){
		console.error('测试一下, 按道理, collapsed 一定为 true, 看看存不存在为 false 的情况');
	}

	if( collapsed ){//	只需要删除插入的 text 即可
		console.log('只需要删除插入的 text 即可');
		if( range.endContainer.length === e.data.length ){//	是插入的 text
			console.log('是插入的 text');
			this.editor.nodeApi.removeNode(range.endContainer);
		}else{//	是在原来的 text 上增加文字
			console.log('是在原来的 text 上增加文字');
		}
	}else{//	看情况是否需要恢复原来的 dom

	}

}