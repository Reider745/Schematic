let selected_structure = "home_0";

//structure load
let VisualStructure;
let StructureUtility;
let Structure;
ModAPI.addAPICallback("DungeonUtility", function(api){
	VisualStructure = api.VisualStructure;
	StructureUtility = api.StructureUtility;
	Structure = api.Structure;
	const StructureLoader = api.StructureLoader;
	let files = FileTools.ReadJSON(__dir__+"structure_load.json");
	for(let i in files){
		StructureLoader.load(__dir__+"structure/"+files[i].path, files[i].name, files[i].type);
	}
});