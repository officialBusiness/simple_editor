import { findBlock } from './node_api.js';

let components = {};

export default function createComponent(factory){
	components[factory.name] = factory;
	if( factory.alias ){
		factory.alias.forEach((name)=>{
			components[name] = factory;
		});
	}
}

export function getComponent(name){
	return components[name];
}

export function findNodeComponent(dom){
	return getComponent(findBlock(dom).className);
}