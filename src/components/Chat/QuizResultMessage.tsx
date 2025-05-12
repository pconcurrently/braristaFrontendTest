import { Box, Text } from '@chakra-ui/react';

export const QuizResultMessage = ({ msg }: { msg: any }) => (
	<Box
		mb={2}
		p={2}
		bg="#83c34b"
		borderRadius={8}
		maxW="80%"
		ml={0}
		boxShadow="0 1px 3px rgba(0,0,0,0.12)"
		fontFamily="'Comic Sans MS', cursive, sans-serif"
		fontSize={13}
		color="#fff"
	>
		<Text fontWeight={600} color="#fff">
			{msg.text}
		</Text>
		<Text fontSize={11} color="#eaf7e0" mt={1}>
			{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
		</Text>
	</Box>
);
