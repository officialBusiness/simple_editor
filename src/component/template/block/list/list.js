import listEvent from './event/list_event.js';

export default {
	type: 'list',
	event: listEvent,
	toDom(obj){
		return this.nodeApi.createDom({
			nodeName: 'div',
			attributes: {
				class: 'list',
				label: Array.isArray(obj.label) ? 'custom' : obj.label,
				[this.nodeLabel.block]: true,
			},
			children: obj.data.map((li, index)=>{
				return createLiDomObj.call(this, obj.label, index, li);
			})
		});
	},
	toObj(dom){
		let
			obj = {
				type: 'list',
				label: dom.getAttribute('label'),
				data: []
			};

		if( obj.label === 'custom' ){
			obj.label = [];
		}
		
		dom.childNodes.forEach((item)=>{
			let container = [];

			if( Array.isArray(obj.label) ){
				obj.label.push(item.childNodes[0].innerText);
			}
			item.childNodes[1].childNodes.forEach((child)=>{
				container.push(this.domToObj(child));
			});

			obj.data.push(container);
		});
		return obj;
	},
	helpEvent: {
		getFirstContainer(listBlock){
			// console.log('listBlock:', listBlock);
			return listBlock.childNodes[0].childNodes[1];
		},
		getLastContainer(listBlock){
			// console.log('listBlock:', listBlock);
			// console.log('listBlock.childNodes[listBlock.childNodes.length - 1].childNodes[1]:', listBlock.childNodes[listBlock.childNodes.length - 1].childNodes[1]);
			return listBlock.childNodes[listBlock.childNodes.length - 1].childNodes[1];
		},
		getMergeContainer(listBlock){
			// return paragraph;
			return listBlock.childNodes[listBlock.childNodes.length - 1].childNodes[1];
		},
		getMergedNodes(listBlock){
			// return paragraph.childNodes;
			return listBlock.childNodes[0].childNodes[1].childNodes;
		},
		mergedDeleteNode(listBlock){
			if( listBlock.childNodes.length > 1 ){
				setTimeout(()=>{
					resetListLabel(listBlock);
				}, 0);
				return listBlock.childNodes[0];
			}else{
				return listBlock;
			}
		}
	}
}

function createLiDomObj(label, index, li){
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
					contenteditable: Array.isArray(label) || label === 'custom' ? null : false,
					[this.nodeLabel.container]: Array.isArray(label) || label === 'custom' ? true : null
				},
				children: getLabel(index, label)
			},
			{
				nodeName: 'div',
				attributes: {
					class: 'li_content',
					[this.nodeLabel.container]: true
				},
				created: (container)=>{
					if( Array.isArray(li) ){
						li.forEach((child)=>{
							let childDom = this.objToDom(child);
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

export function getEmptyLiDom(labelType){
	return this.nodeApi.createDom({
			nodeName: 'div',
			attributes: {
				class: 'li',
			},
			children: [
				{
					nodeName: 'div',
					attributes: {
						class: 'label',
						contenteditable: labelType === 'custom' ? true : 'false',
						[this.nodeLabel.container]: labelType === 'custom' ? true : null
					}
				},
				{
					nodeName: 'div',
					attributes: {
						class: 'li_content',
						[this.nodeLabel.container]: true
					},
				}
			]
	});
}

export function getLabel(index, label){
	if( label === 'english' ){
		return String.fromCharCode(97 + index) + '.';
	}else if( label === 'English' ){
		return String.fromCharCode(65 + index) + '.';
	}else if( label === 'number' ){
		return 1 + index + '.';
	}else if( Array.isArray(label) ){
		return label[index];
	}else if( label === 'custom' ){
		return '';
	}
}

export function resetListLabel(block){
	let labelType = block.getAttribute('label');
	if( labelType !== 'custom' ){
		block.childNodes.forEach((li, index)=>{
			li.childNodes[0].innerText = getLabel(index, labelType)
		});
	}
}