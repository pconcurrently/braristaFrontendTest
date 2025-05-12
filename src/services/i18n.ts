import { LangCode } from '../components/types';

// Type for translation keys
type TranslationKey =
	| 'quizIntro'
	| 'quizResult'
	| 'quizPrompt'
	| 'hello'
	| 'size'
	| 'measure'
	| 'fallbackQ'
	| 'fallback'
	| 'help'
	| 'selectLanguage'
	| 'chooseNumber'
	| 'botTyping'
	| 'noMessages'
	| 'band'
	| 'cup'
	| 'system'
	| 'askMeAnything'
	| 'back'
	| 'question'
	| 'of';

// Type for translation values
type TranslationValue = string | ((...args: any[]) => string);

// Type for the entire translations object
type Translations = {
	[K in TranslationKey]: {
		[L in LangCode]: TranslationValue;
	};
};

// Centralized translations object
const translations: Translations = {
	quizIntro: {
		en: "Let's test your bra fitting knowledge!",
		es: '¡Vamos a poner a prueba tus conocimientos sobre sujetadores!',
		fr: 'Testons vos connaissances sur le choix du soutien-gorge !',
		de: 'Lass uns dein BH-Wissen testen!',
		it: 'Mettiamo alla prova le tue conoscenze sui reggiseni!',
	},
	quizResult: {
		en: (score: number, total: number) =>
			`Quiz completed! Your score: ${score}/${total}`,
		es: (score: number, total: number) =>
			`¡Quiz completado! Tu puntuación: ${score}/${total}`,
		fr: (score: number, total: number) =>
			`Quiz terminé ! Votre score : ${score}/${total}`,
		de: (score: number, total: number) =>
			`Quiz abgeschlossen! Deine Punktzahl: ${score}/${total}`,
		it: (score: number, total: number) =>
			`Quiz completato! Il tuo punteggio: ${score}/${total}`,
	},
	quizPrompt: {
		en: "Would you like to test your knowledge? Type 'start quiz' to begin!",
		es: '¿Te gustaría poner a prueba tus conocimientos? Escribe "start quiz" para comenzar!',
		fr: 'Voulez-vous tester vos connaissances ? Tapez "start quiz" pour commencer !',
		de: 'Möchtest du dein Wissen testen? Tippe "start quiz" um zu beginnen!',
		it: 'Vuoi mettere alla prova le tue conoscenze? Digita "start quiz" per iniziare!',
	},
	hello: {
		en: 'Hi there! How can I help you with bra fitting today?',
		es: '¡Hola! ¿Cómo puedo ayudarte con el ajuste de sujetadores hoy?',
		fr: 'Bonjour ! Comment puis-je vous aider pour le choix de votre soutien-gorge ?',
		de: 'Hallo! Wie kann ich dir heute beim BH-Fitting helfen?',
		it: 'Ciao! Come posso aiutarti con la scelta del reggiseno oggi?',
	},
	size: {
		en: (size: string) =>
			`Based on what you've told me, I would recommend a ${size}. Would you like to know how to measure yourself properly?`,
		es: (size: string) =>
			`Según lo que me has dicho, te recomendaría una talla ${size}. ¿Quieres saber cómo medirte correctamente?`,
		fr: (size: string) =>
			`D'après ce que vous m'avez dit, je recommanderais une taille ${size}. Voulez-vous savoir comment bien vous mesurer ?`,
		de: (size: string) =>
			`Basierend auf deinen Angaben würde ich eine ${size} empfehlen. Möchtest du wissen, wie du dich richtig misst?`,
		it: (size: string) =>
			`In base a ciò che mi hai detto, ti consiglierei una taglia ${size}. Vuoi sapere come misurarti correttamente?`,
	},
	measure: {
		en: 'To measure yourself: 1. Wear an unlined bra 2. Measure around your ribcage 3. Measure around the fullest part of your bust. Need more details?',
		es: 'Para medirte: 1. Usa un sujetador sin relleno 2. Mide alrededor de tu caja torácica 3. Mide la parte más llena de tu busto. ¿Necesitas más detalles?',
		fr: 'Pour vous mesurer : 1. Portez un soutien-gorge sans rembourrage 2. Mesurez votre tour de buste 3. Mesurez la partie la plus large de votre poitrine. Besoin de plus de détails ?',
		de: 'So misst du dich: 1. Trage einen ungepolsterten BH 2. Miss um deinen Brustkorb 3. Miss an der vollsten Stelle deiner Brust. Brauchst du mehr Details?',
		it: 'Per misurarti: 1. Indossa un reggiseno non imbottito 2. Misura intorno alla gabbia toracica 3. Misura la parte più piena del busto. Hai bisogno di più dettagli?',
	},
	fallbackQ: {
		en: "That's a great question! Let me help you with that.",
		es: '¡Esa es una gran pregunta! Déjame ayudarte con eso.',
		fr: "C'est une excellente question ! Laissez-moi vous aider.",
		de: 'Das ist eine tolle Frage! Lass mich dir dabei helfen.',
		it: 'Ottima domanda! Lascia che ti aiuti.',
	},
	fallback: {
		en: "I understand. Tell me more about what you're looking for.",
		es: 'Entiendo. Cuéntame más sobre lo que buscas.',
		fr: "Je comprends. Dites-m'en plus sur ce que vous recherchez.",
		de: 'Ich verstehe. Erzähl mir mehr darüber, was du suchst.',
		it: 'Capisco. Dimmi di più su ciò che stai cercando.',
	},
	help: {
		en: "I'm here to help! Ask me anything about bra fitting.",
		es: '¡Estoy aquí para ayudar! Pregúntame cualquier cosa sobre el ajuste de sujetadores.',
		fr: 'Je suis là pour vous aider ! Demandez-moi tout sur le choix du soutien-gorge.',
		de: 'Ich bin hier, um zu helfen! Frag mich alles zum Thema BH-Fitting.',
		it: 'Sono qui per aiutarti! Chiedimi qualsiasi cosa sulla scelta del reggiseno.',
	},
	selectLanguage: {
		en: 'Select Language',
		es: 'Seleccionar idioma',
		fr: 'Choisir la langue',
		de: 'Sprache auswählen',
		it: 'Seleziona la lingua',
	},
	chooseNumber: {
		en: 'Choose a number between 1 and 5',
		es: 'Elige un número entre 1 y 5',
		fr: 'Choisissez un nombre entre 1 et 5',
		de: 'Wählen Sie eine Zahl zwischen 1 und 5',
		it: 'Scegli un numero tra 1 e 5',
	},
	botTyping: {
		en: 'Bot is typing...',
		es: 'El bot está escribiendo...',
		fr: 'Le bot écrit...',
		de: 'Bot tippt...',
		it: 'Il bot sta scrivendo...',
	},
	noMessages: {
		en: 'No messages yet',
		es: 'Aún no hay mensajes',
		fr: 'Pas encore de messages',
		de: 'Noch keine Nachrichten',
		it: 'Nessun messaggio ancora',
	},
	band: {
		en: 'Band Size',
		es: 'Talla de banda',
		fr: 'Taille de bande',
		de: 'Unterbrustgröße',
		it: 'Taglia fascia',
	},
	cup: {
		en: 'Cup Size',
		es: 'Talla de copa',
		fr: 'Taille de bonnet',
		de: 'Körbchengröße',
		it: 'Taglia coppa',
	},
	system: {
		en: 'Sizing System',
		es: 'Sistema de tallas',
		fr: 'Système de taille',
		de: 'Größensystem',
		it: 'Sistema di taglie',
	},
	askMeAnything: {
		en: 'Ask me anything',
		es: 'Pregunta lo que sea',
		fr: 'Posez vos questions',
		de: 'Stellen Sie Ihre Fragen',
		it: 'Chiedimi tutto',
	},
	back: {
		en: 'Back',
		es: 'Atrás',
		fr: 'Retour',
		de: 'Zurück',
		it: 'Indietro',
	},
	question: {
		en: 'Question',
		es: 'Pregunta',
		fr: 'Question',
		de: 'Frage',
		it: 'Domanda',
	},
	of: {
		en: 'of',
		es: 'de',
		fr: 'sur',
		de: 'von',
		it: 'di',
	},
};

// Translation function with type safety
export const t = (
	key: TranslationKey,
	lang: LangCode,
	...args: any[]
): string => {
	const translation = translations[key][lang];

	if (typeof translation === 'function') {
		return translation(...args);
	}

	return translation;
};

// Get all translations for a specific language
export const getTranslationsForLang = (lang: LangCode) => {
	const result: Partial<Record<TranslationKey, string>> = {};

	Object.entries(translations).forEach(([key, langTranslations]) => {
		const translation = langTranslations[lang];
		result[key as TranslationKey] =
			typeof translation === 'function' ? translation() : translation;
	});

	return result;
};

// Get language name in its native form
export const getLanguageName = (lang: LangCode): string => {
	const names: Record<LangCode, string> = {
		en: 'English',
		es: 'Español',
		fr: 'Français',
		de: 'Deutsch',
		it: 'Italiano',
	};
	return names[lang];
};
