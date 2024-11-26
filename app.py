from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/proxy', methods=['GET'])
def proxy():
    base_url = request.args.get('baseUrl')
    params = request.args.get('params', '')
    full_url = f"{base_url}?{params}"
    try:
        response = requests.get(full_url)
        print(full_url)
        response.raise_for_status()
        return response.text, response.status_code, {'Content-Type': 'text/plain'}
    except requests.RequestException as e:
        return jsonify({"error": str(e), "http_code": response.status_code if response else 'N/A'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='astroinfo', port=8892, ssl_context=('cert.pem', 'key.pem'))