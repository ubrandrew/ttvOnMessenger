# Import flask and template operators
from flask import Flask, render_template

# Define the WSGI application object
app = Flask(__name__, instance_relative_config=True)

# Configurations
app.config.from_object('config')
app.config.from_pyfile('config.py')

# Define the database object which is imported
# by modules and controllers
