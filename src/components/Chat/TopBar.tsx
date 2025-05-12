import { Box, Text, Button } from '@chakra-ui/react';
import { MinusIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';

export const TopBar = ({
	onMinimize,
	onClose,
	onRefresh,
}: {
	onMinimize: () => void;
	onClose: () => void;
	onRefresh: () => void;
}) => (
	<Box
		p={0}
		bg="#83c34b"
		color="#222"
		height="48px"
		display="flex"
		alignItems="center"
		justifyContent="space-between"
		borderBottom="1px solid #B0B0B0"
		px={4}
	>
		<Text fontWeight="bold" fontSize="xl" letterSpacing={0.5}>
			Lemon-Aide
		</Text>
		<Box>
			<Button
				size="sm"
				variant="ghost"
				onClick={onRefresh}
				aria-label="Refresh chat"
				mr={1}
				_hover={{ bg: '#6fa13a' }}
			>
				<RepeatIcon boxSize={4} color="#222" style={{ strokeWidth: 2 }} />
			</Button>
			<Button
				size="sm"
				variant="ghost"
				onClick={onMinimize}
				aria-label="Minimize chat"
				mr={1}
				_hover={{ bg: '#6fa13a' }}
			>
				<MinusIcon boxSize={4} color="#222" style={{ strokeWidth: 2 }} />
			</Button>
			<Button
				size="sm"
				variant="ghost"
				onClick={onClose}
				aria-label="Close chat"
				_hover={{ bg: '#6fa13a' }}
			>
				<CloseIcon boxSize={4} color="#222" style={{ strokeWidth: 2 }} />
			</Button>
		</Box>
	</Box>
);
