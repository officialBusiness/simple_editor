export default function initExportJson(){
	let
		jsonExportButton = document.getElementById('jsonExport');

	jsonExportButton.onclick = (e)=>{
		if( window.editor ){
			window.editor.exportObjJsonFormatting('json.json');
		}
	}
}