const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

// Alert for Tile Click
document.querySelectorAll('.TileLink').forEach(tile => {
    tile.addEventListener('click', (event) => {
        event.preventDefault();
        const userConfirmed = confirm('This will download a torrent file, not the actual one. Do you want to continue?');
        if (userConfirmed) {
            window.location.href = tile.href;
        }
    });
});
