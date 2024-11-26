import requests

def call_proxy(base_url, params):
    proxy_url = 'https://astroinfo:8892/proxy'
    query_params = {
        'baseUrl': base_url,
        'params': params
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    try:
        response = requests.get(proxy_url, params=query_params, headers=headers, verify=False)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        return f"An error occurred: {e}"

# Example usage
if __name__ == '__main__':
    base_url = 'https://ssd.jpl.nasa.gov/api/horizons.api'
    params = (
        "format=text&COMMAND='499'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'"
        "&CENTER='coord@399'&SITE_COORD='45.5017,-73.5673,0'&START_TIME='2024-11-11 18:00:00'"
        "&STOP_TIME='2025-11-12 06:00:00'&STEP_SIZE='1 d'&QUANTITIES='4,9,13,29,43'&TIME_ZONE='-5'"
    )
    result = call_proxy(base_url, params)
    print(result)