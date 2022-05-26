
export const nodeType = {
	// 基础的节点类型
	text: 'text',
	leafElement: 'leafElement',
	format: 'format',

	container: 'container',
	block: 'block',
	component: 'component',
}

export function isBlock(dom){
	return dom.getAttribute && dom.getAttribute('isBlock');
}

export function isNotBlock(dom){
	return !(dom.getAttribute && dom.getAttribute('isBlock'));
}

export function isStartBlock(dom){
	return dom === dom.parentNode.childNodes[0]
}

export function findBlock(dom){
	while(isNotBlock(dom)){
		dom = dom.parentNode;
	}
	return dom;
}

export function createTextNode(text){
  return document.createTextNode(text);
}

export function createElement(nodeName, attributes){
	let element = document.createElement(nodeName);
	if(attributes){
		Object.keys(attributes).forEach((key)=>{
			element.setAttribute(key, attributes[key]);
		});
	}
  return element;
}

export function createNode(node, children){
	switch(node.nodeType){
		case Node.ELEMENT_NODE:
			let dom = createElement(node.nodeName, node.attributes);
			if(children){
				children.forEach((child)=>{
					dom.appendChild(child);
				});
			}
			return dom;
		case Node.TEXT_NODE:
			return createTextNode(node);
		default:
			return;
	}
}