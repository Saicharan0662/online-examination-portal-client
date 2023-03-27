from flask import Flask, render_template, Response, jsonify
from flask_cors import CORS
import cv2 as cv
import time

from camera import VideoCamera

app = Flask(__name__)
CORS(app)


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
    return Response(gen(cam),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/close_camera', methods=['GET'])
def close_camera():
    cam.close_camera()
    return jsonify(success=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True,
            use_reloader=False, debug=True)
