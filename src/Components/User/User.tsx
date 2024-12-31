// src/components/Users.tsx
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDatabase, ref, set, update, onValue } from "firebase/database";

interface User {
    id: string;
    name: string;
    age: number;
    state?: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUserState, setCurrentUserState] = useState<boolean | null>(null);
    const usersCollectionRef = collection(db, "users");
    const [loggedInUserId, setLoggedInUserId] = useState<string | null>('null');
    const realtimeDb = getDatabase();

    const addUser = async (name: string, age: number) => {
        await addDoc(usersCollectionRef, { name, age });
    };

    const writeUserData = (userId: string, name: string, email: string, imageUrl: string) => {
        set(ref(realtimeDb, "users/" + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl,
        });
    };

    const writeUserState = (userId: string, state: boolean) => {
        update(ref(realtimeDb, "users/" + userId), {
            state: state,
        });
        setCurrentUserState(state);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
            const usersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as { name: string; age: number }),
            }));
            setUsers(usersData);
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const userStateRef = ref(realtimeDb, `users/${loggedInUserId}/state`);
        const unsubscribe = onValue(userStateRef, (snapshot) => {
            const state = snapshot.val();
            setCurrentUserState(state);
        });

        return () => unsubscribe();
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
            <p>
                <strong>Current User State:</strong> {currentUserState ? "Focused" : "Not Focused"}
            </p>
            <input
                type="text"
                onFocus={() => writeUserState(`${loggedInUserId}`, true)}
                onBlur={() => writeUserState(`${loggedInUserId}`, false)}
            />
            <button onClick={() => writeUserData("taegyun", "Taegyun", "taegyun@", "example.com/profile.jpg")}>
                Add User
            </button>
        </div>
    );
};

export default Users;
