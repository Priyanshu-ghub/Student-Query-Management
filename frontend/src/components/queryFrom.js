import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function QueryForm() {
  const [query, setQuery] = useState({
    title: '',
    description: '',
    category: 'academic'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will connect to backend later
    console.log('Query submitted:', query);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text" 
          value={query.title}
          onChange={(e) => setQuery({...query, title: e.target.value})}
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={query.description}
          onChange={(e) => setQuery({...query, description: e.target.value})}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit Query
      </Button>
    </Form>
  );
}