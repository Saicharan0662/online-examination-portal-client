import cv2 as cv


class VideoCamera(object):
    def __init__(self):
        self.video = cv.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        ret, frame = self.video.read()
        if ret:
            ret, jpeg = cv.imencode('.jpg', frame)
            if jpeg is not None:
                return jpeg.tobytes()
            return None
        return None

    def close_camera(self):
        self.video.release()
