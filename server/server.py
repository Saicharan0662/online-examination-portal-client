from flask import Flask, render_template, Response, jsonify, request, json
from flask_cors import CORS
from flask_mongoengine import MongoEngine
import configparser
from camera import VideoCamera

app = Flask(__name__)
CORS(app)

config = configparser.ConfigParser()
config.read('.ini')
app.config["MONGODB_HOST"] = config['DEV']['DB_URI']
db = MongoEngine(app)


class Proctor_Data(db.Document):
    username = db.StringField()
    useremail = db.StringField()
    examID = db.ObjectIdField()
    userID = db.ObjectIdField()
    left_turn_count = db.IntField()
    right_turn_count = db.IntField()
    max_left_turn_duration = db.IntField()
    max_right_turn_duration = db.IntField()

    def to_json(self):
        return {
            "username": self.username,
            "useremail": self.useremail,
            "examID": self.examID,
            "userID": self.userID,
            "left_turn_count": self.left_turn_count,
            "right_turn_count": self.right_turn_count,
            "max_left_turn_duration": self.max_left_turn_duration,
            "max_right_turn_duration": self.max_right_turn_duration
        }


@app.route('/')
def index():
    return render_template('index.js')


def gen(camera):
    while True:
        frame = camera.get_frame()
        if frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route('/video_feed', methods=['GET'])
def video_feed():
    global cam
    cam = VideoCamera()
    cam.init_proctoring_process()
    return Response(gen(cam),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/save_proctoring_data', methods=['POST'])
def save_proctoring_data():
    req = request.get_data()
    req = json.loads(req)
    userID, username, useremail, examID, = req['userID'], req['username'], \
        req['useremail'], req['examID']
    res = cam.get_proctoring_data()
    print(userID, username, useremail, examID)
    print(res)

    # saving/updating in db
    proctor_data = Proctor_Data.objects(userID=userID, examID=examID).first()
    if proctor_data is None:
        print("data not present")
    else:
        print("data present")
    return jsonify(success=True)


@app.route('/close_camera', methods=['GET'])
def close_camera():
    cam.close_camera()
    return jsonify(success=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True,
            use_reloader=False, debug=True)
