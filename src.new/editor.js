import * as rangeApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/component.js';

export default function Editor(dom, contentObj){
	// 初始化 dom

	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	// 事件
	

	// 组件

	this.components = {};
	// 默认的块类型数据
	this.defualtBlockObj = { type: 'paragraph' };
}

Editor.prototype.rangeApi = rangeApi;
Editor.prototype.nodeApi = nodeApi;
Editor.prototype.nodeLabel = nodeApi.nodeLabel;

// 组件数据转化
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

Editor.prototype.objToDom = function(obj){
	return componentApi.getComponentDom(this, obj);
}

Editor.prototype.domToObj = function(dom){
	return componentApi.getComponentObj(this, dom);
}

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

Editor.prototype.exportObjJsonFormatting = function(filename){
	var eleLink = document.createElement('a');
	eleLink.download = filename;
	eleLink.style.display = 'none';
	// 字符内容转变成blob地址
	var blob = new Blob([JSON.stringify(this.toObj(), null, 4)]);
	eleLink.href = URL.createObjectURL(blob);
	// 触发点击
	document.body.appendChild(eleLink);
	eleLink.click();
	// 然后移除
	document.body.removeChild(eleLink);
}

// 事件操作





