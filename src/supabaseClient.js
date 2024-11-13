import { createClient } from '@supabase/supabase-js';

// Wstaw swoje dane z Supabase
const supabaseUrl = 'https://sgjwqdbghcsgwtkbpmxt.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnandxZGJnaGNzZ3d0a2JwbXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNDM5ODQsImV4cCI6MjA0NjgxOTk4NH0.Vo7mEJbZYa9tj-AHI5bTqAT1ndbBMHqIbdabQjwMvwM";

// Sprawdzenie, czy klucz jest dostępny
if (!supabaseKey) {
    throw new Error("Supabase Key is missing!");
}

// Tworzenie instancji klienta Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

// Funkcja do przesyłania zdjęcia do zasobnika
export async function uploadTrainerPhoto(file, trainerId) {
    const fileName = `${trainerId}-${Date.now()}`;
    const { data, error } = await supabase.storage
        .from('trainer-photos')
        .upload(fileName, file);

    if (error) {
        console.error('Błąd przy przesyłaniu pliku:', error);
        return null;
    }

    const { publicURL, error: urlError } = supabase.storage
        .from('trainer-photos')
        .getPublicUrl(fileName);

    if (urlError) {
        console.error('Błąd przy uzyskiwaniu URL:', urlError);
        return null;
    }

    return publicURL;
}

// Funkcja do aktualizacji URL zdjęcia profilowego w tabeli trenerów
export async function updateTrainerPhotoUrl(trainerId, photoUrl) {
    const { error } = await supabase
        .from('trainers')
        .update({ profile_image_url: photoUrl })
        .eq('id', trainerId);

    if (error) {
        console.error('Błąd przy aktualizowaniu URL zdjęcia:', error);
    } else {
        console.log('URL zdjęcia zaktualizowany pomyślnie.');
    }
}
