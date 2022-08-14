import {HeaderConfigs, ParamsConfigs, UrlEncodeConfigs} from "/@/store/ApiTest/config.store";
import {ConfigType} from "/@/Model/ApiTest.model";

export const getStore = (type:ConfigType)=>{
	switch (type) {
		case "header":
			return HeaderConfigs;
		case "params":
			return ParamsConfigs;
		case "body":
			return UrlEncodeConfigs;
	}
}
