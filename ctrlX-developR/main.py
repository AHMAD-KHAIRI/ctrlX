from flask import Flask, request
import mysql.connector

app = Flask(__name__)

# Connect to the MariaDB database
try:
    mydb = mysql.connector.connect(
        # host="192.168.0.182",
        host="127.0.0.1",
        user="ctrlxCore",
        password="password",
        database="ctrlx"
    )
    print("Connection to the database established.")
except mysql.connector.Error as err:
    print("Error: {}".format(err))

@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        # Get the form input values
        name = request.form["name"]
        email = request.form["email"]
        team = request.form["team"]
        members = request.form["members"]
        idea = request.form["idea"]

        # Create a cursor object
        cursor = mydb.cursor()

        # Insert the form data into the 'registration' table
        try:
            sql = "INSERT INTO registration (name, email, team, members, idea) VALUES (%s, %s, %s, %s, %s)"
            val = (name, email, team, members, idea)
            cursor.execute(sql, val)

            # Commit the changes to the database
            mydb.commit()

            return "Registration Successful"

        except mysql.connector.Error as err:
            print("Error: {}".format(err))

if __name__ == "__main__":
    app.run(debug=True)
