function caesarCipher(str, shift) {
    shift = shift % 26;
    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            let shiftedCode = code;
            if (code >= 65 && code <= 90) {
                shiftedCode = ((code - 65 + shift + 26) % 26) + 65;
            } else if (code >= 97 && code <= 122) {
                shiftedCode = ((code - 97 + shift + 26) % 26) + 97;
            }
            return String.fromCharCode(shiftedCode);
        }
        return char;
    }).join('');
}

function encrypt() {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    const encryptedText = caesarCipher(inputText, shift);
    document.getElementById('outputText').value = encryptedText;
}

function decrypt() {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    const decryptedText = caesarCipher(inputText, -shift);
    document.getElementById('outputText').value = decryptedText;
}

function clearText() {
    document.getElementById('inputText').value = '';
    document.getElementById('shift').value = 3;
    document.getElementById('outputText').value = '';
}

function toggleFAQ(id) {
    const faqAnswer = document.getElementById(id);
    faqAnswer.style.display = faqAnswer.style.display === 'block' ? 'none' : 'block';
}
