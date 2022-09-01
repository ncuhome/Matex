import {KVConfig} from "/@/Model/ApiTest.model";

export const isAllChecked = (data:KVConfig[]) => {
	let checked=true;
  data.forEach((item)=>{
		if (!item.selected){
			checked = false;
		}
	})
	return checked;
}
