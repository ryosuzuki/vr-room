# vr-room

## Installation

Clone the repository
```
git clone git@github.com:ryosuzuki/vr-room.git
cd vr-room
```

Install and run on `localhost:8080`
```
npm install
node server.js
```

## Install Ngrok
Go to [ngrok](https://ngrok.com/) and sign up

Download and install.

For Mac, for example, I copied the binary file to usr directory and made an alias
```
cd Downloads
unzip ngrok-stable-darwin-amd64.zip
mv ngrok /usr/local/bin/
```

Create an alias (`~/.zshrc`) by adding `alias ngrok="/usr/local/bin/ngrok"` and reload with `source ~/.zshrc`

Register it
```
ngrok authtoken YOUR_TOKEN
```

## Run the server and deploy
```
cd vr-room
node server.js
```

and open another tab
```
ngrok http 8080
```

then access `https://[ngrok-id].ngrok.io`

![](https://user-images.githubusercontent.com/1428255/61892116-f857c900-aebf-11e9-9327-600805a28b85.png)


## Note

qualisys-rt should be v0.2.4! v0.3.x does not work
