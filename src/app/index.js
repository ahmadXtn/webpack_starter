import './sc.js';
import '../styles/style.css';

import Typed from 'typed.js';


import CV from '../assets/doc/Bouazizi_Ahmed.pdf';
import portraitImg from '../assets/images/portrait.jpg';

const cvLink = document.getElementById('cv');
const portrait = document.getElementById('portrait');
cvLink.href = CV;

const Img = new Image();
Img.src = portraitImg;
portrait.appendChild(Img);



