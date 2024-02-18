function ageMeter() {
    let dobInput = document.getElementById('dob').value;
    
    if (dobInput) {
        let dob = new Date(dobInput);
        let today = new Date();

        let ageInMilliseconds = today - dob;
        let ageInSeconds = ageInMilliseconds / 1000;
        let ageInMinutes = ageInSeconds / 60;
        let ageInHours = ageInMinutes / 60;
        let ageInDays = ageInHours / 24;

        let years = Math.floor(ageInDays / 365);
        let months = Math.floor((ageInDays % 365) / 30);
        let days = Math.floor((ageInDays % 365) % 30);

        let result = "Ur Age " + years + " Years, " + months + " Month, " + days + " Day.";
        document.getElementById('hasil').innerHTML = result;
    } else {
        alert("Please enter your date of birth.");
    }
}
