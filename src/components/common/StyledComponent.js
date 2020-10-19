import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: pink;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
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
	color: white;
	text-align: center;
	margin: 0 auto;
	z-index: 1000;
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
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ImageWrapper = styled.img`
	border-radius: 50%;
	height: 30vh;
	width: 30vh;
	object-fit: cover;
	border: 5px solid black;
	@media (max-width: 768px) {
		height: 20vh;
		width: 20vh;
	}
`;
