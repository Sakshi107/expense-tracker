import React from 'react';
import ReactDOM from 'react-dom';
import {SpeechProvider} from '@speechly/react-client'

import App from './App';
import './index.css';

import { Provider } from './context/context';

ReactDOM.render(
    <SpeechProvider appId="7aa066e8-41d5-45c7-9f9b-0cfa0fef85ef" language="en-US">
        <Provider>
        <App />
        </Provider>
    </SpeechProvider>,
    document.getElementById('root')
);