import React from 'react';

export const StarGrid = () => {
    const noOfStarGrid = Array(100).fill('');
    const classNameForStarGrid = window.innerWidth > 768 ? "gridForBigScreen" : "gridForSmallScreen";

	return (
		<React.Fragment>
			{noOfStarGrid.map((_, idx) => {
				if (idx % 2 === 0) {
					return <div className={`${classNameForStarGrid} star0deg`}></div>;
				} else {
					return <div className={`${classNameForStarGrid} star40deg`}></div>;
				}
			})}
		</React.Fragment>
	);
};
