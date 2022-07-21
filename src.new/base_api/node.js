
export const nodeLabel = {
	block: 'block',
	container: 'container',
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

export function appendChild(parentNode, newNode){
	parentNode.appendChild(newNode);
}

export function emptyAllChild(node){
	for( let i = node.childNodes.length - 1; i >=0; i-- ){
		node.removeChild(node.childNodes[i]);
	}
}

export function removeChild(parentNode, node){
	parentNode.removeChild(newNode);
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