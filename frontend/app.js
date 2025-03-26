const form = document.getElementById('queryForm');
const queriesDiv = document.getElementById('queries');

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const queryText = document.getElementById('queryText').value;

    await fetch('http://localhost:5000/add-query',{
        method: 'POST',
        headers: {'Content-type':'application/json'},

    });
    form.reset();
    fetchQueries();

});
async function fetchQueries() {
    const res = await fetch('http://localhost:5000/queries');
    const data = await res.json();
    queriesDiv.innerHTML = data.map(q => '<p><strongs>${q.syudentName}</strong>: ${q.queryText}</p>').join('');
    
}
fetchQueries();