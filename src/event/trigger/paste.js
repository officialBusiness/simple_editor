export default function paste(string){
	let 
		{ rangeApi, nodeApi, customEventType } = this,
		range = rangeApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
	// console.log(collapsed);
	if(collapsed){
		this.insertText(string, startContainer, startOffset);
	}else{
		console.log('enter 事件待完善');
	}

}