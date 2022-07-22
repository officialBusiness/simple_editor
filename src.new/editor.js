import * as rangeApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/component.js';
import EditorEvent from './event/event.js';


export default function Editor(dom, contentObj){
	// 初始化 dom

	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	// 事件
	// 初始化事件
	this.event = new EditorEvent(this);
	this.componentEvent = {};
	componentApi.registerComponentEvent(this);

	// 组件
	// 默认的块类型数据
	this.defualtBlockObj = { type: 'paragraph' };
}

Editor.prototype.init = function(){
	let paragraph = this.objToDom(this.defualtBlockObj);
	this.nodeApi.appendChild(this.editorDom, paragraph);
	this.rangeApi.setNewCollapsedRange(paragraph, 0);
	return this;
}

Editor.prototype.destroy = function(){

	this.event.destroy();
	this.event = null;
}

Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = this.editable = editable;
	return this;
}

Editor.prototype.rangeApi = rangeApi;
Editor.prototype.nodeApi = nodeApi;
Editor.prototype.nodeLabel = nodeApi.nodeLabel;

// 组件数据转化
// 传入数据, 渲染编辑器
Editor.prototype.render = function(obj){
	this.nodeApi.emptyAllChild(this.editorDom);
	obj.blocks.forEach((blockObj)=>{
		let blockDom = this.objToDom(blockObj);
		if( blockDom ){
			this.nodeApi.appendChild(this.editorDom, blockDom);
		}else{
			console.error('blockObj:', blockObj);
			throw new Error('组件 dom 读取解析失败');
		}
	});
	return this;
}
// 返回编辑器内的数据
Editor.prototype.toObj = function(){
	let obj = {
		blocks: []
	}
	this.editorDom.childNodes.forEach((blockDom)=>{
		let blockObj = this.domToObj(blockDom);
		if( blockObj ){
			obj.blocks.push( blockObj );
		}else{
			console.error('blockDom', blockDom);
			throw new Error('block 转化失败');
		}
	});
	return obj;
}
// 传入组件数据, 生成对应的组件 dom
Editor.prototype.objToDom = function(obj){

	return componentApi.getComponentDom(this, obj);
}
// 传入组件 dom, 生成对应的组件数据
Editor.prototype.domToObj = function(dom){

	return componentApi.getComponentObj(this, dom);
}
// 加载 json 文件
Editor.prototype.loadJson = function(jsonUrl){
	var xmlhttp = new XMLHttpRequest(),
			editor = this;
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			editor.render(obj);
		}
	};
	xmlhttp.open("GET", jsonUrl, true);
	xmlhttp.send();
	return this;
}
// 导出 json 文件
Editor.prototype.exportObjJsonFormatting = function(filename){
	var eleLink = document.createElement('a');
	eleLink.download = filename;
	eleLink.style.display = 'none';
	// 字符内容转变成blob地址
	var blob = new Blob([JSON.stringify(this.toObj(), null, 4)]);
	eleLink.href = URL.createObjectURL(blob);
	// 触发点击
	// document.body.appendChild(eleLink);
	this.nodeApi.appendChild(document.bod, eleLink);
	eleLink.click();
	// 然后移除
	this.nodeApi.removeChild(document.bod, eleLink);
	return this;
}

// 事件操作

Editor.prototype.eventType = {
	deleteForward: 'deleteForward',
	// deleteBackward: 'deleteBackward',
	// deleteForwardOnStart: 'deleteForwardOnStart',
	// deleteFragment: 'deleteFragment',
	enter: 'enter',
	// enterFragment: 'enterFragment'
}

Editor.prototype.execute = function(conatienr, eventType, params){
	let eventKey = conatienr.getAttribute('event');
	if( eventKey ){
		let event = this.componentEvent[eventKey][eventType];
		if( event ){
			event.apply(this, params);
		}else{
			throw new Error(`${eventKey} 组件 ${eventType} 事件未完善`);
		}
	}
}

Editor.prototype.deleteForward = function(){
	console.log('deleteForward');
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		throw new Error('range 不存在, deleteForward 执行失败');
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset, commonAncestorContainer } = range;

	if( collapsed ){
		let executeNode = nodeApi.getContainer(startContainer);
		this.execute(executeNode, this.eventType.deleteForward, [startContainer, startOffset]);
	}else{

	}

	// console.log('collapsed:', collapsed);
	// console.log('startContainer:', startContainer);
	// console.log('startOffset:', startOffset);
	// console.log('endContainer:', endContainer);
	// console.log('endOffset:', endOffset);
	// console.log('commonAncestorContainer:', commonAncestorContainer);
}

Editor.prototype.deleteBackward = function(){
	console.log('deleteBackward');
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		throw new Error('range 不存在, deleteBackward 执行失败');
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset, commonAncestorContainer } = range;
}

Editor.prototype.enter = function(){
	console.log('enter');
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		throw new Error('range 不存在, enter 执行失败');
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset, commonAncestorContainer } = range;
	if( collapsed ){
		let executeNode = nodeApi.getContainer(startContainer);
		// console.log('executeNode:', executeNode);
		this.execute(executeNode, this.eventType.enter, [startContainer, startOffset]);
	}else{

	}
}

Editor.prototype.insertText = function(text){
	console.log('insertText');
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		throw new Error('range 不存在, insertText 执行失败');
		return ;
	}

}

Editor.prototype.insertElement = function(element){
	console.log('insertText');

}

Editor.prototype.format = function(command){

}
