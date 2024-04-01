from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

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

# Score Model (Assuming you have a Score model)
class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('scores', lazy=True))

# Initialize Database within Application Context
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('login_page.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        new_user = User(username=username, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        flash('Registration successful! Please login.')
        return redirect(url_for('index'))

    return render_template('register_page.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        session['username'] = user.username
        return redirect(url_for('home_page'))
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

@app.route('/profile', methods=['GET', 'POST'])
def profile_page():
    if 'user_id' in session:
        # Retrieve the user's scores from the database
        user_id = session['user_id']
        user = User.query.get(user_id)
        if user:
            scores = user.scores
            max_score = max(scores, key=lambda x: x.score).score if scores else 0
        else:
            max_score = 0

        return render_template('profile_page.html', max_score=max_score)
    else:
        return redirect(url_for('index'))

@app.route('/trash_toss', methods=['GET', 'POST'])
def trash_toss():
    if 'user_id' in session:
        if request.method == 'POST':
            data = request.json  # Get the JSON data sent from the client
            score = data.get('score')  # Extract the score from the JSON data
            if score is not None:  # Check if score is not None
                user_id = session['user_id']
                new_score = Score(score=score, user_id=user_id)
                db.session.add(new_score)
                db.session.commit()
                return jsonify({'message': 'Score saved successfully'}), 200
            else:
                return jsonify({'error': 'Score is missing'}), 400
    else:
        return jsonify({'error': 'User not logged in'}), 401

if __name__ == '__main__':
    app.run(debug=True)
