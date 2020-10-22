import React from 'react'
import {
	Wrapper,
	BadgeWrapper,
	ImageWrapper,
	ButtonWrapper,
	Heading,
	Button,
	ButtonText,
	AnimatedMiniJet,
} from './common/StyledComponent';
import { StarGrid } from './common/StarGrid';


 const DisplayAllSpaceVehicles = () => {
    return (
        <React.Fragment>
        <aside className="starGridWrapper">
            <StarGrid />
        </aside>
        <Wrapper/>            
        </React.Fragment>
    )
}

export default DisplayAllSpaceVehicles;
