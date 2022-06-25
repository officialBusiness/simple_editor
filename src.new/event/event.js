import handleOnKeydown from './native/keydown.js';

export default class EditorEvent{
	constructor(editor){
		this.editor = editor;
		// 目前只支持添加键盘事件
		this.events = {
			keydown: [],
		}

		this.keydown = function(e){
			console.log('keydown e:', e);
			e.preventDefault();

		}
		editor.editorDom.addEventListener('keydown', this.keydown);


		this.compositionstart = function(e){
			e.preventDefault();
			
		}
		editor.editorDom.addEventListener('compositionstart', this.compositionend);


		this.compositionend = function(e){
			e.preventDefault();
			
		}
		editor.editorDom.addEventListener('compositionend', this.compositionend);


		this.paste = function(e){
			console.log('paste');
			e.preventDefault();
		}
		editor.editorDom.addEventListener('paste', this.paste);


		this.dragstart = function(e){
			console.log('dragstart');
			e.preventDefault();
		}
		editor.editorDom.addEventListener('dragstart', this.dragstart);


		this.drop = function(e){
			console.log('drop');
			e.preventDefault();
		}
		editor.editorDom.addEventListener('drop', this.drop);

	}
	addEvent(eventType, event){
		if( !this.events[eventType] ){
			this.events[eventType] = [];
		}
		this.events[eventType].push(event);
	}
	destroy(){

		this.editor.editorDom.removeEventListener('keydown', this.keydown);
		this.editor.editorDom.removeEventListener('compositionstart', this.compositionstart);
		this.editor.editorDom.removeEventListener('compositionend', this.compositionend);
		this.editor.editorDom.removeEventListener('paste', this.paste);
		this.editor.editorDom.removeEventListener('dragstart', this.dragstart);
		this.editor.editorDom.removeEventListener('drop', this.drop);
	}
}

// export function initEvent(context){
// 	// 键盘事件

// 	context.editorDom.addEventListener('keydown', handleOnKeydown);

// 	context.editorDom.addEventListener('compositionend', (e) => {
// 	  let range = context.rangeApi.getRange(),
// 	  		{ startContainer, startOffset } = range;
// 	  if( startContainer.nodeType === Node.TEXT_NODE ){
// 	  	// console.log(e.data);
// 	  	if( startContainer.length === e.data.length && startOffset === e.data.length ){
// 	  		context.nodeApi.removeNode(startContainer);
// 	  	}else{
// 	  		startContainer.deleteData(startOffset - e.data.length, e.data.length);
// 	  	}
// 	  }

// 	});
// 	// 复制事件
// 	context.editorDom.onpaste = (e)=>{
// 		e.preventDefault();
// 		// let clipboardData = e.clipboardData,
// 		// 	index = 0,
// 		// 	length = clipboardData.items.length,
// 		// 	string = '';
// 		// for(let item of clipboardData.items){
// 		// 	index ++;
// 		// 	if( item.kind === 'string' 
// 		// 		&& item.type === 'text/plain' ){
// 		// 		item.getAsString((str)=>{
// 		// 			string += str;
// 		// 			// console.log('item:', item);
// 		// 			if( length === index ){
// 		// 				// console.info('paste 事件待完善');
// 		// 				// console.log('string:', string);
// 		// 				triggerEvent['paste'].call(context, string);
// 		// 			}
// 		// 		});
// 		// 	}
// 		// }
// 	}
// 	context.editorDom.oncopy = (e)=>{
// 		// e.preventDefault();
// 	}

// 	// 禁止拖拽
// 	context.editorDom.ondragstart = (e)=>{
// 		e.preventDefault();
// 	}
// 	context.editorDom.ondrop = (e)=>{
// 		e.preventDefault();
// 	}
// }

// export function destroyEvent(){

// }
