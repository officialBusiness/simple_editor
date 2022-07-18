
export default function Editor(dom, contentObj){
	// 初始化 dom
	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	// 事件
	

	// 组件
	this.components = {};


}