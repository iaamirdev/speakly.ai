from flask import Flask, request, jsonify, render_template
from googletrans import Translator

app = Flask(__name__)


translator = Translator()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data.get('text', '')
    src_lang = data.get('src_lang', 'en')  # default to English
    dest_lang = data.get('dest_lang', 'es')  # default to Spanish

    try:

        translation = translator.translate(text, src=src_lang, dest=dest_lang)
        return jsonify({
            'original_text': text,
            'translated_text': translation.text
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
