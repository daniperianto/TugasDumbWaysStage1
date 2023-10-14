

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
            <div class="mb-4 mx-3 blog-list-item">
                <img class="blog-image" src=${dataBlog[i].projectImage}>
                <a class="mt-2 text-decoration-none" href="/blog-details" target="_blank">
                    <h3 class="mb-0 text-black fw-semibold fs-4">${dataBlog[i].projectName}</h3>
                </a>
                <p class="m-0 text-secondary">${dataBlog[i].projectDuration}</p>
                <div class="my-2">${renderBlogContent(dataBlog[i].projectDescription)}</div>
                <div class="d-flex flex-row mt-auto">${renderTechnologyImages(dataBlog[i])}</div>
                <div class="d-flex flex-row mt-2">
                    <button class="w-50 me-2 bg-black text-white fw-semibold rounded">edit</button>
                    <button class="w-50 bg-black text-white fw-semibold rounded">delete</button>
                </div>
            </div>
        `
    }
}

function renderTechnologyImages(blogObject) {
    let renderImages = "";

    if (blogObject.isUsingNodeJs) {
        renderImages += `<img class="icon" src="../image/icon/node_js_icon.svg" alt="node-js">\n`;
    }
    if (blogObject.isUsingReactJs) {
        renderImages += `<img class="icon" src="../image/icon/react_js_icon.svg" alt="node-js">\n`;
    }
    if (blogObject.isUsingNextJs) {
        renderImages += `<img class="icon" src="../image/icon/next_js_icon.svg" alt="next-js">\n`;
    }
    if (blogObject.isUsingTypescript) {
        renderImages += `<img class="icon" src="../image/icon/typescript_icon.svg" alt="typescript"></img>\n`;
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
    const maxChar = 270;
    const maxLine = 7
    const blogOverflow = isOverflow(blogContent, maxLine, maxChar)
    blogContentCut = cutBlogContent(blogContent, maxLine, maxChar);
    const contentArray = blogContentCut.split("\n");

    
    blogContentDisplayed = "<p>"
    for (let i=0; i<contentArray.length; i++) {
        if (i == contentArray.length - 1) { // last index
            blogContentDisplayed += `${contentArray[i]}\n`
        } else {
            blogContentDisplayed += `${contentArray[i]}<br>\n`
        }
    }

    if (blogOverflow) {
        blogContentDisplayed += ` . . . <a href="../html/blog-details.html" style="color: blue;" target="_blank">Read more</a>`;
    }
    blogContentDisplayed += "</p>"


    return blogContentDisplayed;
}


function cutBlogContent(blogContent, maxLine, maxChar) {
    const blogLineArray = blogContent.split("\n");
    const maxCharPerLine = maxChar / maxLine;

    blogContent = "";
    let lineContent = 0;
    outer:
    for(const blogLine of blogLineArray) {
        const totalLineBlogLine = Math.ceil(blogLine.length / maxCharPerLine);
        if (lineContent + totalLineBlogLine < maxLine) {
            blogContent += blogLine + "\n";
            lineContent += totalLineBlogLine;
        } else {
            const blogLineUsedLine = maxLine - lineContent;
            blogContent += blogLine.substring(0,blogLineUsedLine*maxCharPerLine);
            break outer;
        }
    }

    return blogContent;
}

function isOverflow(blogContent, maxLine, maxChar) {
    const contentArray = blogContent.split("\n")
    let totalChar = 0;
    for (const content of contentArray) {
        if (content.length < 33) {
            totalChar += maxChar/maxLine;
        } else {
            totalChar += content.length
        }
    }

    return totalChar > maxChar;
}
