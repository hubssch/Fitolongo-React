import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://sgjwqdbghcsgwtkbpmxt.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnandxZGJnaGNzZ3d0a2JwbXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNDM5ODQsImV4cCI6MjA0NjgxOTk4NH0.Vo7mEJbZYa9tj-AHI5bTqAT1ndbBMHqIbdabQjwMvwM")

export default function RegisterWindow() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" showLinks={false} />)
    }
    else {
        return (<div>Logged in!</div>)
    }
}