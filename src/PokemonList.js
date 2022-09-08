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
// import ModalPokemon from './ModalPokemon';
import Form from 'react-bootstrap/Form';
// import { useState, useEffect } from 'react';

function PokemonList() {
    const [index, setIndex] = useState(0);
    const [arrItems, setItems] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }
    const [show, setShow] = useState(false);
    const [pokemonSelected, setPokemon] = useState(null);
    const [pokemonSelIndex, setSelPokeIndex] = useState(null);
    const [wordSearch, setWordSearch] = useState(null);
    const [statsWeight, setStatsWeight] = useState(0);
    const [statsHeight, setStatsHeight] = useState(0);
    const [statsType, setStatsType] = useState(null);
    const [statsAbilities, setStatsAbilities] = useState(null);

    let pokeWeight = 0;
    let abilities = "";

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // let testItems = ["1", "2", "3"];

    useEffect(() => {
        let items = [];
        fetch('https://pokeapi.co/api/v2/pokemon-species')
            .then(res => res.json())
            .then(res => {
                setItems(res.results);
                setOriginalItems(res.results);
                console.log(res);
                // testItems.push(res);
                console.log(arrItems);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (wordSearch !== null) {
            console.log(arrItems);
            const filterArr = originalItems.filter(item => item.name.includes(wordSearch));
            console.log(filterArr);
            setItems(filterArr);
            console.log(arrItems);
        }
    }, [wordSearch]);

    const handleClick = (e, index) => {
        console.log(e.currentTarget.textContent);
        setPokemon(e.currentTarget.textContent);
        setSelPokeIndex(index + 1);
        console.log(pokemonSelIndex);
        handleShow();
        fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
            .then(res => res.json())
            .then(res => {
                // setItems(res.results);
                // setOriginalItems(res.results);
                const data = res.weight.toString();
                setStatsWeight(res.weight);
                setStatsHeight(res.height);
                setStatsType(res.types[0].type.name);
                setStatsAbilities(res.abilities[0].ability.name);
                abilities = res.abilities[0].ability.name;
                console.log(statsAbilities);
                // setStats(res);
                pokeWeight = res.weight;
                // console.log(stats);
                // testItems.push(res);
                // console.log(arrItems);
            })
            .catch(err => console.log(err));
    }

    const getWord = (e) => {
        console.log(e.target.value);
        setWordSearch(e.target.value);
        const filterArr = arrItems.filter(item => item.name.includes(e.target.value));
        console.log(filterArr);
        setItems(filterArr);
    }

    function getPokeWeight() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
            .then(res => res.json())
            .then(res => {
                // setItems(res.results);
                // setOriginalItems(res.results);
                // setSelPokeStats(res.abilities);
                pokeWeight = res.weight;
                console.log(pokeWeight);
                // testItems.push(res);
                // console.log(arrItems);
            })
            .catch(err => console.log(err));
        return pokeWeight;
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
                    <Button variant="secondary" onClick={handleClose}
                        // handleClick(pokemonSelIndex - 1)
                    >
                        #00{pokemonSelIndex - 1}
                    </Button>
                    <Modal.Title style={{ alignContent: 'center', fontSize: 32, marginLeft: 375 }}>{pokemonSelected}</Modal.Title>
                    <Button variant="secondary" onClick={handleClose}
                        // handleClick(pokemonSelIndex + 1)
                        // class="right-button" 
                        style={{ marginLeft: 387 }}>
                        #00{pokemonSelIndex + 1}
                    </Button>
                </Modal.Header>
                <Modal.Body style={{ alignContent: 'center', margin: 'auto' }}>
                    <Container style={{ width: 1000 }}>
                        <Row>
                            <Col><img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonSelIndex}.png`}
                                style={{ width: 300 }}
                            /></Col>
                            <Col>
                                <Row style={{ marginBottom: 50, marginTop: 93 }}>
                                    <Col>Height: {statsHeight}</Col>
                                    <Col>Type: {statsType}</Col>
                                </Row>
                                <Row>
                                    <Col>Weight: {statsWeight}</Col>
                                    <Col>Abilities: {statsAbilities}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
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