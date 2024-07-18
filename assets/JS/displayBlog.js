// displayblogs.js

// Initialize Quill editor
const options = {
    modules: {
        toolbar: true,
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
};
const quill = new Quill('#editor', options);

// Retrieve all blogs from localStorage or initialize an empty array
let allBlogs = JSON.parse(localStorage.getItem('allBlogsData')) || [];

// Function to close the update form box
const CloseBox = () => {
    document.querySelector('.updateBlog').style.display = "none";
};

// Add event listener to close button
document.querySelector('.cross').addEventListener('click', CloseBox);

// Function to edit a blog
const editBlog = (blogDiv, button) => {
    const editIt = () => {
        const getTitle = blogDiv.querySelector('.blogTitle h2').textContent.trim();
        const getDescription = blogDiv.querySelector('.blogDescription').innerHTML.trim();
        const getImage = blogDiv.querySelector('.blogImage img').getAttribute('src').trim();
        const getupdateButton = document.querySelector('#updateBlog');

        // Fill form fields with current blog data
        document.querySelector("#title").value = getTitle;
        quill.root.innerHTML = getDescription;
        document.querySelector("#imageurl").value = getImage;

        // Display update form box
        document.querySelector('.updateBlog').style.display = "block";

        // Function to update blog
        const getValues = () => {
            let newTitle = document.querySelector("#title").value;
            let newDescription = quill.root.innerHTML.trim(); // Fetch edited content from Quill
            let imageUrl = document.querySelector("#imageurl").value;

            // Check if all fields are filled and the URL is valid
            if (newTitle && newDescription && imageUrl) {
                // Update in DOM
                blogDiv.querySelector('.blogTitle h2').textContent = newTitle;
                blogDiv.querySelector('.blogDescription').innerHTML = newDescription;
                blogDiv.querySelector('.blogImage img').setAttribute('src', imageUrl);

                // Update in localStorage
                allBlogs = allBlogs.map(blog => {
                    if (blog.title === getTitle && blog.description === getDescription && blog.image === getImage) {
                        blog.title = newTitle;
                        blog.description = newDescription;
                        blog.image = imageUrl;
                    }
                    return blog;
                });
                localStorage.setItem('allBlogsData', JSON.stringify(allBlogs));
                document.querySelector('.updateBlog').style.display = "none";
            } else {
                alert("Please fill all the fields correctly");
            }
        };

        getupdateButton.addEventListener('click', getValues);
    };

    button.addEventListener('click', editIt);
};

// Function to remove a blog
const removeBlog = (blogDiv, button) => {
    const removeIt = () => {
        const getTitle = blogDiv.querySelector('.blogTitle h2').textContent.trim();
        const getDescription = blogDiv.querySelector('.blogDescription').innerHTML.trim();
        const getImage = blogDiv.querySelector('.blogImage img').getAttribute('src').trim();

        // Remove from local storage
        allBlogs = allBlogs.filter(blog => !(blog.title === getTitle && blog.description === getDescription && blog.image === getImage));
        localStorage.setItem('allBlogsData', JSON.stringify(allBlogs));

        // Remove from DOM
        blogDiv.remove();
    };

    button.addEventListener('click', removeIt);
};

// Display existing blogs or show no blogs message
const displayBlogs = () => {
    const displayBlog = document.querySelector('.display_blog');

    if (allBlogs.length > 0) {
        allBlogs.forEach((element, index) => {
            let createDiv = document.createElement('div');
            createDiv.className = "singleBlog";
            createDiv.innerHTML = `
                <div class="blogTitle">
                    <h2>${element.title}</h2>
                </div>
                <div class="blogDescription">
                    ${element.description}
                </div>
                <div class="blogImage">
                    <img src="${element.image}" alt="Blog Image">
                </div>
                <div class="buttons">
                    <button type="button" class="editBlog">Edit</button>
                    <button type="button" class="removeBlog">Remove</button>
                </div>
            `;
            displayBlog.append(createDiv);
            const editButton = createDiv.querySelector('.editBlog');
            const removeButton = createDiv.querySelector('.removeBlog');
            editBlog(createDiv, editButton);
            removeBlog(createDiv, removeButton);
        });
    } else {
        let createDiv = document.createElement('div');
        createDiv.className = "singleBlog";
        createDiv.innerHTML = `
            <div class="noBlog">
                <h2>No Blog found</h2>
            </div>
        `;
        displayBlog.append(createDiv);
    }
};

// Call the function to display blogs
displayBlogs();
