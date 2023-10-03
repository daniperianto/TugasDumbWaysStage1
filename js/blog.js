let dataBlog = [];

function addBlog(event) {
    event.preventDefault();

    const projectName = document.getElementById("input-project-name").value;
    const projectStartDate = document.getElementById("input-start-date").value;
    const projectEndDate = document.getElementById("input-end-date").value;
    const projectDescription = document.getElementById("blog-description").value;
    const isUsingNodeJs = document.getElementById("node-js").checked;
    const isUsingReactJs = document.getElementById("react-js").checked;
    const isUsingNextJs = document.getElementById("next-js").checked;
    const isUsingTypescript = document.getElementById('typescript').checked;
    const getImages = document.getElementById("input-blog-image").files;
    const projectDurationInDays = getDurationInDays(projectStartDate, projectEndDate);


    // Validation Input
    if (projectName === "") {
        alert("Project name must be filled");
        return;
    }
    if (projectStartDate === "") {
        alert("Start date must be filled");
        return;
    }
    if (projectEndDate === "") {
        alert("End date must be filled");
        return;
    }
    if (projectDescription === "") {
        alert("Description must be filled");
        return;
    } 
    if (getImages.length === 0) {
        alert("Must upload a picture");
        return;
    }
    if (projectDurationInDays <= 0) {
        alert("Start date cannot be less than end date");
        return;
    }

    
    const projectImage = URL.createObjectURL(getImages[0]);
    const projectDuration = getDurationInMonthToString(projectDurationInDays);
    
    const blog = {
        projectName,
        projectStartDate,
        projectEndDate,
        projectDuration,
        projectDescription,
        isUsingNodeJs,
        isUsingReactJs,
        isUsingNextJs,
        isUsingTypescript,
        projectImage,
    }

    dataBlog.push(blog)

    renderBlog();
}

function renderBlog() {
    document.getElementById("blog-content").innerHTML = "";

    for(let i=dataBlog.length-1; i>=0; i--) {

        document.getElementById("blog-content").innerHTML += 
        `
            <div class="blog-list-item">
                <div class="blog-image-container">
                    <img class="blog-image" src=${dataBlog[i].projectImage}>
                </div>
                <a href="../html/blog-details.html" target="_blank">
                    <h3 class="blog-title">${dataBlog[i].projectName}</h3>
                </a>
                <p class="blog-duration">${dataBlog[i].projectDuration}</p>
                <div class="blog-content">${renderBlogContent(dataBlog[i].projectDescription)}</div>
                <div class="blog-icon-technology">${renderTechnologyImages(dataBlog[i])}</div>
                <div class="blog-button">
                    <button>edit</button>
                    <button>delete</button>
                </div>
            </div>
        `
    }
}

function renderTechnologyImages(blogObject) {
    let renderImages = "";

    if (blogObject.isUsingNodeJs) {
        renderImages += `<img src="../image/icon/node_js_icon.svg" alt="node-js">\n`;
    }
    if (blogObject.isUsingReactJs) {
        renderImages += `<img src="../image/icon/react_js_icon.svg" alt="node-js">\n`;
    }
    if (blogObject.isUsingNextJs) {
        renderImages += `<img src="../image/icon/next_js_icon.svg" alt="next-js">\n`;
    }
    if (blogObject.isUsingTypescript) {
        renderImages += `<img src="../image/icon/typescript_icon.svg" alt="typescript"></img>\n`;
    }

    return renderImages;
}

function getDurationInDays(StartDate, EndDate) {
    const oneDay = 1000*60*60*24;

    const startDateInMilliSeconds = new Date(StartDate).getTime();
    const endDateInMilliSeconds = new Date(EndDate).getTime();
    const durationInMilliSeconds = endDateInMilliSeconds - startDateInMilliSeconds;

    // add one because if it started and ended at the same day it counts as one day
    return Math.floor(durationInMilliSeconds/oneDay) + 1; 
}

function getDurationInMonthToString(days) {
    monthDuration = Math.floor(days/30);
    dayDuration = days%30;

    // if less than one month return in days
    if (monthDuration == 0) {
        return `durasi: ${dayDuration} hari`;
    }

    if (dayDuration > 20 ) {
        monthDuration++;
    } else if (dayDuration <= 20 && dayDuration > 10) {
        monthDuration += 0.5;
    }

    return `durasi: ${monthDuration} bulan`;
}


// Add read more in longer content 
function renderBlogContent(blogContent) {
    let blogOverflow = false;

    if (blogContent.length > 300) {
        blogContent = blogContent.substring(0,300);
        blogOverflow = true;
    }

    let maxLine = 8;
    let contentArray = blogContent.split("\n");
    

    if (contentArray.length > 8) {
        contentArray = contentArray.slice(0,8);
        blogOverflow = true
    }
    
    blogContent = "<p>"
    for(let i=0; i<contentArray.length; i++) {
        if (contentArray[i].length < 25) {
            blogContent += `${contentArray[i]}<br>\n`
        } else {
            blogContent += contentArray[i];
        }
    }

    if (blogOverflow) {
        blogContent += `...<a href="../html/blog-details.html" style="color: blue;" target="_blank">Read more</a>`;
    }
    blogContent += "</p>"


    return blogContent;
}



