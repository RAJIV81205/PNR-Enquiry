document.getElementById("submit").addEventListener('click', function () {
    const pnr = document.getElementById("pnr").value;
    if (pnr.length != 10) {
        alert("Please Enter Valid PNR");
        return;

    }
    getPNRdata(pnr);


})

function getPNRdata(pnr) {
    const url = `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b0075d9fa8msh81b2609e08877a8p14ff09jsn738ea7672cad',
            'x-rapidapi-host': 'irctc-indian-railway-pnr-status.p.rapidapi.com'
        }
    };

    try {
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                showPNRdetails(data);
            })
    } catch (error) {
        console.error(error);
    }
}

function showPNRdetails(data) {
    if (data.success && data.data) {
    const journeyDetails = data.data;
    const DOJ = new Date(journeyDetails.dateOfJourney).toLocaleDateString();

    let passengerRows = journeyDetails.passengerList.map(passenger => `
            <tr>
                <td>${passenger.passengerSerialNumber}</td>
                <td>${passenger.bookingStatusDetails}</td>
                <td>${passenger.currentStatusDetails}</td>
            </tr>
        `).join('');

    let output = `
            <h2> PNR Status Details </h2>
            <table border="1" cellpadding="10">
                <tr>
                    <th>PNR Number</th>
                    <td>${journeyDetails.pnrNumber}</td>
                </tr>
                <tr>
                    <th>Date of Journey</th>
                    <td>${DOJ}</td>
                </tr>
                <tr>
                    <th>Train Number</th>
                    <td>${journeyDetails.trainNumber}</td>
                </tr>
                <tr>
                    <th>Train Name</th>
                    <td>${journeyDetails.trainName}</td>
                </tr>
                <tr>
                    <th>Source Station</th>
                    <td>${journeyDetails.sourceStation}</td>
                </tr>
                <tr>
                    <th>Destination Station</th>
                    <td>${journeyDetails.destinationStation}</td>
                </tr>
                <tr>
                    <th>Boarding Point</th>
                    <td>${journeyDetails.boardingPoint}</td>
                </tr>
                <tr>
                    <th>Journey Class</th>
                    <td>${journeyDetails.journeyClass}</td>
                </tr>
                <tr>
                    <th>Chart Status</th>
                    <td>${journeyDetails.chartStatus}</td>
                </tr>
                <tr>
                    <th>Total Distance</th>
                    <td>${journeyDetails.distance} km</td>
                </tr>
                <tr>
                    <th>Fare</th>
                    <td>₹${journeyDetails.bookingFare}</td>
                </tr>
            </table>

            <h3>Passenger Details</h3>
            <table border="1" cellpadding="10">
                <tr>
                    <th>Passenger No.</th>
                    <th>Booking Status</th>
                    <th>Current Status</th>
                </tr>
                ${passengerRows}
            </table>
        `;
    document.getElementById('output').innerHTML = output;
} 
else {
    document.getElementById('output').innerHTML = "<p id='error'>No data found for the provided PNR number.</p>";
}};

