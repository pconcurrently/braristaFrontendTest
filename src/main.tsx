import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ChakraProvider>
		<App />
	</ChakraProvider>
);
