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