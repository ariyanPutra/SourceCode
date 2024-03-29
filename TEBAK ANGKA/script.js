function hitNumber () {
    // Membuat Random Number 
    const validNumber = Math.floor(Math.random() * 10) + 1
    // Menangkap Value dari id fnumber
    const inputNumber = document.getElementById("fnumber").value
    // Menangkap tempat result di tampilkan
    const getResult = document.getElementById("result")
    //  MengKonversi Type data String ke Integer
    const convertInt = parseFloat(inputNumber)

    // Pengkondisian If Else

    // Jika convertInt bernilai sama 
    // dengan Valid Number Maka
    if ( convertInt === validNumber) {
        // Menampilkan result 
        getResult.innerHTML = "Tebakan angka anda benar"
    } 
    // jika tebakan selain dari number yang valid maka
    else {
        getResult.innerHTML = `Tebakan salah, yang benar yaitu ${validNumber}`
    }
}