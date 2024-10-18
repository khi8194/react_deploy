import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { GlobalProvider } from './GlobalProvider'; //useGlobal.jsx에서 .js로 변경

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			{/* <GlobalProvider> */}
			<App />
			{/* </GlobalProvider> */}
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
);
