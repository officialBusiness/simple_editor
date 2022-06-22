function labelLowEng(index){
	return String.fromCharCode(97 + index) + '.';
}
function labelUppeEng(index){
	return String.fromCharCode(65 + index) + '.';
}
function labelNumber(index){
	return 1 + index + '.';
}
function labelCustom(index, label){
	return label[index];
}

export default {
	type: 'list',
	isBlock: true,
	toDom(obj){
		let { title, data } = obj,
				getLabel;

		if( title === 'english' ){
			getLabel = labelLowEng;
		}else if( title === 'English' ){
			getLabel = labelUppeEng;
		}else if( title === 'number' ){
			getLabel = labelNumber;
		}else if( Array.isArray(title) ){
			getLabel = labelCustom;
		}

		let list = this.nodeApi.createElement('div', {
			class: 'list',
			title: Array.isArray(title) ? 'custom' : title,
			block: true,
			mergeBlock: true
		});

		data.forEach((item, index)=>{
			let 
				li = this.nodeApi.createElement('div', {
					class: 'li',
				}),
				label = this.nodeApi.createElement('div', {
					class: 'label',
					contenteditable: Array.isArray(title) ? true : false,
					container: Array.isArray(title) ? true : null
				}, {
					mousedown: (e)=>{
						if(!Array.isArray(title)){
							this.rangeApi.startNodeRange(container);
						}
					}
				}),
				container = this.nodeApi.createElement('div', {
					class: 'container',
					container: true
				});
			label.innerText = getLabel(index, title); 

			li.appendChild(label);
			li.appendChild(container);
			list.appendChild(li);

			item.forEach((child)=>{
				let childDom = this.getComponentDom(child.type, child);
				if( childDom ){
					container.appendChild( childDom );
				}
			});

			this.bindCustomEvent(container, {
				
			})
		});

		this.bindCustomEvent(list, {
			getMergeNode(){
				return list.childNodes[list.childNodes.length - 1]
								.childNodes[1];
			}
		});

		return list;
	},
	toObj(dom){
		let
			obj = {
				type: 'list',
				title: dom.getAttribute('title'),
				data: []
			};

		if( obj.title === 'custom' ){
			obj.title = [];
		}
		
		dom.childNodes.forEach((item)=>{
			let container = [];

			if( Array.isArray(obj.title) ){
				obj.title.push(item.childNodes[0].innerText);
			}
			item.childNodes[1].childNodes.forEach((child)=>{
				container.push(this.getComponentObj(child));
			});

			obj.data.push(container);
		});
		return obj;
	}
}