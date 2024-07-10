const apiKey = 'a3a1cb71ee7cc7e5806f50d5'; // Ganti dengan kunci API Anda

async function populateCurrencyOptions() {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const fromCurrency = document.getElementById('fromCurrency');
        const toCurrency = document.getElementById('toCurrency');

        data.supported_codes.forEach(code => {
            const optionFrom = document.createElement('option');
            optionFrom.value = code[0];
            optionFrom.textContent = `${code[1]} (${code[0]})`;
            fromCurrency.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = code[0];
            optionTo.textContent = `${code[1]} (${code[0]})`;
            toCurrency.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error fetching the currency codes:', error);
        alert('Failed to fetch currency codes. Please try again later.');
    }
}

function filterFromCurrency() {
    const searchValue = document.getElementById('fromCurrencySearch').value.toLowerCase();
    const options = document.getElementById('fromCurrency').options;
    for (let i = 0; i < options.length; i++) {
        const optionText = options[i].text.toLowerCase();
        options[i].style.display = optionText.includes(searchValue) ? '' : 'none';
    }
}

function filterToCurrency() {
    const searchValue = document.getElementById('toCurrencySearch').value.toLowerCase();
    const options = document.getElementById('toCurrency').options;
    for (let i = 0; i < options.length; i++) {
        const optionText = options[i].text.toLowerCase();
        options[i].style.display = optionText.includes(searchValue) ? '' : 'none';
    }
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        const formatterFrom = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: fromCurrency,
        });

        const formatterTo = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: toCurrency,
        });

        const formattedAmount = formatterFrom.format(amount);
        const formattedConvertedAmount = formatterTo.format(convertedAmount);

        document.getElementById('result').textContent = `${formattedAmount} = ${formattedConvertedAmount}`;
    } catch (error) {
        console.error('Error fetching the exchange rate:', error);
        alert('Failed to fetch the exchange rate. Please try again later.');
    }
}

window.onload = populateCurrencyOptions;
