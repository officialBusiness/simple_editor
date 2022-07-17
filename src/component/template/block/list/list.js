import liOperation from './operation/li/li_operation.js';
import labelOperation from './operation/label/label_operation.js';

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

export function createLiDomObj(label, index, li){
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
					event: Array.isArray(label) || label === 'custom' ? labelOperation.name : null,
					contenteditable: Array.isArray(label) || label === 'custom' ? null : false,
					[this.nodeLabel.container]: Array.isArray(label) || label === 'custom' ? true : null
				},
				children: getLabel(index, label)
			},
			{
				nodeName: 'div',
				attributes: {
					class: 'container',
					event: liOperation.name,
					[this.nodeLabel.container]: true
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
	event: [
		liOperation,
		labelOperation
	],
	toDom(obj){
		return this.nodeApi.createComonentDom({
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
				container.push(this.getComponentObj(child));
			});

			obj.data.push(container);
		});
		return obj;
	},
	supportOperation: {
		getLastContainer(list){
			return list.childNodes[list.childNodes.length].childNodes[1];
		}
	}
}