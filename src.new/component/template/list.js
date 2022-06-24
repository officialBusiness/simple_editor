function getLabel(index, title){
	if( title === 'english' ){
		return String.fromCharCode(97 + index) + '.';
	}else if( title === 'English' ){
		return String.fromCharCode(65 + index) + '.';
	}else if( title === 'number' ){
		return 1 + index + '.';
	}else if( Array.isArray(title) ){
		return title[index];
	}
}

function createLiDomObj(title, index, li){
	return {
		nodeName: 'div',
		attributes: {
			class: 'li',
		},
		children: [
			{
				nodeName: 'div',
				attributes: {
					class: 'label',
					contenteditable: Array.isArray(title) ? null : false,
					container: Array.isArray(title) ? true : null
				},
				children: getLabel(index, title)
			},
			{
				nodeName: 'div',
				attributes: {
					class: 'container',
					container: true
				},
				created: (container)=>{
					if( Array.isArray(li) ){
						li.forEach((child)=>{
							let childDom = this.getComponentDom(child);
							if( childDom ){
								container.appendChild( childDom );
							}
						});
					}
				}
			}
		]
	}
}

export default {
	type: 'list',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'list',
				title: Array.isArray(obj.title) ? 'custom' : obj.title,
				block: true,
				mergeBlock: true
			},
			children: obj.data.map((li, index)=>{
				return createLiDomObj.call(this, obj.title, index, li);
				// return {
				// 	nodeName: 'div',
				// 	attributes: {
				// 		class: 'li',
				// 	},
				// 	children: [
				// 		{
				// 			nodeName: 'div',
				// 			attributes: {
				// 				class: 'label',
				// 				contenteditable: Array.isArray(obj.title) ? null : false,
				// 				container: Array.isArray(obj.title) ? true : null
				// 			},
				// 			children: getLabel(index, obj.title)
				// 		},
				// 		{
				// 			nodeName: 'div',
				// 			attributes: {
				// 				class: 'container',
				// 				container: true
				// 			},
				// 			created: (container)=>{
				// 				if( Array.isArray(li) ){
				// 					li.forEach((child)=>{
				// 						let childDom = this.getComponentDom(child);
				// 						if( childDom ){
				// 							container.appendChild( childDom );
				// 						}
				// 					});
				// 				}
				// 			}
				// 		}
				// 	]
				// }
			})
		});
	},
	toObj(dom){
		
	}
}