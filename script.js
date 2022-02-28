const searchBtn = document.getElementById('search-btn');
const phoneList = document.getElementById('phone');
const phoneDetailsContent = document.querySelector('.phone-details-content');
const detailsCloseBtn = document.getElementById('details-close-btn');

// event listeners
searchBtn.addEventListener('click', getPhoneList);
phoneList.addEventListener('click', getPhoneDetails);
detailsCloseBtn.addEventListener('click', () => {
    phoneDetailsContent.parentElement.classList.remove('showdetails');
});


// get phone list that matches with the ingredients
function getPhoneList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.phones) {
                data.phones.forEach(phone => {
                    html += `
                    <div class = "phone-item" data-id = "${phone.idPhone}">
                        <div class = "phone-img">
                            <img src = "${phone.strPhoneThumb}" alt = "mobile">
                        </div>
                        <div class = "phone-name">
                            <h3>${phone.strPhone}</h3>
                            <a href = "#" class = "brand-btn">Get brand</a>
                        </div>
                    </div>
                `;
                });
                phoneList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any phone!";
                phoneList.classList.add('notFound');
            }

            phoneList.innerHTML = html;
        });
}


// get brand of the phone
function getPhoneBrand(e) {
    e.preventDefault();
    if (e.target.classList.contains('brand-btn')) {
        let phoneItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${phoneItem}`)
            .then(response => response.json())
            .then(data => phoneBrandModal(data.phones));
    }
}

// create a modal
function phoneRecipeModal(phone) {
    console.log(phone);
    phone = phone[0];
    let html = `
        <h2 class = "recipe-title">${phone.strPhone}</h2>
        <p class = "recipe-category">${phone.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${phone.strInstructions}</p>
        </div>
        <div class = "recipe-phone-img">
            <img src = "${phone.strPhoneThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${phone.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    phoneDetailsContent.innerHTML = html;
    phoneDetailsContent.parentElement.classList.add('showRecipe');
}