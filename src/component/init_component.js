import * as factories from './template/templates.js';

export function initComponent(context){
	// factories
	for( let factorieKey in factories ){
		// context.operation
		if( factories[factorieKey].event ){
			factories[factorieKey].event.forEach((event)=>{
				context.operation[event.name] = event.operation;
			});
		}
	}
	// console.log('context.operation:', context.operation);
}

export function supportOperation(supportOperationType, node){
	return factories[node.className].supportOperation[supportOperationType].call(this, node);
}

export function getComponent(type){
	console.log(`factories[${type}]:`, factories[type]);
	if(!factories[type]){
		return null;
	}
	return factories[type];
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