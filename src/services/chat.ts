import { LangCode } from '../components/types';
import { t } from './i18n';

let messageCounter = 0;
let chatHistory: any[] = [];
let currentQuiz: any = null;

export const quizTranslations = {
	en: [
		{
			question: "What's the most important factor in a well-fitting bra?",
			options: [
				'The band fits snugly',
				'The straps are tight',
				'The color matches your outfit',
				'The price is right',
			],
			correct: 0,
		},
		{
			question: 'How should the band of your bra sit?',
			options: [
				'Above your breasts',
				'Parallel to the floor',
				'Loose and comfortable',
				'As tight as possible',
			],
			correct: 1,
		},
		{
			question: 'When should you replace your bra?',
			options: [
				'Every 6-8 months with regular wear',
				'Once a year',
				'When it starts looking old',
				"Never if it's comfortable",
			],
			correct: 0,
		},
	],
	es: [
		{
			question:
				'¿Cuál es el factor más importante en un sujetador bien ajustado?',
			options: [
				'La banda se ajusta bien',
				'Los tirantes están apretados',
				'El color combina con tu ropa',
				'El precio es el correcto',
			],
			correct: 0,
		},
		{
			question: '¿Cómo debe quedar la banda de tu sujetador?',
			options: [
				'Por encima de los pechos',
				'Paralela al suelo',
				'Suelta y cómoda',
				'Lo más apretada posible',
			],
			correct: 1,
		},
		{
			question: '¿Cuándo debes reemplazar tu sujetador?',
			options: [
				'Cada 6-8 meses con uso regular',
				'Una vez al año',
				'Cuando empieza a verse viejo',
				'Nunca si es cómodo',
			],
			correct: 0,
		},
	],
	fr: [
		{
			question:
				'Quel est le facteur le plus important dans un soutien-gorge bien ajusté ?',
			options: [
				'La bande est bien ajustée',
				'Les bretelles sont serrées',
				'La couleur va avec votre tenue',
				'Le prix est correct',
			],
			correct: 0,
		},
		{
			question: 'Comment la bande de votre soutien-gorge doit-elle se placer ?',
			options: [
				'Au-dessus des seins',
				'Parallèle au sol',
				'Lâche et confortable',
				'Aussi serrée que possible',
			],
			correct: 1,
		},
		{
			question: 'Quand devez-vous remplacer votre soutien-gorge ?',
			options: [
				'Tous les 6-8 mois avec une utilisation régulière',
				'Une fois par an',
				'Quand il commence à paraître vieux',
				"Jamais s'il est confortable",
			],
			correct: 0,
		},
	],
	de: [
		{
			question: 'Was ist der wichtigste Faktor bei einem gut sitzenden BH?',
			options: [
				'Das Unterbrustband sitzt fest',
				'Die Träger sind straff',
				'Die Farbe passt zum Outfit',
				'Der Preis stimmt',
			],
			correct: 0,
		},
		{
			question: 'Wie sollte das Unterbrustband deines BHs sitzen?',
			options: [
				'Über der Brust',
				'Parallel zum Boden',
				'Locker und bequem',
				'So eng wie möglich',
			],
			correct: 1,
		},
		{
			question: 'Wann solltest du deinen BH ersetzen?',
			options: [
				'Alle 6-8 Monate bei regelmäßigem Tragen',
				'Einmal im Jahr',
				'Wenn er alt aussieht',
				'Niemals, wenn er bequem ist',
			],
			correct: 0,
		},
	],
	it: [
		{
			question:
				'Qual è il fattore più importante in un reggiseno che calza bene?',
			options: [
				'La fascia aderisce bene',
				'Le spalline sono strette',
				'Il colore si abbina al vestito',
				'Il prezzo è giusto',
			],
			correct: 0,
		},
		{
			question: 'Come dovrebbe stare la fascia del reggiseno?',
			options: [
				'Sopra il seno',
				'Parallela al pavimento',
				'Larga e comoda',
				'Il più stretta possibile',
			],
			correct: 1,
		},
		{
			question: 'Quando dovresti sostituire il reggiseno?',
			options: [
				'Ogni 6-8 mesi con uso regolare',
				"Una volta all'anno",
				'Quando inizia a sembrare vecchio',
				'Mai se è comodo',
			],
			correct: 0,
		},
	],
};

type Message = {
	id: number;
	text: string;
	timestamp: number;
	sender: 'user' | 'bot';
	type?: 'quiz' | 'quiz-result' | 'bot-typing';
};

export const sendMessage = async (
	message: string,
	langCode: LangCode = 'en'
): Promise<Message> => {
	console.log('Sending message:', message, 'with langCode:', langCode);
	await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
	messageCounter++;
	const quizSet = quizTranslations[langCode] || quizTranslations['en'];

	if (message.toLowerCase() === 'start quiz') {
		currentQuiz = {
			currentQuestion: 0,
			score: 0,
			completed: false,
			questions: quizSet,
		};
		return {
			id: messageCounter,
			text: `${t('quizIntro', langCode)}\n\n${formatQuizQuestion(0, langCode)}`,
			timestamp: new Date().getTime(),
			sender: 'bot',
			type: 'quiz',
		};
	}

	if (currentQuiz && !currentQuiz.completed && /^[0-9]$/.test(message)) {
		const answer = parseInt(message) - 1;
		const question = currentQuiz.questions[currentQuiz.currentQuestion];
		if (answer === question.correct) {
			currentQuiz.score++;
		}
		currentQuiz.currentQuestion++;
		console.log(
			'currentQuiz.currentQuestion',
			currentQuiz.currentQuestion,
			currentQuiz.questions.length
		);
		if (currentQuiz.currentQuestion >= currentQuiz.questions.length) {
			currentQuiz.completed = true;
			const response: Message = {
				id: messageCounter,
				text: t(
					'quizResult',
					langCode,
					currentQuiz.score,
					currentQuiz.questions.length
				),
				timestamp: new Date().getTime(),
				sender: 'bot',
				type: 'quiz-result',
			};
			currentQuiz = null;
			return response;
		}
		return {
			id: messageCounter,
			text: formatQuizQuestion(currentQuiz.currentQuestion, langCode),
			timestamp: new Date().getTime(),
			sender: 'bot',
			type: 'quiz',
		};
	}

	const response: Message = {
		id: messageCounter,
		text: getBotResponse(message, langCode),
		timestamp: new Date().getTime(),
		sender: 'bot',
	};

	chatHistory.push(response);
	return response;
};

export const getHistory = () => chatHistory;

function getBotResponse(message: string, langCode: LangCode = 'en'): string {
	if (message.toLowerCase().includes('quiz')) {
		return t('quizPrompt', langCode);
	}

	if (message.toLowerCase().includes('hello')) {
		return t('hello', langCode);
	}

	if (message.toLowerCase().includes('size')) {
		const sizes = ['32B', '34C', '36D'];
		return t('size', langCode, sizes[Math.floor(Math.random() * 3)]);
	}

	if (message.toLowerCase().includes('measure')) {
		return t('measure', langCode);
	}

	return message.length > 20
		? message.includes('?')
			? t('fallbackQ', langCode)
			: t('fallback', langCode)
		: t('help', langCode);
}

function formatQuizQuestion(index: number, langCode: LangCode = 'en'): string {
	const quizSet = quizTranslations[langCode] || quizTranslations['en'];
	const question = quizSet[index];
	if (!question) return '';
	return `${question.question}\n\n${question.options
		.map((opt, i) => `${i + 1}. ${opt}`)
		.join('\n')}`;
}

export class ChatUtils {
	static formatTimestamp(timestamp: number) {
		return new Date(timestamp).toLocaleTimeString();
	}

	static isBot(sender: string) {
		return sender === 'bot';
	}

	static isQuizActive() {
		return currentQuiz !== null;
	}
}
