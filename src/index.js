
const listContainer = document.getElementById('list-panel')
const list = document.getElementById('list')
const showPanel = document.getElementById('show-panel')
const getBooks = await (await fetch("http://localhost:3000/books")).json();

document.addEventListener("DOMContentLoaded", function() {});
const currentUser = {
    "id": 1,
    "username":"pouros"
}

const state = {
    books: []
}

const renderBook = book => {
    const listElement = document.createElement('li')
    listElement.innerHTML = `
        ${book.title}
    `
    list.appendChild(listElement)
    showBookInfo(listElement, book)
}

const showBookInfo = (element, book) => {
    element.addEventListener('click', () => {
    showPanel.innerHTML = ''
    renderShowPanel(book)
})
}

const appendNewUserToList = user => {
    const usersList = document.getElementById('users-list')
    const userElement = document.createElement('li')
    userElement.innerText = `${user.username}`
    usersList.appendChild(userElement)
    }

const appendUsersToList = users => {
      users.forEach(user => appendNewUserToList(user))
}

const renderShowPanel = book => {
    const bookCard = document.createElement('div')
    bookCard.innerHTML = `
    <img src='${book.img_url}' />
    <p>${book.description}</p>
    <h4>Book Supporters:</h4>
    <ul id='users-list'>
    </ul>
    <button id='support-btn'>Support This Book</button>
    `
    showPanel.appendChild(bookCard)
    appendUsersToList(book.users)
    supportBookButton(book)
}

const updateUsersInDb = book => {
    book.users.push(currentUser)
    updateBook(book)
}

const getUserList = book => 
    book.users.map(element => element.username)

const addNewUserToList = (userList, book) => {
    userList.includes(currentUser.username) ? alert('You are already supporting this book!') : (updateUsersInDb(book), appendNewUserToList(currentUser))
}

const supportBookButton = book => {
    const supportBtn = document.getElementById('support-btn')
    supportBtn.addEventListener('click', () => {
        const currentLocalBook = state.books.find(element => element === book)
        const userList = getUserList(currentLocalBook)
        addNewUserToList(userList, currentLocalBook)
            })
        }

const renderBooks = books => {
    books.forEach(book => renderBook(book))
}

getBooks
    .then(books => {
        state.books = books
        renderBooks(books)
    })



    