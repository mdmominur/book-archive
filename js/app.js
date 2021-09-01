//html elements
const searchInput = document.getElementById('searchInput');
const errorMsg = document.getElementById('errorMsg');
const totalResult = document.getElementById('totalResult');
const allResults = document.getElementById('allResults');



//Spinner toggle
function spinnerToggle(displayValue){
    if(displayValue === 'block'){
        document.getElementById('spinner').classList.remove('d-none');
    }else{
        document.getElementById('spinner').classList.add('d-none');
    }
    
}

//Checking properties undefined or not
const checkProperties = property =>{
    if(property !== undefined && property.length !== 0){
        if(typeof property != 'object'){
            return property;
        }
        return property[0];
    }else{
        return "Not Found";
    }
}

//Clear all data
const clearAll = () => {
    errorMsg.innerText = "";
    totalResult.innerText = "";
    allResults.innerText = "";
}


//Fetching books
document.getElementById('searchBtn').addEventListener('click', ()=>{
    clearAll();
    spinnerToggle('block');
    const searchValue = searchInput.value;
    if(searchValue === ""){
        spinnerToggle('none');
        errorMsg.innerText = "Search field can not be empty";
        return;
    }
    fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
    .then(res => res.json())
    .then(data => displayBooks(data.docs, data.numFound));
    searchInput.value = "";
});

//Displaying books
const displayBooks = (books, totalBooks) => {
    if(books.length === 0){
        spinnerToggle('none');
        errorMsg.innerText = "Sorry No result found";
        return;
    }
    totalResult.innerHTML = `Showing <strong>${books.length}</strong> results of <strong>${totalBooks}</strong>`;
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.classList.add('mb-4');
        const {cover_i, author_name, title, publisher, publish_date} = book;

        //Checking properties available or not
        const author_name_single = checkProperties(author_name);
        const title_single = checkProperties(title);
        const publisher_single = checkProperties(publisher);
        const publish_date_single = checkProperties(publish_date);


        div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h4>${title_single}</h4>
            <h6>Author: <span class="text-success">${author_name_single}</span></h6>
            <h6>Publisher: <span class="text-success">${publisher_single}</span></h6>
            <h6>First Publish date: <span class="text-success">${publish_date_single}</span></h6>
                
            </div>
            </div>
        `
        allResults.appendChild(div);
    });
    spinnerToggle('none');
}