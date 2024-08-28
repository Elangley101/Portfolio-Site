// src/components/CodeSnippet.js
import React from 'react';
import styled from 'styled-components';

const SnippetContainer = styled.div`
  padding: 2rem;
  background: #282c34;
  color: white;
  text-align: center;
`;

const CodeSnippet = () => {
  return (
    <SnippetContainer>
      <h2>Interactive Code Example</h2>
      <iframe
        src="https://codesandbox.io/embed/new?fontsize=14&hidenavigation=1&theme=dark"
        style={{ width: '100%', height: '500px', border: '0', borderRadius: '4px', overflow: 'hidden' }}
        title="Interactive Code Example"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </SnippetContainer>
  );
};

export default CodeSnippet;
