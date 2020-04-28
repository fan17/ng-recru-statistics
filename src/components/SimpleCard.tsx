import React from "react";
import {Card} from 'react-bootstrap';

type SimpleCardProps = {
    title: string | number,
    text: string,
};

const SimpleCard = ({title, text}: SimpleCardProps) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
        </Card.Body>
    </Card>
);

export default SimpleCard;

