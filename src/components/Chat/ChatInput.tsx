import { useState, KeyboardEvent } from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import styled from 'styled-components';

const PoweredBy = styled.div`
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #888;
	margin-top: 4px;
	margin-bottom: 2px;
	font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
	span.brarista {
		font-family: 'Pacifico', 'Comic Sans MS', cursive, sans-serif;
		font-size: 18px;
		color: #222;
		margin-left: 4px;
	}
`;

export const ChatInput = ({
	onSend,
	isLoading,
	placeholder,
	disabled,
}: {
	onSend: (msg: string) => void;
	isLoading: boolean;
	placeholder?: string;
	disabled?: boolean;
}) => {
	const [inputValue, setInputValue] = useState('');

	const handleSend = () => {
		if (inputValue.trim()) {
			onSend(inputValue);
			setInputValue('');
		}
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<Box pt={2} pb={1} px={3} bg="#fff" borderTop="1px solid #eee">
			<Flex align="center" gap={2}>
				<Input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyUp={handleKeyPress}
					placeholder={placeholder}
					disabled={isLoading || disabled}
					bg="#fff"
					borderColor="#d1d5db"
					borderRadius="24px"
					fontSize={16}
					px={5}
					height="44px"
					_placeholder={{ color: '#8a8a8a' }}
					boxShadow="none"
					flex={1}
					autoFocus
					autoComplete="off"
					spellCheck={false}
				/>
				<Button
					minW="44px"
					h="44px"
					borderRadius="50%"
					bg="#83c34b"
					_hover={{ bg: '#6fa13a' }}
					color="#fff"
					isLoading={isLoading}
					onClick={handleSend}
					p={0}
				>
					<ArrowUpIcon boxSize={6} color="#000" />
				</Button>
			</Flex>
			<PoweredBy>
				Powered by <span className="brarista">brarista</span>
			</PoweredBy>
		</Box>
	);
};
