Set host and username for database inside db_engine.py

Create virtual environment:
`python3 -m venv env`

Activate the environment:
`source env/bin/activate`

Update pip:
`pip install -U pip`

Install package:
`pip install -r requirements.txt`

To deactivate the environment:
`deactivate`

Start the server:
`uvicorn app.main:app --reload`
