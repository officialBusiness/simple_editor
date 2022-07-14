import liOperation from './operation/li/li_operation.js';
import labelOperation from './operation/label/label_operation.js';

export function getLabel(index, title){
	if( title === 'english' ){
		return String.fromCharCode(97 + index) + '.';
	}else if( title === 'English' ){
		return String.fromCharCode(65 + index) + '.';
	}else if( title === 'number' ){
		return 1 + index + '.';
	}else if( Array.isArray(title) ){
		return title[index];
	}else if( title === 'custom' ){
		return '';
	}
}

export function createLiDomObj(title, index, li){
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
					event: Array.isArray(title) || title === 'custom' ? labelOperation.name : null,
					contenteditable: Array.isArray(title) || title === 'custom' ? null : false,
					[this.nodeLabel.container]: Array.isArray(title) || title === 'custom' ? true : null
				},
				children: getLabel(index, title)
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
				label: Array.isArray(obj.title) ? 'custom' : obj.title,
				[this.nodeLabel.block]: true,
			},
			children: obj.data.map((li, index)=>{
				return createLiDomObj.call(this, obj.title, index, li);
			})
		});
	},
	toObj(dom){
		let
			obj = {
				type: 'list',
				title: dom.getAttribute('label'),
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
	},
	supportOperation: {
		getLastContainer(list){
			return list.childNodes[list.childNodes.length].childNodes[1];
		}
	}
}