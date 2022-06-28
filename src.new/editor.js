import * as rangeApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/init_component.js';
import EditorEvent, { operationType, operationEvent, operation, supportOperationType } from './event/event.js';

export default function Editor(dom, contentObj){

	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	// 初始化事件
	this.event = new EditorEvent(this);
	this.operation = {}
	Object.keys(operation).forEach((key)=>{
		this.operation[key] = operation[key].bind(this);
	});

	// 初始化组件生产工厂
	this.defualtBlockObj = {type: 'paragraph'};

	if(contentObj){
		this.render(contentObj);
	}else{
		let initDom = this.getComponentDom(this.defualtBlockObj);
		if( initDom ){
			this.editorDom.appendChild(initDom);
		}else{
			console.error(this.defualtFactory, '读取解析失败');
		}
	}

	// 检验
	document.addEventListener("selectionchange", () => {
		// console.log('检验 checkRange');
		this.rangeApi.checkRange();
	});
}

Editor.prototype.rangeApi = rangeApi;
Editor.prototype.nodeApi = nodeApi;
Editor.prototype.nodeLabel = nodeApi.nodeLabel;

Editor.prototype.operationType = operationType;
Editor.prototype.operationEvent = operationEvent;
Editor.prototype.supportOperationType = supportOperationType;

Editor.prototype.supportOperation = componentApi.supportOperation;

Editor.prototype.getComponentDom = function(obj){
	return componentApi.getComponentDom(this, obj);
}

Editor.prototype.getComponentObj = function(dom){
	return componentApi.getComponentObj(this, dom);
}

Editor.prototype.render = function(obj){
	this.nodeApi.emptyAllChild(this.editorDom);
	obj.blocks.forEach((block)=>{
		let blockDom = this.getComponentDom(block);
		if( blockDom ){
			this.editorDom.appendChild(blockDom);
		}else{
			console.error('组件 dom 读取解析失败:', block);
		}
		return this;
	});
	return this;
}

Editor.prototype.toObj = function(){
	let obj = {
		blocks: []
	}
	this.editorDom.childNodes.forEach((blockDom)=>{
		let blockObj = this.getComponentObj(blockDom);
		if( blockObj ){
			obj.blocks.push( blockObj );
		}else{
			console.error('block 转化失败:', blockDom);
		}
	});
	return obj;
}

Editor.prototype.addEvent = function(eventType, event){
	this.event.addEvent(eventType, event);
	return this;
}
