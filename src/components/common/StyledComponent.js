import styled from 'styled-components';
import { animated } from 'react-spring';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: pink;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	flex-direction: ${props=>props.flexDirection || "row"};
	@media (max-width: 768px) {
		flex-direction: column;
		height: 80vh;
	}
`;

export const HeaderWrapper = styled.div`
	width: 100vw;
	height: ${(props) => props.height || '10vh'};
	background: black;
	margin: 0;
	padding: 0;
	position: absolute;
	top: ${(props) => props.topPos || '0vh'};
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const Heading = styled.h1`
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color || 'white'};
	text-align: center;
	font-family: Nasalisation;
	margin: 0 auto;
	z-index: 1000;
	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const BadgeWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: blue;
	width: 50vw;
	height: 75vh;
	flex: 1;
	@media (max-width: 768px) {
		width: 100vw;
		height: 30vh;
	}
`;

export const ButtonWrapper = styled.div`
	background: yellow;
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
	border: 5px solid black;
	@media (max-width: 768px) {
		height: 20vh;
		width: 20vh;
	}
`;

export const Button = styled.button`
	border-radius: 20px;
	height: 6vh;
	width: 20vw;
	background: white;
	font-size: 1.2rem;
	display: flex;
	font-family: Nasalisation;
	justify-content: center;
	align-items: center;
	color: blue;
	outline: none;
	cursor: pointer;
	@media (max-width: 768px) {
		height: 6vh;
		width: 30vw;
	}
`;

export const PlanetWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: blue;
	width: 100vw;
	height: 60vh;
	@media (max-width: 768px) {
		width: 100vw;
		height: 30vh;
	}
`;

export const SelectedPlanetWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: pink;
	width: 100vw;
	height: 30vh;
	@media (max-width: 768px) {
		width: 100vw;
		height: 30vh;
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
		height: 30vh;
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
		height: 20vh;
		width: 20vh;
	}
`;

