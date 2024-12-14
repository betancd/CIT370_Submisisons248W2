document.addEventListener('DOMContentLoaded', () => {
    fetchPortsVisited();
});

const fetchPortsVisited = function() {
    const container = document.getElementById('portsVisited');
    
    // Add the spinner HTML
    container.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;

    fetch('http://localhost:3000/api/countries/public', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Fetch response status:', response.status); // Debug statement
        if (!response.ok) {
            throw new Error('Failed to fetch ports visited');
        }
        return response.json();
    })
    .then(data => {
        console.log('Ports data fetched:', data); // Debug statement

        // Remove the spinner
        container.innerHTML = ''; // Clear the container

        if (data.msg) {
            container.innerHTML = `<p>${data.msg}</p>`;
        } else {
            data.forEach(port => {
                const portElement = document.createElement('li');
                portElement.className = 'list-group-item';
                portElement.innerHTML = `${port.nation} ${port.year}`; // Display country and year
                container.appendChild(portElement);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching ports visited:', error); // Debug statement
        container.innerHTML = `<p>Error fetching ports visited. Please try again later.</p>`;
    });
};
