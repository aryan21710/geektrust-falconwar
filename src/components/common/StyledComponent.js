import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';
import solarSystem from '../../public/images/sunWithOrbit.png';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	opacity: 1;
	z-index: 2;
	flex-direction: ${(props) => props.flexDirection || 'row'};
	@media (max-width: 768px) {
		flex-direction: column;
		height: 80vh;
	}
`;


export const HeaderWrapper = styled.div`
	width: 100vw;
	height: ${(props) => props.height || '10vh'};
	margin: 0;
	padding: 0;
	position: fixed;
	top: ${(props) => props.topPos || '0vh'};
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const Heading = styled.h1`
	font-size: ${(props) => props.fontSize || '1.8rem'};
	color: ${(props) => props.color || 'white'};
	text-align: center;
	font-family: ${(props) => props.fontFamily || 'Nasalisation'};
	margin: 0 auto;
	z-index: 1000;
	font-weight: 100;
	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const BadgeWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: ${(props) => props.flexDirection || 'row'};
	height: 75vh;
	flex: 1;
	z-index: 2;
	@media (max-width: 768px) {
		width: 100vw;
		height: 30vh;
	}
`;

export const ButtonWrapper = styled.div`
	width: 100vw;
	height: 20vh;
	position: absolute;
	bottom: 5vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
`;

export const ImageWrapper = styled.img`
	border-radius: 50%;
	margin-bottom: ${(props) => props.marginBottom || '0vh'};
	height: ${(props) => props.height || '30vh'};
	width: ${(props) => props.height || '30vh'};
	object-fit: cover;
	@media (max-width: 768px) {
		height: 20vh;
		width: 20vh;
	}
`;

export const Button = styled.div`
	border-radius: 50px;
	padding: 0vh 2vw;
	font-size: 1.5rem;
	font-weight: 700;
	display: flex;
	font-family: Avenir;
	justify-content: center;
	align-items: center;
	color: white;
	outline: none;
	cursor: pointer;
	position: relative;
	border: 0px solid transparent;
	overflow: hidden;
	background: linear-gradient(to bottom, #ffc810, #b43e00);
	@media (max-width: 768px) {
		padding: 0vh 2vw;
		font-size: 0.4rem;
		font-weight: 500;
		height: 6vh;
	}
`;

export const ButtonText = styled(animated.p)`
	font-size: 1.2rem;
	text-align: center;
`;


export const AnimatedJetWrapper = styled(animated.div)`
	width: ${(props) => props.width || '20vw'};
	height: ${(props) => props.height || '10vh'};
	position: absolute;
	top: 50vh;
	left: -25vw;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

export const AnimatedMiniJet = styled(animated.img)`
	width: 50px;
	height: 20px;
	object-fit: cover;
	position: absolute;
	cursor: pointer;

`;

export const SelectedPlanetWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	@media (max-width: 768px) {
		flex-direction: column;
		height: 140vh;
		overflow-y: scroll;
	}
`;

export const SolarSystemWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	width: 80vw;
	height: 50vh;
	z-index: 100;
	@media (max-width: 768px) {
		width: 100vw;
		height: 40vh;
	}
`;

export const SolarSystemImage = styled(animated.div)`
	cursor: pointer;
	width: 60vw;
	height: 30vh;
	background-image: url(${solarSystem});
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	z-index: 100;
	@media (max-width: 768px) {
		width: 90vw;
	}
`;

export const Planet = styled(animated.img)`
	width: ${(props) => props.width || '6vw'};
	object-fit: cover;
	cursor: pointer;
	position: absolute;
	top: ${(props) => props.toppos || '10vh'};
	left: ${(props) => props.leftpos || '0vw'};
	z-index: 100;
	@media (max-width: 768px) {
		width: 90vw;
	}
`;

export const PlanetWrapper = styled.div`
	display: flex;
	width: 100vw;
	height: 25vh;
	@media (max-width: 768px) {
		width: 100vw;
		height: 80vh;
		flex-direction: column;
	}
`;

export const SelectedPlanet = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	height: 25vh;
	position: relative;
	overflow: hidden;
	@media (max-width: 768px) {
		width: 100vw;
		height: 55vh;
	}
`;

export const SelectedPlanetImg = styled(animated.div)`
	height: 12vh;
	width: 12vh;
	background-image: url(${(props) => props.imgname});
	background-position: center;
	background-repeat: no-repeat;
	background-size: 12vh 12vh;
	@media (max-width: 768px) {
		height: 10vh;
		width: 10vh;
	}
`;

const animateSelectedPlanet = keyframes`
    from {
      transform: translate(0vw);
    }
  
    to {
      transform: translate(30vw);
    }
  `;

export const UnAnimatedWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	height: 25vh;
	width: 100%;
	flex: 1;
	position: absolute;
	left: ${(props) => props.leftPos || '-30vw'};
	align-items: center;
	flex-direction: column;
	@media (max-width: 768px) {
		height: 10vh;
		width: 10vh;
	}
`;

export const AnimatedWrapper = styled(UnAnimatedWrapper)`
	animation: ${animateSelectedPlanet} 0.5s ease-in-out forwards;
`;

export const StaticWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: ${(props) => props.width || '25vw'};
`;
