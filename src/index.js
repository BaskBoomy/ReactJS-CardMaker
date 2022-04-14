import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import {firebaseApp} from './service/firebase';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_upload';
import ImageFileInput from './components/image_file_input/image_file_input';
import CardRepository from './service/card_repository';

const authService = new AuthService(firebaseApp);
const imageUploader = new ImageUploader();
const FileInput = memo(props => (<ImageFileInput {...props} imageUploader={imageUploader}/>));
const cardRepository = new CardRepository();
ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} cardRepository={cardRepository}/>
  </React.StrictMode>,
  document.getElementById('root')
);
