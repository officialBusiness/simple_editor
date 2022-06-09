import initEditorEvent, { destroyEvent } from './event/init_event.js';
import * as rangApi from './operation/range_api.js';
import * as nodeApi from './editor_node/node_api.js';
import { getComponent } from './editor_node/component.js';
import './component/paragraph.js';
import './component/mathjax.js';
import './component/header.js';
import './component/image.js';
import './component/format.js';
import './component/list.js';

export function initEmptyDom(dom){
	return new Editor(dom);
}

export default function Editor(options){
	this.editorDom = options.container;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = options.editable;
	this.editorDom.onblur = ()=>{
		let range = rangApi.getRange();
		this.range.collapsed = range.collapsed;
		this.range.startContainer = range.startContainer;
		this.range.startOffset = range.startOffset;
		this.range.endContainer = range.endContainer;
		this.range.endOffset = range.endOffset;
	}

	this.range = {};

	initEditorEvent.call(this, this.editorDom);

	if(options.json){
		this.render(options.json);
	}else{
		this.addComponent('paragraph');
	}
	return this;
}

Editor.prototype.render = function(json){	
	this.editorDom.innerHTML = '';
	let blocks = json.blocks;
	blocks.forEach((block)=>{
		if( getComponent(block.type) ){
			let dom = getComponent(block.type).toDom(block);
			if( dom ){
				this.editorDom.appendChild(dom);
			}
		}
	});
	return this;
}

Editor.prototype.getRange = function(){
	return this.range;
}

Editor.prototype.toJson = function(format){
	let json = {
		blocks: []
	}
	this.editorDom.childNodes.forEach((blockDom)=>{
		json.blocks.push( getComponent(blockDom.className).toJson(blockDom) );
	});
	return json;
}

Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = editable;
	return this;
}
// 暂时如此，只实现部分情况的插入，需要修改
Editor.prototype.insertMathjax = function(tex){
	let
		range = this.getRange(),
		node = range.startContainer,
		offset = range.startOffset;
	console.log('range:', range);
	if(!range.collapsed){
		return ;
	}
	if( node.nodeType === Node.TEXT_NODE ){
		let oneChildNodeRoot = nodeApi.findOneChildNodeRoot(node);
		node = oneChildNodeRoot.parentNode;
		offset = nodeApi.getNodeIndexOf(node);
	}
	let 
		obj = {
			type: 'mathjax',
			data: tex
		},
		dom = getComponent(obj.type).toDom(obj);

	if( offset === 0 || offset === node.childNodes.length ){
		node.appendChild(dom);
	}else{
		node.insertBefore(dom, node.childNodes[offset]);
	}
	this.editorDom.focus();
	rangApi.setNewCollapsedRange( node, offset + 1 );
}

Editor.prototype.addComponent = function(component){
	getComponent(component).init(this.editorDom)
}

Editor.prototype.format = function(format){

}

Editor.prototype.destroy = function(){
	destroyEvent(this.editorDom);
}