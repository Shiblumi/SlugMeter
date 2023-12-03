#!/usr/bin/env python3
import subprocess, os, time
    
cmd_start_server = "node server.js"
cmd_start_frontend = "npm start"
print("Starting Server.js...")
subprocess.Popen(cmd_start_server, shell=True)
os.chdir("frontend/slug-meter-react")
time.sleep(3)
print("Starting React Frontend...")
subprocess.Popen(cmd_start_frontend, shell=True)