// 在 container 内插入文字
export default function insertText(text, start, offset){
	let rangeApi = this.rangeApi,
			nodeApi = this.nodeApi;
	if( start.nodeType === Node.TEXT_NODE ){
		start.insertData(offset, text);
		rangeApi.setCollapsedRange(start, offset + text.length);
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		let text = nodeApi.createTextNode(text);
		if( offset === 0 ){
			start.insertBefore(text, start.childNodes[0]);
		}else{
			nodeApi.insertAfter(text, start.childNodes[offset - 1]);
		}
		rangeApi.setCollapsedRange(text, text.length);
	}
	return this;
}