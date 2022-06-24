import * as factories from './template/template.js';

export function initComponent(context){
	
}

export function getComponentDom(context, obj){
	if(!factories[obj.type]){
		return null;
	}
	return factories[obj.type].toDom.call(context, obj);
}

export function getComponentObj(context, dom){
	if( dom.nodeType === Node.TEXT_NODE ){
		return factories['text'].toObj.call(context, dom);
	}else if( dom.nodeType === Node.ELEMENT_NODE ){
		return factories[dom.className].toObj.call(context, dom);
	}else{
		console.error('不知道的特殊情况:', 'dom:', dom);
	}
}