
export default {
	type: 'header',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: obj.level,
			attributes: {
				class: 'header',
				block: true,
				container: true,
			},
			created: (header)=>{
				if(Array.isArray(obj.data)){
					obj.data.forEach((child)=>{
						let childDom = this.getComponentDom(child);
						if( childDom ){
							header.appendChild( childDom );
						}else{
							console.error('组件读取解析失败:', child);
						}
					});
				}else if( typeof obj.data === 'string' ){
					header.innerText = obj.data;
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
				obj.data.push(this.getComponentObj(child));
			});
		}else if( dom.childNodes.length === 1 && dom.childNodes[0].nodeType === Node.TEXT_NODE ){
			obj.data = dom.innerText;
		}else{
			console.error('header 组件转化 dom 为 obj 时出错');
		}
		return obj;
	}
}