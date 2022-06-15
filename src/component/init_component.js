import * as factories from './template/index.js';

/*{
	type,
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
	if( factory.alias ){
		factory.alias.forEach((type)=>{
			components[type] = factory;
			if( factory.isBlock ){
				blocks[type] = factory;
			}
		});
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
	}
}

export function getComponentObj(context, type, dom){
	if( typeof type === 'string' ){
		return components[type].toJson.call(context, dom);
	}else 
	if( typeof type === 'object' ){
		if( dom.nodeType === Node.TEXT_NODE ){
			return components['text'].toJson.call(context, type);
		}else{
			return components[type.className].toJson.call(context, type);
		}
	}
}