import * as rangApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';

import { createComponent, getComponent } from './component/component.js';


export default function Editor(dom){
	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';

	// this.editable;
	this.editorDom.onblur = ()=>{
		let range = rangApi.getRange();
		if( this.editable && range ){
			this.range.collapsed = range.collapsed;
			this.range.startContainer = range.startContainer;
			this.range.startOffset = range.startOffset;
			this.range.endContainer = range.endContainer;
			this.range.endOffset = range.endOffset;
		}
	}
	this.range = {};
}

Editor.prototype.rangApi = rangApi;
Editor.prototype.nodeApi = nodeApi;

// Editor.prototype.rangApi = rangApi;
// Editor.prototype.nodeApi = nodeApi;

Editor.prototype.insertElement = function(node, start, offset){

}

Editor.prototype.insertText = function(text, start, offset){
	let rangApi = this.rangApi,
			nodeApi = this.nodeApi;
	if( start.nodeType === Node.TEXT_NODE ){
		start.insertData(offset, text);
		rangApi.setCollapsedRange(start, offset + text.length);
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		let text = nodeApi.createTextNode(text);
		if( offset === 0 ){
			start.insertBefore(text, start.childNodes[0]);
		}else{
			nodeApi.insertAfter(text, start.childNodes[offset - 1]);
		}
		rangApi.setCollapsedRange(text, text.length);
	}
}