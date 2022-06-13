
export const nodeLabel = {
	// 基础的节点类型


	format: 'format',//	格式用于存放 text
	leaf: 'leaf',	//	元素是叶子节点
	
	//	容器用于存放元素,一般是 editor 下的第二级节点
	//	允许 childNodes 空，空的情况下再删一次才能删除
	container: 'container',
	mergeText: 'merge-text',
	mergeAll: 'merge-all',
	block: 'block',
}

export function isLeaf(dom){
	return !!dom.getAttribute('leaf');
}

export function isContainer(dom){
	return !!dom.getAttribute('container');
}

export function isNotContainer(dom){
	return !dom.getAttribute('container');
}

export function isBlock(){
	return !!dom.getAttribute('block');
}

export function isNotBlock(){
	return !dom.getAttribute('block');
}

export function isStartInContainer(node){
	let parentNode = node.parentNode;
	while( isNotContainer(parentNode) ){
		if( parentNode.childNodes[0] !== node ){
			return false;
		}
		node = parentNode;
		parentNode = node.parentNode;
	}
	return true;
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

export function createNode(node){
	switch(node.nodeType){
		case Node.ELEMENT_NODE:
			let dom = createElement(node.nodeName, node.attributes);
			// if(children){
			// 	children.forEach((child)=>{
			// 		dom.appendChild(child);
			// 	});
			// }
			return dom;
		case Node.TEXT_NODE:
			return createTextNode(node.nodeValue);
		default:
			return;
	}
}

export function removeNode(node){
	node.parentNode.removeChild(node);
}

export function getNodeIndexOf(node){
	let childNodes = node.parentNode.childNodes;
	for(let i = 0, len = childNodes.length; i < len; i++){
		if(node === childNodes[i]){
			return i;
		}
	}
}

export function getPreNodeInContainer(node){
	let hasPreNode = node;

	if( isContainer(hasPreNode) ){
		return null;
	}
	while( !hasPreNode.previousSibling ){
		hasPreNode = hasPreNode.parentNode;
		if( isContainer(hasPreNode) ){
			return null;
		} 
	}
	return hasPreNode.previousSibling;
}

export function getNextNodeInContainer(node){
	let hasNextNode = node;

	if( isContainer(hasNextNode) ){
		return null;
	}
	while( !hasNextNode.nextSibling ){
		hasNextNode = hasNextNode.parentNode;
		if( isContainer(hasNextNode) ){
			return null;
		} 
	}
	return hasNextNode.nextSibling;
}


export function getSingleNodeInContainer(node){
	if( node ){
		let root = node,
				parentNode = node.parentNode;
		while( parentNode.childNodes.length === 1
				&& isNotContainer(parentNode) ){
			root = parentNode;
			parentNode = root.parentNode;
		}
		return root;
	}else{
		return null;
	}
}

export function getContainer(node){
	let root = node,
			parentNode = node.parentNode;
	while( isNotContainer(parentNode) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}


export function getBlock(node){
	let root = node,
			parentNode = node.parentNode;
	while( isNotContainer(parentNode) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}

