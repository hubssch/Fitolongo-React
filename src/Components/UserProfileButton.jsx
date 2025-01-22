import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function UserProfileButton({onClick}) {
    return (
        <button className='border-solid border-2 border-green-500 rounded p-2 dark:text-white' 
            onClick={onClick}
        >   
            Check your profile here!
        </button>
    );
}