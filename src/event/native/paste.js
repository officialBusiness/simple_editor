
export default function handleOnPaste(e){
	e.preventDefault();
	let clipboardData = e.clipboardData,
		index = 0,
		length = clipboardData.items.length,
		string = '';
	for(let item of clipboardData.items){
		index ++;
		if( item.kind === 'string' 
			&& item.type === 'text/plain' ){
			item.getAsString((str)=>{
				string += str;
				// console.log('item:', item);
				if( length === index ){
					// console.info('paste 事件待完善');
					insertText.call(this.editor, string);
				}
			});
		}
	}
}

function insertText(string){
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset, commonAncestorContainer } = range;
	if( collapsed ){
		this.dealOperaion(startContainer, 'insertText', [string, startContainer, startOffset]);
	}


}