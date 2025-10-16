const out = document.getElementById('output');

async function loadStandings() {
    try {
        const resp = await fetch('/api/standings');
        if (!resp.ok) throw new Error('Network response was not ok: ' + resp.status);
        const data = await resp.json();
        out.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        out.textContent = 'Error: ' + err.message;
    }
}

loadStandings();