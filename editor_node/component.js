import { findBlock } from './node_api.js';

let components = {};

export default function createComponent(component){
	components[component.name] = component;
	return 
}

export function getComponent(name){
	return components[name];
}

export function findNodeComponent(dom){
	return getComponent(findBlock(dom).className);
}