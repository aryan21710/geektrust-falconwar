import React, { useState } from 'react';
import { Button, ButtonText, AnimatedMiniJet } from '../common/StyledComponent';
import { useHistory } from 'react-router';
import { useSpring, config } from 'react-spring';
import { Images } from '../../customHooks/useDefineConstants';

export const CustomButton = (props) => {
	const { redirectPath, leftPos, TextForButton } = props;
	const [isHover, setIshover] = useState(false);
	const animateJet = () => setIshover(true);
	const unAnimateJet = () => setIshover(false);
	const changePageOnClick = () => history.push(`${redirectPath}`);
	const history = useHistory();
	const { Minijet } = Images;

	const jetAnimatedProp = useSpring({
		transform: isHover ? 'translateX(6vw)' : 'translateX(-30vw)',
		config: config.stiff,
	});

	const btnTextProp = useSpring({
		opacity: isHover ? 0 : 1,
		config: config.stiff,
	});

	return (
		<React.Fragment>
			<Button onMouseEnter={animateJet} onMouseLeave={unAnimateJet} onClick={changePageOnClick}>
				<AnimatedMiniJet leftPos={leftPos} style={jetAnimatedProp} src={Minijet} />
				<ButtonText style={btnTextProp}>{TextForButton}</ButtonText>
			</Button>
		</React.Fragment>
	);
};
