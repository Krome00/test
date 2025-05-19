import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import _ from 'lodash';
export default function DetailMenu({ tabs, history }) {
	const [current, setCurrent] = useState('');
	const { location } = history;

	useEffect(() => {
		setCurrent(activeItem);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getActiveItem = ({ pathname }) => {
		let path_result;
		// loop and get the current active tab path based on the pathname(current)
		tabs.map(tab => {
			if ((pathname).split('?')[0].includes(tab.path.split('?')[0])) {
				path_result = tab.path;
			}
			return tab;
		});
		if (!path_result) {
			return null;
		}
		return path_result.split('?')[0];
	};

	const activeItem = getActiveItem({
		pathname: location.pathname.split('?')[0]
	}) || tabs[0].path.split('?')[0];

	const handleClick = e => {
		setCurrent(e.key);
	};

	return (
		<div
			style={{ overflow: 'auto' }}
		>
			<Menu
				onClick={handleClick}
				selectedKeys={[current]}
				mode="horizontal"
			>
				{tabs && tabs.map((tab, index) => (
					<Menu.Item
						key={tab.path.split('?')[0]}
						style={{ marginLeft: 25 }}
						// active={activeItem === tab.path.split('?')[0]}
						onClick={() => activeItem === tab.path ? undefined : history.push(tab.path)}
					> {tab.title}
					</Menu.Item>
				))}
			</Menu>
		</div>
	);
}
