// components/FilterSelectionModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const FilterSelectionModal = ({ show, onHide, onGenerateReport }) => {
    const [userId, setUserId] = useState('');
    const [month, setMonth] = useState('');

    const handleGenerateReport = () => {
        console.log("Generating report with userId:", userId, "and month:", month);
        onGenerateReport(userId, month);
        onHide(); // Cerrar el modal después de generar el reporte
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Seleccionar Filtros</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="userId">
                                <Form.Label>Usuario ID:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                >
                                    <option value="all">Todos los usuarios</option>
                                    <option value="1">Usuario 1</option>
                                    <option value="2">Usuario 2</option>
                                    {/* Agregar más opciones según tus usuarios */}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="month">
                                <Form.Label>Mes:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    placeholder="Ingrese el mes (YYYY-MM)"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleGenerateReport}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterSelectionModal;