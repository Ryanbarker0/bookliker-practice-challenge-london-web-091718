const dbURL = `http://localhost:3000/books`

const getBooks = async () => {
    const response = await fetch(dbURL)
    return response.json()
}

const getBook = id =>
    fetch(`${dbURL}/${id}`)
        .then(resp => resp.json())

const updateBook = book =>
    fetch(`${dbURL}/${book.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(book)
    }).then(resp => resp.json())