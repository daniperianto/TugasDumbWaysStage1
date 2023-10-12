const testimonial = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.npoint.io/5a0d19a2203963191462", true);

    xhr.onload = function () {
        if(xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
        } else {
            reject("Error Loading Data");
        }
    }

    xhr.onerror = function () {
        reject("Network error");
    }

    xhr.send();
});



async function allTestimonial() {
    const testimonialData = await testimonial;
    let testimonialHTML = "";

    testimonialData.forEach(function (item) {
        testimonialHTML += `
            <div class="w-25 mx-3 mb-4 p-3 bg-white shadow-sm">
                <img class="profile-testimonial"
                    src="${item.image}"
                    alt="profile"/>
                <p class="fst-italic my-3">"${item.quote}"</p>
                <p class="text-end fw-bold">- ${item.author}</p>
                <p class="text-end fw-bold">${item.rating} <i class="fa-solid fa-star"></i></p>
            </div>
            `;
    });

    document.getElementById("testimonials").innerHTML = testimonialHTML;
}

allTestimonial();

async function filterTestimonial(rating) {
    const testimonialData = await testimonial;
    let testimonialHTML = "";

    const testimonialFiltered = testimonialData.filter(function (item) {
        return item.rating === rating;
    });

    if (testimonialFiltered.length === 0) {
        testimonialHTML += `<h1> Data not found! </h1>`;
    } else {
        testimonialFiltered.forEach(function (item) {
            testimonialHTML += `
                <div class="w-25 mx-3 mb-4 p-3 bg-white shadow-sm">
                    <img class="profile-testimonial"
                        src="${item.image}"
                        alt="profile"/>
                    <p class="fst-italic my-3">"${item.quote}"</p>
                    <p class="text-end fw-bold">- ${item.author}</p>
                    <p class="text-end fw-bold">${item.rating} <i class="fa-solid fa-star"></i></p>
                </div>
                `;
        });
    }
    document.getElementById("testimonials").innerHTML = testimonialHTML;
}