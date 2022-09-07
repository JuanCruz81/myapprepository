import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { DOM_KEY_LOCATION } from '@testing-library/user-event/dist/keyboard/types';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalPokemon from './ModalPokemon';
import Form from 'react-bootstrap/Form';

function PokemonList() {
    const [index, setIndex] = useState(0);
    const [arrItems, setItems] = useState([]);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }
    const [show, setShow] = useState(false);
    const [pokemonSelected, setPokemon] = useState(null);
    const [wordSearch, setWordSearch] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // let testItems = ["1", "2", "3"];

    useEffect(() => {
        let items = [];
        fetch('https://pokeapi.co/api/v2/pokemon-species')
            .then(res => res.json())
            .then(res => {
                setItems(res.results);
                console.log(res);
                // testItems.push(res);
                console.log(arrItems);
            })
            .catch(err => console.log(err));
    }, []);

    const handleClick = (e, index) => {
        console.log(e.currentTarget.textContent);
        setPokemon(e.currentTarget.textContent)
        console.log(index);
        handleShow();
    }

    const getWord = (e) => {
        console.log(e.target.value);
        setWordSearch(e.target.value);
    }

    return (
        <>
            <Form.Control
                type="text"
                class="input-search" 
                placeholder="Buscar Pokemon"
                style={{ width: 350, marginLeft: 1100, marginBottom: 12, marginTop: 12 }}
                onChange={(e) => getWord(e)}
            />
            <Container>
                <Row lg={4} style={{ height: 10 }} class="row-height">
                    {/* activeIndex={index}
                 onSelect={handleSelect} */}
                    {Array.isArray(arrItems) &&
                        arrItems.map((item, index) => (
                            // <Accordion.Item
                            //     key={index}
                            // >
                            //     <Accordion.Header>
                            <Col
                                className="d-flex"
                            // style={{
                            //     // border: '1px solid black',
                            //     paddingLeft: 4,
                            //     paddingRight: 4
                            // }}
                            >
                                <Card
                                    className="flex-fill"
                                    style={{
                                        width: '10rem',
                                    }}
                                    onClick={(e) => handleClick(e, index)}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                        style={{ backgroundColor: 'lightgray' }} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 25 }}>{item.name.charAt(0).toUpperCase() +
                                            item.name.slice(1)}</Card.Title>
                                        <Card.Text>#00{index + 1}</Card.Text>
                                    </Card.Body>
                                    {/* <img
                                className='carousel-image'
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                                alt="first"
                                style={{
                                    display: 'unset',
                                    height: 130
                                }} /> */}
                                    {/* <h3>{item.name}</h3> */}
                                </Card>
                            </Col>
                            //     </Accordion.Header>
                            //     <Accordion.Body>
                            //         {/* <h3>{item}</h3> */}
                            //         {item.name}
                            //     </Accordion.Body>
                            // </Accordion.Item>
                        )
                        )}
                    {/* <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>title</Card.Title>
                            <Card.Text>text</Card.Text>
                        </Card.Body>
                    </Card> */}
                    {/* </Accordion> */}
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} class="modal-details">
                <Modal.Header closeButton>
                    <Button variant="secondary"
                        onClick={handleClose}
                    >
                        go back
                    </Button>
                    <Modal.Title style={{ alignContent: 'center', fontSize: 32, marginLeft: 375 }}>{pokemonSelected}</Modal.Title>
                    <Button variant="secondary" onClick={handleClose}
                        // class="right-button" 
                        style={{ marginLeft: 387 }}>
                        go further
                    </Button>
                </Modal.Header>
                <Modal.Body style={{ alignContent: 'center', margin: 'auto' }}>
                    <div className='form-row'>
                        <Card
                            className="flex-fill"
                            style={{
                                width: '10rem',
                                marginLeft: -500
                            }}
                            // onClick={(e) => handleClick(e)}
                        >
                            <Card.Img
                                variant="top"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`}
                                // style={{ backgroundColor: 'lightgray' }} 
                                />
                            <Card.Body>
                                <Card.Title style={{ fontSize: 25 }}>
                                    {/* {item.name.charAt(0).toUpperCase() +
                                    item.name.slice(1)} */}
                                    {/* title */}
                                </Card.Title>
                                <Card.Text>
                                    {/* #001 */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='form-row'>
                        <Card
                            className="flex-fill"
                            style={{
                                width: '10rem',
                                marginLeft: -500
                            }}
                            // onClick={(e) => handleClick(e)}
                        >
                            {/* <Card.Img
                                variant="top"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`}
                                // style={{ backgroundColor: 'lightgray' }} 
                                /> */}
                            <Card.Body>
                                <Card.Title style={{ fontSize: 25 }}>
                                    {/* {item.name.charAt(0).toUpperCase() +
                                    item.name.slice(1)} */}
                                    title
                                </Card.Title>
                                <Card.Text>
                                    {/* #001 */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ alignContent: 'center', margin: 'auto' }}>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Volver
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PokemonList;