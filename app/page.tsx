'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';

const limit = 3;
const userCount = 10;

type User = {
  id: number;
  name: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [start, setStart] = useState<number>(0);

  const prevClickHandler = () => {
    setStart(start - limit);
  };

  const nextClickHandler = () => {
    setStart(start + limit);
  };

  useEffect(() => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users?_limit=${limit}&_start=${start}`;

    const getUsers = async () => {
      try {
        const response: Response = await fetch(apiUrl);
        const users: User[] = await response.json();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [start]);

  if (!users.length) return <div className={styles.page}>список пуст</div>;

  return (
    <div className={styles.page}>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.name}
          </li>
        ))}
      </ul>
      <div className={styles.buttons}>
        <button onClick={prevClickHandler} disabled={start <= 0}>
          prev
        </button>
        <button onClick={nextClickHandler} disabled={start + limit >= userCount}>
          next
        </button>
      </div>
    </div>
  );
}
