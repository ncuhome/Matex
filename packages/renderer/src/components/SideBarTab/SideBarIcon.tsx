import React from 'react';
import NetworkIcon from '/@cmp/svg/NetworkIcon';
import LinkIcon from '/@cmp/svg/LinkIcon';
import RocketIcon from "/@cmp/svg/RocketIcon";



export interface IconProps {
	name: 'network' | 'link'|'rocket';
	color: string;
}
export interface SidebarMenu{
	route:string
	icon:IconProps['name']
}

export const sidebarMenus:SidebarMenu[] = [
	{
		route: '/api',
    icon:'network'
	},
	{
		route: '/socket',
		icon:'link'
	},
	{
		route: '/1',
		icon:'rocket'
	}
]


const SideBarIcon = ({ name, color }: IconProps) => {
  switch (name) {
    case 'network':
      return <NetworkIcon fill={color} />;
    case 'link':
      return <LinkIcon fill={color} />;
		case 'rocket':
			return <RocketIcon fill={color} />;
  }
};

export default SideBarIcon;
