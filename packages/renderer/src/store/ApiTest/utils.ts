import {
  BinaryConfigs,
  FormDataConfigs,
  HeaderConfigs,
  ParamsConfigs,
  UrlEncodeConfigs
} from '/@/store/ApiTest/config.store';
import { BodyType, ConfigType } from '/@/Model/ApiTest.model';

export const getStore = (configType: ConfigType, bodyType: Exclude<BodyType, 'raw'|'binary'>) => {
  switch (configType) {
    case 'header':
      return HeaderConfigs;
    case 'params':
      return ParamsConfigs;
    case 'body': {
      switch (bodyType) {
        case 'urlencoded':
          return UrlEncodeConfigs;
        case 'form-data':
          return FormDataConfigs;
      }
    }
  }
};
