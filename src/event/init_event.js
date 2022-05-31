import trigger from './trigger.js';

export const editorEvent = {
	enter: 'enter',
	backspace: 'backspace',
	tab: 'tab',
	paste: 'paste',						// onpaste
	copy: 'copy',							// oncopy
	save: 'save',							// shortcuts s 83
	redo: 'redo',							// shortcuts y 89
	undo: 'undo',							// shortcuts z 90
	selectAll: 'selectAll',		// shortcuts a 65
	esc: 'esc',								// 27
	fullScreen: 'fullScreen',
	// ascii: 'ascii',
	format: 'format',
}

const 
	handleKeyCode = {
		// '13': 'enter',
		'8': 'backspace',
		// '9': 'tab',
		// '229': 'ascii',
		// backspace: 8,
		// enter: 13,

	},
	shortcutsKeyCode = {
		// '83': 'save',
		// '89': 'redo',
		// '90': 'undo',
		// '65': 'selectAll',
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
		// e.preventDefault();
		// let clipboardData = e.clipboardData,
		// 	index = 0,
		// 	length = clipboardData.items.length,
		// 	string = '';
		// for(let item of clipboardData.items){
		// 	index ++;
		// 	if( 
		// 		item.kind === 'string' 
		// 		&& item.type === 'text/plain' 
		// 		){
		// 		console.log('item:', item);
		// 		item.getAsString((str)=>{
		// 			console.log(str);
		// 			console.log(index);
		// 			console.log(length);
		// 			 string += str;
		// 			if( length === index ){
		// 				console.log(string);
		// 			}
		// 		});
		// 	}
		// }
	}
	editorDom.oncopy = (e)=>{
		// console.log('oncopy e:', e);
		// e.preventDefault();
	}
	editorDom.ondragstart = (e)=>{
		e.preventDefault();
	}
	editorDom.ondrop = (e)=>{
		e.preventDefault();
	}
	// editorDom.onbeforeinput = (e)=>{
	// 	console.log('beforeinput:')
	// }
	// editorDom.addEventListener('beforeinput', (e)=>{
	// 	e.preventDefault();
	// 	console.log('beforeinput:', e);
	// });
}

export function destroyEvent(editorDom){
	editorDom.onkeydown = null;
	editorDom.onpaste = null;
}