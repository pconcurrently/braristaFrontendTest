import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import {
	Box,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react';
import { sendMessage } from '../../services/chat';
import { CHAT_WIDTH, CHAT_HEIGHT, langCodes } from '../../components/constants';
import { ChatIcon } from '@chakra-ui/icons';
import { TopBar } from './TopBar';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';
import { LangProvider } from './LangContext';
import { getLanguageName, t } from '../../services/i18n';
import { quizTranslations } from '../../services/chat';

const Wrapper = styled(Box)`
	width: ${CHAT_WIDTH}px;
	height: ${CHAT_HEIGHT}px;
	position: fixed;
	bottom: 20px;
	right: 20px;
	border-radius: 12px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	background: #fff;
	font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
	border: 1px solid #e2e8f0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

	@media screen and (max-width: 768px) {
		width: 100%;
		height: 100%;
		bottom: 0;
		right: 0;
		border-radius: 0;
	}
`;

type Message = {
	id: string | number;
	text: string;
	sender: 'user' | 'bot';
	timestamp: number;
	type?: 'quiz' | 'quiz-result' | 'bot-typing';
	extra?: any;
};

const AUTO_OPEN_PAGES = [2, 4]; // pages where chat should open automatically

export const ChatWindow = (props: { page: number }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [messageCount, setMessageCount] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [lastMessageTime, setLastMessageTime] = useState<number | null>(null);
	const [showLangModal, setShowLangModal] = useState(true);
	const [selectedLang, setSelectedLang] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(AUTO_OPEN_PAGES.includes(props.page));
	const prevPage = useRef(props.page);
	const [quizLoading, setQuizLoading] = useState(false);
	const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
	const [quizAnswers, setQuizAnswers] = useState<number[] | null>(null);
	const quizActive = quizQuestions.length > 0;
	const [botTyping, setBotTyping] = useState(false);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [quizResultText, setQuizResultText] = useState<string | null>(null);

	const currentLangCode = langCodes[selectedLang ?? 0];

	const handleRefresh = useCallback(() => {
		setMessages([]);
		setMessageCount(0);
		setError(null);
		setBotTyping(false);
		setQuizLoading(false);
		setQuizQuestions([]);
		setQuizAnswers(null);
	}, []);

	useEffect(() => {
		if (props.page !== prevPage.current) {
			setIsOpen(AUTO_OPEN_PAGES.includes(props.page));
			prevPage.current = props.page;
		}
	}, [props.page]);

	useEffect(() => {
		setMessageCount(messages.length);
		setLastMessageTime(messages[messages.length - 1]?.timestamp || null);
		if (messages.length > 1000) setMessages([]);
	}, [messages]);

	const send_message = useCallback(
		async (text: string) => {
			if (!text.trim()) return;
			setQuizLoading(false);
			setError(null);
			const userMessage: Message = {
				id: Date.now(),
				text,
				sender: 'user',
				timestamp: Date.now(),
			};
			setMessages((prevMessages) => [...prevMessages, userMessage]);
			setBotTyping(true);
			try {
				const response = await sendMessage(text, currentLangCode);
				if (text.toLowerCase() === 'start quiz' && response.type === 'quiz') {
					const quizSet =
						quizTranslations[currentLangCode] || quizTranslations['en'];
					setQuizQuestions(
						quizSet.map((q: any) => ({
							question: q.question,
							options: q.options,
						}))
					);
					setQuizAnswers(null);
					setMessages((prevMessages) =>
						prevMessages.filter((m) => m.type !== 'quiz')
					);
				} else {
					setMessages((prevMessages) => {
						const filtered = prevMessages.filter(
							(m) => m.type !== 'bot-typing'
						);
						return [...filtered, response as Message];
					});
				}
			} catch (err) {
				setError('Something went wrong');
				console.log('Error:', err);
			} finally {
				setBotTyping(false);
				setMessageCount((prev) => prev + 2);
			}
		},
		[currentLangCode]
	);

	const handleQuizComplete = async (answers: number[]) => {
		setQuizAnswers(answers);
		setQuizCompleted(true);
		// Immediately hide quiz panel
		setQuizQuestions([]);

		const numQuestions = quizQuestions.length;
		const answersToSend = answers.slice(0, numQuestions);

		// Show bot typing state
		setBotTyping(true);

		for (let i = 0; i < answersToSend.length; i++) {
			const toSend = answersToSend[i] === -1 ? 0 : answersToSend[i] + 1;
			const response = await sendMessage(String(toSend), currentLangCode);
			setMessages((prev) => [...prev, response]);
		}

		// Reset quiz state
		setQuizAnswers(null);
		setQuizCompleted(false);
		setQuizResultText(null);
		setBotTyping(false);
	};

	function handleLangSelect(idx: number) {
		setSelectedLang(idx);
		setShowLangModal(false);
		setTimeout(() => {
			console.log('Selected language:', langCodes[idx], 'on page', props.page);
		}, 500);
	}

	if (showLangModal) {
		return (
			<Wrapper>
				<Modal isOpen={true} onClose={() => {}} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{t('selectLanguage', currentLangCode)}</ModalHeader>
						<ModalBody>
							{langCodes.map((code, i) => (
								<Button
									key={code}
									w="100%"
									mb={2}
									onClick={() => handleLangSelect(i)}
								>
									{i + 1}. {getLanguageName(code)}
								</Button>
							))}
						</ModalBody>
						<ModalFooter>
							<Text fontSize="sm">{t('chooseNumber', currentLangCode)}</Text>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Wrapper>
		);
	}

	if (!isOpen) {
		return (
			<Box position="fixed" bottom="32px" right="32px" zIndex={1000}>
				<Button
					borderRadius="50%"
					w="60px"
					h="60px"
					bg="#83c34b"
					_hover={{ bg: '#6fa13a' }}
					boxShadow="0 2px 8px rgba(0,0,0,0.12)"
					onClick={() => setIsOpen(true)}
					aria-label="Open chat"
				>
					<ChatIcon boxSize={8} color="#000" />
				</Button>
			</Box>
		);
	}

	return (
		<LangProvider selectedLang={selectedLang ?? 0}>
			<Wrapper>
				<TopBar
					onMinimize={() => setIsOpen(false)}
					onClose={() => setIsOpen(false)}
					onRefresh={handleRefresh}
				/>
				<MessageList
					messages={
						botTyping
							? [
									...messages,
									{
										id: 'bot-typing',
										text: t('botTyping', currentLangCode),
										sender: 'bot',
										timestamp: Date.now(),
										type: 'bot-typing',
									},
								]
							: messages
					}
					onQuizAnswer={(n) => send_message(String(n))}
					quizActive={quizActive}
					quizLoading={quizLoading}
					quizPanelProps={
						quizActive
							? {
									questions: quizQuestions,
									onComplete: handleQuizComplete,
									initialAnswers: quizAnswers ?? undefined,
									readOnly: quizCompleted,
								}
							: undefined
					}
					quizResultText={quizResultText || undefined}
				/>
				<ChatInput
					onSend={send_message}
					isLoading={false}
					placeholder={t('askMeAnything', currentLangCode)}
					disabled={quizActive || quizCompleted}
				/>
				{error && <Text color="red.500">{error}</Text>}
			</Wrapper>
		</LangProvider>
	);
};
