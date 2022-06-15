
export let customEventType = {
	backspaceOnStart: 'backspaceOnStart',
}

export let customEvent = {
	backspaceOnStart: new Event(customEventType.backspaceOnStart),
}


export default function initEditorEvent(editorDom){
	editorDom.onkeydown = (e)=>{
		let eventType = handleKeyCode[e.keyCode]
		if( eventType ){
			e.stopPropagation();
			e.preventDefault();
			trigger(eventType);
		}
	}
	editorDom.onpaste = (e)=>{
		// console.log('onpaste');
		e.preventDefault();
		let clipboardData = e.clipboardData,
			index = 0,
			length = clipboardData.items.length,
			string = '';
		for(let item of clipboardData.items){
			index ++;
			if( 
				item.kind === 'string' 
				&& item.type === 'text/plain' 
				){
				// console.log('item:', item);
				item.getAsString((str)=>{
					// console.log(str);
					console.log(index);
					// console.log(length);
					 string += str;
					if( length === index ){
						// console.log(string);
						trigger(editorEvent.paste, string.replace(/(\r|\n)/gi, " "));
					}
				});
			}
		}
	}
	editorDom.oncopy = (e)=>{
		// console.log('oncopy e:', e);
		e.preventDefault();
	}
	editorDom.ondragstart = (e)=>{
		e.preventDefault();
	}
	editorDom.ondrop = (e)=>{
		e.preventDefault();
	}
}