// Add read more in longer content 
function readMore() {
    let blogContent = document.getElementById("blog-content").value;
    blogContent = blogContent.substring(0, 50);
    blogContent += "...";
    document.getElementById("blog-content").innerHTML = "";
    document.getElementById("blog-content").innerHTML += blogContent;
    document.getElementById("blog-content").innerHTML += `
    <a href="../html/blog-details.html" style="color: blue;">Read more</a>`;

    console.log(blogContent);
}
readMore();