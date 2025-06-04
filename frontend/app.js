const API_URL = "http://localhost:8000/api";

let accessToken = null;

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password: password })
        });

        if (!res.ok) throw new Error('Login failed');

        const data = await res.json();
        accessToken = data.access;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('book-section').style.display = 'block';
        fetchBooks();
    } catch (err) {
        alert(err.message);
    }
}

async function fetchBooks() {
    try {
        const res = await fetch(`${API_URL}/books/`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!res.ok) throw new Error('Failed to fetch books');

        const books = await res.json();
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = '';

        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            booksList.appendChild(li);
        });
    } catch (err) {
        alert(err.message);
    }
}

async function addBook() {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;

    try {
        const res = await fetch(`${API_URL}/books/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ title, author })
        });

        if (!res.ok) throw new Error('Failed to add book');

        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        fetchBooks();
    } catch (err) {
        alert(err.message);
    }
}
