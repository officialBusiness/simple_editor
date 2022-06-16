export default function backspace(){
	let range = this.rangeApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startContainer, endContainer } = range;
	// console.log('range:', range);
	if(collapsed){
		this.nodeApi.getContainer(startContainer)
			.dispatchEvent(this.customEvent.backspaceOne);
	}else{
		// this.deleteRange(startContainer, startOffset, endContainer, endOffset);

		// this.nodeApi.getContainer(startContainer)
			// .dispatchEvent(this.customEvent.backspaceRange);
	}
}