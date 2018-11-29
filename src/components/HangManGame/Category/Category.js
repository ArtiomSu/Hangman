import React from 'react';
import './Category.css';

const Category = (props) => (

    <button className={props.cssClass} onClick={() => props.categorySelected(props.category)}>{props.category}</button>

);

export default Category;