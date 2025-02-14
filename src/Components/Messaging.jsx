import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Messaging({ currentUserId, receiverId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Fetch messages function
    const fetchMessages = async () => {
        if (!currentUserId || !receiverId) {
            console.error('User IDs are not defined:', { currentUserId, receiverId });
            return;
        }

        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(`sender_id.eq.${currentUserId},receiver_id.eq.${receiverId}`)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            setMessages(data);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [currentUserId, receiverId]); // Add receiverId to dependencies

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        const { error } = await supabase
            .from('messages')
            .insert([
                { sender_id: currentUserId, receiver_id: receiverId, content: newMessage }
            ]);

        if (error) {
            console.error('Error sending message:', error);
        } else {
            setNewMessage('');
            // Fetch messages again to update the list
            await fetchMessages(); // Await the fetchMessages call
        }
    };

    return (
        <div className="messaging">
            <div className="messages-list">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender_id === currentUserId ? 'sent' : 'received'}`}>
                        <p>{message.content}</p>
                        <span>{new Date(message.created_at).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}