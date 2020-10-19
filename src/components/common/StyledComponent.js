import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: pink;
`;

export const Heading = styled.h1`
	font-size: ${(props) => props.fontSize};
	color: black;
	text-align: center;
`;
