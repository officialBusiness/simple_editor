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
			block: true,
			title: Array.isArray(title) ? 'custom' : title
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
		});

		return list;
	},
	toObj(dom){

	}
}