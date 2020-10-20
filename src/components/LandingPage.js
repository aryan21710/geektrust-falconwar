import React, { useContext } from 'react';
import { Wrapper, BadgeWrapper, ImageWrapper, ButtonWrapper, Heading, Button } from './common/StyledComponent';
import { useFetchDataFromBackend } from '../customHooks/useFetchDataFromBackend';
import kingShan from '../public/images/modiji.png';
import queen from '../public/images/xi jhi.png';
import { useHistory } from 'react-router';
import { PlanetDetailsContext } from '../context/appContext';
import { StarGrid } from './common/StarGrid';

const LandingPage = () => {
	const { planetCfg, setPlanetCfg } = useContext(PlanetDetailsContext);
	useFetchDataFromBackend(planetCfg, setPlanetCfg);
	const history = useHistory();

	const changePageOnClick = () => history.push('/selectplanets');
	return (
		<React.Fragment>
			<aside className="starGridWrapper">
				<StarGrid/>
			</aside>
			<Wrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper src={kingShan} />
					<Heading fontSize="1.5rem" color="#FAD107">
						King Shan
					</Heading>
				</BadgeWrapper>
				<BadgeWrapper flexDirection="column">
					<ImageWrapper src={queen} />
					<Heading fontSize="1.5rem" color="#FAD107">
						Queen Falcornia
					</Heading>
				</BadgeWrapper>
				<ButtonWrapper>
					<Heading color="white" fontSize="1.2rem" fontFamily="Avenir">
						Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she
						will be exiled for another 15 years…
					</Heading>
					<Button onClick={changePageOnClick}>Find Falcone</Button>
				</ButtonWrapper>
			</Wrapper>
		</React.Fragment>
	);
};

export default LandingPage;
