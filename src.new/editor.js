


export default function Editor(dom, contentObj){

	this.editorDom = dom;
	this.editorDom.style['white-space'] = 'pre-wrap';
	this.editorDom.contentEditable = this.editable = true;
	this.editorDom.setAttribute('editor', true);

	// 初始化组件生产工厂

	// this.defualtFactory
}