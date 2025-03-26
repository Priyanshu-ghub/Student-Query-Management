import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import QueryList from '../components/QueryList';
import QueryForm from '../components/QueryForm';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      const res = await axios.get('/api/queries');
      setQueries(res.data);
    };
    fetchQueries();
  }, []);

  return (
    <div className="container py-4">
      <h2>Welcome {user?.email}</h2>
      {user?.role === 'student' && <QueryForm />}
      <QueryList queries={queries} />
    </div>
  );
}