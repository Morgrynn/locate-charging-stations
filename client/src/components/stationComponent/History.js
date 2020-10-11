import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import constants from '../../constants.json';

export default function History({ username, password }) {
  const [userHistory, setUserHistory] = useState();

  // View users history
  useEffect(() => {
    try {
      axios({
        url: '/users/history/',
        method: 'get',
        baseURL: `${constants.baseUrl}`,
        params: {
          username: username,
        },
        auth: {
          username: username,
          password: password,
        },
      }).then((res) => {
        console.log(res);
        setUserHistory(res);
      });
    } catch (error) {
      return console.log(error);
    }
  }, []);

  return (
    <div>
      History
      <Link to='/station'>Go back</Link>
    </div>
  );
}
