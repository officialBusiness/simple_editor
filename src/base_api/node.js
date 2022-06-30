export const nodeLabel = {

	//	container 容器用于存放元素,一般是 editor 下的第二级节点
	//	允许 childNodes 空, 空的情况下再删一次才能删除
	// container 里的内容, element 元素必须是单个, text 无要求
	container: 'container',
	
	// block 为 editorDom 的下级节点, 即富文本的内容就是由 block 组成的, block 任意组织 container
	block: 'block',
	// block 的标签用于处理 deleteForwardOnStart 的情况, 目前只有一种 single
	// 表明 block 是一个整体, 受到删除就会整个删掉
	single: 'single',

	//	container 的天然属性，表示包容所有类型的节点还是只有 text
	// merge: 'merge',
	// mergeAll: 'merge-all',
	mergeText: 'merge-text',
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

export function isSingle(dom){
	return isBlock(dom) && !!dom.getAttribute('single');
}

export function isContainer(dom){
	return dom.getAttribute && !!dom.getAttribute('container');
}

export function isNotContainer(dom){
	return !dom.getAttribute || !dom.getAttribute('container');
}

export function isMergeText(dom){
	return isContainer(dom) && !!dom.getAttribute('merge-text');
}

export function isNotEditable(dom){
	if( dom.nodeType === Node.TEXT_NODE ){
		return !dom.parentNode.isContentEditable;
	}else if( dom.nodeType === Node.ELEMENT_NODE ){
		return !dom.isContentEditable;
	}
}

// 判断是否是 container 的第一个的节点
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

// 判断是否是 container 的最后一个的节点
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
			if( attributes[key] !== null ){
				element.setAttribute(key, attributes[key]);
			}
		});
	}
	if( on ){
		for( let event in on ){
			element.addEventListener(event, on[event]);
		}
	}
  return element;
}

export function createComonentDom(obj){
	if( obj.if !== void 0 && !obj.if ){
		return ;
	}
	if( typeof obj === 'string' ){
		return document.createTextNode(text);
	}else if( typeof obj === 'object' ){
		let
			{ nodeName, attributes, on, style, children, created } = obj,
			element = document.createElement(nodeName);

		if( attributes ){
			if(typeof attributes === 'object'){
				Object.keys(attributes).forEach((key)=>{
					if( attributes[key] !== void 0 ){
						element.setAttribute(key, attributes[key]);
					}
				});
			}else{
				console.error('创建组件 dom 时遇到情况外的 attributes 类型', attributes);
			}
		}
		// if( on ){
		// 	if(typeof on === 'object'){
		// 		Object.keys(on).forEach((key)=>{
		// 			if( typeof on[key] === 'function' ){
		// 				element.addEventListener(key, on[key]);
		// 			}else{
		// 				console.error(`创建组件 dom 时 on[${key}] 不为 function`, on[key]);
		// 			}
		// 		});
		// 	}else{
		// 		console.error('创建组件 dom 时遇到情况外的 on 类型', on);
		// 	}
		// }
		if( style ){
			if(typeof style === 'object'){
				Object.keys(style).forEach((key)=>{
					if( style[key] !== void 0 ){
						element.style[key] = style[key];
					}
				});
			}else{
				console.error('创建组件 dom 时遇到情况外的 style 类型', style);
			}
		}
		if( children ){
			if( Array.isArray(children) ){
				children.forEach((child)=>{
					element.appendChild(createComonentDom(child));
				});
			}else if( typeof children === 'object' ){
				element.appendChild(createComonentDom(children));
			}else if( typeof children === 'string' ){
				element.appendChild(document.createTextNode(children));
			}else{
				console.error('创建组件 dom 时遇到情况外的 children 类型', children);
			}
		}
		if( created ){
			if( typeof created === 'function'){
				created(element);
			}else{
				console.error('创建组件 dom 时遇到情况外的 created 类型', created);
			}
		}
		return element;
	}else{
		console.error('创建组件 dom 时遇到情况外的 obj 类型', obj);
	}
}

export function insertBefore(newNode, nextNode){
	nextNode.parentNode.insertBefore(newNode, nextNode);
}

export function insertAfter(newNode, preNode){
	let parentNode = preNode.parentNode;
	if( preNode.nextSibling ){
		parentNode.insertBefore(newNode, preNode.nextSibling);
	}else{
		parentNode.appendChild(newNode);
	}
}

export function appendChildren(parentNode, childrenNodes){
	if( !NodeList.prototype.isPrototypeOf(childrenNodes)){
		console.error('参数出错');
		return;
	}
	for( let i = 0, len = childrenNodes.length; i < len; i++ ){
		parentNode.appendChild(childrenNodes[0]);
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

export function getPreNodeInContainer(node){
	if( isContainer(node) ){
		console.error('getPreNodeInContainer 函数出错:', node);
	}
	while( !node.previousSibling ){
		node = node.parentNode;
		if( isContainer(node) ){
			return null;
		} 
	}
	return node.previousSibling;
}

export function getNextNodeInContainer(node){
	if( isContainer(node) ){
		console.error('getNextNodeInContainer 函数出错:', node);
	}
	while( !node.nextSibling ){
		node = node.parentNode;
		if( isContainer(node) ){
			return null;
		} 
	}
	return node.nextSibling;
}

export function getEndNodeInContainer(node){
	while( node.childNodes.length > 0 ){
		node = node.childNodes[node.childNodes.length - 1];
	}
	return node;
}

export function getStartNodeInContainer(node){
	while( node.childNodes.length > 0 ){
		node = node.childNodes[0];
	}
	// console.log('node:', node);
	return node;
}

export function getPreEndNodeInContainer(node){
	if( isContainer(node) ){
		console.error('getPreEndNodeInContainer 函数出错:', node);
	}
	while( !node.previousSibling ){
		node = node.parentNode;
		if( isContainer(node) ){
			return null;
		} 
	}
	node = node.previousSibling;
	while( node.childNodes.length > 0 ){
		node = node.childNodes[node.childNodes.length - 1];
	}
	return node;
}

export function getNextStartNodeInContainer(node){
	if( isContainer(node) ){
		console.error('getNextStartNodeInContainer 函数出错:', node);
	}
	while( !node.nextSibling ){
		node = node.parentNode;
		if( isContainer(node) ){
			return null;
		}
	}
	node = node.nextSibling;
	while( node.childNodes.length > 0 ){
		node = node.childNodes[0];
	}
	return node;
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

export function getNextBlock(node){
	let root = node,
			parentNode = node.parentNode;
	while( isNotBlock(root) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root.nextSibling;
}

