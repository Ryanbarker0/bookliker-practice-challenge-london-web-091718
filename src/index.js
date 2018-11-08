const listContainer = document.getElementById('list-panel')
const list = document.getElementById('list')
const showPanel = document.getElementById('show-panel')


document.addEventListener("DOMContentLoaded", function () {});
const currentUser = {
    "id": 1,
    "username": "pouros"
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
    userElement.id = `${user.id}`
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
    <button id='remove-btn'>Remove Support</button>
    `
    showPanel.appendChild(bookCard)
    appendUsersToList(book.users)
    supportBookButton(book)
    disableBtnIfCurrentUserExists()
    removeBookButton(book)
}

const updateUsersInDb = book => {
    book.users.push(currentUser)
    updateBook(book)
}

const disableBtnIfCurrentUserExists = () => {
    const usersList = document.getElementById('users-list')
    const supportBtn = document.getElementById('support-btn')
    const removeBtn = document.getElementById('remove-btn')
    usersList.innerHTML.includes(currentUser.username) ? (supportBtn.disabled = true, removeBtn.disabled = false) : (supportBtn.disabled = false, removeBtn.disabled = true)
}

const getUserList = book =>
    book.users.map(element => element.username)

const addNewUserToList = (userList, book, button) => {
    userList.includes(currentUser.username) ? (alert('You are already supporting this book!')) : (updateUsersInDb(book), appendNewUserToList(currentUser), (button.disabled = true))
}

const removeUserFromList = book => {
    const userList = document.getElementById('users-list')
    const user = document.getElementById(`${currentUser.id}`)
    book.users.splice(book.users.findIndex(element => element.username === currentUser.username), 1)
    userList.removeChild(user)
    updateBook(book)
}

const supportBookButton = book => {
    const supportBtn = document.getElementById('support-btn')
    supportBtn.addEventListener('click', () => {
        const currentLocalBook = state.books.find(element => element === book)
        const userList = getUserList(currentLocalBook)
        addNewUserToList(userList, currentLocalBook, supportBtn)
    })
}

const removeBookButton = book => {
    const removeBtn = document.getElementById('remove-btn')
    removeBtn.addEventListener('click', () => {
        const currentLocalBook = state.books.find(element => element === book)
        removeUserFromList(currentLocalBook)
    })
}

const renderBooks = books => {
    books.forEach(book => renderBook(book))
}

getBooks()
    .then(books => {
        state.books = books
        renderBooks(books)
    })