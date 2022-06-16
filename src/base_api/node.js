export const nodeLabel = {
	// 基础的节点类型
	// format: 'format',//	格式用于存放 text
	// leaf: 'leaf',	//	元素是叶子节点
	
	//	容器用于存放元素,一般是 editor 下的第二级节点
	//	允许 childNodes 空，空的情况下再删一次才能删除
	container: 'container',
	block: 'block',
	// mergeText: 'merge-text',
	// mergeAll: 'merge-all',
}

export function isNotEditor(dom){
	return !dom.getAttribute || !dom.getAttribute('editor');
}

export function isNotBlock(dom){
	return !dom.getAttribute || !dom.getAttribute('block');
}

export function isBlock(dom){
	return dom.getAttribute && !!dom.getAttribute('block');
}

export function isContainer(dom){
	return dom.getAttribute && !!dom.getAttribute('container');
}

export function isNotContainer(dom){
	return !dom.getAttribute || !dom.getAttribute('container');
}

export function isNotEditable(dom){
	if( dom.nodeType === Node.TEXT_NODE ){
		return !dom.parentNode.isContentEditable;
	}else if( dom.nodeType === Node.ELEMENT_NODE ){
		return !dom.isContentEditable;
	}
}

export function isStartInContainer(node){
	let parentNode = node.parentNode;
	while( isNotContainer(node) ){
		if( parentNode.childNodes[0] !== node ){
			return false;
		}
		node = parentNode;
		parentNode = node.parentNode;
	}
	return true;
}

export function isEndInContainer(node){
	let parentNode = node.parentNode;
	while( isNotContainer(node) ){
		let len = parentNode.childNodes.length;
		if( parentNode.childNodes[len - 1] !== node ){
			return false;
		}
		node = parentNode;
		parentNode = node.parentNode;
	}
	return true;
}

export function isEmpty(node){
	return node.childNodes.length === 0
}

export function createTextNode(text){
  return document.createTextNode(text);
}

export function createElement(nodeName, attributes, on){
	let element = document.createElement(nodeName);
	if(attributes){
		Object.keys(attributes).forEach((key)=>{
			element.setAttribute(key, attributes[key]);
		});
	}
	if( on ){
		for( let event in on ){
			element.addEventListener(event, on[event]);
		}
	}
  return element;
}

export function linkDomTree(tree){
	let parent = tree,
			nodes = [parent],
			children;
  while (parent = nodes.pop()) {
    if (children = parent.children) {
      for (let i = 0, len = children.length; i < len; i++) {
      	parent.node.appendChild(children[i].node);
        nodes.push(children[i]);
      }
    }
  }
	return tree.node;
}

export function insertAfter(newNode, lastNode){
	let parentNode = lastNode.parentNode;
	if( lastNode.nextSibling ){
		parentNode.insertBefore(newNode, lastNode.nextSibling);
	}else{
		parentNode.appendChild(newNode);
	}
}

export function removeNode(node){
	node.parentNode.removeChild(node);
}

export function emptyAllChild(node){
	for( let i = node.childNodes.length - 1; i >=0; i-- ){
		node.removeChild(node.childNodes[i]);
	}
}



export function getNodeIndexOf(node){
	let childNodes = node.parentNode.childNodes;
	for(let i = 0, len = childNodes.length; i < len; i++){
		if(node === childNodes[i]){
			return i;
		}
	}
}

export function getPreEndNodeInBlock(node){
	// console.log('测试 getPreEndNodeInBlock:', node);
	let hasPreNode = node;

	if( isBlock(hasPreNode) ){
		console.erroe('getPreEndNodeInBlock 函数出错:', node);
	}
	while( !hasPreNode.previousSibling ){
		hasPreNode = hasPreNode.parentNode;
		if( isBlock(hasPreNode) ){
			return null;
		} 
	}
	hasPreNode = hasPreNode.previousSibling;
	while( hasPreNode.childNodes.length ){
		hasPreNode = hasPreNode.childNodes[hasPreNode.childNodes.length - 1];
	}

	return hasPreNode;
}

export function getNextStartNodeInBlock(node){
	// console.log('测试 getNextStartNodeInBlock:', node);
	let hasNextNode = node;

	if( isBlock(hasNextNode) ){
		console.erroe('getNextStartNodeInBlock 函数出错:', node);
	}
	while( !hasNextNode.nextSibling ){
		hasNextNode = hasNextNode.parentNode;
		if( isBlock(hasNextNode) ){
			return null;
		}
	}
	hasNextNode = hasNextNode.nextSibling;
	while( hasNextNode.childNodes.length ){
		hasNextNode = hasNextNode.childNodes[0];
	}

	return hasNextNode;
}

export function getPreNodeInContainer(node){
	let hasPreNode = node;

	if( isContainer(hasPreNode) ){
		console.erroe('getPreNodeInContainer 函数出错:', node);
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
		console.erroe('getNextNodeInContainer 函数出错:', node);
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
	if( node && isNotContainer(node) ){
		let root = node,
				parentNode = node.parentNode;
		while( parentNode.childNodes.length === 1
				&& isNotContainer(parentNode) ){
			root = parentNode;
			parentNode = root.parentNode;
		}
		return root;
	}else{
		console.error('getSingleNodeInContainer 函数出错:', node);
		return null;
	}
}

export function getContainer(node){
	let root = node,
			parentNode = node.parentNode;
	while( isNotContainer(root) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}


export function getBlock(node){
	let root = node,
			parentNode = node.parentNode;
	while( isNotBlock(root) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}

export function getPreBlock(node){
	let root = node,
			parentNode = node.parentNode;
	while( isNotBlock(root) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root.previousSibling;
}

