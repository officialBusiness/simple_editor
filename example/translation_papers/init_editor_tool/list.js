export default function initList(editorEnglish, editorChinese){
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
		let 
				range = editorChinese.getRange(),
				block = editorChinese.nodeApi.getBlock(range.startContainer),
				listDom = editorChinese.getComponentDom({
					type: 'list',
					title: listType,
					data: [[]]
				});
		console.log('block:', block);
		console.log('listDom:', listDom);
		editorChinese.nodeApi.insertAfter(listDom, block);
	}
}