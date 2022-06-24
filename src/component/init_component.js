import * as factories from './template/index.js';

/*{
	type,
	eventInterface,
	alias,
	isBlock,
	toDom(obj){

	},
	toObj(dom){

	}
}*/

export let components = {};
export let blocks = {};

function createComponent(factory){
	components[factory.type] = factory;
	if( factory.isBlock ){
		blocks[factory.type] = factory;
	}
}

for( let key in factories ){
	createComponent(factories[key]);
}

export function getComponent(type){
	return components[type];
}

export function getBlock(type){
	return blocks[type];
}

export function getBlockDom(context, type, obj){
	if( typeof type === 'string' ){
		if(!blocks[type]){
			return null;
		}
		return blocks[type].toDom.call(context, obj);
	}else if( typeof type === 'object' ){
		if(!blocks[type.type]){
			return null;
		}
		return blocks[type.type].toDom.call(context, type);
	}
}

export function getComponentDom(context, type, obj){
	if( typeof type === 'string' ){
		if(!components[type]){
			return null;
		}
		return components[type].toDom.call(context, obj);
	}else if( typeof type === 'object' ){
		if(!components[type.type]){
			return null;
		}
		return components[type.type].toDom.call(context, type);
	}else{
		console.info('不知道的特殊情况:', 'type:', type, 'obj:', obj);
	}
}

export function getComponentObj(context, type, dom){
	if( typeof type === 'string' ){
		return components[type].toObj.call(context, dom);
	}else 
	if( typeof type === 'object' ){
		if( type.nodeType === Node.TEXT_NODE ){
			return components['text'].toObj.call(context, type);
		}else if( type.nodeType === Node.ELEMENT_NODE ){
			// console.log('type:', type);
			return components[type.className].toObj.call(context, type);
		}else{
			console.info('不知道的特殊情况:', 'type:', type, 'dom:', dom);
		}
	}
}