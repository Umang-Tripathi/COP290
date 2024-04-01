from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with your actual secret key

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# User Model

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    scores = db.relationship('Score', backref='user', lazy=True)


# Score Model
class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)




# Initialize Database within Application Context
with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return render_template('login_page.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    try:

        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

            new_user = User(username=username, password_hash=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            
            flash('Registration successful! Please login.')
            return render_template('login_page.html')

        return render_template('register_page.html')
    except:

        flash('You have already registered, Please login.')
        return render_template('register_page.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        session['username'] = user.username
       
        global UserName
        UserName=user.username
        return render_template('home_page.html')
        return render_template('home_page.html')
        
    else:
        flash('Invalid username or password')
        return redirect(url_for('index'))



@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/home')
def home_page():
    if 'user_id' in session:
        return render_template('home_page.html')
    else:
        return redirect(url_for('index'))

@app.route('/login',methods = ['GET', 'POST'])
def login_page():
    return render_template('login_page.html')



@app.route('/maze', methods=['GET','POST'])
def maze_page():
    if 'user_id' in session:
        return render_template('maze.html')
    else:
        return redirect(url_for('index'))


@app.route('/football', methods=['GET','POST'])
def football_page():
    if 'user_id' in session:
        return render_template('football.html')
    else:
        return redirect(url_for('index'))


@app.route('/trash_toss', methods=['GET', 'POST'])
def trash_toss():
    if 'user_id' in session:
        if request.method == 'POST':
            # Here you should process the score sent from the JavaScript
            # For example, you can retrieve the score from the request data
            score = request.json.get('score')
            print(score)
            # if score is not None:   # Check if score is not None
            user_id = session['user_id']
            new_score = Score(score=score, user_id=user_id)
            #print(new_score.score)
            db.session.add(new_score)
            db.session.commit()
           # Do something with the score, like saving it to a database
            return 'Score received successfully'  # Return a response to acknowledge successful receipt
        return render_template('trash_toss.html')
    else:
        return redirect(url_for('index'))

# Profile page
@app.route('/profile')
def profile_page():
    if 'user_id' in session:
        global UserName
        user_id = session['user_id']
        user = db.session.get(User,user_id)
        max_score = db.session.query(db.func.max(Score.score)).filter(Score.user_id == user_id).scalar()
        gloabal_max_score = db.session.query(db.func.max(Score.score)).scalar()
        if max_score is None:
            max_score = " NA "  # Set max_score to 0 if no scores found
        return render_template('profile_page.html', str=UserName, max_score1=max_score, gloabal_max_score=gloabal_max_score)
    else:
        return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)

app.run()
