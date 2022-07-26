import paragraphEvent from '../paragraph/event/paragraph_event.js';

export default {
	type: 'header',
	event: paragraphEvent,
	toDom(obj){
		return this.nodeApi.createDom({
			nodeName: obj.level,
			attributes: {
				class: 'header',
				[this.nodeLabel.block]: true,
				[this.nodeLabel.container]: true,
			},
			created: (header)=>{
				if(Array.isArray(obj.data)){
					obj.data.forEach((child, index, array)=>{
						if( array[index + 1] && array[index + 1].type === child.type && child.type === 'text' ){
							console.error(child, array[index + 1]);
							throw new Error('存在两个连续的 text');
						}
						let childDom = this.objToDom(child);
						if( childDom ){
							this.nodeApi.appendChild(header, childDom);
						}else{
							console.error(child);
							throw new Error('组件读取解析失败');
						}
					});
				}else if( typeof obj.data === 'string' ){
					this.nodeApi.appendChild(header, this.nodeApi.createTextNode(obj.data));
				}
			}
		});
	},
	toObj(dom){
		let obj = {
			type: 'header',
			level: dom.nodeName.toLowerCase()
		};
		if(dom.childNodes.length > 1){
			obj.data = [];
			dom.childNodes.forEach((child)=>{
				obj.data.push(this.domToObj(child));
			});
		}else if( dom.childNodes.length === 1 && dom.childNodes[0].nodeType === Node.TEXT_NODE ){
			obj.data = dom.childNodes[0].nodeValue;
		}else{
			throw new Error('header 组件转化 dom 为 obj 时出错');
		}
		return obj;
	},
	helpEvent: {
		getFirstContainer(header){
			return header;
		},
		getLastContainer(header){
			return header;
		},
		getMergeContainer(header){
			return header;
		},
		getMergedNodes(header){
			return header.childNodes;
		}
	}
}