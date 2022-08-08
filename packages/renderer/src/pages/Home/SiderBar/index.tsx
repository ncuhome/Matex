import React, {Fragment} from "react"
import styles from './index.module.scss'
import SideBarTab from "/@cmp/SideBarTab";
import {useLocation} from "react-router-dom";
import {sidebarMenus} from "/@cmp/SideBarTab/SideBarIcon";

const SideBar = () => {
	const {pathname} = useLocation();

	return (
			<div className={styles.con}>
				{
					sidebarMenus.map(({route,icon})=>{
						return (
								<Fragment key={route}>
									<SideBarTab active={pathname.startsWith(route)} route={route} icon={icon}/>
								</Fragment>
						)
					})
				}
			</div>
	)
}

export default SideBar
