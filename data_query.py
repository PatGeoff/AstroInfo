import requests
from datetime import datetime, timedelta
from urllib.parse import urlencode, quote_plus

bodies = {
    "sun": 10,
    "moon": 301,
    "mercury": 199,
    "venus": 299,
    "earth": 399,
    "mars": 499,
    "jupiter": 599,
    "saturn": 699,
    "uranus": 799,
    "neptune": 899
}

def construct_api_url_ist(body):
    today = datetime.now()
    day = today.day
    month = today.month
    year = today.year

    params = {
        "start$": day,
        "startmonth": month,
        "startyear": year,
        "ird": 1,
        "irs": 1,
        "ima": 1,
        "ipm": 0,
        "iph": 0,
        "ias": 0,
        "iss": 0,
        "iob": 1,
        "ide": 0,
        "ids": 0,
        "interval": 4,
        "tz": 0,
        "format": "csv",
        "rows": 1,
        "objtype": 1,
        "objpl": body,
        "objtxt": body,
        "town": 6077243
    }
    return urlencode(params, quote_via=quote_plus)

def create_date_with_time(set_time):
    today = datetime.now()
    hours, minutes = map(int, set_time[0].split(':'))
    date = datetime(today.year, today.month, today.day, hours, minutes)
    if hours < 12:
        date += timedelta(days=1)
    return date

def construct_api_url_jpl(rise, set_time, body):
    id = bodies[body]
    today = datetime.now()
    hours, minutes = map(int, rise[0].split(':'))
    start = datetime(today.year, today.month, today.day, hours, minutes)
    is_dst = start.utcoffset() is not None and start.utcoffset().total_seconds() != 0
    offset = 4 if is_dst else 5
    start_utc = start - timedelta(hours=offset)
    stop_time_date = create_date_with_time(set_time)
    stop_time_utc = stop_time_date - timedelta(hours=offset)
    stop_time = stop_time_utc.isoformat()

    params = (
        f"format=text&COMMAND='{id}'&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=OBSERVER&CENTER=coord@399"
        f"&SITE_COORD='286.42,45.5017,0'&START_TIME='{start_utc.isoformat()}'&STOP_TIME='{stop_time}'"
        f"&STEP_SIZE='20m'&QUANTITIES='4,9,10,29,43,48'&TIME_ZONE=-5"
    )
    return params

def extract_text_between_markers_jpl(data):
    start_marker = "$$SOE"
    end_marker = "$$EOE"
    start_index = data.find(start_marker)
    end_index = data.find(end_marker)
    if start_index == -1 or end_index == -1 or start_index >= end_index:
        return None
    return data[start_index + len(start_marker):end_index].strip()

def get_values_its(data):
    lines = data.strip().split('\n')
    rise, culm, set_time, observable = [], [], [], []
    for i in range(3, 4):
        values = lines[i].replace('"', '').split(',')
        rise.append(values[11])
        culm.append(values[12])
        set_time.append(values[13])
        observable.append(values[15])
    return {
        "rise": rise,
        "culm": culm,
        "set": set_time,
        "observable": observable
    }

def get_values_jpl(data):
    lines = data.split('\n')
    time, azimuth, elevation, magnitude, illumination, constellation, phi, pab_lon, pab_lat = [], [], [], [], [], [], [], [], []
    for line in lines:
        values = line.strip().split()
        if len(values) > 11:
            time.append(values[1])
            azimuth.append(float(values[3]))
            elevation.append(float(values[4]))
            magnitude.append(float(values[5]))
            illumination.append(float(values[7]))
            constellation.append(float(values[8]))
            phi.append(values[9])
            pab_lon.append(float(values[10]))
            pab_lat.append(float(values[11]))
    return {
        "time": time,
        "azimuth": azimuth,
        "elevation": elevation,
        "magnitude": magnitude,
        "illumination": illumination,
        "constellation": constellation,
        "phi": phi,
        "pab_lon": pab_lon,
        "pab_lat": pab_lat
    }

def fetch_data(body):
    base_url = 'https://in-the-sky.org/ephemeris.php'
    params = construct_api_url_ist(body)
    request_string = f"http://localhost:5000/proxy?baseUrl={quote_plus(base_url)}&params={params}"
    
    # Print the request URL
    print(f"Request URL: {request_string}")
    
    try:
        its_response = requests.get(request_string)
        its_response.raise_for_status()
        its_data = its_response.text
        data_its = get_values_its(its_data)
        start_time = data_its['rise']
        stop_time = data_its['set']

        base_url = 'https://ssd.jpl.nasa.gov/api/horizons.api'
        params = construct_api_url_jpl(start_time, stop_time, body)
        request_string = f"http://localhost:5000/proxy?baseUrl={quote_plus(base_url)}&params={params}"
        
        # Print the request URL
        print(f"Request URL: {request_string}")
        
        jpl_response = requests.get(request_string)
        jpl_response.raise_for_status()
        jpl_data = jpl_response.text
        data_jpl = get_values_jpl(extract_text_between_markers_jpl(jpl_data))
        return data_jpl
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None
    base_url = 'https://in-the-sky.org/ephemeris.php'
    params = construct_api_url_ist(body)
    request_string = f"http://localhost:5000/proxy?baseUrl={base_url}&params={params}"
    try:
        its_response = requests.get(request_string)
        its_response.raise_for_status()
        its_data = its_response.text
        data_its = get_values_its(its_data)
        start_time = data_its['rise']
        stop_time = data_its['set']

        base_url = 'https://ssd.jpl.nasa.gov/api/horizons.api'
        params = construct_api_url_jpl(start_time, stop_time, body)
        request_string = f"http://localhost:5000/proxy?baseUrl={base_url}&params={params}"
        jpl_response = requests.get(request_string)
        jpl_response.raise_for_status()
        jpl_data = jpl_response.text
        data_jpl = get_values_jpl(extract_text_between_markers_jpl(jpl_data))
        return data_jpl
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

if __name__ == '__main__':
    data = fetch_data("venus")
    if data:
        print(data)
    else:
        print("Failed to fetch data.")
