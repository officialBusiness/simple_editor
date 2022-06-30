
export default function handleOnKeydown(e){
	// console.log('keydown e:', e);
	let preventDefault = true;
	// this.events.keydown.forEach((triggerEvent)=>{
	// 	triggerEvent(editor);
	// });

	if( e.ctrlKey || e.metaKey ){
		if( e.keyCode === 86 ){
			//	v 执行  paste
			preventDefault = false;
		}else if( e.keyCode === 83 ){
			//	s 执行 save

		}
	}
	// console.log('e.key.length:', e.key.length);
	switch( e.keyCode ){
		case 8://	backspace
			// this.
			backspace.call(this.editor);
			break;
		case 46://	Delete

			break;
		case 13://	enter
			enter.call(this.editor);
			break;
		case 37://	ArrowLeft
		case 38://	ArrowUp
		case 39://	ArrowRight
		case 40://	ArrowDown
			preventDefault = false;

			break;
		default:
			if( e.key.length === 1 && e.keyCode !== 229 ){// 输入普通字符串
				// console.log('输入普通字符串')
				// this.editor.defaultOperation.insertText(e.key);
			}
			break;
	}
	if( preventDefault ){
		e.preventDefault();
	}
}


function backspace(){
	let 
		{ rangeApi, nodeApi, operationEvent } = this,
		range = rangeApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset, commonAncestorContainer } = range;
	// console.log('range:', range);
	if(collapsed){
		// console.log('触发 deleteForward');
		this.getOperaion(nodeApi.getContainer(startContainer)).deleteForward.call(this, startContainer, startOffset);
	}else{
		let startContainerNode = nodeApi.getContainer(startContainer),
				endContainerNode= nodeApi.getContainer(endContainer);
		if( startContainerNode === endContainerNode ){//	在同一个 container 中
			console.log('在同一个 container 中, 触发 deleteFragment');
			this.getOperaion(nodeApi.getContainer(startContainer)).deleteFragment.call(this, commonAncestorContainer, startContainer, startOffset, endContainer, endOffset);
		}else{//	不同的 container
			console.log('不同的 container ');
			let startBlock = nodeApi.getBlock(startContainer),
					endBlock = nodeApi.getBlock(endContainer);
			if( startBlock === endBlock ){//	在同一个 block 中
				console.log('在同一个 block 中');

			}else{
				console.log('不同的 block ');
				
			}
		}
	}
}


function enter(){
	let 
		{ rangeApi, nodeApi, operationEvent } = this,
		range = rangeApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
	if(collapsed){
		this.getOperaion(nodeApi.getContainer(startContainer)).enter.call(this, startContainer, startOffset);
	}else{
		console.log('enter 事件待完善');
	}

}


