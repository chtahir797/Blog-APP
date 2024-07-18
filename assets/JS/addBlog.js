const options = {
    modules: {
        toolbar: true,
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
};

const quill = new Quill('#editor', options);

// Get the form element by its ID
let blogForm = document.querySelector("#blogForm");
let allBlogs = JSON.parse(localStorage.getItem('allBlogsData')) || [];

// Function to save form data as an object
const saveFormData = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Get the values of the input fields
    let title = document.querySelector("#title").value;
    let description = quill.root.innerHTML.trim(); // Fetch edited content from Quill
    let image = document.querySelector("#imageurl").value;

    // Validate URL pattern
    const urlPattern = new RegExp('https?://.+');

    // Check if all fields are filled and the URL is valid
    if (title && description && urlPattern.test(image)) {
        // Create a BlogData object to hold the form data
        const BlogData = {
            title: title,
            description: description,
            image: image,
        };

        // Push the BlogData object to the array
        allBlogs.push(BlogData);

        // Store updated data in localStorage
        localStorage.setItem('allBlogsData', JSON.stringify(allBlogs));

        // Reset the values of the input fields
        blogForm.reset();
        quill.setContents([]);
    } else {
        // Alert the user if any fields are missing or invalid
        alert("Please fill all the fields correctly");
    }
};

// Add event listener to the form submission
blogForm.addEventListener("submit", saveFormData);
