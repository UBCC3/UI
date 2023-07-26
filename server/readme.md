create virtual environment
python3 -m venv env

activate the environment
source env/bin/activate

update pip
pip install -U pip

install packages
pip install -r requirements.txt

to deactivate the environment
deactive

uvicorn app.main:app --reload

to use ngrok
USE_NGROK=True uvicorn app.main:app --reload
