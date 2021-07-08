import './sc.js';
import '../styles/style.css';


import CV from '../assets/doc/Bouazizi_Ahmed.pdf';


function downloadCv() {
	const cvLink = document.getElementById('cv');
	cvLink.href = CV;
}


downloadCv();