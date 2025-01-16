import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function UserSearch({ onUserSelect, onBack }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const { data: usersData, error } = await supabase
        .from('user_profiles')
        .select('id, first_name, last_name');

      if (error) {
        console.error('Błąd przy pobieraniu użytkowników:', error);
        setUsers([]);
      } else {
        setUsers(usersData);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <button onClick={onBack} className="text-green-500 mb-4">Powrót</button>
      <input
        type="text"
        placeholder="Wyszukaj użytkownika..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      {isLoading ? (
        <p>Ładowanie użytkowników...</p>
      ) : (
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => onUserSelect(user.id)}
                className="text-blue-500 underline"
              >
                {user.first_name} {user.last_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
