import styled from 'styled-components';
import { animated } from 'react-spring';

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
	flex-direction: ${props=>props.flexDirection || "row"};
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
	font-size: ${(props) => props.fontSize || "1.8rem"};
	color: ${(props) => props.color || 'white'};
	text-align: center;
	font-family: ${props=>props.fontFamily || "Nasalisation"};
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
	flex-direction: ${props=>props.flexDirection || "row"};
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
	height: ${props=>props.height || "30vh"};
	width: ${props=>props.height || "30vh"};
	object-fit: cover;
	@media (max-width: 768px) {
		height: 20vh;
		width: 20vh;
	}
`;

export const Button = styled.button`
	border-radius: 50px;
	height: 6vh;
	width: 15vw;
	font-size: 1.5rem;
	font-weight: 700;
	display: flex;
	font-family: Avenir;
	justify-content: center;
	align-items: center;
	color: white;
	outline: none;
	cursor: pointer;
	border: 0px solid transparent;
	background: linear-gradient(to bottom, #FFC810, #B43E00);
	@media (max-width: 768px) {
		height: 6vh;
		width: 30vw;
	}
`;

export const SelectedPlanetWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	flex-direction: column;
	@media (max-width: 768px) {
		flex-direction: column;
		height: 140vh;
		overflow-y: scroll
	}
`;

export const SolarSystemWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 60vh;
	@media (max-width: 768px) {
		width: 100vw;
		height: 60vh;

	}
`;

export const PlanetWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 30vh;
	@media (max-width: 768px) {
		width: 100vw;
		height: 80vh;
		flex-direction: column;
	}
`;

export const SelectedPlanet = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex:1;
	height:30vh;
	position: relative;
	border: 2px solid black;
	overflow: hidden;
	@media (max-width: 768px) {
		width: 100vw;
		height: 55vh;
	}
`;

export const SelectedPlanetImg = styled(animated.img)`
	border-radius: 50%;
	height: 20vh;
	position: absolute;
	width: 20vh;
	object-fit: cover;
	border: 5px solid black;
	@media (max-width: 768px) {
		height: 10vh;
		width: 10vh;
	}
`;

