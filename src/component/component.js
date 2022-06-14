let components = {};

export function createComponent(factory){
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