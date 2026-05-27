from flask import Flask
from flask import request
from flask import jsonify

import os
import subprocess

app = Flask(__name__)

UPLOAD="uploads"

os.makedirs(UPLOAD,exist_ok=True)

@app.route("/generate",methods=["POST"])
def generate():

    photo=request.files["photo"]
    audio=request.files["audio"]

    photo_path=f"{UPLOAD}/face.jpg"
    audio_path=f"{UPLOAD}/voice.wav"

    photo.save(photo_path)
    audio.save(audio_path)

    output_video="generated/result.mp4"

    subprocess.run([
        "python",
        "SadTalker/inference.py",
        "--driven_audio",
        audio_path,
        "--source_image",
        photo_path,
        "--result_dir",
        "generated"
    ])

    return jsonify({
        "video":output_video
    })

if __name__=="__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )
