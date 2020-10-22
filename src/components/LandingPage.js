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
import kingShan from '../public/images/modiji.png';
import queen from '../public/images/xi jhi.png';
import { useHistory } from 'react-router';
import { PlanetDetailsContext } from '../context/appContext';
import { StarGrid } from './common/StarGrid';
import { useSpring, config } from 'react-spring';
import minijet from '../public/images/minijet.png';

const LandingPage = () => {
	const { planetCfg, setPlanetCfg } = useContext(PlanetDetailsContext);
	const [isHover, setIshover] = useState(false);
	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	const history = useHistory();
	const jetAnimatedProp = useSpring({
		transform: isHover ? 'translateX(6vw)' : 'translateX(-30vw)',
		config: config.stiff,
	});

	const btnTextProp = useSpring({
		opacity: isHover ? 0 : 1,
		config: config.slow,
	});

	const changePageOnClick = () => history.push('/selectplanets');

	const animateJet = () => setIshover(true);

	const unAnimateJet = () => setIshover(false);

	return (
		<React.Fragment>
			<aside className="starGridWrapper">
				<StarGrid />
			</aside>
			<Wrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper marginBottom="3vh" src={kingShan} />
					<Heading fontSize="1.5rem" color="#FAD107">
						King Shan
					</Heading>
				</BadgeWrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper marginBottom="3vh" src={queen} />
					<Heading fontSize="1.5rem" color="#FAD107">
						Queen Falcornia
					</Heading>
				</BadgeWrapper>
				<ButtonWrapper>
					<Heading color="white" fontSize="1.2rem" fontFamily="Avenir">
						Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she
						will be exiled for another 15 years…
					</Heading>
					<Button onMouseEnter={animateJet} onMouseLeave={unAnimateJet} onClick={changePageOnClick}>
						<AnimatedMiniJet style={jetAnimatedProp} src={minijet} />
						<ButtonText style={btnTextProp}>Lets Find Falcone</ButtonText>
					</Button>
				</ButtonWrapper>
			</Wrapper>
		</React.Fragment>
	);
};

export default LandingPage;
