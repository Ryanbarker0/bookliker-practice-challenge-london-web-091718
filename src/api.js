const getBooks = async () => {
    const response = await fetch("http://localhost:3000/books")
    return response.json()
}

const getBook = id =>
    fetch(`http://localhost:3000/books/${id}`)
        .then(resp => resp.json())

const updateBook = book =>
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(book)
    }).then(resp => resp.json())