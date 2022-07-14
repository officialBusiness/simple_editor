
export default function insertElement(element, start, offset){
	let { rangeApi, nodeApi } = this;
	console.log('执行 insertElement:', element, start, offset);
	if( start.nodeType === Node.TEXT_NODE ){
		if( offset === start.length ){
			console.log('在 text 末端');
			let nodeUntilContainerChild = nodeApi.getNodeUntilContainerChild(start);
			if(Array.isArray(element)){
				element.forEach((dom)=>{
					nodeApi.insertAfter(dom, nodeUntilContainerChild);
					nodeUntilContainerChild = dom;
				});
			}else{
				nodeApi.insertAfter(element, nodeUntilContainerChild);
			}
		}else{
			console.log('待完善');
		}
	}else if( start.nodeType === Node.ELEMENT_NODE ){
			if( offset === 0 ){
				if( nodeApi.isContainer(start) ){
					// nodeApi.appendChild(start, element);
					if(Array.isArray(element)){
						element.forEach((dom)=>{
							nodeApi.appendChild(start, dom);
						});
					}else{
						nodeApi.appendChild(start, element);
					}
				}
			}else{
				let startElement = start.childNodes[offset - 1],
						nodeUntilContainerChild = nodeApi.getNodeUntilContainerChild(startElement);
				if(Array.isArray(element)){
					element.forEach((dom)=>{
						nodeApi.insertAfter(dom, nodeUntilContainerChild);
						nodeUntilContainerChild = dom;
					});
				}else{
					nodeApi.insertAfter(element, nodeUntilContainerChild);
				}
			}
	}else{
		console.error('不知道的特殊情况');
	}
}