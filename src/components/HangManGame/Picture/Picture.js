import React from 'react';
import im0 from  '../../../assets/images/hangman-0.png';
import im1 from  '../../../assets/images/hangman-1.png';
import im2 from  '../../../assets/images/hangman-2.png';
import im3 from  '../../../assets/images/hangman-3.png';
import im4 from  '../../../assets/images/hangman-4.png';
import im5 from  '../../../assets/images/hangman-5.png';
import im6 from  '../../../assets/images/hangman-6.png';
import im7 from  '../../../assets/images/hangman-7.png';
import im8 from  '../../../assets/images/hangman-8.png';
import im9 from  '../../../assets/images/hangman-9.png';
import './Picture.css';
var images = [];
images.push(im0, im1, im2, im3, im4, im5, im6, im7, im8, im9);

const Picture = (props) => (
    <img className={"pic"} src={images[props.whichImage]}/>
);



export default Picture;