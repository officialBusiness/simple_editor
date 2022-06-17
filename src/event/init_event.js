import * as triggerEvent from './trigger/index.js';

const editorEvent = {
	enter: 'enter',
	backspace: 'backspace',
	// tab: 'tab',
	paste: 'paste',						// onpaste
	// copy: 'copy',							// oncopy
	// save: 'save',							// shortcuts s 83
	// redo: 'redo',							// shortcuts y 89
	// undo: 'undo',							// shortcuts z 90
	// selectAll: 'selectAll',		// shortcuts a 65
	// esc: 'esc',								// 27
	// fullScreen: 'fullScreen',
	// ascii: 'ascii',
	// format: 'format',
}

const 
	handleKeyCode = {
		'13': editorEvent.enter,
		'8': editorEvent.backspace,
		// '9': 'tab',
	},
	controlKeyCode = {
		'65': editorEvent.selectAll,
	}

function trigger(context, eventType){
	if( typeof triggerEvent[eventType] === 'function' ){
		triggerEvent[eventType].call(context);
	}else{
		console.error('事件还未完善');
	}
}



export default function initEditorEvent(context){
	// console.log('初始化富文本事件');
	context.editorDom.onkeydown = (e)=>{
		let eventType;

		(e.metaKey || e.ctrlKey) ? 
			(eventType = controlKeyCode[e.keyCode]) : 
			(eventType = handleKeyCode[e.keyCode]);

		if( eventType ){
			e.preventDefault();
			trigger(context, eventType);
		}
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
				console.info('待完善')
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