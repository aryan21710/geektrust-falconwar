import React, { useContext, useState } from 'react';
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
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';
import { Images } from '../customHooks/useDefineConstants';
import { useHistory } from 'react-router';
import { PlanetDetailsContext } from '../context/appContext';
import { useSpring, config } from 'react-spring';
import { CustomButton } from '../components/common/CustomButton';

const LandingPage = () => {
	const { planetCfg, setPlanetCfg } = useContext(PlanetDetailsContext);
	const { KingShan, Queen, Minijet } = Images;
	const [isHover, setIshover] = useState(false);
	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	const history = useHistory();
	const jetAnimatedProp = useSpring({
		transform: isHover ? 'translateX(6vw)' : 'translateX(-30vw)',
		config: config.stiff,
	});

	const btnTextProp = useSpring({
		opacity: isHover ? 0 : 1,
		config: config.stiff,
	});

	const changePageOnClick = () => history.push('/selectplanets');
	const animateJet = () => setIshover(true);
	const unAnimateJet = () => setIshover(false);

	return (
		<React.Fragment>
			<Wrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper marginBottom="3vh" src={KingShan} />
					<Heading fontSize="1.5rem" color="#FAD107">
						King Shan
					</Heading>
				</BadgeWrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper marginBottom="3vh" src={Queen} />
					<Heading fontSize="1.5rem" color="#FAD107">
						Queen Falcornia
					</Heading>
				</BadgeWrapper>
				<ButtonWrapper>
					<Heading color="white" fontSize="1.2rem" fontFamily="Avenir">
						Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she
						will be exiled for another 15 years…
					</Heading>
					<CustomButton redirectPath="/selectplanets" leftPos="0vh" TextForButton="Lets Find Falcone" />
				</ButtonWrapper>
			</Wrapper>
		</React.Fragment>
	);
};

export default LandingPage;
