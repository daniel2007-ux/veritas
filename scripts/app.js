/*
=============================================================================
BLOCKVOTE - STUDENT TEMPLATE FILE
=============================================================================

🎓 STUDENT INSTRUCTIONS:
This is your template file! You'll complete the TODO sections to build
a fully functional blockchain voting application.

📚 LEARNING OBJECTIVES:
- Master JavaScript fundamentals
- Learn DOM manipulation
- Understand event handling
- Practice asynchronous programming
- Build Web3 integration skills

🚀 HOW TO USE THIS FILE:
1. Read each TODO section carefully
2. Follow the hints and examples
3. Test your code frequently
4. Use the validation functions
5. Ask for help when stuck!

📖 REFERENCE:
- Check STUDENT-GUIDE.md for detailed instructions
- Look at the complete app.js for reference
- Use browser console for debugging

=============================================================================
*/

// =============================================================================
// MODULE 1: JAVASCRIPT FUNDAMENTALS
// =============================================================================

/*
🎯 EXERCISE 1.1: APPLICATION STATE MANAGEMENT

Your first task is to create the AppState object that will store all
the application's data. Think of this as the "brain" of your app.

LEARNING NOTE: Objects in JavaScript store related data together.
This makes it easier to manage and prevents conflicts.
*/

// TODO 1.1: Complete the AppState object
const AppState = {
    // STUDENT TASK: Add these properties with appropriate initial values
    
    // Wallet connection properties:
    // - isWalletConnected: boolean (starts as false)
    // - currentAccount: string or null (starts as null)
    // - currentNetwork: string or null (starts as null)
    
    // Voting properties:
    // - selectedOption: number or null (starts as null)
    // - hasUserVoted: boolean (starts as false)
    // - currentPoll: object or null (starts as null)
    
    // UI state properties:
    // - isLoading: boolean (starts as false)
    // - transactionInProgress: boolean (starts as false)
    
    // Configuration properties:
    // - pollTitle: string (your choice of poll question)
    // - pollOptions: array of objects (each with id, name, votes)
    
    // EXAMPLE STRUCTURE:
    // pollOptions: [
    //     { id: 0, name: "JavaScript", votes: 0 },
    //     { id: 1, name: "Python", votes: 0 },
    //     // ... add more options
    // ]
    
    // 🚨 YOUR CODE STARTS HERE:

    is_wallet_connected: false, 
    current_account: null,
    current_network: null,
    selected_option: null,
    has_user_voted: false,
    current_poll: null,
    is_loading: false,
    transaction_in_progress: false,
    poll_title: "Who Should Be the Next F. President?",
    poll_options:[
        { id:0, name: "Joshua Charlse E.", votes: 0 },
        { id: 1, name: "Margeret S.", votes: 0 },
        { id: 2, name: "Tyagher D.", votes: 0 },
        { id: 3, name: "Anthonia E.", votes: 0 },
    ]
    // 🚨 YOUR CODE ENDS HERE
};

/*
🎯 EXERCISE 1.2: CONFIGURATION CONSTANTS

Constants store values that never change during app execution.
Using UPPER_CASE names is a common convention for constants.
*/

// TODO 1.2: Complete the CONFIG object
const CONFIG = {
    // STUDENT TASK: Add these configuration values
    
    // Blockchain configuration:
    // - CHAIN_ID: '0xaa36a7' (Sepolia testnet)
    // - CHAIN_NAME: 'Sepolia Testnet'
    // - RPC_URL: 'https://sepolia.infura.io/v3/'
    
    // Contract configuration:
    // - CONTRACT_ADDRESS: null (will be set later)
    
    // UI configuration:
    // - TRANSACTION_TIMEOUT: 30000 (30 seconds)
    // - POLL_REFRESH_INTERVAL: 10000 (10 seconds)
    
    // Explorer URLs:
    // - EXPLORER_URLS: object with network IDs as keys
    
    // 🚨 YOUR CODE STARTS HERE:
    
    
    // 🚨 YOUR CODE ENDS HERE
};

// =============================================================================
// MODULE 1: UTILITY FUNCTIONS
// =============================================================================

/*
🎯 EXERCISE 1.3: UTILITY FUNCTIONS

Utility functions are small, reusable pieces of code that help with
common tasks. They're used throughout the application.

LEARNING NOTE: Functions are like recipes - they take inputs (parameters)
and produce outputs (return values).
*/

// TODO 1.3: Complete the showErrorMessage function
function showErrorMessage(message) {
    // STUDENT TASK: Display error messages to users
    // 1. Use alert() to show the message (we'll improve this later)
    // 2. Add an error emoji (❌) to make it clear it's an error
    // 3. Also log the error to console for debugging

    // HINT: alert('❌ Error: ' + message);
    // HINT: console.error('❌ Error:', message);
    
    // 🚨 YOUR CODE STARTS HERE:
    alert('❌ Error: ' + message);
    console.error('❌ Error:', message);
    // 🚨 YOUR CODE ENDS HERE
}

// TODO 1.4: Complete the showSuccessMessage function
function showSuccessMessage(message) {
    // STUDENT TASK: Display success messages to users
    // 1. Use alert() to show the message
    // 2. Add a success emoji (✅)
    // 3. Log to console for debugging
    
    // 🚨 YOUR CODE STARTS HERE:
    
    alert("✅ success: " + message);
    console.log("✅ success:", message);
    // 🚨 YOUR CODE ENDS HERE
}

// TODO 1.5: Complete the formatWalletAddress function
function formatWalletAddress(address) {
    // STUDENT TASK: Make long wallet addresses readable
    // 1. Check if address exists (if not, return 'Not Connected')
    // 2. Return shortened format: first 6 + "..." + last 4 characters
    // 3. Example: "0x1234567890abcdef" becomes "0x1234...cdef"
    
    // HINT: Use address.substring(start, end) method
    // HINT: address.length gives you the total length
    
    // 🚨 YOUR CODE STARTS HERE:
    if(!address){
        return "Not Connected"
    }
    const start = address.substring(0,6);
    const end = address.substring(address.length - 4);
    return start + "..." + end;
    // 🚨 YOUR CODE ENDS HERE
}

// =============================================================================
// MODULE 1: DATA MANAGEMENT FUNCTIONS
// =============================================================================

/*
🎯 EXERCISE 1.6: DATA CALCULATIONS

These functions work with the poll data to calculate statistics
and manage the application state.
*/

// TODO 1.6: Complete the calculateTotalVotes function
function calculateTotalVotes() {
    // STUDENT TASK: Add up all votes from all options
    // 1. Use the reduce() method on AppState.pollOptions
    // 2. Sum up all the 'votes' properties
    // 3. Return the total number
    
    // LEARNING NOTE: reduce() combines array elements into a single value
    // Syntax: array.reduce((accumulator, currentItem) => {}, initialValue)
    
    // HINT: return AppState.pollOptions.reduce((total, option) => {
    //           return total + option.votes;
    //       }, 0);
    
    // 🚨 YOUR CODE STARTS HERE:
    return AppState.poll_options.reduce((total, option) => {
        return total + option.votes;
    }, 0);
    // 🚨 YOUR CODE ENDS HERE
}

// TODO 1.7: Complete the checkUserVotingStatus function
function checkUserVotingStatus() {
    // STUDENT TASK: Check if current user has already voted
    // For now, just set AppState.hasUserVoted = false
    // Later, we'll check the blockchain for real voting status
    
    // HINT: AppState.hasUserVoted = false;
    // HINT: Add a console.log to show the status
    
    // 🚨 YOUR CODE STARTS HERE:
    AppState.has_user_voted = false;
    console.log("User voting status checked:", AppState.has_user_voted);
    // 🚨 YOUR CODE ENDS HERE
}

// =============================================================================
// MODULE 1: DOM MANIPULATION FUNCTIONS
// =============================================================================

/*
🎯 EXERCISE 1.8: UPDATING THE USER INTERFACE

DOM (Document Object Model) manipulation means changing what users see
on the webpage using JavaScript.

LEARNING NOTE: document.getElementById() finds HTML elements by their ID
*/

// TODO 1.8: Complete the updateTotalVotesDisplay function
function updateTotalVotesDisplay() {
    // STUDENT TASK: Update the total votes shown on the page
    // 1. Find the element with id 'total-votes'
    // 2. Calculate total votes using your function
    // 3. Update the element's textContent
    
    // HINT: const element = document.getElementById('total-votes');
    // HINT: const total = calculateTotalVotes();
    // HINT: element.textContent = `Total Votes: ${total}`;
    
    // 🚨 YOUR CODE STARTS HERE:
    const element1 = document.getElementById("total-votes");
    const total = calculateTotalVotes();
    element1.textContent = `Total Votes: ${total}`;
    // 🚨 YOUR CODE ENDS HERE
}

// =============================================================================
// MODULE 1: VALIDATION FUNCTION
// =============================================================================

/*
🎯 SELF-CHECK: MODULE 1 VALIDATION

This function tests if you completed Module 1 correctly.
Run this in the browser console to check your work!
*/

function validateModule1() {
    console.log('🧪 Testing Module 1 Implementation...');
    let allTestsPassed = true;
    
    // Test 1: AppState object exists and has required properties
    console.log('\n📋 Test 1: AppState Object');
    if (typeof AppState === 'object' && AppState !== null) {
        console.log('✅ AppState object exists');
        
        // Check required properties
        const requiredProps = ['isWalletConnected', 'currentAccount', 'pollTitle', 'pollOptions'];
        const missingProps = requiredProps.filter(prop => !(prop in AppState));
        
        if (missingProps.length === 0) {
            console.log('✅ All required properties present');
        } else {
            console.log('❌ Missing properties:', missingProps);
            allTestsPassed = false;
        }
        
        // Check pollOptions structure
        if (Array.isArray(AppState.pollOptions) && AppState.pollOptions.length > 0) {
            console.log('✅ Poll options array is valid');
            
            const firstOption = AppState.pollOptions[0];
            if (firstOption.hasOwnProperty('id') && firstOption.hasOwnProperty('name') && firstOption.hasOwnProperty('votes')) {
                console.log('✅ Poll option structure is correct');
            } else {
                console.log('❌ Poll options need id, name, and votes properties');
                allTestsPassed = false;
            }
        } else {
            console.log('❌ pollOptions should be an array with at least one option');
            allTestsPassed = false;
        }
    } else {
        console.log('❌ AppState object is missing');
        allTestsPassed = false;
    }
    
    // Test 2: CONFIG object
    console.log('\n⚙️ Test 2: CONFIG Object');
    if (typeof CONFIG === 'object' && CONFIG !== null) {
        console.log('✅ CONFIG object exists');
    } else {
        console.log('❌ CONFIG object is missing');
        allTestsPassed = false;
    }
    
    // Test 3: Utility functions
    console.log('\n🔧 Test 3: Utility Functions');
    
    // Test formatWalletAddress
    try {
        const testAddress = '0x1234567890abcdef1234567890abcdef12345678';
        const formatted = formatWalletAddress(testAddress);
        if (formatted === '0x1234...5678') {
            console.log('✅ formatWalletAddress working correctly');
        } else {
            console.log('❌ formatWalletAddress result:', formatted, '(expected: 0x1234...5678)');
            allTestsPassed = false;
        }
        
        const emptyResult = formatWalletAddress(null);
        if (emptyResult === 'Not Connected') {
            console.log('✅ formatWalletAddress handles null correctly');
        } else {
            console.log('❌ formatWalletAddress should return "Not Connected" for null');
            allTestsPassed = false;
        }
    } catch (error) {
        console.log('❌ formatWalletAddress function has errors:', error.message);
        allTestsPassed = false;
    }
    
    // Test calculateTotalVotes
    try {
        const total = calculateTotalVotes();
        if (typeof total === 'number') {
            console.log('✅ calculateTotalVotes returns a number:', total);
        } else {
            console.log('❌ calculateTotalVotes should return a number');
            allTestsPassed = false;
        }
    } catch (error) {
        console.log('❌ calculateTotalVotes function has errors:', error.message);
        allTestsPassed = false;
    }
    
    // Test 4: DOM manipulation
    console.log('\n🌐 Test 4: DOM Functions');
    try {
        updateTotalVotesDisplay();
        console.log('✅ updateTotalVotesDisplay runs without errors');
    } catch (error) {
        console.log('❌ updateTotalVotesDisplay has errors:', error.message);
        allTestsPassed = false;
    }
    
    // Final result
    console.log('\n🎯 MODULE 1 RESULTS:');
    if (allTestsPassed) {
        console.log('🎉 CONGRATULATIONS! Module 1 Complete!');
        console.log('📚 You can now proceed to Module 2');
        console.log('💡 Next: Learn about creating interactive UI elements');
    } else {
        console.log('📝 Please fix the issues above before proceeding');
        console.log('💭 Tip: Check the STUDENT-GUIDE.md for detailed help');
    }
    
    return allTestsPassed;
}

// =============================================================================
// MODULE 2: INTERACTIVE UI DEVELOPMENT (TODO SECTIONS)
// =============================================================================

/*
🎯 MODULE 2 PREVIEW

The following functions are for Module 2. Don't worry about these yet!
Focus on completing Module 1 first, then come back to these.

Each TODO section will be explained in detail in the STUDENT-GUIDE.md
*/

// TODO 2.1: Complete the createVotingOptionElement function (Module 2)
function createVotingOptionElement(option, index) {
    // STUDENT TASK (Module 2): Create HTML elements for voting options
    // This function will be completed in Module 2
    
    console.log('📝 TODO: Complete this function in Module 2');
    console.log('📖 See STUDENT-GUIDE.md Module 2 for instructions');
    
    // Placeholder return to prevent errors
    const placeholder = document.createElement('div');
    placeholder.textContent = 'TODO: Complete in Module 2';
    placeholder.style.padding = '20px';
    placeholder.style.border = '2px dashed #ccc';
    placeholder.style.margin = '10px';
    placeholder.style.textAlign = 'center';
    return placeholder;
}

// TODO 2.2: Complete the createVotingOptions function (Module 2)
function createVotingOptions() {
    // STUDENT TASK (Module 2): Generate all voting option elements
    console.log('📝 TODO: Complete this function in Module 2');
    
    // Placeholder implementation
    const container = document.getElementById('voting-options');
    if (container) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">📚 Complete Module 2 to see voting options here!</p>';
    }
}

// TODO 2.3: Complete the selectVotingOption function (Module 2)
function selectVotingOption(optionId) {
    // STUDENT TASK (Module 2): Handle voting option selection
    console.log('📝 TODO: Complete this function in Module 2');
    console.log('🎯 Option selected:', optionId);
}

// TODO 2.4: Complete the updateVotingOptionsDisplay function (Module 2)
function updateVotingOptionsDisplay() {
    // STUDENT TASK (Module 2): Update visual state of voting options
    console.log('📝 TODO: Complete this function in Module 2');
}

// =============================================================================
// MODULE 3: WEB3 INTEGRATION (TODO SECTIONS)
// =============================================================================

// TODO 3.1: Complete the connectWallet function (Module 3)
function connectWallet() {
    // STUDENT TASK (Module 3): Connect to MetaMask wallet
    console.log('📝 TODO: Complete this function in Module 3');
    showErrorMessage('Wallet connection will be implemented in Module 3');
}

// TODO 3.2: Complete the handleWalletConnection function (Module 3)
function handleWalletConnection(account) {
    // STUDENT TASK (Module 3): Handle successful wallet connection
    console.log('📝 TODO: Complete this function in Module 3');
}

// =============================================================================
// MODULE 4: BLOCKCHAIN TRANSACTIONS (TODO SECTIONS)
// =============================================================================

// TODO 4.1: Complete the submitVote function (Module 4)
function submitVote() {
    // STUDENT TASK (Module 4): Submit vote to blockchain
    console.log('📝 TODO: Complete this function in Module 4');
    showErrorMessage('Vote submission will be implemented in Module 4');
}

// TODO 4.2: Complete the cancelSelection function (Module 4)
function cancelSelection() {
    // STUDENT TASK (Module 4): Cancel vote selection
    console.log('📝 TODO: Complete this function in Module 4');
}

// =============================================================================
// MODULE 5: ADVANCED FEATURES (TODO SECTIONS)
// =============================================================================

// TODO 5.1: Complete the addActivityItem function (Module 5)
function addActivityItem(message) {
    // STUDENT TASK (Module 5): Add items to activity feed
    console.log('📝 TODO: Complete this function in Module 5');
}

// TODO 5.2: Complete the setupActivityFeed function (Module 5)
function setupActivityFeed() {
    // STUDENT TASK (Module 5): Initialize activity feed
    console.log('📝 TODO: Complete this function in Module 5');
}

// =============================================================================
// PROVIDED: APPLICATION INITIALIZATION
// =============================================================================

/*
🎁 PROVIDED FUNCTIONS

These functions are provided to help you get started. You don't need to
modify them, but you should understand how they work.
*/

function setupInitialUI() {
    console.log('🎨 Setting up initial UI...');
    
    // Set the poll title
    const pollTitleElement = document.getElementById('poll-title');
    if (pollTitleElement && AppState.pollTitle) {
        pollTitleElement.textContent = AppState.pollTitle;
    }
    
    // Update total votes display
    updateTotalVotesDisplay();
    
    // Create voting options
    createVotingOptions();
    
    // Hide transaction section initially
    const transactionSection = document.getElementById('transaction-section');
    if (transactionSection) {
        transactionSection.style.display = 'none';
    }
    
    console.log('✅ Initial UI setup complete');
}

function initializeApp() {
    console.log('📋 Initializing BlockVote application...');
    
    try {
        // Check if Module 1 is complete
        if (typeof AppState === 'undefined') {
            console.error('❌ AppState not defined. Please complete Module 1 first.');
            return;
        }
        
        // Set up the UI
        setupInitialUI();
        
        // Check user voting status
        checkUserVotingStatus();
        
        console.log('✅ Application initialized successfully');
        console.log('📚 Ready for Module 1! Run validateModule1() to check your progress.');
        
    } catch (error) {
        console.error('❌ Error initializing application:', error);
        showErrorMessage('Failed to initialize application. Check the console for details.');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BlockVote Student Template Loading...');
    console.log('📖 Welcome! Check STUDENT-GUIDE.md for instructions');
    console.log('🎯 Start with Module 1: Complete the TODO sections above');
    
    initializeApp();
});

/*
=============================================================================
🎓 STUDENT PROGRESS TRACKER
=============================================================================

Keep track of your progress by checking off completed modules:

MODULE 1: JAVASCRIPT FUNDAMENTALS
[ ] TODO 1.1: AppState object
[ ] TODO 1.2: CONFIG object  
[ ] TODO 1.3: showErrorMessage function
[ ] TODO 1.4: showSuccessMessage function
[ ] TODO 1.5: formatWalletAddress function
[ ] TODO 1.6: calculateTotalVotes function
[ ] TODO 1.7: checkUserVotingStatus function
[ ] TODO 1.8: updateTotalVotesDisplay function
[ ] ✅ Passed validateModule1() test

MODULE 2: INTERACTIVE UI DEVELOPMENT
[ ] TODO 2.1: createVotingOptionElement function
[ ] TODO 2.2: createVotingOptions function
[ ] TODO 2.3: selectVotingOption function
[ ] TODO 2.4: updateVotingOptionsDisplay function

MODULE 3: WEB3 INTEGRATION
[ ] TODO 3.1: connectWallet function
[ ] TODO 3.2: handleWalletConnection function

MODULE 4: BLOCKCHAIN TRANSACTIONS
[ ] TODO 4.1: submitVote function
[ ] TODO 4.2: cancelSelection function

MODULE 5: ADVANCED FEATURES
[ ] TODO 5.1: addActivityItem function
[ ] TODO 5.2: setupActivityFeed function

🎉 FINAL PROJECT
[ ] All modules completed
[ ] Application fully functional
[ ] Portfolio documentation created
[ ] Ready to showcase!

=============================================================================
*/
