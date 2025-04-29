import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const sampleData = [
  { word: 'Corazón', img: '/src/assets/corazon.png' },
  { word: 'Carro', img: '/src/assets/carro.png' },
  { word: 'Cascadas', img: '/src/assets/cascadas.png' },
  { word: 'Colores', img: '/src/assets/Colores.png' },
  { word: 'Casa', img: '/src/assets/casa.png' },
];

export default function LeccionMatch() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [feedback, setFeedback] = useState('');

  const handleWordClick = (wordObj) => {
    setSelectedWord(wordObj);
    setFeedback('');
  };

  const handleImgClick = (imgObj) => {
    if (!selectedWord || correctPairs.some((pair) => pair.word === selectedWord.word)) return;

    if (imgObj.word === selectedWord.word) {
      setCorrectPairs([...correctPairs, imgObj]);
      setFeedback('¡Correcto! 🎉');
    } else {
      setFeedback('Intenta de nuevo ❌');
    }

    setSelectedWord(null);
  };

  const isCompleted = correctPairs.length === sampleData.length;

  return (
    <Container className="py-5">
      <h3 className="text-center mb-4">Unir la palabra con la imagen correcta</h3>

      <Row>
        <Col md={4}>
          <Card className="p-3 mb-3">
            {sampleData.map((w) => (
              <Button
                key={w.word}
                variant={
                  correctPairs.some((p) => p.word === w.word)
                    ? 'success'
                    : selectedWord?.word === w.word
                    ? 'primary'
                    : 'outline-primary'
                }
                className="w-100 mb-2 text-start"
                onClick={() => handleWordClick(w)}
                disabled={correctPairs.some((p) => p.word === w.word)}
              >
                {w.word}
              </Button>
            ))}
          </Card>
        </Col>

        <Col md={8}>
          <Row>
            {sampleData.map((w) => (
              <Col xs={6} md={4} className="mb-4" key={w.word}>
                <Card
                  onClick={() => handleImgClick(w)}
                  className={`cursor-pointer ${
                    correctPairs.some((p) => p.word === w.word) ? 'border-success border-3' : ''
                  }`}
                >
                  <Card.Img
                    variant="top"
                    src={w.img}
                    style={{ height: '140px', objectFit: 'contain' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {feedback && (
        <h5 className="text-center mt-4">
          <Alert variant={feedback.includes('Correcto') ? 'success' : 'danger'}>
            {feedback}
          </Alert>
        </h5>
      )}

      {isCompleted && (
        <Alert variant="success" className="text-center mt-4 fs-5 fw-bold">
          🎉 ¡Felicidades, terminaste esta lección!
        </Alert>
      )}
    </Container>
  );
}
