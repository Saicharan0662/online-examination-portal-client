import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import io from 'socket.io-client';
import Peer from "peerjs";
// var Peer = require('simple-peer')

let socket = io.connect('http://localhost:5000');

const Room = () => {
    const user = JSON.parse(localStorage.getItem('userData')) ?
        JSON.parse(localStorage.getItem('userData')).user : null;


    const { roomID } = useParams()
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const myVideo = useRef(null);
    const videoGrid = useRef(null);
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer(user.userID);

        peer.on('open', (id) => {
            socket.emit('join-room', roomID, user.userID, user.name, user.email)
        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: false }, (mediaStream) => {
                const vid = document.getElementById('myvideo')
                vid.srcObject = mediaStream
                var isPlaying = vid.currentTime > 0 && !vid.paused && !vid.ended
                    && vid.readyState > vid.HAVE_CURRENT_DATA;

                if (!isPlaying) {
                    vid.play()
                }
                call.answer(mediaStream)
                call.on('stream', function (remoteStream) {
                    const rVid = document.getElementById('remoteVideo')
                    rVid.srcObject = remoteStream
                    var isPlaying = rVid.currentTime > 0 && !rVid.paused && !rVid.ended
                        && rVid.readyState > rVid.HAVE_CURRENT_DATA;

                    if (!isPlaying) {
                        rVid.play()
                    }
                });
            });
        })

        peerInstance.current = peer;
    }, [])

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: false }, (mediaStream) => {

            const vid = document.getElementById('myvideo')
            vid.srcObject = mediaStream
            var isPlaying = vid.currentTime > 0 && !vid.paused && !vid.ended
                && vid.readyState > vid.HAVE_CURRENT_DATA;

            if (!isPlaying) {
                vid.play()
            }
            // currentUserVideoRef.current.srcObject = mediaStream;
            // currentUserVideoRef.current.play();

            const peer = new Peer(user.userID)

            const call = peer.call(remotePeerId, mediaStream)

            call.on('stream', (remoteStream) => {
                const rVid = document.getElementById('remoteVideo')
                rVid.srcObject = remoteStream
                var isPlaying = rVid.currentTime > 0 && !rVid.paused && !rVid.ended
                    && rVid.readyState > rVid.HAVE_CURRENT_DATA;

                if (!isPlaying) {
                    rVid.play()
                }
            });
        });
    }

    socket.on('user-connected', (id, name, email) => {
        // console.log(id, name, email)
        call(id)
    })

    return (
        <div>
            <div>Room: {roomID}</div>
            <br />
            <video id='myVideo' ref={myVideo}></video>
            <div id='peerVideo' ref={videoGrid}></div>

            <div>
                <video ref={currentUserVideoRef} id='myvideo'></video>
            </div>
            <div>
                <video ref={remoteVideoRef} id='remoteVideo' />
            </div>
        </div>
    )
}

export default Room