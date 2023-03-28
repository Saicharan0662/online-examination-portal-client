import cv2 as cv
import mediapipe as mp
import time


class VideoCamera(object):
    def __init__(self):
        self.video = cv.VideoCapture(0)
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose()
        self.left_flag = False
        self.right_flag = False
        self.left_turn_count = 0
        self.right_turn_count = 0
        self.max_left_turn_duration = 0
        self.max_right_turn_duration = 0
        self.moved_out_of_frame = False

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

    def findDistance(self, x1, y1, x2, y2):
        return ((x2 - x1) ** 2 + (y2 - y1) ** 2)

    def init_proctoring_process(self):
        p_time1, p_time2 = 0, 0

        while True:
            success, frame = self.video.read()
            if success:
                frame_rgb = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
                results = self.pose.process(frame_rgb)

                if not results.pose_landmarks:
                    self.moved_out_of_frame = True
                if results.pose_landmarks:
                    h, w, c = frame.shape
                    lm = results.pose_landmarks.landmark

                    # left and right turn detection
                    nose_x, nose_y = int(lm[0].x*w), int(lm[0].y*h)
                    left_ear_x, left_ear_y = int(lm[7].x*w), int(lm[7].y*h)
                    right_ear_x, right_ear_y = int(lm[8].x*w), int(lm[8].y*h)

                    left_to_nose = self.findDistance(
                        nose_x, nose_y, left_ear_x, left_ear_y)
                    right_to_nose = self.findDistance(
                        nose_x, nose_y, right_ear_x, right_ear_y)

                    if left_to_nose < 2250:
                        if not self.left_flag:
                            p_time1 = time.time()
                        self.left_flag = True
                    else:
                        if self.left_flag == True:
                            self.left_flag = False
                            self.left_turn_count += 1
                            self.max_left_turn_duration = max(
                                self.max_left_turn_duration, time.time() - p_time1)
                    if right_to_nose < 2250:
                        if not self.right_flag:
                            p_time2 = time.time()
                        self.right_flag = True
                    else:
                        if self.right_flag == True:
                            self.right_flag = False
                            self.right_turn_count += 1
                            self.max_right_turn_duration = max(
                                self.max_right_turn_duration, time.time() - p_time2)

        return None

    def get_proctoring_data(self):
        print("Left Turn Count: ", self.left_turn_count)
        print("Right Turn Count: ", self.right_turn_count)
        print("Max Left Turn Duration: ", self.max_left_turn_duration)
        print("Max Right Turn Duration: ", self.max_right_turn_duration)
        print("Moved out of frame: ", self.moved_out_of_frame)
        return self.left_turn_count, self.right_turn_count, self.max_left_turn_duration, self.max_right_turn_duration, \
            self.moved_out_of_frame

    def __del__(self):
        self.video.release()
