/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 3
*/



// file: header.js

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




// file: gui.js

let DP = UI.getScreenHeight();
let UISetting = {
	bottom: DP * 0.05,
	top: DP * 0.02,
	right: DP * 0.2,
	left: DP * 0.2,
	height: 480,
	size_button: 3,
	size_text: 60,
	distance: 190,
}

let group = new UI.WindowGroup();
let bitmap = UI.Window({
	location: {
		padding: {
			bottom: UISetting.bottom,
			top: UISetting.top,
			right: UISetting.right,
			left: UISetting.left
		}
	},
	drawing: [
		{type: "color", color: android.graphics.Color.argb(0, 0, 0, 0)},
		{type: "frame", bitmap: "classic_frame_bg_light", scale: 5, width: 1000, height: UISetting.height, y: 50},
		{type: "frame", bitmap: "classic_frame_bg_dark", scale: 4, width: 400, height: UISetting.height, y: 50}
	],
	elements: {
		"close": {type: "close_button", bitmap: "classic_close_button", scale: 4, x: 925, y: 55}
	}
})
let structure_UI = new UI.Window({
	location: {
		padding: {
			bottom: UISetting.bottom + 30,
			top: UISetting.top + 90,
			right: UISetting.right,
			left: UISetting.left+350
		},
		scrollY: 100,
		forceScrollY: true
	},
	drawing: [
		{type: "color", color: android.graphics.Color.argb(0, 0, 0, 0)},
	],
	elements: {
	}
})

let selected_structure_ui = new UI.Window({
	location: {
		padding: {
			bottom: UISetting.bottom + 30,
			top: UISetting.top + 50,
			right: UISetting.right+500,
			left: UISetting.left
		},
		scrollY: 100,
		forceScrollY: true
	},
	drawing: [
		{type: "color", color: android.graphics.Color.argb(0, 0, 0, 0)},
	],
	elements: {
		
	}
})
bitmap.setBlockingBackground(true);
selected_structure_ui.setEventListener({
	onOpen(window){
		let structures = StructureUtility.getAllStructureName();
		let obj = {};
		for(let i in structures){
			obj[structures[i]+"_button"] = {type: "button", bitmap: "mod_browser_button", x: 50, y: 70+(UISetting.distance*i), scale: UISetting.size_button, clicker: {
				onClick: function(position, container, tileEntity, window, canvas, scale){
					let content = structure_UI.getContent();
					content.elements["structure"] = {type: "image", bitmap: VisualStructure.getStructureBitmapAndModel(structures[i]).bitmap, x: 300, y: 200, scale: 1}
					structure_UI.setContent(content);
				}
			}, z: 0}
			obj[structures[i]+"_text"] = {type: "text", text: structures[i], x: 80, y: 80+(UISetting.distance*i), size: UISetting.size_text, z: 1}
		}
		let content = window.getContent();
		content.elements = obj;
		window.setContent(content);
		window.getLocation().setScroll(0, (StructureUtility.getAllStructureName().length-1)*(UISetting.distance/2.5))
		window.updateScrollDimensions();
	}
})
group.addWindowInstance("bitmap", bitmap)
group.addWindowInstance("structure", structure_UI)
group.addWindowInstance("selected_structure", selected_structure_ui)

Callback.addCallback("ItemUse", function(coords, item){
	if(item.id == 265)
		group.open();
})

Callback.addCallback("NativeCommand", function(str){
	if(str == "/open"){
		Game.prevent();
		group.open();
	}
})




// file: visual_structure.js

Callback.addCallback("StructureLoad", function(){
	//wood_0 структура 
 let Stru = new VisualStructure.Animation(selected_structure, __config__.get("size_block"));
 Stru.setPrototype({
 	load(x, y, z, org_pos, base){
 		return "visual_structure_noy"
 	},
 	tick(x, y, z, packet){
 		if(World.getThreadTime() % __config__.get("update") == 0){
 			let arr = Stru.getArrBase();
 			let value = false;
 			for(let i in arr){
 				if(value){
 					arr[i].base.render.setMaterial("visual_structure_noy");
 					continue
 				}
 				let id = Block.convertBlockToItemId(BlockSource.getDefaultForActor(Player.get()).getBlockID(x-.5+arr[i].pos[0], y+arr[i].pos[1], z-.5+arr[i].pos[2]));
 				if(arr[i].state.id != id && id != 0){
 					arr[i].base.render.setMaterial("visual_structure_red");
 					value = true;
 				}else if(arr[i].state.id == id){
 					arr[i].base.render.setMaterial("visual_structure_noy");
 				}else{
 					arr[i].base.render.setMaterial("visual_structure");
 				value = true;
 				}
 			}
 		}
 	}
 })
 Callback.addCallback("ItemUseLocal", function(coords, item){
  if(item.id == 264)
   Stru.load(coords.x+.5, coords.y+.5, coords.z+.5)
 })
});




