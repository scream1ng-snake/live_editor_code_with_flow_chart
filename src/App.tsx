import React from 'react';
import Editor from '@monaco-editor/react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ts from 'typescript';
import { renderSourceFile } from './render';

const code = `
function test_1(str_1: string, str_2: number): string {
  console.log(str_1)
}
function test_2() {
  console.log('hello')
}

function indexSearch(list, element) {
  let currentIndex,
      currentElement,
      minIndex = 0,
      maxIndex = list.length - 1;

  while (minIndex <= maxIndex) {
      currentIndex = Math.floor(minIndex + maxIndex) / 2;
      currentElement = list[currentIndex];

      if (currentElement === element) {
          return currentIndex;
      }

      if (currentElement < element) {
          minIndex = currentIndex + 1;
      }

      if (currentElement > element) {
          maxIndex = currentIndex - 1;
      }
  }

  return -2;
}`;

function App() {
  const [
    sourceCode, 
    setSourceCode
  ] = React.useState(code);

  const sourceFile = ts.createSourceFile('filename.ts',
    sourceCode, ts.ScriptTarget.Latest, true);
    
  
  return (
    <Row 
      style={{ 
        height: '100vh', 
        overflow: 'hidden', 
        background: '#0D0D0E'
      }}
    >
      <Col 
        style={{ 
          height: '100vh', 
          overflow: 'overlay', 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center' , 
          flexDirection: 'column'
        }}
      >
        {renderSourceFile(sourceFile)}
      </Col>
      <Col>
        <Editor 
          height={'100vh'}
          theme='vs-dark'
          defaultLanguage='typescript' 
          defaultValue={sourceCode} 
        />
      </Col>
    </Row>
  );
}

export default App;