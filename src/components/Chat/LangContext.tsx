import React, { createContext, useContext } from 'react';
import { LangCode } from '../types';
import { getTranslationsForLang } from '../../services/i18n';

type LangContextType = {
	selectedLang: number;
	langCode: LangCode;
	labels: ReturnType<typeof getTranslationsForLang>;
};

export const LangContext = createContext<LangContextType>({
	selectedLang: 0,
	langCode: 'en',
	labels: getTranslationsForLang('en'),
});

export const LangProvider = ({
	selectedLang,
	children,
}: {
	selectedLang: number;
	children: React.ReactNode;
}) => {
	const langCode = ['en', 'es', 'fr', 'de', 'it'][selectedLang] as LangCode;
	const labels = getTranslationsForLang(langCode);

	return (
		<LangContext.Provider value={{ selectedLang, langCode, labels }}>
			{children}
		</LangContext.Provider>
	);
};

export const useLang = () => useContext(LangContext);
