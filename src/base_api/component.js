

export let components = {};
export let block = {};

export function createComponent(factory){
	components[factory.name] = factory;
	if( factory.alias ){
		factory.alias.forEach((name)=>{
			components[name] = factory;
		});
	}
	if( factory.isBlock ){
		block[name] = factory;
	}
}

export function getComponent(name){
	return components[name];
}


export function getBlock(name){
	return block[name];
}

export function componentDom(name, obj){
	return components[name].toDom(obj);
}