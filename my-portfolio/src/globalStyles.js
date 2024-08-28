// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background: #121212; /* Dark background */
    color: #e0e0e0; /* Light grey text */
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: #ffffff; /* White text for headings */
  }

  p {
    line-height: 1.6;
  }

  a {
    color: #bb86fc; /* Muted purple for links */
    text-decoration: none;
    &:hover {
      color: #bb86fc;
    }
  }

  button {
    background-color: #bb86fc;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #3700b3;
    }
  }
`;

export default GlobalStyle;
