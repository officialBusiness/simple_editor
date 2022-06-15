
export let customEventType = {
	backspaceOnStart: 'backspaceOnStart',
}

export let customEvent = {
	backspaceOnStart: new Event(customEventType.backspaceOnStart),
}


export default function initEditorEvent(context){
	// console.log('初始化富文本事件');
	context.editorDom.onkeydown = (e)=>{
		// console.log('e:', e);
		// e.preventDefault();
		
	}
	context.editorDom.onpaste = (e)=>{
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
				});
			}
			if( length === index ){
				
			}
		}
	}
	context.editorDom.oncopy = (e)=>{
		e.preventDefault();
	}

	context.editorDom.ondragstart = (e)=>{
		e.preventDefault();
	}
	context.editorDom.ondrop = (e)=>{
		e.preventDefault();
	}
}