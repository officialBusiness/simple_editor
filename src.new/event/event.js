import handleOnKeydown from './native/keydown.js';
import { handleCompositionStart, handleCompositionEnd } from './native/composition.js';
import handleOnPaste from './native/paste.js';

import deleteForward from './operation/delete_forward.js';
import deleteForwardOnStart from './operation/delete_forward_on_start.js';
import deleteFragment from './operation/delete_fragment.js';
import enter from './operation/enter.js';

export const operation = {
	deleteForward,
	deleteForwardOnStart,
	deleteFragment,
	enter,
}

export const operationType = {
	deleteForward: 'deleteForward',									//	向前删除单个
	deleteForwardOnStart: 'deleteForwardOnStart',		//	向前删除单个删到了 container 头部
	deleteBackward: 'deleteBackward',								//	向后删除单个
	deleteFragment: 'deleteFragment',								//	删除片段

	enter: 'enter',																	//	光标 collapsed 的时候回车
	enterFragment: 'enterFragment'									//	光标不为 collapsed 的时候回车
}

export const operationEvent = {
	deleteForward: new Event('deleteForward'),
	deleteForwardOnStart: new Event('deleteForwardOnStart'),
	deleteBackward: new Event('deleteBackward'),
	deleteFragment: new Event('deleteFragment'),

	enter: new Event('enter'),
	enterFragment: new Event('enterFragment'),
}

export const supportOperationType = {
	getLastContainer: 'getLastContainer',
}

export default class EditorEvent{
	constructor(editor){
		this.editor = editor;
		// 目前只支持添加键盘事件
		this.events = {
			keydown: [],
		}

		let editorEvent = this;

		this.keydown = handleOnKeydown.bind(this);
		editor.editorDom.addEventListener('keydown', this.keydown);

		this.compositionstart = handleCompositionStart.bind(this);
		editor.editorDom.addEventListener('compositionstart', this.compositionstart);

		// 用于测试
		// this.compositionupdate = (function(e){
		// 	console.log('compositionupdate e:', e);
		// 	this.editor.rangeApi.consoleRange();
		// }).bind(this);
		// editor.editorDom.addEventListener('compositionupdate', this.compositionupdate);

		this.compositionend = handleCompositionEnd.bind(this);
		editor.editorDom.addEventListener('compositionend', this.compositionend);

		this.paste = handleOnPaste.bind(this);
		editor.editorDom.addEventListener('paste', this.paste);


		// 拖拽相关暂不实现, 直接禁止, 目前就先和上面一样用 addEventListener 吧, 说不准哪天就想实现了
		this.dragstart = function(e){
			e.preventDefault();
		}
		editor.editorDom.addEventListener('dragstart', this.dragstart);
		this.drop = function(e){
			e.preventDefault();
		}
		editor.editorDom.addEventListener('drop', this.drop);
	}
	addEvent(eventType, event){
		if( !this.events[eventType] ){
			console.error('目前不支持该事件', eventType);
			return ;
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