from datetime import datetime

def construct_api_url_ist(body):
    # Get today's date
    today = datetime.now()

    # Extract day, month, and year
    day = today.day  # Day of the month (1-31)
    month = today.month  # Month (1-12)
    year = today.year  # Full year (e.g., 2024)

    params = (
        f"start$={day}&startmonth={month}&startyear={year}&ird=1&irs=1&ima=1&ipm=0&iph=0&ias=0&iss=0&iob=1&ide=0&ids=0"
        f"&interval=4&tz=0&format=csv&rows=1&objtype=1&objpl={body}&objtxt={body}&town=6077243"
    )
    return params


body = "Mars"
url_params = construct_api_url_ist(body)
print(url_params)