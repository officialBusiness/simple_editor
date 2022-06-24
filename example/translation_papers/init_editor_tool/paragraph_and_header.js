
export default function initParagraphAndHeader(editorEnglish, editorChinese){
	let
		selected = document.getElementById('paragraphAndHeaderSelected'),
		selection = document.getElementById('paragraphAndHeaderSelection'),
		selections = selection.getElementsByClassName('selection');
	// console.log('selections:', selections);
	for( let i = selections.length - 1; i >= 0; i-- ){
		// console.log(`selections[${i}]:`, selections[i])
		selections[i].onmousedown = ()=>{
			getBlockType(selections[i]);
		}
	}

	function getBlockType(dom){
		let type = dom.innerText;
		switch (type){
			case 'h1':
			case 'h2':
			case 'h3':
				editorChinese.transformBlock({
					type: 'header',
					level: type
				});
				break;
			case '正文':
				editorChinese.transformBlock({
					type: 'paragraph'
				});
				break;
		}
	}
}