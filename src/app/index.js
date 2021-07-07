import '../styles/style.css';
import backgroundImg from '../assets/images/coding.jpg';
import _ from 'lodash';


function createComponent() {
	const htmlHeadingElement=document.createElement('h1');
	htmlHeadingElement.innerHTML="Heading created from index?js";
	htmlHeadingElement.style.color="red";

	const htmlImageElement = new Image(500, 500);
	htmlImageElement.src = backgroundImg;

	return {
		img:htmlImageElement,
		heading:htmlHeadingElement
	};
}


document.body.appendChild(createComponent().heading);
document.body.appendChild(createComponent().img);