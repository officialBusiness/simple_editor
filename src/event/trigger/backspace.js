export default function backspace(){
	let range = this.rangeApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startOffset, startContainer, endContainer, endOffset } = range;
	if(collapsed){
		this.deleteOne(startContainer, startOffset);
	}else{
		this.deleteRange(startContainer, startOffset, endContainer, endOffset);
	}
}