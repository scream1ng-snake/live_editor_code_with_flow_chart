import { Accordion, Col, Form, Row } from "react-bootstrap";
import ts from "typescript";

/**
 * рендерим код графически
 * @param node 
 */
export function renderCode(node: ts.Node): React.ReactNode {
  switch (node.kind) {
    case ts.SyntaxKind.SourceFile: {
      return (
        <div>{ts.forEachChild(node, renderCode)}</div>
      )
    }
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
              <Accordion.Body>
                {params.map(param => (
                  <Form.Group as={Row}>
                    {/* @ts-ignore */}
                    <Form.Label column sm={4}>{param.name.escapedText}</Form.Label>
                    <Col>
                      {param.type?.kind 
                        ? <Form.Control 
                          placeholder={ts.SyntaxKind[param.type.kind] ?? ''} 
                          disabled 
                          size="sm"
                          />
                        : null
                      }
                    </Col>
                  </Form.Group>
                ))}
                <hr />
                {ts.forEachChild(node, renderCode)}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )
    }
    case ts.SyntaxKind.Block: {
      return(
        <>{ts.forEachChild(node, renderCode)}</>
      )
    }
    default: return null
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