// sidebar store

import {atom} from "jotai";
import {SidebarMenuType} from "/@/Model/ApiTest.model";

export const SidebarMenuTypeAtom = atom<SidebarMenuType>('项目接口');
