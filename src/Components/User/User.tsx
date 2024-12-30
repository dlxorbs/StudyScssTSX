// src/components/Users.tsx
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';

interface User {
    id: string;
    name: string;
    age: number;
}


const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const usersCollectionRef = collection(db, 'users');

    // 새로운 사용자 추가
    const addUser = async (name: string, age: number) => {
        await addDoc(usersCollectionRef, { name, age });
    };

    // 모든 사용자 가져오기
    useEffect(() => {
        const getUsers = async () => {
            const querySnapshot = await getDocs(usersCollectionRef);
            const usersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as { name: string; age: number }),
            }));
            setUsers(usersData);
        };
        getUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.age})
                    </li>
                ))}
            </ul>
            <button onClick={() => addUser('John Doe', 30)}>Add User</button>
        </div>
    );
};

export default Users;
