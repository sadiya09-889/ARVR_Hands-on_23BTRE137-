import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

# Open webcam
cap = cv2.VideoCapture(0)

while True:
    success, img = cap.read()
    if not success:
        break

    img = cv2.flip(img, 1)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb_img)

    if results.multi_hand_landmarks:
        for handLms in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(img, handLms, mp_hands.HAND_CONNECTIONS)

            # Get index finger tip (landmark 8)
            h, w, c = img.shape
            cx = int(handLms.landmark[8].x * w)
            cy = int(handLms.landmark[8].y * h)

            # 🔴 AR Object: Draw circle following finger
            cv2.circle(img, (cx, cy), 20, (0, 255, 0), -1)

            # 📦 AR Box
            cv2.rectangle(img, (cx-50, cy-50), (cx+50, cy+50), (255, 0, 0), 2)

            cv2.putText(img, "AR Object", (cx-40, cy-60),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)

    cv2.imshow("AR using OpenCV + MediaPipe", img)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()