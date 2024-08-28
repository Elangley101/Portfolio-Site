// src/components/AcidityTestDemo.js
import React, { useState } from 'react';

const AcidityTestDemo = () => {
  const [parameter, setParameter] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRunTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/run-test?parameter=${parameter}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      setResult(data);
    } catch (error) {
      setError('Failed to run the test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Courier New, Courier, monospace', backgroundColor: '#282c34', color: '#61dafb', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
      <h2>Acidity Test Demo</h2>
      <input
        type="text"
        placeholder="Enter test parameter"
        value={parameter}
        onChange={(e) => setParameter(e.target.value)}
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
      />
      <button onClick={handleRunTest} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#61dafb', color: '#282c34', cursor: 'pointer' }}>
        Run Test
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default AcidityTestDemo;
