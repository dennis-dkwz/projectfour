
// This script controls navigation, dark/light mode, resume filtering, contact form validation, and greeting.
//
// Detailed comments are provided throughout to explain JavaScript concepts and DOM methods.
// For example, querySelectorAll selects multiple elements, and addEventListener attaches event handlers.
// DOM = document object modell
document.addEventListener('DOMContentLoaded', function() {

    // --- NAVIGATION: Show only the selected section, hide others ---
    // document.querySelectorAll(selector) returns a NodeList of all elements matching the CSS selector.
    // Here, it selects all navigation links with the class 'nav-link'.
    const navLinks = document.querySelectorAll('.nav-link');
    // Select all main content sections with the class 'page-section'.
    const sections = document.querySelectorAll('.page-section');

    // forEach is used to loop through each navigation link.
    navLinks.forEach(link => {
        // This code means: "When this link is clicked, run the following function."
        // addEventListener attaches an event handler to the element.
        // 'click' is the type of event to listen for (in this case, a mouse click)
        // The function(e) { ... } is a callback function that will run whenever the event occurs. The e parameter is the event object, which contains information about the event (like which element was clicked, mouse position, etc.).
        link.addEventListener('click', function(e) {
            e.preventDefault(); // For a link (<a>), the default action is to navigate to the URL in the href attribute (which would reload the page or jump to an anchor).
            // By calling e.preventDefault(), you stop the browser from navigating, so you can handle the navigation with JavaScript instead.

            // this refers to the element that triggered the event (in this case, the link that was clicked).
            // getAttribute('href') gets the value of the href attribute (e.g., '#home').
            // substring(1) creates a new string starting from the second character (index 1), removing the first character (the "#").
            const target = this.getAttribute('href').substring(1);                      
            // forEach is an array method that runs a function for each element in the list.
            // sec => sec.style.display = 'none' is an arrow function: for each section (sec), set its style.display property to 'none'.
            // style.display = 'none' hides the element from the page (it will not be visible and takes up no space).
            sections.forEach(sec => sec.style.display = 'none');
            // Show only the selected section by setting its display to 'block'.
            // 'block' makes the element visible and makes it behave as a block-level element (taking up the full width available).
            document.getElementById(target).style.display = 'block';
        });
    });

    // --- HAMBURGER MENU for mobile view ---
    // Get sidebar and hamburger button elements by their IDs.
  
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    // When the hamburger button is clicked, toggle the 'active' class on the sidebar.
    // sidebar is a DOM element (the sidebar menu).
    // classList is a property that lets you work with the element’s CSS classes.
    // toggle('active') adds the 'active' class if it’s not present, or removes it if it is.
    // This is often used to show/hide menus or change styles dynamically.
    hamburger.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    });

    // --- DARK/LIGHT MODE toggle with localStorage ---

    // Get the dark/light mode toggle button by its ID.
    const modeBtn = document.getElementById('toggle-mode');
    // Function to set mode (dark or light). If dark is true, enable dark mode.
    function setMode(dark) {
        // document.body refers to the <body> element of the page.
        // classList.toggle('dark', dark) will add the 'dark' class if dark is true, or remove it if dark is false.
        // This is a two-argument version of toggle: the second argument is a boolean that determines whether to add or remove the class.
        // Used for switching between dark and light mode.
        document.body.classList.toggle('dark', dark);
        // Change the button icon depending on the mode.
        // modeBtn is the button for toggling dark/light mode.
        // textContent sets the text (or emoji) inside the button.
        // dark ? '☀️' : '🌙' is a ternary operator: if dark is true, use '☀️' (sun emoji); if false, use '🌙' (moon emoji).
        modeBtn.textContent = dark ? '☀️' : '🌙';
        // localStorage is a web storage object that allows you to save key-value pairs in the browser, persisting even after the page reloads.
        // setItem('darkmode', ...) saves a value under the key 'darkmode'
        // dark ? '1' : '0' saves '1' if dark is true, or '0' if dark is false.
        // This remembers the user’s dark/light mode preference for future visits.
        localStorage.setItem('darkmode', dark ? '1' : '0');
    }
    // When the mode button is clicked, toggle the mode.
    modeBtn.addEventListener('click', function() {
        setMode(!document.body.classList.contains('dark'));
    });
    // On page load, set mode from localStorage (default: light mode if not set).
    setMode(localStorage.getItem('darkmode') === '1');

    // --- TIME-OF-DAY GREETING ---
    // Get the greeting element by its ID.
    const greeting = document.getElementById('greeting');
    // Function to return a greeting string based on the current hour.
    function getGreeting() {
        const h = new Date().getHours(); // Get current hour (0-23)
        if (h < 12) return 'Good morning!';
        if (h < 18) return 'Good afternoon!';
        return 'Good evening!';
    }
    // Set the greeting text in the DOM.
    greeting.textContent = getGreeting();

    // --- RESUME DATA (in JS variable) ---
    // Array of resume items (type, title, years, description)
    // This data is used to populate the resume section and can be filtered.
    const resumeData = [
        // Professional experiences
        {type: 'professional', title: 'Web Developer', from: 2021, to: 2025, desc: 'Company ABC'},
        {type: 'professional', title: 'Frontend Developer', from: 2019, to: 2021, desc: 'Creative Solutions'},
        {type: 'professional', title: 'Intern', from: 2020, to: 2021, desc: 'Startup DEF'},
        {type: 'professional', title: 'IT Support Specialist', from: 2018, to: 2019, desc: 'TechHelp GmbH'},
        {type: 'professional', title: 'Project Assistant', from: 2017, to: 2018, desc: 'Consulting AG'},
        {type: 'professional', title: 'Freelance Designer', from: 2016, to: 2017, desc: 'Self-employed'},
        {type: 'professional', title: 'Junior Developer', from: 2015, to: 2016, desc: 'WebWorks'},
        {type: 'professional', title: 'Backend Developer', from: 2022, to: 2024, desc: 'DataSoft Ltd.'},
        {type: 'professional', title: 'Mobile App Developer', from: 2018, to: 2020, desc: 'AppMakers'},
        {type: 'professional', title: 'QA Engineer', from: 2014, to: 2015, desc: 'QualityFirst'},
        {type: 'professional', title: 'System Administrator', from: 2012, to: 2014, desc: 'NetSecure'},
        {type: 'professional', title: 'Research Assistant', from: 2011, to: 2012, desc: 'University Lab'},
        {type: 'professional', title: 'Sales Consultant', from: 2010, to: 2011, desc: 'RetailPro'},
        {type: 'professional', title: 'Marketing Intern', from: 2009, to: 2010, desc: 'AdWorks'},
        // Education experiences
        {type: 'education', title: 'B.Sc. Computer Science', from: 2017, to: 2021, desc: 'University XYZ'},
        {type: 'education', title: 'High School', from: 2013, to: 2017, desc: 'School 123'},
        {type: 'education', title: 'M.Sc. Software Engineering', from: 2022, to: 2024, desc: 'Tech University'},
        {type: 'education', title: 'Online Course: UX Design', from: 2020, to: 2020, desc: 'Coursera'},
        {type: 'education', title: 'Certificate: Project Management', from: 2018, to: 2018, desc: 'PMI Institute'},
        {type: 'education', title: 'Workshop: JavaScript Advanced', from: 2019, to: 2019, desc: 'CodeCamp'},
        {type: 'education', title: 'Language Course: English C1', from: 2015, to: 2015, desc: 'Language School'},
        {type: 'education', title: 'Diploma: Graphic Design', from: 2012, to: 2014, desc: 'Design Academy'},
        {type: 'education', title: 'Online Course: Data Science', from: 2023, to: 2023, desc: 'edX'},
        {type: 'education', title: 'Certificate: Agile Scrum', from: 2021, to: 2021, desc: 'Scrum.org'},
        {type: 'education', title: 'Workshop: React Basics', from: 2022, to: 2022, desc: 'ReactConf'},
        {type: 'education', title: 'Seminar: Cloud Computing', from: 2020, to: 2020, desc: 'CloudExpo'},
        {type: 'education', title: 'Online Course: Python for Everybody', from: 2018, to: 2018, desc: 'Coursera'},
        {type: 'education', title: 'Certificate: ITIL Foundation', from: 2016, to: 2016, desc: 'ITIL Org'},
        {type: 'education', title: 'Workshop: Cybersecurity Basics', from: 2019, to: 2019, desc: 'CyberSec Academy'}
    ];


    // --- RESUME FILTER and rendering ---
    // Function to render the resume list based on filter settings.
    function renderResume() {
        // Get filter values from checkboxes and number inputs.
        // .checked returns true if the checkbox is checked.
        const showProf = document.getElementById('filter-professional').checked; // Show professional?
        const showEdu = document.getElementById('filter-education').checked;     // Show education?
        // .value gets the current value of the input (always a string, even for numbers).
        // parseInt(..., 10) converts the string to an integer (a whole number).
        // The 10 is the radix (base) for the conversion. 10 means "decimal" (normal base-10 numbers). 
        // This ensures numbers like "08" are treated as 8, not as octal (base-8), which can cause bugs in some browsers if not specified.
        const from = parseInt(document.getElementById('filter-from').value, 10); // Start year
        const to = parseInt(document.getElementById('filter-to').value, 10);     // End year
        // Get the <ul> element where resume items will be listed.
        const list = document.getElementById('resume-list');
        // list is the <ul> element with id "resume-list".
        // innerHTML is a property that represents the HTML content inside the element.
        // Setting innerHTML to '' (an empty string) removes all existing child elements and content from the list.
        list.innerHTML = ''; // This clears any previously displayed resume items before adding the new, filtered ones.

        // Loop through all resume items in resumeData.
        resumeData.forEach(item => {
            // Skip this item if its type is not selected in the filter.
            if ((item.type === 'professional' && !showProf) || (item.type === 'education' && !showEdu)) return;
            // Skip if the item's years are outside the selected range.
            if (item.from > to || item.to < from) return;
            // Create a new <li> element for the item.
            const li = document.createElement('li');
            // Set the text content for the item.
            // li is a new <li> (list item) element created for each resume entry.
            // textContent sets the text inside the <li> (not HTML, just plain text).
            // The template string:
            //  ${item.title} (${item.from}-${item.to}) - ${item.desc} combines the item's title, years, and description into a readable format, e.g., "Web Developer (2021-2025) - Company ABC".
            li.textContent = `${item.title} (${item.from}-${item.to}) - ${item.desc}`;
            // appendChild adds the li element as the last child of the list (the <ul>).
            // This displays the new resume entry in the list on the page.
            list.appendChild(li);
        });
    }
    // When the filter button is clicked, update the resume list.
    // attaches an event listener to that button, so when the button is clicked, the renderResume function is called.
    // when the user clicks the "Apply Filter" button, the resume list is updated according to the current filter settings.
    document.getElementById('apply-filter').addEventListener('click', renderResume);

    // This line is used inside a loop for multiple filter inputs (checkboxes and number fields).
    //document.getElementById(id) selects an input element by its id 
    // .addEventListener('change', renderResume) attaches an event listener so that whenever the value of the input changes (e.g., a checkbox is checked/unchecked or a number is changed), the renderResume function is called.
    // This ensures the resume list updates immediately when any filter input changes, without needing to click the button
    ['filter-professional','filter-education','filter-from','filter-to'].forEach(id => {
        document.getElementById(id).addEventListener('change', renderResume);
    });
    renderResume(); // Initial render on page load


    // --- CONTACT FORM live validation ---
    // Get the form and all input elements by their IDs.
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    // Get error message spans for each field.
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    // Get the success message div.
    const successMsg = document.getElementById('contact-success');

    // Function to check if an email is valid using a regular expression (regex).
    function validateEmail(email) {
        // Basic email pattern: something@something.something
        // .test() returns true if the string matches the pattern.
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        // The expression /^[^\s@]+@[^\s@]+\.[^\s@]+$/ is a regular expression (regex)
        // used to check if an email address is in a valid format.
        // ^ — Start of the string. $ — End of the string.
        // /.../ tells JavaScript: "This is a regular expression."
    }
     // Function checks if all form fields are valid and returns true if they are, or false if any are invalid.
    // let valid = true; starts by assuming the form is valid.
    // As the function checks each field, if any field is invalid, it sets valid = false;
    function validateForm() {
        let valid = true; 
        // nameInput.value.trim() gets the value of the name input and removes any leading/trailing whitespace.
        //The ternary operator ? '' : 'Required' means: if the name is not empty, set the error message to an empty string (no error); if it is empty, set the error message to "Required".
        // errorName.textContent updates the error message shown next to the name field.
        errorName.textContent = nameInput.value.trim() ? '' : 'Required';
        // validateEmail(emailInput.value) checks if the email input value matches a valid email pattern.
        // If the email is valid, the error message is set to an empty string; if not, it shows "Invalid email".
        // errorEmail.textContent updates the error message shown next to the email field.
        errorEmail.textContent = validateEmail(emailInput.value) ? '' : 'Invalid email';
        // checks if the message input is not empty (after trimming whitespace).
        // If not empty, no error message; if empty, shows "Required".
        // errorMessage.textContent updates the error message shown next to the message field.
        errorMessage.textContent = messageInput.value.trim() ? '' : 'Required';
        // checks if any of the fields are invalid:
        //!nameInput.value.trim() is true if the name is empty.
        //!validateEmail(emailInput.value) is true if the email is invalid.
        //!messageInput.value.trim() is true if the message is empty.
        //If any of these are true (meaning any field is invalid), valid is set to false.
        if (!nameInput.value.trim() || !validateEmail(emailInput.value) || !messageInput.value.trim()) valid = false;
        // result is used to decide whether to submit the form or show error messages.
        return valid;
    }
    // Live validation: check fields as user types (on 'input' event).
    // [nameInput, emailInput, messageInput] creates an array containing the three input elements for the contact form.
    // forEach(input => { ... }) loops through each input element in the array.
    // input.addEventListener('input', validateForm); attaches an event listener to each input field.
    // The 'input' event fires every time the user types, deletes, or pastes something in the field.
    // When this happens, the validateForm function is called, so validation and error messages update live as the user types.
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });
    // .addEventListener('submit', function(e) { ... }) attaches an event listener that runs when the form is submitted (e.g., when the user clicks the "Send" button).
    // The function receives an event object e that contains information about the submission event.
    form.addEventListener('submit', function(e) {
        // e.preventDefault(); stops the browser’s default form submission behavior (which would reload the page).
        // This allows you to handle the form submission with JavaScript instead.
        e.preventDefault(); 
        // validateForm() checks if all form fields are valid.
        if (validateForm()) {
            // If the form is valid (true), then form.style.display = 'none'; hides the form from the page.
            // followed by showing a success message to the user.
            form.style.display = 'none'; 
            successMsg.style.display = 'block'; // Show thank you message
        }
    });

    // --- Always show imprint and privacy in menu, and make sure imprint is visible from every page ---
    // (Handled by sidebar and navigation logic above)

    // --- Show home section by default ---
    // .forEach(sec => sec.style.display = 'none') loops through each section and sets its display style to 'none'.
    // This hides all main content sections on the page (they become invisible and take up no space).
    sections.forEach(sec => sec.style.display = 'none');
    // .style.display = 'block' sets its display style to 'block', making it visible and occupying the full width available.
    document.getElementById('home').style.display = 'block';

     
});
