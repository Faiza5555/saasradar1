// Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const table = document.getElementById('crmTable');
    const columns = table.querySelectorAll('thead th:not(.sticky-col)');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show all columns if "all" is selected
            if (filter === 'all') {
                columns.forEach((col, index) => {
                    col.style.display = '';
                    showColumn(index + 1); // +1 because sticky col is index 0
                });
                return;
            }
            
            // Filter columns based on category
            columns.forEach((col, index) => {
                const categories = col.getAttribute('data-category');
                if (categories && categories.includes(filter)) {
                    col.style.display = '';
                    showColumn(index + 1);
                } else {
                    col.style.display = 'none';
                    hideColumn(index + 1);
                }
            });
        });
    });
    
    function showColumn(columnIndex) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells[columnIndex]) {
                cells[columnIndex].style.display = '';
            }
        });
    }
    
    function hideColumn(columnIndex) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells[columnIndex]) {
                cells[columnIndex].style.display = 'none';
            }
        });
    }
    
    // Smooth scroll to full guide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
