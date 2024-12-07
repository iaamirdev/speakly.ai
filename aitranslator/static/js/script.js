document.getElementById('translateBtn').addEventListener('click', async function() {
    const sourceText = document.getElementById('sourceText').value;
    const srcLang = document.getElementById('srcLang').value;
    const destLang = document.getElementById('destLang').value;

    if (!sourceText) {
        alert('Please enter some text to translate.');
        return;
    }


    document.getElementById('translateBtn').disabled = true;

    const data = {
        text: sourceText,
        src_lang: srcLang,
        dest_lang: destLang
    };

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.translated_text) {

            const translatedText = document.getElementById('translatedText');
            translatedText.value = result.translated_text;
            translatedText.style.opacity = 1; // Trigger the fade-in animation
        } else {
            alert('Error in translation: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error with the translation request.');
    }


    document.getElementById('translateBtn').disabled = false;
});
