import deleteOne from './default_container/operation/delete_one.js'
import deleteRange from './default_container/operation/delete_range.js';

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
			createLi.call(this, index, item);
		});

		this.bindCustomEvent(list, {
			getMergeNode(){
				return list.childNodes[list.childNodes.length - 1]
								.childNodes[1];
			}
		});

		function createLi(index, item){
			let 
				li = this.nodeApi.createElement('div', {
					class: 'li',
				}),
				label = this.nodeApi.createElement('div', {
					class: 'label',
					contenteditable: Array.isArray(title) ? null : false,
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
			let labelText = getLabel(index, title);
			if( labelText ){
				label.innerText = labelText;
			}

			if( Array.isArray(title) ){
				this.bindCustomEvent(label, {
					[this.customEventType.backspaceOne]: deleteOne,
				});
			}

			li.appendChild(label);
			li.appendChild(container);
			list.appendChild(li);
			if( Array.isArray(item) ){
				item.forEach((child)=>{
					let childDom = this.getComponentDom(child.type, child);
					if( childDom ){
						container.appendChild( childDom );
					}
				});
			}

			this.bindCustomEvent(container, {
				[this.customEventType.backspaceOne]: deleteOne,
				[this.customEventType.backspaceRange]: deleteRange,
				[this.customEventType.backspaceOnStart]: ()=>{
					let index = this.nodeApi.getNodeIndexOf(li);
					console.log('li index:', index);
					if( index === 0 ){
						if( list.previousSibling && list.childNodes.length === 1 ){
							console.log('删空 list');
							this.rangeApi.endNodeRange(list.previousSibling);
							this.nodeApi.removeNode(list);
						}else{
							console.log('待完善');
						}
					}else{
						console.log('container:', container);
						if( container.childNodes.length === 0 ){
							console.log('删空 li');
							if(li.previousSibling.childNodes[1].childNodes.length > 0){
								this.rangeApi.endNodeRange(li.previousSibling);
							}else{
								this.rangeApi.setCollapsedRange(li.previousSibling.childNodes[1], 0);
							}
							this.nodeApi.removeNode(li);
						}else{
							console.log('待完善');
						}
					}
				},
				[this.customEventType.enterOne]: ()=>{
					let { rangeApi, nodeApi, customEventType } = this,
							range = rangeApi.getRange(),
							node = range.startContainer,
							offset = range.startOffset,
							index = this.nodeApi.getNodeIndexOf(li);

					if( node.nodeType === Node.TEXT_NODE ){
						if( offset === node.length && nodeApi.isEndInContainer(node) ){
							let li = createLi.call(this, index + 1);
							rangeApi.setCollapsedRange(li.childNodes[1], 0);
						}
					}else if( node.nodeType === Node.ELEMENT_NODE ){
						if( offset === 0 && node.childNodes.length === 0 ){
							let list = nodeApi.getBlock(node),
									paragraph = this.getBlockDom('paragraph');
							nodeApi.insertAfter( paragraph, list );
							rangeApi.setCollapsedRange(paragraph, 0);
						}
					}else{
						console.error('不知道的特殊情况');
					}
				}
			});

			return li;
		}

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