import * as factories from './template/templates.js';


export function registerComponentEvent(context){
	for( let factorieKey in factories ){
		if( Array.isArray(factories[factorieKey].event) ){
			factories[factorieKey].event.forEach((event)=>{
				context.componentEvent[event.name] = event.operation;
			});
		}else{
			console.warn(`${factorieKey} 组件还未实现事件`);
		}
	}
}

export function getComponentDom(context, obj){
	if( typeof obj !== 'object' ){
		console.error('obj', obj);
		throw new Error('输入参数出错');
	}
	if(!factories[obj.type]){
		console.error('obj', obj);
		throw new Error('该类型组件不存在');
	}
	return factories[obj.type].toDom.call(context, obj);
}


export function getComponentObj(context, dom){
	if( typeof dom !== 'object' ){
		console.error('obj', obj);
		throw new Error('输入参数出错');
	}else if( dom.nodeType === Node.TEXT_NODE ){
		return factories['text'].toObj.call(context, dom);
	}else if( dom.nodeType === Node.ELEMENT_NODE ){
		if(!factories[dom.className]){
			console.error('dom:', dom);
			throw new Error('该类型组件不存在');
		}
		return factories[dom.className].toObj.call(context, dom);
	}else{
		console.error('dom:', dom);
		throw new Error('不知道的特殊情况');
	}
}