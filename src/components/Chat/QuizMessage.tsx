import { Box, Text, Flex, Button } from '@chakra-ui/react';

export const QuizMessage = ({
	msg,
	onAnswer,
	disabled,
}: {
	msg: any;
	onAnswer: (n: number) => void;
	disabled: boolean;
}) => {
	const lines = msg.text.split('\n').filter(Boolean);
	const question = lines[0];
	const options = lines.slice(1).filter((l: string) => /^\d+\./.test(l));
	return (
		<Box
			mb={2}
			p={3}
			bg="#f5fbe6"
			borderRadius="md"
			maxW="90%"
			ml={0}
			boxShadow="0 1px 3px rgba(0,0,0,0.08)"
		>
			<Text fontWeight={600} mb={2}>
				{question}
			</Text>
			<Flex direction="column" gap={2}>
				{options.map((opt: string, i: number) => (
					<Button
						key={i}
						onClick={() => onAnswer(i + 1)}
						isDisabled={disabled}
						colorScheme="green"
						variant="outline"
						borderRadius="md"
						borderColor="#83c34b"
						color="#222"
						_hover={{ bg: '#eaf7e0' }}
						fontWeight={500}
						fontSize={15}
						textAlign="left"
						justifyContent="flex-start"
					>
						{opt}
					</Button>
				))}
			</Flex>
		</Box>
	);
};
