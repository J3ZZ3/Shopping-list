// User Login
IF user clicks 'login' button:
    CHECK if email and password are valid
    IF valid:
        REDIRECT to Home page
    ELSE:
        SHOW 'Invalid credentials' message

// Add New Shopping List
IF user clicks 'Add New List':
    DISPLAY form to input list details (name, quantity, category, etc.)
    IF user submits form:
        SAVE list to the database
        REDIRECT to Home page with the new list added

// Search Functionality
IF user types in search bar:
    FILTER shopping lists where list name matches search keyword
    DISPLAY filtered results

// Share List
IF user clicks 'Share':
    GENERATE a downloadable PDF file of the shopping list
    ALLOW user to download the file or copy a shareable link

// Profile Management
IF user updates profile:
    VALIDATE new profile details (email, name, etc.)
    SAVE updated details to the database
    SHOW success message
