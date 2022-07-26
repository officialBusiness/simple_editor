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
	this.nodeApi.appendChild(document.body, eleLink);
	eleLink.click();
	// 然后移除
	this.nodeApi.removeNode(eleLink);
	return this;
}

// 事件操作

Editor.prototype.helpEventType = {
	getFirstContainer: 'getFirstContainer',
	getLastContainer: 'getLastContainer',
	getMergeContainer: 'getMergeContainer',
	getMergedNodes: 'getMergedNodes',
}

Editor.prototype.executeHelpEvent = function(block, eventType, params){
	if( this.nodeApi.isNotBlock(block) ){
		console.error('block:', block);
		throw new Error('executeHelpEvent 传参错误, 不是 block');
	}
	let event = componentApi.getComponentHelpEvent(block.className, eventType);
	if( event ){
		return event.apply(this, params);
	}else{
		throw new Error(`${eventKey} 组件 ${eventType} 辅助事件未完善`);
	}
}

Editor.prototype.eventType = {
	deleteForward: 'deleteForward',
	// deleteBackward: 'deleteBackward',
	deleteFragment: 'deleteFragment',
	enter: 'enter',
	enterFragment: 'enterFragment'
}

Editor.prototype.executeEditorEvent = function(block, eventType, params){
	if( this.nodeApi.isNotBlock(block) ){
		console.error('block:', block);
		throw new Error('executeEditorEvent 传参错误, 不是 block');
	}
	let event = componentApi.getComponentEvent(block.className, eventType);
	if( event ){
		event.apply(this, params);
	}else{
		throw new Error(`${eventKey} 组件 ${eventType} 事件未完善`);
	}
}

Editor.prototype.deleteForward = function(){
	console.clear();
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		throw new Error('range 不存在, deleteForward 执行失败');
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;

	if( collapsed ){
		let executeNode = nodeApi.getBlock(startContainer);
		this.executeEditorEvent(executeNode, this.eventType.deleteForward, [startContainer, startOffset]);
	}else{
		let 
			startBlockNode = nodeApi.getBlock(startContainer),
			endBlockNode = nodeApi.getBlock(endContainer);

		if( startBlockNode === endBlockNode ){
			console.log('在同一个 block 中');
			this.executeEditorEvent(startBlockNode, this.eventType.deleteFragment, [startContainer, startOffset, endContainer, endOffset]);
		}else{
			console.log('在不同的 block 中');
			while(startBlockNode.nextSibling !== endBlockNode){
				this.nodeApi.removeNode(startBlockNode.nextSibling);
			}
			this.executeEditorEvent(startBlockNode, this.eventType.deleteFragment, [startContainer, startOffset, void 0, void 0]);
			this.executeEditorEvent(endBlockNode, this.eventType.deleteFragment, [void 0, void 0, endContainer, endOffset]);
			this.mergeTwoBlocks(startBlockNode, endBlockNode);
		}
	}
}
// 在不同的 block 中, deleteForward deleteBackward 之后合并两个 block
Editor.prototype.mergeTwoBlocks = function(preBlock, block){
	console.log('%cEditor mergeTwoBlocks', 'color: #000000; background-color: #ffffff');
	console.log('preBlock:', preBlock, '\nblock:', block);
	let
		{ rangeApi, nodeApi } = this,
		mergeContainer = this.executeHelpEvent(preBlock, this.helpEventType.getMergeContainer, [preBlock]),
		mergedNodes = this.executeHelpEvent(block, this.helpEventType.getMergedNodes, [block]);

	if( mergeContainer ){
		console.log('前一个 block 存在能够合并的容器:', mergeContainer);
		if( mergedNodes ){
			console.log('当前 block 存在用于合并的节点:', mergedNodes);
			let preEnd = mergeContainer.childNodes[mergeContainer.childNodes.length - 1],
					nextStart = mergedNodes[0];
			if( preEnd ){
				console.log('前一个 block 存在最后一个节点:', preEnd);
				if( nextStart ){
					console.log('当前 block 存在第一个节点:', nextStart);
					nodeApi.appendChildren(mergeContainer, mergedNodes);
					nodeApi.removeNode(block);
					nodeApi.mergeTwoNodes(preEnd, nextStart);
				}else{
					console.log('当前 block 不存在第一个节点, 为空');
					nodeApi.removeNode(block);
				}
			}else{
				console.log('前一个 block 不存在最后一个节点, 为空');
				if(nextStart){
					console.log('当前 block 存在第一个节点:', nextStart);
					nodeApi.appendChildren(mergeContainer, mergedNodes);
					nodeApi.removeNode(block);
				}else{
					console.log('当前 block 不存在第一个节点, 为空');
					nodeApi.removeNode(block);
				}
			}

		}else{
			console.log('当前 block 不存在用于合并的节点');
		}
	}else{
		console.log('前一个 block 不存在能够合并的容器');
	}
}

Editor.prototype.deleteBackward = function(){
	console.clear();
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		throw new Error('range 不存在, deleteBackward 执行失败');
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
}

Editor.prototype.enter = function(){
	console.clear();
	let 
		{ rangeApi, nodeApi } = this,
		range = rangeApi.getRange();
	if( !range ){
		throw new Error('range 不存在, enter 执行失败');
		return ;
	}
	let	{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
	if( collapsed ){
		let executeNode = nodeApi.getBlock(startContainer);
		// console.log('executeNode:', executeNode);
		this.executeEditorEvent(executeNode, this.eventType.enter, [startContainer, startOffset]);
	}else{
		let 
			startBlockNode = nodeApi.getBlock(startContainer),
			endBlockNode = nodeApi.getBlock(endContainer);

		if( startBlockNode === endBlockNode ){
			console.log('在同一个 block 中');
			let executeNode = nodeApi.getBlock(startContainer);
			this.executeEditorEvent(executeNode, this.eventType.enterFragment, [startContainer, startOffset, endContainer, endOffset]);

		}else{
			console.log('在不同的 block 中');
			while(startBlockNode.nextSibling !== endBlockNode){
				this.nodeApi.removeNode(startBlockNode.nextSibling);
			}
			this.executeEditorEvent(startBlockNode, this.eventType.enterFragment, [startContainer, startOffset, void 0, void 0]);
			this.executeEditorEvent(endBlockNode, this.eventType.enterFragment, [void 0, void 0, endContainer, endOffset]);
		}
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
