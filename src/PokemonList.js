import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonSelection } from './store/pokemonSelection';

function PokemonList() {
    const pokemonSelection = useSelector(state => state.pokemonSelection);
    const dispatch = useDispatch();
    const [arrItems, setItems] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const [show, setShow] = useState(false);
    const [pokemonSelected, setPokemon] = useState(null);
    const [pokemonSelIndex, setSelPokeIndex] = useState(null);
    const [wordSearch, setWordSearch] = useState(null);
    const [statsWeight, setStatsWeight] = useState(0);
    const [statsHeight, setStatsHeight] = useState(0);
    const [statsType, setStatsType] = useState(null);
    const [statsAbilities, setStatsAbilities] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon-species')
            .then(res => res.json())
            .then(res => {
                setItems(res.results);
                setOriginalItems(res.results);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (wordSearch !== null) {
            const filterArr = originalItems.filter(item => item.name.includes(wordSearch));
            setItems(filterArr);
        }
    }, [wordSearch]);

    const handleClick = (e, index) => {
        setSelPokeIndex(index + 1);
        handleShow();
        fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
            .then(res => res.json())
            .then(res => {
                setPokemon(res.name);
                setStatsWeight(res.weight);
                setStatsHeight(res.height);
                setStatsType(res.types[0].type.name);
                setStatsAbilities(res.abilities[0].ability.name);
                dispatch(setPokemonSelection(res.name));
            })
            .catch(err => console.log(err));
    }

    const getWord = (e) => {
        setWordSearch(e.target.value);
        const filterArr = arrItems.filter(item => item.name.includes(e.target.value));
        setItems(filterArr);
    }

    function goToPokemon(index) {
        setSelPokeIndex(index);
        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
            .then(res => res.json())
            .then(res => {
                setPokemon(res.name);
                setStatsWeight(res.weight);
                setStatsHeight(res.height);
                setStatsType(res.types[0].type.name);
                setStatsAbilities(res.abilities[0].ability.name);
                dispatch(setPokemonSelection(res.name));
            })
            .catch(err => console.log(err));
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
                    {Array.isArray(arrItems) &&
                        arrItems.map((item, index) => (
                            <Col className="d-flex">
                                <Card
                                    className="flex-fill"
                                    style={{ width: '10rem' }}
                                    onClick={(e) => handleClick(e, index)}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                        style={{ backgroundColor: 'lightgray' }} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 25 }}>{item.name.charAt(0).toUpperCase() +
                                            item.name.slice(1)}
                                        </Card.Title>
                                        <Card.Text>#00{index + 1}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                        )}
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} class="modal-details">
                <Modal.Header closeButton>
                    <Button variant="secondary" onClick={() => pokemonSelIndex > 1 && goToPokemon(pokemonSelIndex - 1)}>
                        #00{pokemonSelIndex > 1 ? pokemonSelIndex - 1 : 1}
                    </Button>
                    <Modal.Title style={{ alignContent: 'center', fontSize: 32, marginLeft: 375 }}>{pokemonSelected &&
                        pokemonSelected.charAt(0).toUpperCase() + pokemonSelected.slice(1) + " #00" + pokemonSelIndex}
                    </Modal.Title>
                    <Button variant="secondary" onClick={() => pokemonSelIndex < 20 && goToPokemon(pokemonSelIndex + 1)}
                        style={{ marginLeft: 387 }}>
                        #00{pokemonSelIndex < 20 ? pokemonSelIndex + 1 : 20}
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