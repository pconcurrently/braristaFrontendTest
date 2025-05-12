import React, { useState } from 'react';
import { Box, Text, Flex, Button, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { t } from '../../services/i18n';
import { useLang } from './LangContext';
import { langCodes } from '../constants';

export type QuizQuestion = {
	question: string;
	options: string[];
};

export type QuizPanelProps = {
	questions: QuizQuestion[];
	onComplete: (answers: number[]) => void;
	initialAnswers?: number[];
};

export const QuizPanel: React.FC<QuizPanelProps> = ({
	questions,
	onComplete,
	initialAnswers,
}) => {
	const { selectedLang } = useLang();
	const currentLangCode = langCodes[selectedLang];
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState<(number | null)[]>(
		initialAnswers && initialAnswers.length === questions.length
			? initialAnswers
			: Array(questions.length).fill(null)
	);

	const handleSelect = (idx: number) => {
		setAnswers((prev) => {
			const next = [...prev];
			next[current] = idx;
			if (current < questions.length - 1) {
				setTimeout(() => setCurrent((c) => c + 1), 150);
			} else {
				setTimeout(
					() => onComplete(next.map((a) => (a === null ? -1 : a))),
					150
				);
			}
			return next;
		});
	};

	const handleBack = () => {
		if (current > 0) setCurrent((c) => c - 1);
	};

	const safeCurrent = Math.min(current, questions.length - 1);
	const questionObj = questions[safeCurrent];
	const progress = ((safeCurrent + 1) / questions.length) * 100;

	return (
		<>
			<Box w="100%" mb={2}>
				<Box
					w="100%"
					h="6px"
					bg="#f5f7f3"
					borderRadius="8px"
					position="relative"
				>
					<Box
						h="6px"
						bg="#3d4d1e"
						borderRadius="8px"
						position="absolute"
						left={0}
						top={0}
						width={`${progress}%`}
						transition="width 0.3s"
					/>
				</Box>
			</Box>
			<Box
				pb={1}
				mb={4}
				bg="#ecf5e3"
				borderRadius="md"
				maxW="100%"
				boxShadow="0 1px 3px rgba(0,0,0,0.08)"
			>
				<Flex
					align="center"
					bg="#ecf5e3"
					pt={4}
					pb={2}
					borderTopRadius="md"
					onClick={handleBack}
					cursor={current === 0 ? 'not-allowed' : 'pointer'}
				>
					<IconButton
						aria-label="Back"
						icon={<ChevronLeftIcon boxSize={5} color="#3d4d1e" />}
						variant="ghost"
						isDisabled={current === 0}
						fontSize="md"
						color="#3d4d1e"
						_hover={{ bg: 'transparent' }}
						border="none"
						p={0}
					/>
					<Text fontWeight={700} fontSize="lg" color="#3d4d1e" pl={1}>
						{t('back', currentLangCode)}
					</Text>
				</Flex>
				<Flex justify="flex-start" align="center" px={4} mb={1}>
					<Text fontWeight={600} fontSize="md" color="#3d4d1e">
						{t('question', currentLangCode)} {safeCurrent + 1}{' '}
						{t('of', currentLangCode)} {questions.length}
					</Text>
				</Flex>
				<Text fontWeight={700} mb={4} fontSize="xl" px={4} color="#222">
					{questionObj.question}
				</Text>
				<Flex direction="column" gap={4} mb={4} px={1}>
					{questionObj.options.map((opt, i) => {
						const selected = answers[safeCurrent] === i;
						return (
							<Button
								key={i}
								onClick={() => handleSelect(i)}
								bg={selected ? '#26310d' : '#3d4d1e'}
								color="#fff"
								fontWeight={700}
								fontSize="md"
								borderRadius="9999px"
								w="100%"
								h="42px"
								mb={0}
								boxShadow={selected ? '0 2px 8px rgba(38,49,13,0.18)' : 'none'}
								border="none"
								_hover={{ bg: selected ? '#26310d' : '#2e3916' }}
							>
								{opt}
							</Button>
						);
					})}
				</Flex>
			</Box>
		</>
	);
};
