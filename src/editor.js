import * as rangeApi from './base_api/range.js';
import * as nodeApi from './base_api/node.js';
import * as componentApi from './component/init_component.js';
import EditorEvent, { supportOperationType } from './event/event.js';

export default function Editor(dom, contentObj){

	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	// 初始化事件
	this.event = new EditorEvent(this);
	this.operation = {}
	componentApi.initComponent(this);

	// 初始化组件生产工厂
	this.defualtBlockObj = { type: 'paragraph' };

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

	this.range = {};
}

Editor.prototype.setEditable = function(editable){
	this.editorDom.contentEditable = this.editable = editable;
	return this;
}

Editor.prototype.rememberRange = function(){
	let range = this.rangeApi.getRange();
	if( range && this.editorDom.contains(range.commonAncestorContainer) ){
		this.range.collapsed = range.collapsed;
		this.range.commonAncestorContainer = range.commonAncestorContainer;
		this.range.endContainer = range.endContainer;
		this.range.endOffset = range.endOffset;
		this.range.startContainer = range.startContainer;
		this.range.startOffset = range.startOffset;
	}
}

Editor.prototype.rangeApi = rangeApi;
Editor.prototype.nodeApi = nodeApi;
Editor.prototype.nodeLabel = nodeApi.nodeLabel;

Editor.prototype.supportOperationType = supportOperationType;
Editor.prototype.supportOperation = componentApi.supportOperation;

Editor.prototype.dealOperaion = function(container, operationType, params){
	container = this.nodeApi.getContainer(container);			
	let event = this.operation[ container.getAttribute('event') ];
	if( event && event[operationType] ){
		event[operationType].apply(this, params);
	}else{
		console.error(container.className, 'dealOperaion找不到相关操作,操作待完善:', operationType);
	}
}

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

Editor.prototype.loadJson = function(jsonUrl){
	var xmlhttp = new XMLHttpRequest(),
			editor = this;
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
			editor.render(json);
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



Editor.prototype.addEvent = function(eventType, event){
	this.event.addEvent(eventType, event);
	return this;
}


Editor.prototype.compareObj = function(obj){
	let editorObj = this.toObj(),
			compare = isObjectValueEqual(editorObj, obj);
	if( compare ){
		console.log('editor 的 obj 与传入的 obj 内容一样');
	}else{
		console.log('editor 的 obj 与传入的 obj 内容不一样');
	}
	return compare;
}

function isObjectValueEqual(a, b) {
  // 判断两个对象是否指向同一内存，指向同一内存返回true
  if (a === b) return true
  // 获取两个对象键值数组
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  // 判断两个对象键值数组长度是否一致，不一致返回false
  if (aProps.length !== bProps.length) {
  	console.log(aProps, `aProps.length`, aProps.length);
  	console.log(bProps, `bProps.length`, bProps.length);
  	return false
  }
  // 遍历对象的键值
  for (let prop in a) {
    // 判断a的键值，在b中是否存在，不存在，返回false
    if (b.hasOwnProperty(prop)) {
      // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
      if (typeof a[prop] === 'object') {
        if (!isObjectValueEqual(a[prop], b[prop])) {
        	return false;
        }
      } else if (a[prop] !== b[prop]) {
      	console.log(`a[${prop}]`, a[prop]);
      	console.log(`b[${prop}]`, b[prop]);
        return false;
      }
    } else {
      	console.log(`prop`, prop);
      return false;
    }
  }
  return true;
}

