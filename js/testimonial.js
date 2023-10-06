const testimonialData = [
    {
        author: "Jack Smith",
        quote: "Memuaskan!",
        image:"https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        rating: 5,
    },
    {
        author: "Samantha",
        quote: "Bisa lebih rapih lagi!",
        image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        rating: 4,
    },
    {
        author: "William Higgins",
        quote: "Pengen coba lagi!",
        image:"https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1889&q=80",
        rating: 5,
    },
];

function allTestimonial() {
    let testimonialHTML = "";

    testimonialData.forEach(function (item) {
        testimonialHTML += `
            <div class="testimonial">
                <img class="profile-testimonial"
                    src="${item.image}"
                    alt="profile"
                />
                <p class="quote">${item.quote}</p>
                <p class="author">- ${item.author}</p>
                <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
            </div>
            `;
    });

    document.getElementById("testimonials").innerHTML = testimonialHTML;
}

allTestimonial();

function filterTestimonial(rating) {
    let testimonialHTML = "";

    const testimonialFiltered = testimonialData.filter(function (item) {
        return item.rating === rating;
    });

    if (testimonialFiltered.length === 0) {
        testimonialHTML += `<h1> Data not found! </h1>`;
    } else {
        testimonialFiltered.forEach(function (item) {
            testimonialHTML += `
                <div class="testimonial">
                    <img class="profile-testimonial"
                        src="${item.image}"
                        alt="profile"
                    />
                    <p class="quote">${item.quote}</p>
                    <p class="author">- ${item.author}</p>
                    <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
                </div>
                `;
        });
    }
    document.getElementById("testimonials").innerHTML = testimonialHTML;
}