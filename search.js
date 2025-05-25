// Search data structure containing keywords and their corresponding pages
const searchData = [
    { keyword: 'mentorship', page: 'events.html', description: 'Math Mentorship Program' },
    { keyword: 'study', page: 'events.html', description: 'Study Jam & Snacks' },
    { keyword: 'speaker', page: 'events.html', description: 'Guest Speaker Series' },
    { keyword: 'about', page: 'about.html', description: 'About Our Club' },
    { keyword: 'join', page: 'join.html', description: 'Join Our Community' },
    { keyword: 'resources', page: 'resources.html', description: 'Study Resources' },
    { keyword: 'home', page: 'index.html', description: 'Home Page' },
    { keyword: 'events', page: 'events.html', description: 'Upcoming Events' }
];

// Create and style the suggestions container
const createSuggestionsContainer = () => {
    const container = document.createElement('div');
    container.className = 'search-suggestions';
    container.style.display = 'none';
    container.style.position = 'absolute';
    container.style.backgroundColor = '#005a4b';
    container.style.borderRadius = '4px';
    container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    container.style.width = '100%';
    container.style.maxHeight = '200px';
    container.style.overflowY = 'auto';
    container.style.zIndex = '1000';
    return container;
};

// Create a suggestion item
const createSuggestionItem = (item) => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.style.padding = '8px 12px';
    div.style.cursor = 'pointer';
    div.style.color = 'white';
    div.style.transition = 'background-color 0.2s';
    
    div.innerHTML = `
        <div style="font-weight: 500;">${item.description}</div>
        <div style="font-size: 0.8em; opacity: 0.8;">${item.page.replace('.html', '')}</div>
    `;
    
    div.addEventListener('mouseover', () => {
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    div.addEventListener('mouseout', () => {
        div.style.backgroundColor = 'transparent';
    });
    
    div.addEventListener('click', () => {
        window.location.href = item.page;
    });
    
    return div;
};

// Initialize search functionality
const initializeSearch = () => {
    const searchInput = document.querySelector('.search-container input');
    const searchContainer = document.querySelector('.search-container');
    
    if (!searchInput || !searchContainer) return;
    
    const suggestionsContainer = createSuggestionsContainer();
    searchContainer.appendChild(suggestionsContainer);
    
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        
        if (value.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const matches = searchData.filter(item => 
            item.keyword.toLowerCase().includes(value) || 
            item.description.toLowerCase().includes(value)
        );
        
        if (matches.length > 0) {
            suggestionsContainer.innerHTML = '';
            matches.forEach(item => {
                suggestionsContainer.appendChild(createSuggestionItem(item));
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch); 