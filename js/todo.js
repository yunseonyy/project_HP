const host = "http://127.0.0.1:8000";
const guestbooksContainer = document.querySelector('.guestbooks-container');

function getGuestbooks() {
    console.log('Fetching guestbooks...');
    axios.get(`${host}/guestbook`)
        .then(response => {
            console.log('Guestbooks fetched:', response.data);
            renderGuestbooks(response.data);
        })
        .catch(error => {
            console.error('Error fetching guestbooks:', error);
        });
}

function renderGuestbooks(guestbooks) {
    guestbooksContainer.innerHTML = ''; // 초기화
    guestbooks.forEach(guestbook => {
        renderGuestbook(guestbook);
    });
}

function renderGuestbook(guestbook) {
    const guestbookDiv = document.createElement('div');
    guestbookDiv.classList.add('guestbook-item');
    guestbookDiv.innerHTML = `
        <strong>${guestbook.author}</strong>
        <p>${guestbook.content}</p>
        <small>${new Date(guestbook.created_at).toLocaleString()}</small>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', function () {
        deleteGuestbook(guestbook.id);
    });

    guestbookDiv.appendChild(deleteBtn);
    guestbooksContainer.appendChild(guestbookDiv);
}

document.addEventListener('DOMContentLoaded', function () {
    getGuestbooks();
});

const authorInput = document.querySelector('.guestbook-author');
const contentInput = document.querySelector('.guestbook-content');
const addGuestbookBtn = document.querySelector('.add-guestbook-btn');

addGuestbookBtn.addEventListener('click', function () {
    addGuestbook();
});

function addGuestbook() {
    const author = authorInput.value.trim();
    const content = contentInput.value.trim();
    if (author === '' || content === '') return;

    const guestbookData = {
        author: author,
        content: content
    };

    console.log('Adding guestbook entry:', guestbookData);
    axios.post(`${host}/guestbook`, guestbookData)
        .then(response => {
            console.log('Guestbook entry added:', response.data);
            authorInput.value = '';
            contentInput.value = '';
            renderGuestbook(response.data);
        })
        .catch(error => {
            console.error('Error adding guestbook:', error);
        });
}

function deleteGuestbook(id) {
    console.log('Deleting guestbook entry with id:', id);
    axios.delete(`${host}/guestbook/${id}`)
        .then(response => {
            console.log('Guestbook entry deleted:', response.data);
            getGuestbooks();
        })
        .catch(error => {
            console.error('Error deleting guestbook:', error);
        });
}
