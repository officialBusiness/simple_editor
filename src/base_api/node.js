
export const nodeLabel = {
	block: 'block',
	container: 'container',
}
// 	判断

export function isBlock(dom){
	return dom.nodeType === Node.ELEMENT_NODE && !!dom.getAttribute('block');
}

export function isNotBlock(dom){
	return dom.nodeType !== Node.ELEMENT_NODE || !dom.getAttribute('block');
}

export function isContainer(dom){
	return dom.nodeType === Node.ELEMENT_NODE && !!dom.getAttribute('container');
}

export function isNotContainer(dom){
	return dom.nodeType !== Node.ELEMENT_NODE || !dom.getAttribute('container');
}

export function isEmpty(node){
	return node.childNodes.length === 0
}

// 单个元素是否相同, 不考虑子节点
export function isElementEqual(a, b) {
	// 判断两个对象是否指向同一内存，指向同一内存返回true
	if (a === b) {
		return true;
	}
	// 获取两个对象键值数组
	let aProps = Object.getOwnPropertyNames(a)
	let bProps = Object.getOwnPropertyNames(b)

	// 遍历对象的键值
	if( a.nodeType !== b.nodeType ){
		console.log('node 类型不同', 'a:', a, 'b:', b);
		return false;
	}

	if( a.nodeType === Node.ELEMENT_NODE ){
		if( a.nodeName !== b.nodeName ){
			console.log('标签 nodeName 不一样');
			console.log('a:', a);
			console.log('b:', b);
			return false;
		}

		if( a.attributes.length !== b.attributes.length ){
			console.log('attributes 长度不一样');
			console.log('a:', a, 'attribute', a.attributes);
			console.log('b:', b, 'attribute', b.attributes);
			return false;
		}

		for(let i = 0; i < a.attributes.length; i++){
			let aAttribute = a.attributes.item(i),
					bAttribute = b.attributes.item(i);

			if( aAttribute.name !== bAttribute.name || 
					aAttribute.value  !== bAttribute.value ){
				console.log('attributes 属性不一样');
				console.log('a:', a, 'attribute', a.attributes.item(i));
				console.log('b:', b, 'attribute', b.attributes.item(i));
				return false;
			}
		}

		if( a.style.length !== b.style.length ){
			console.log('style 长度不一样');
			console.log('a:', a, 'style', a.style);
			console.log('b:', b, 'style', b.style);
			return false;
		}

		for(let i = 0; i < a.style.length; i++){
			let aStyle = a.style[i],
					bStyle = b.style[i];
			if( aStyle !== bStyle ){
				console.log('style 属性不一样');
				console.log('a:', a, 'style', a.style[i]);
				console.log('b:', b, 'style', b.style[i]);
				return false;
			}
			if( a.style[aStyle] !== b.style[bStyle] ){
				console.log('style 属性不一样');
				console.log('a:', a, `a.style[${aStyle}]`, a.style[aStyle]);
				console.log('b:', b, `b.style[${bStyle}]`, b.style[bStyle]);
				return false;
			}
		}
	}

	return true;
}

// 判断 node 是否是 container 的第一个的节点
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

// 	增

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

export function appendChild(parentNode, newNode){
	parentNode.appendChild(newNode);
}

export function appendChildren(parentNode, childrenNodes){
	if( NodeList.prototype.isPrototypeOf(childrenNodes)){
		for( let i = 0, len = childrenNodes.length; i < len; i++ ){
			parentNode.appendChild(childrenNodes[0]);
		}
	}else if(Array.prototype.isPrototypeOf(childrenNodes)){
		for( let i = 0, len = childrenNodes.length; i < len; i++ ){
			parentNode.appendChild(childrenNodes[i]);
		}
	}else{
		console.error('childrenNodes:', childrenNodes);
		throw new Error('appendChildren 传参错误, childrenNodes 类型未知');
	}
}

export function createTextNode(text){
	return document.createTextNode(text);
}

export function createDom(obj){
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
					if( attributes[key] !== void 0 && attributes[key] !== null){
						element.setAttribute(key, attributes[key]);
					}
				});
			}else{
				console.error(attributes);
				throw new Error('创建组件 dom 时遇到情况外的 attributes 类型');
			}
		}
		if( style ){
			if(typeof style === 'object'){
				Object.keys(style).forEach((key)=>{
					if( style[key] !== void 0 && style[key] !== null ){
						element.style[key] = style[key];
					}
				});
			}else{
				console.error(style);
				throw new Error('创建组件 dom 时遇到情况外的 style 类型');
			}
		}
		if( children ){
			if( Array.isArray(children) ){
				children.forEach((child)=>{
					let dom = createDom(child);
					if( dom ){
						element.appendChild(dom);
					}
				});
			}else if( typeof children === 'object' ){
				let dom = createDom(children);
				if( dom ){
					element.appendChild(dom);
				}
			}else if( typeof children === 'string' ){
				element.appendChild(document.createTextNode(children));
			}else{
				console.error(children);
				throw new Error('创建组件 dom 时遇到情况外的 children 类型');
			}
		}
		if( created ){
			if( typeof created === 'function'){
				created(element);
			}else{
				console.error(created);
				throw new Error('创建组件 dom 时遇到情况外的 created 类型');
			}
		}
		return element;
	}else{
		console.error(obj);
		throw new Error('创建组件 dom 时遇到情况外的 obj 类型');
	}
}

// 	删

export function emptyAllChild(node){
	for( let i = node.childNodes.length - 1; i >=0; i-- ){
		node.removeChild(node.childNodes[i]);
	}
}

export function removeChild(parentNode, node){
	parentNode.removeChild(newNode);
}

export function removeNode(node){
	node.parentNode.removeChild(node);
}

// 改

export function mergeTwoNodes(pre, next){
	console.log('%c合并两个节点 node mergeTwoNodes', 'color: #000000; background-color: #ffffff');
	console.log('pre:', pre, '\nnext:', next);
	if( pre.nodeType === Node.TEXT_NODE &&
			next.nodeType === Node.TEXT_NODE ){//	前后节点都是text
		console.log('节点都是 text');
		pre.parentNode.normalize();//	合并前后 text
	}else if( isElementEqual( pre, next ) ){// 	前后节点一样，可以合并
		console.log('节点元素信息一致，可以合并');
		if( pre.childNodes.length > 0 && next.childNodes.length > 0 ){
			let preEnd = pre.childNodes[pre.childNodes.length - 1],
					nextStart = next.childNodes[0];
			appendChildren(pre, next.childNodes);
			removeNode(next);
			mergeTwoNodes( preEnd, nextStart);
		}else if( pre.childNodes.length === 0 && next.childNodes.length > 0){
			appendChildren(pre, next.childNodes);
			removeNode(next);
		}
	}
}

export function splitFromNodeOffsetStillTop(node, offset, topNode){
	console.log('%cnode splitFromNodeOffsetStillTop', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset, '\ntopNode:', topNode);
	if( !topNode.contains(node) ){
		console.error('node:', node, 'topNode:', topNode);
		throw new Error('splitFromNodeOffsetInContainer 传参错误, node 不包含在 topNode 中');
	}
	let startNode;
	if( node.nodeType === Node.TEXT_NODE ){
		if( offset === node.length ){
			startNode = getNextNodeInContainer(node);
		}else if( offset === 0 ){
			console.log('offset 为 0 的 特殊情况, text 为 display 容器中的第一个节点');
			startNode = node;
		}else{
			node.splitText(offset);
			startNode = node.nextSibling;
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		startNode = offset === node.childNodes.length ? getNextNodeInContainer(node.childNodes[offset - 1]) : 
												node.childNodes[offset];
	}
	if( startNode ){
		console.log('开始拆分 startNode:', startNode);
	}else{
		console.log('startNode 不存在, 在最末端, 不需要拆分');
		return ;
	} 
	let	startNodeParent,
		startNodeParentClone,
		rememberStartNodeParentClone;

	while( startNode.parentNode && startNode !== topNode ){
		let	
			nextSibling = startNode.nextSibling,
			rememberNextSibling;

		startNodeParent = startNode.parentNode;
		startNodeParentClone = startNodeParent.cloneNode(false);

		if( rememberStartNodeParentClone ){
			startNodeParentClone.appendChild(rememberStartNodeParentClone);
		}else{
			startNodeParentClone.appendChild(startNode);
		}
		rememberStartNodeParentClone = startNodeParentClone;

		while( nextSibling ){
			rememberNextSibling = nextSibling.nextSibling;
			startNodeParentClone.appendChild( nextSibling );
			nextSibling = rememberNextSibling;
		}

		startNode = startNodeParent;
	}
	return startNodeParentClone;
}

// 	查

export function getNodeIndexOf(node){
	let childNodes = node.parentNode.childNodes;
	for(let i = 0, len = childNodes.length; i < len; i++){
		if(node === childNodes[i]){
			return i;
		}
	}
}

export function getNodeStyle(node){
	let style ;
	if( node.style.length > 0 ){
		style = {};
		for( let i = 0; i < node.style.length; i++ ){
			let key = node.style[i];
			style[key] = node.style[key];
		}
	}
	return style;
}


export function getBlock(node){
	if( !node || !node.nodeType || !node.parentNode){
		console.error('node:', node);
		throw new Error('getBlock 传参错误');
	}
	let root = node,
			parentNode = node.parentNode;
	while( isNotBlock(root) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}

export function getPreBlock(node){
	if( !node || !node.nodeType || !node.parentNode){
		console.error('node:', node);
		throw new Error('getPreBlock 传参错误');
	}
	if( isBlock(node) ){
		return node.previousSibling;
	}else{
		let root = node,
				parentNode = node.parentNode;
		while( isNotBlock(root) ){
			root = parentNode;
			parentNode = root.parentNode;
		}
		return root.previousSibling;
	}
}

export function getNextBlock(node){
	if( !node || !node.nodeType || !node.parentNode){
		console.error('node:', node);
		throw new Error('getNextBlock 传参错误');
	}
	if( isBlock(node) ){
		return node.nextSibling;
	}else{
		let root = node,
				parentNode = node.parentNode;
		while( isNotBlock(root) ){
			root = parentNode;
			parentNode = root.parentNode;
		}
		return root.nextSibling;
	}
}

export function getContainer(node){
	if( !node || !node.nodeType || !node.parentNode){
		console.error('node:', node);
		throw new Error('getContainer 传参错误');
	}
	let root = node,
			parentNode = node.parentNode;
	while( isNotContainer(root) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}

export function getSingleNodeInContainer(node){
	if( !node || !node.nodeType || !node.parentNode || 
			isContainer(node)){
		console.error('node:', node);
		throw new Error('getSingleNodeInContainer 传参错误');
	}
	let root = node,
			parentNode = node.parentNode;
	while( parentNode.childNodes.length === 1
			&& isNotContainer(parentNode) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}

export function getPreNodeInContainer(node){
	if( !node || !node.nodeType || !node.parentNode || 
			isContainer(node)){
		console.error('node:', node);
		throw new Error('getPreNodeInContainer 传参错误');
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
	if( !node || !node.nodeType || !node.parentNode || 
			isContainer(node)){
		console.error('node:', node);
		throw new Error('getNextNodeInContainer 传参错误');
	}
	while( !node.nextSibling ){
		node = node.parentNode;
		if( isContainer(node) ){
			return null;
		} 
	}
	return node.nextSibling;
}



