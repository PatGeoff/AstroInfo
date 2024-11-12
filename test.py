
# Faque mettons que je plug la ligne du 1er janvier 2025 pour Vénus avec le RA de 22,4,15 et le DEC -13,16,9 à 10:02, on devrait avoir un alt proche de zéro. 


from astropy.time import Time
from astropy.coordinates import SkyCoord, AltAz, EarthLocation
from astropy import units as u
from datetime import datetime

# Function to calculate the present Julian date
def get_julian_date(input_datetime=None):
    if input_datetime is None:
        # Use the current UTC time if no datetime is provided
        now = Time(datetime.utcnow(), scale='utc')
    else:
        # Convert the input datetime string to a Time object
        now = Time(input_datetime, scale='utc')

    julian_date = now.jd
    return julian_date

# Function to convert RA/Dec to Altitude/Azimuth
def ra_dec_to_alt_az(ra, dec, latitude, longitude):
    # Define observer location
    location = EarthLocation(lat=latitude * u.deg, lon=longitude * u.deg, height=0 * u.m)
    # Define the time (current UTC time)
    current_time = Time(datetime.utcnow(), scale='utc')
    # Convert RA/Dec to AltAz
    sky_coord = SkyCoord(ra=ra * u.deg, dec=dec * u.deg, frame='icrs')
    altaz_frame = AltAz(obstime=current_time, location=location)
    altaz_coord = sky_coord.transform_to(altaz_frame)
    
    return altaz_coord.alt.deg, altaz_coord.az.deg

# Parameters for Montreal
latitude_montreal = 45.5017   # Latitude of Montreal in degrees
longitude_montreal = -73.5673 # Longitude of Montreal in degrees

def ra_to_degrees(hours, minutes, seconds):
    # Convert hours to degrees
    degrees = hours * 15
    # Convert minutes to degrees
    degrees += minutes * 0.25
    # Convert seconds to degrees
    degrees += seconds * (15 / 3600)  # 15 degrees per hour, divided by 3600 seconds
    return degrees

def dec_to_degrees(degrees, arcminutes, arcseconds):
    # Convert arcminutes to degrees
    decimal_degrees = degrees + (arcminutes / 60) + (arcseconds / 3600)
    return decimal_degrees

# Get Julian date
julian_date = get_julian_date('2025-01-01T15:02:00')
print(f"Current Julian Date: {julian_date}")

# Convert RA/Dec to Altitude/Azimuth
altitude, azimuth = ra_dec_to_alt_az(ra_to_degrees(22,4,15), dec_to_degrees(-13,16,9), latitude_montreal, longitude_montreal)
print(f"Altitude: {altitude:.2f} degrees, Azimuth: {azimuth:.2f} degrees")