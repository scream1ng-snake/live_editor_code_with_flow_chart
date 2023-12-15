import { Accordion, Col, Form, Row } from "react-bootstrap";
import ts from "typescript";



export function renderSourceFile(sourceFile: ts.SourceFile): React.ReactNode {
  function forEachChild(node: ts.Node) {
    const nodes: ts.Node[] = [];
    node.forEachChild(child => {
      nodes.push(child);
      return undefined;
    });
    return nodes;
  }

  return renderNode(sourceFile, forEachChild);
}



/**
 * рендерим код графически
 * @param node 
 */
function renderNode(node: ts.Node, getChildren: (node: ts.Node) => (ts.Node[])): React.ReactNode {
  const children = getChildren(node);
  const kindName = ts.SyntaxKind[node.kind];

  switch (node.kind) {
    case ts.SyntaxKind.SourceFile: 
      return <>{children.map(n => renderNode(n, getChildren))}</>
    
    case ts.SyntaxKind.FunctionDeclaration: {
      const functionDecloration = node as ts.FunctionDeclaration;
      const params = functionDecloration.parameters;

      const name = functionDecloration.name?.escapedText ?? 'no name';

      return (
        <div style={huiPizda}>
          <Accordion className='bordered'>
            <Accordion.Item eventKey={name}>
              <Accordion.Header>
                <span style={piska}>{`ƒ`}</span>
                <span>{name}</span>
              </Accordion.Header>
              <Accordion.Body style={{ marginTop:'1rem' }}>
                {params && params.length
                  ? <>
                    <p>input params</p>
                    {params.map((param, index) => (
                      <Form.Group as={Row} key={index}>
                        {/* @ts-ignore */}
                        <Form.Label column sm={4}>{param.name.escapedText}</Form.Label>
                        <Col>
                        <Form.Control 
                          placeholder={param.type?.kind
                            ? ts.SyntaxKind[param.type.kind]
                            : 'any'
                          } 
                          disabled 
                          size="sm"
                        />
                        </Col>
                      </Form.Group>
                    ))}
                    <hr />
                  </>
                  : null
                }
                {children.map(n => renderNode(n, getChildren))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )
    }
    case ts.SyntaxKind.VariableStatement: {
      const varStatement = node as ts.VariableStatement;
      return(
        <div style={huiPizda}>
          <span style={arrowstyle}>↓</span>
          <Accordion>
            <Accordion.Item eventKey={'Обьявления переменных'}>
              <Accordion.Header>
                <span style={{ ...piska, color: '#F37300' }}>var</span>
                <span>{'обьявления переменных'}</span>
              </Accordion.Header>
              <Accordion.Body>
                {varStatement.declarationList.declarations.map(function(decloration, index) {
                  // @ts-ignore
                  const name = decloration.name.escapedText
                  const type = decloration.type?.kind
                    ? ts.SyntaxKind[decloration.type.kind]
                    : 'any'
                  //@ts-ignore
                  const value = decloration.initializer?.text
                  return(
                    <Form.Group as={Row} key={index}>
                      {/* @ts-ignore */}
                      <Form.Label column sm={4}>{name}</Form.Label>
                      <Col>
                        <Form.Control 
                          placeholder={type} 
                          disabled 
                          size="sm"
                        />
                      </Col>
                      <Col>
                        <Form.Control 
                          placeholder={value} 
                          disabled 
                          size="sm"
                        />
                      </Col>
                    </Form.Group>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )
    }
    default: 
      return <>{children.map(n => renderNode(n, getChildren))}</>
  }
}


const huiPizda: React.CSSProperties = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'flex-start', 
  flexDirection: 'column', 
  marginTop: '1.3rem',
  position: 'relative'
}

const piska: React.CSSProperties = { 
  color: '#EB3223', 
  fontSize: '40px', 
  lineHeight: '10px', 
  marginRight: '1rem'
}

const arrowstyle: React.CSSProperties = {
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

const FunctionDecloration: React.FC<{ name: string, children?: React.ReactNode }> = (props) => {
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