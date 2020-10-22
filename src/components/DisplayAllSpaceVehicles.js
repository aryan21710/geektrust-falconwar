import React, { useContext, useState } from 'react';
import {
	Wrapper,
	BadgeWrapper,
	ImageWrapper,
	Heading,
	Button,
	ButtonText,
	AnimatedMiniJet,
	SolarSystemWrapper,
} from './common/StyledComponent';
import minijet from '../public/images/minijet.png';
import { useHistory } from 'react-router';
import { useSpring, config } from 'react-spring';
import spacebot1 from '../public/images/Spaceship1.png';
import spacebot2 from '../public/images/spaceship2.png';
import spacebot3 from '../public/images/Spaceship3.png';
import spacebot4 from '../public/images/spaceship4.png';

const DisplayAllSpaceVehicles = () => {
	const [isHover, setIshover] = useState(false);
	const unAnimateJet = () => setIshover(false);
	const animateJet = () => setIshover(true);
	const history = useHistory();
	const jetAnimatedProp = useSpring({
		transform: isHover ? 'translateX(6vw)' : 'translateX(-30vw)',
		config: config.stiff,
	});

	const btnTextProp = useSpring({
		opacity: isHover ? 0 : 1,
		config: config.slow,
	});

	const changePageOnClick = () => history.push('/selectbots');

	return (
		<React.Fragment>
			<Wrapper flexDirection="column">
				<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
					Space Vehicles at King Shan's disposal
				</Heading>
				<SolarSystemWrapper height="65vh" width="100vw" flexDirection="row">
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={spacebot1}
						/>
						<Heading fontSize="1rem" color="#FAD107">
							SPACE ROCKET
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Units = 1
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Max_distance = 300 megamiles
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Speed = 4 megamiles/hour
						</Heading>
					</BadgeWrapper>{' '}
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={spacebot2}
						/>
						<Heading fontSize="1.2rem" color="#FAD107">
							SPACE POD
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Units = 2
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Max_distance = 200 megamiles
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Speed = 2 megamiles/hour
						</Heading>
					</BadgeWrapper>{' '}
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={spacebot3}
						/>
						<Heading fontSize="1.2rem" color="#FAD107">
							SPACE SHIP
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Units = 2 
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Max_distance = 600 megamiles
						</Heading>
						<Heading fontSize="0.8rem" color="white">
							Speed = 10 megamiles/hour
						</Heading>
					</BadgeWrapper>{' '}
					<BadgeWrapper height="50vh" flexDirection="column">
						<ImageWrapper
							rotateBy="25deg"
							objectFit="none"
							borderRad="0px"
							width="30vw"
							height="40vh"
							marginBottom="3vh"
							src={spacebot4}
						/>
						<Heading fontSize="1.2rem" color="#FAD107">
							SPACE SHUTTLE
						</Heading>
						<Heading color="white" fontSize="0.8rem">
							Units = 1 
						</Heading>
						<Heading color="white" fontSize="0.8rem">
							Max_distance = 400 megamiles
						</Heading>
						<Heading color="white" fontSize="0.8rem">
							Speed = 5 megamiles/hour
						</Heading>
					</BadgeWrapper>
				</SolarSystemWrapper>
				<Button width="15vw" onMouseEnter={animateJet} onMouseLeave={unAnimateJet} onClick={changePageOnClick}>
					<AnimatedMiniJet leftPos="0vh" style={jetAnimatedProp} src={minijet} />
					<ButtonText style={btnTextProp}>Select Space Bots</ButtonText>
				</Button>
			</Wrapper>
		</React.Fragment>
	);
};

export default DisplayAllSpaceVehicles;
