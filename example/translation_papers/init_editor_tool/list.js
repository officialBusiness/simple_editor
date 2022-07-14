export default function initList(){
	let
		listSelection = document.getElementById('listSelection'),
		selections = listSelection.getElementsByClassName('selection');;

	for( let i = selections.length - 1; i >= 0; i-- ){
		// console.log(`selections[${i}]:`, selections[i])
		selections[i].onmousedown = ()=>{
			addList(selections[i])
		}
	}

	function addList(dom){
		let type = dom.innerText,
				listType ;
		switch (type){
			case '小写英文':
				listType = 'english';
				break;
			case '大写英文':
				listType = 'English';
				break;
			case '数字':
				listType = 'number';
				break;
			case '自定义':
				listType = [''];
				break;
		}
		console.log('window.editor:', window.editor);
		let 
				editor = window.editor,
				range = editor.range,
				block = editor.nodeApi.getBlock(range.startContainer),
				listDom = editor.getComponentDom({
					type: 'list',
					title: listType,
					data: [[]]
				});
		// console.log('block:', block);
		// console.log('listDom:', listDom);
		editor.nodeApi.insertAfter(listDom, block);
	}
}