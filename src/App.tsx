import React, { CSSProperties, ReactNode } from 'react';
import Editor from '@monaco-editor/react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
// @ts-ignore
// import * as js2flowchart from 'js2flowchart';
import { Accordion } from 'react-bootstrap';
import ts from 'typescript';
import { renderCode } from './render';
// const { convertCodeToFlowTree } = js2flowchart;

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
  // const flowTree: TreeItem = convertCodeToFlowTree(sourceCode);

  // console.log(flowTree)
  const sourceFile = ts.createSourceFile('filename.ts',
    sourceCode, ts.ScriptTarget.Latest, true);
    
  let indent = 0;
  let result = '';
  function print(node: ts.Node) {
    result += new Array(indent + 1).join("  ") + ts.SyntaxKind[node.kind] + '\n'
    switch (ts.SyntaxKind[node.kind]) {
      case 'SourceFile': {
        break;
      }
      case 'FunctionDeclaration': {
        if('parameters' in node) {
          const parameters = node.parameters as FunctionParam[]
          console.log(node)
        }
        break;
      }
    }
    indent++;
    ts.forEachChild(node, print);
    indent--;
  }

  // function render(node: ts.Node) {
  //   switch (ts.SyntaxKind[node.kind]) {
  //     case 'SourceFile': {
  //       return(
  //         <div>{ts.forEachChild(node, render)}</div>
  //       )
  //     }
  //     case 'FunctionDeclaration': {
  //       if('parameters' in node) {
  //         const parameters = node.parameters
  //       }
        
  //       return(
  //         <FunctionDecloration></FunctionDecloration>
  //       )
  //     }
  //   }
  // }
   
  print(sourceFile);
  // console.log(result)
  // console.log(sourceFile.getChildren())

  // function renderNodes(flowTree: TreeItem) { 
  //   if (flowTree.name) {
  //     // если это самый верхний скоуп
  //     // тогда рендерим только детей
  //     if (flowTree.type === 'Program') {
  //       return(
  //         <div>
  //           {flowTree.body.map(child => 
  //             renderNodes(child)
  //           )}
  //         </div>
  //       )
  //     } else {
  //       return(
  //         <div style={nodeStyle}>
  //           <p>{flowTree.type + ' - ' + flowTree.subType + ' - ' + flowTree.name}</p>
  //           {flowTree.body.map(child => 
  //             renderNodes(child)
  //           )}
  //         </div>
  //       )
  //     }
      
  //   } else return null
  // }

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
        {/* <div style={{ minHeight: '100%', minWidth: '100%', background: '#0D0D0E', overflow: 'overlay' }}>
          {renderNodes(flowTree)}
        </div> */}
        {renderCode(sourceFile)}
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



type TreeItem = {
  body: TreeItem[]
  isBodyEntry: boolean
  key: string
  name: string
  parent: TreeItem[]
  pathParentType: string
  subType: string
  type: string
}

const nodeStyle: React.CSSProperties = {
  minHeight: '45px', 
  minWidth: '400px',
  fontSize: '14px', 
  background: '#141414',
  color: '#ffffff', 
  padding: '8px',
  margin: '8px',
  border: '1px solid #303030', 
  borderRadius: '8px'
}

const huiPizda: CSSProperties = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'flex-start', 
  flexDirection: 'column', 
  marginTop: '1.3rem',
  position: 'relative'
}

const piska: CSSProperties = { 
  color: '#EB3223', 
  fontSize: '40px', 
  lineHeight: '10px', 
  marginRight: '1rem'
}

const arrowstyle: CSSProperties = {
  color: '#303030', 
  fontSize: '2rem',
  lineHeight: '1rem',
  position: 'absolute',
  top: '-1.25rem',
  zIndex: '100000',
  left: '45%'
}

const FunctionCall: React.FC<{ name: string }> = (props) => {
  return(
    <div style={huiPizda}>
      <span style={arrowstyle}>↓</span>
      <Accordion>
        <Accordion.Item eventKey={props.name}>
          <Accordion.Header>
            <span style={{ ...piska, color: '#F37300' }}>↗</span>
            <span>{props.name}</span>
          </Accordion.Header>
          <Accordion.Body>todo params</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

const FunctionDecloration: React.FC<{ name: string, children?: ReactNode }> = (props) => {
  return(
    <div style={huiPizda}>
      <Accordion className='bordered'>
        <Accordion.Item eventKey={props.name}>
          <Accordion.Header>
            <span style={piska}>{`ƒ`}</span>
            <span>{props.name}</span>
          </Accordion.Header>
          { props.children
            ? (
              <Accordion.Body>
                {props.children}
              </Accordion.Body>
            )
            : null
          }
        </Accordion.Item>
      </Accordion>
    </div>
  )
}


const IfStatement: React.FC = () => {
  return(
    <div></div>
  )
}
const TryCatch: React.FC = () => {
  return(
    <div></div>
  )
}
const IfElse: React.FC = () => {
  return(
    <div></div>
  )
}
const ForLoop: React.FC = () => {
  return(
    <div></div>
  )
}
const WhileLoop: React.FC = () => {
  return(
    <div></div>
  )
}

const ReturnExpression: React.FC<{ name: string }> = (props) => {
  return(
    <div style={huiPizda}>
      <span style={arrowstyle}>↓</span>
      <Accordion>
        <Accordion.Item eventKey={props.name}>
          <Accordion.Header>
            <span style={{ ...piska, color: '#F37300' }}>{`=>`}</span>
            <span>{props.name}</span>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

type FunctionParam = { 
  pos: number, 
  end: number, 
  kind: number, 
  type: { 
    kind: number, 
    pos: number, 
    end: number 
  }, 
  name: { 
    escapedText: string, 
    kind: number, 
    pos: number, 
    end: number 
  } 
}