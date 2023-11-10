import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import './App.css';
import db from './firebase';
import products from './products.json';
import { Badge, Button, Col, Container, ListGroup, ListGroupItem, Navbar, Row } from "react-bootstrap";

const ORDER_PRIORITY = {
  critical: 0,
  normal: 1,
}

function App() {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState();

  useEffect(() => {
    return onSnapshot(query(collection(db, 'orders'), orderBy('priority'), orderBy('createdAt')), (querySnapshot) => {
      setOrders(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })))
    })
  }, [])

  async function handleSimulateNewOrders() {
    const now = new Date();

    for (let i = 0; i < 3; i++) {
      addDoc(collection(db, 'orders'), {
        products: products.sort(() => Math.random() - Math.random()).slice(0, 5),
        priority: i === 0 ? ORDER_PRIORITY.critical : ORDER_PRIORITY.normal,
        createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - i, now.getMinutes())
      })
    }
  }

  function handleOrderClick(orderId) {
    if (orderId === activeOrder?.id)
      setActiveOrder(null)
    else
      setActiveOrder(orders.find(order => order.id === orderId))
  }

  return (
    <>
      <header>
        <Container>
          <Navbar className="justify-content-between">
            <Navbar.Brand href="/">
              <img src="./zipline-logo.png" width="100" alt="Zipline logo" />
            </Navbar.Brand>
            <Button onClick={handleSimulateNewOrders}>Simulate new orders</Button>
          </Navbar>
        </Container>
      </header>
      <main>
        <Container>
          <Row>
            <Col>
              {orders.length > 0 && <>Active orders: {orders.length}</>}
              <ListGroup>
                {orders.map(order => 
                  <ListGroupItem key={order.id} href="#" action active={activeOrder?.id === order.id} onClick={() => handleOrderClick(order.id)}>
                    {order.priority === ORDER_PRIORITY.critical && <Badge bg="danger">Critical</Badge>}
                    <div>{order.id}</div>
                    <div style={{ fontSize: '0.8em' }}>{order.createdAt.toDate().toString()}</div>
                  </ListGroupItem>)
                }
              </ListGroup>
            </Col>
            {activeOrder &&
              <Col>
                Products:
                <ul>
                  {activeOrder.products.map((product) => (
                    <li key={product.product_id}>{product.product_name}</li>
                  ))}
                </ul>
              </Col>
            }            
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
