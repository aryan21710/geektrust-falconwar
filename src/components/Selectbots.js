import React, { useContext, useState } from 'react';
import {
	SelectedPlanetWrapper,
	SolarSystemWrapper,
	BadgeWrapper,
	SelectedPlanetImg,
	ImageWrapper,
	ButtonWrapper,
	Heading,
	Button,
	ButtonText,
	AnimatedMiniJet,
	Select,
} from './common/StyledComponent';
import { useSpring, config } from 'react-spring';
import Planet1 from '../public/images/1.png';
import Planet2 from '../public/images/2.png';
import Planet3 from '../public/images/3.png';
import Planet4 from '../public/images/4.png';
import minijet from '../public/images/minijet.png';
import { useHistory } from 'react-router';
import uuid from 'react-uuid';

const SelectBots = () => {
	const history = useHistory();
	const [isHover, setIshover] = useState(false);
	const changePageOnClick = () => history.push('/selectbots');
	const unAnimateJet = () => setIshover(false);
	const animateJet = () => setIshover(true);

	const jetAnimatedProp = useSpring({
		transform: isHover ? 'translateX(6vw)' : 'translateX(-30vw)',
		config: config.stiff,
	});

	const btnTextProp = useSpring({
		opacity: isHover ? 0 : 1,
		config: config.stiff,
	});
	const selectedPlanetDetails = [
		{
			imgName: Planet1,
			planetName: 'Planet1',
			distance: '100megamiles',
		},
		{
			imgName: Planet2,
			planetName: 'Planet1',
			distance: '100megamiles',
		},
		{
			imgName: Planet3,
			planetName: 'Planet1',
			distance: '100megamiles',
		},
		{
			imgName: Planet4,
			planetName: 'Planet1',
			distance: '100megamiles',
		},
	];

	const botDetails = [
		{
			imgName: '',
			name: 'Choose Space Vehicle',
			distance: '',
		},
		{
			imgName: Planet1,
			name: 'SPACE-BOT',
			distance: '100megamiles',
		},
		{
			imgName: Planet2,
			name: 'SPACE-ROCKET',
			distance: '100megamiles',
		},
		{
			imgName: Planet3,
			name: 'SPACE-SHIP',
			distance: '100megamiles',
		},
		{
			imgName: Planet4,
			name: 'SPACE-SHUTTLE',
			distance: '100megamiles',
		},
	];

	return (
		<SelectedPlanetWrapper justifyContent="center">
			<Heading color="#FAD107" fontSize="1.2rem" fontFamily="Avenir">
				Choose Space Vehicles to Invade the Planets.
			</Heading>
			<SolarSystemWrapper height="70vh" width="100vw" flexDirection="row">
				{selectedPlanetDetails.map((planetDetails) => (
					<BadgeWrapper key={uuid()} height="50vh" flexDirection="column">
						<SelectedPlanetImg imgname={planetDetails.imgName} />
						<Heading color="#FAD107" fontSize="1.2rem">
							{planetDetails.planetName}
						</Heading>
						<Heading color="#FAD107" fontSize="1rem">{`DISTANCE ${planetDetails.distance}`}</Heading>
						<Select
							name="planetName"
							value={''}
							// onChange={}
						>
							{botDetails.map((bot, idx) => {
								return idx === 0 ? (
									<option key={uuid()} selected value="planetName">
										{bot.name}
									</option>
								) : (
									<option key={uuid()} value="planetName">
										{bot.name}
									</option>
								);
							})}
						</Select>
					</BadgeWrapper>
				))}
			</SolarSystemWrapper>
			<Button width="15vw" onMouseEnter={animateJet} onMouseLeave={unAnimateJet} onClick={changePageOnClick}>
				<AnimatedMiniJet leftPos="0vh" style={jetAnimatedProp} src={minijet} />
				<ButtonText style={btnTextProp}>Mission Find Falcone</ButtonText>
			</Button>
		</SelectedPlanetWrapper>
	);
};

export default SelectBots;
