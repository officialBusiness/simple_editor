
export const nodeLabel = {
	block: 'block',
	container: 'container',
}
// 	判断

export function isContainer(dom){
	return dom.nodeType === Node.ELEMENT_NODE && !!dom.getAttribute('container');
}

export function isNotContainer(dom){
	return dom.nodeType !== Node.ELEMENT_NODE || !dom.getAttribute('container');
}

export function isNodeEqual(a, b) {
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

	}else if( a.nodeType === Node.TEXT_NODE ){
		if( a.nodeValue  !== b.nodeValue ){
			console.log('text 内容不一样', 'a:', a, 'b:', b);
			return false;
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

export function appendChild(parentNode, newNode){
	parentNode.appendChild(newNode);
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

// 	获取

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



