DEBUG = True

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED     = True

# Use a secure, unique and absolutely secret key for
# signing the data. 
CSRF_SESSION_KEY = "development_secret"

# Secret key for signing cookies
SECRET_KEY = "development_secret"

APPLICATION_ROUTE = '/api'