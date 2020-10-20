import React, { useState, useEffect } from 'react';

export const StarGrid = () => {
	const [selectRandomStar, setSelectRandomStar] = useState(0);
	const noOfStarGrid = Array(100).fill('');
	const classNameForStarGrid = window.innerWidth > 768 ? 'gridForBigScreen' : 'gridForSmallScreen';

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSelectRandomStar(Math.floor(Math.random() * 100 + 1));
		}, 500);
		return () => {
			clearTimeout(timeout);
		};
	}, [selectRandomStar]);
	return (
		<React.Fragment>
			{noOfStarGrid.map((_, idx) => {
				if (idx === selectRandomStar) {
					return (
						<div className={`${classNameForStarGrid} `}>
							<div className="star animateStar"></div>
						</div>
					);
				} else {
					return (
						<div className={`${classNameForStarGrid}`}>
							<div className="star"></div>
						</div>
					);
				}
			})}
		</React.Fragment>
	);
};
