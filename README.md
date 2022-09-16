VideoChat Application [Discord Clone] MongoDB, Express, React, Node with WebRTC and SocketIO for realtime communication possibility.

About Project:
Live demo - https://discordclone-client.vercel.app .

A MERN Stack Application built from Scratch which connects to WebRTC and SocketIO to provide group call functionality(video and audio Streaming) and one-to-one messaging in Realtime.

Functionality
1. Login / Registration (Authentication with JWT Token).If JWT Token Expires or is not availabe user is redirected to login page.
2. Friends Invitation System Realtime chat functionality (SocketIO and MongoDB)
3. Creating Video Group Call Rooms (WebRTC thanks to simple-peer)
4. Built complete Backend with Endpoints to retrieve online users, online friends,active rooms.

UI
1. Used MaterialUI and Styled Components To create UI
2. User Form With Complete Form Validation Built from Scratch

Features
1. Login and Registration Form with complete form validation
2. All users connected to server will be stored in server to show online users for realtime updates using socketIO
3. users have the functionality to send friend invite to other users by entering their email id
4. users have the ability to accept and reject friend Invites and data Updates in Real-time.
5. Users have ability to send messages to friends in realtime
6. Online/Offline friends data updates in real-time
7. users can create/join rooms to stream video and audio or only audio of no webcam thanks to webRTC
8. users can also stream their screen and has functionality to change between webcam video or screen sharing
9. users can mute themself while streaming.
10. All the above actions can be performed only if Authenticated via JWT Token based Authentication.
11.Test Driven Development using jest.
