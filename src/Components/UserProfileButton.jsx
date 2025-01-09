import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function UserProfileButton({onClick}) {
    return (
        <div className='' 
            onClick={onClick}
        >
            Check your profile here!
        </div>
    );
}