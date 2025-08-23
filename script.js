// This script controls navigation, dark/light mode, resume filtering, contact form validation, and greeting.

document.addEventListener('DOMContentLoaded', function() {
    // --- NAVIGATION: Show only the selected section, hide others ---
    // Get all navigation links (menu items)
    const navLinks = document.querySelectorAll('.nav-link');
    // Get all main content sections (pages)
    const sections = document.querySelectorAll('.page-section');

    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior (no page reload)
            // Get the target section's id (remove the # from href)
            const target = this.getAttribute('href').substring(1);
            // Hide all sections
            sections.forEach(sec => sec.style.display = 'none');
            // Show only the selected section
            document.getElementById(target).style.display = 'block';
        });
    });

    // --- HAMBURGER MENU for mobile view ---
    // Get sidebar and hamburger button elements
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    // Toggle sidebar visibility when hamburger is clicked
    hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // --- DARK/LIGHT MODE toggle with localStorage ---
    // Get the dark/light mode toggle button
    const modeBtn = document.getElementById('toggle-mode');
    // Function to set mode (dark or light)
    function setMode(dark) {
        document.body.classList.toggle('dark', dark); // Add/remove 'dark' class
        modeBtn.textContent = dark ? '☀️' : '🌙'; // Change button icon
        localStorage.setItem('darkmode', dark ? '1' : '0'); // Save preference
    }
    // Toggle mode on button click
    modeBtn.addEventListener('click', function() {
        setMode(!document.body.classList.contains('dark'));
    });
    // On page load, set mode from localStorage (default: light)
    setMode(localStorage.getItem('darkmode') === '1');

    // --- TIME-OF-DAY GREETING ---
    // Get the greeting element
    const greeting = document.getElementById('greeting');
    // Function to return greeting based on current hour
    function getGreeting() {
        const h = new Date().getHours(); // Get current hour (0-23)
        if (h < 12) return 'Good morning!';
        if (h < 18) return 'Good afternoon!';
        return 'Good evening!';
    }
    // Set greeting text in the DOM
    greeting.textContent = getGreeting();

    // --- RESUME DATA (in JS variable) ---
    // Array of resume items (type, title, years, description)

    // Expanded resume data for more filtering possibilities
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
    // Function to render resume list based on filter settings
    function renderResume() {
        // Get filter values from checkboxes and number inputs
        const showProf = document.getElementById('filter-professional').checked; // Show professional?
        const showEdu = document.getElementById('filter-education').checked;     // Show education?
        const from = parseInt(document.getElementById('filter-from').value, 10); // Start year //.value This gets the current value entered in that input field. The value is always a string, even if the input type is number.
        const to = parseInt(document.getElementById('filter-to').value, 10);     // End year // The 10 means "use base 10" (decimal), which is standard for normal numbers.
        const list = document.getElementById('resume-list'); // The <ul> for resume items
        list.innerHTML = ''; // Clear previous list

        // Loop through all resume items
        resumeData.forEach(item => {
            // Skip if type is not selected in filter
            if ((item.type === 'professional' && !showProf) || (item.type === 'education' && !showEdu)) return;
            // Skip if item is outside the selected year range
            if (item.from > to || item.to < from) return;
            // Create a new <li> for the item
            const li = document.createElement('li');
            // Set the text content for the item
            li.textContent = `${item.title} (${item.from}-${item.to}) - ${item.desc}`;
            // Add the item to the list
            list.appendChild(li);
        });
    }
    // When filter button is clicked, update the resume list
    document.getElementById('apply-filter').addEventListener('click', renderResume);
    // Also update on any filter input change (checkboxes or years)
    ['filter-professional','filter-education','filter-from','filter-to'].forEach(id => {
        document.getElementById(id).addEventListener('change', renderResume);
    });
    renderResume(); // Initial render on page load

    // --- CONTACT FORM live validation ---
    // Get form and all input elements
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    // Get error message spans
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    // Get the success message div
    const successMsg = document.getElementById('contact-success');

    // Function to check if email is valid using regex
    function validateEmail(email) {
        // Basic email pattern: something@something.something
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
         // The expression /^[^\s@]+@[^\s@]+\.[^\s@]+$/ is a regular expression (regex) 
        // used to check if an email address is in a valid format.
        // [^] — Start of the string. // $ — End of the string.
        // /.../ tell JavaScript: "This is a regular expression."
    }
    // Function to validate all form fields and show error messages
    function validateForm() {
        let valid = true; // Assume valid
        // Name must not be empty
        errorName.textContent = nameInput.value.trim() ? '' : 'Required';
        // Email must be valid
        errorEmail.textContent = validateEmail(emailInput.value) ? '' : 'Invalid email';
        // Message must not be empty
        errorMessage.textContent = messageInput.value.trim() ? '' : 'Required';
        // If any field is invalid, set valid to false
        if (!nameInput.value.trim() || !validateEmail(emailInput.value) || !messageInput.value.trim()) valid = false;
        return valid;
    }
    // Live validation: check fields as user types
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });
    // On form submit, validate and show success message if valid
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting/reloading
        if (validateForm()) {
            form.style.display = 'none'; // Hide form
            successMsg.style.display = 'block'; // Show thank you message
        }
    });

    // --- Always show imprint and privacy in menu, and make sure imprint is visible from every page ---
    // (Handled by sidebar and navigation logic above)

    // --- Show home section by default ---
    // Hide all sections first
    sections.forEach(sec => sec.style.display = 'none');
    // Show only the home section
    document.getElementById('home').style.display = 'block';
});
