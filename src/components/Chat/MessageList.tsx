import { useEffect, useRef } from 'react';
import { Text, Spinner, Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import { QuizResultMessage } from './QuizResultMessage';
import { useLang } from './LangContext';
import { t } from '../../services/i18n';
import { QuizPanel, QuizQuestion } from './QuizPanel';

const MessageContainer = styled.div`
	flex: 1 1 auto;
	overflow-y: auto;
	padding: 10px;
	background: #fff;
`;

type Message = {
	id: string | number;
	text: string;
	sender: 'user' | 'bot';
	timestamp: number;
	type?: 'quiz' | 'quiz-result' | 'bot-typing';
	extra?: any;
};

const Message = (props: Message) => (
	<div style={{ marginBottom: 8 }}>
		<div
			style={{
				background:
					props.sender === 'bot' ? '#83c34b' : 'rgba(131,195,75,0.08)',
				borderRadius: 8,
				maxWidth: '80%',
				marginLeft: props.sender === 'bot' ? 0 : 'auto',
				boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
				fontFamily: 'Comic Sans MS, cursive, sans-serif',
				fontSize: props.sender === 'bot' ? 13 : 15,
				color: props.sender === 'bot' ? '#fff' : '#222',
				padding: 8,
			}}
		>
			<div>{props.text}</div>
			<div
				style={{
					fontSize: 11,
					color: props.sender === 'bot' ? '#eaf7e0' : '#888',
					marginTop: 4,
				}}
			>
				{new Date(props.timestamp).toLocaleTimeString()}
			</div>
		</div>
	</div>
);

export const MessageList = ({
	messages,
	quizActive,
	quizPanelProps,
}: {
	messages: Message[];
	quizActive: boolean;
	quizPanelProps?: {
		questions: QuizQuestion[];
		onComplete: (answers: number[]) => void;
		initialAnswers?: number[];
		readOnly?: boolean;
	};
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { langCode } = useLang();

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<MessageContainer ref={containerRef}>
			{messages.map((msg, i) => {
				if (msg.type === 'quiz') {
					return null;
				}
				if (msg.type === 'quiz-result') {
					return <QuizResultMessage key={i} msg={msg} />;
				}
				if (msg.type === 'bot-typing') {
					return (
						<Flex
							key={i}
							justify="flex-start"
							align="center"
							mt={2}
							mb={2}
							ml={0}
							pl={2}
						>
							<Spinner size="md" color="#83c34b" thickness="3px" speed="0.7s" />
						</Flex>
					);
				}
				return <Message key={i} {...msg} />;
			})}
			{quizActive && quizPanelProps && <QuizPanel {...quizPanelProps} />}
			{messages.length === 0 && (
				<Text color="gray.400">{t('noMessages', langCode)}</Text>
			)}
		</MessageContainer>
	);
};
