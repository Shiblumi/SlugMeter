#!/usr/bin/env python3
import subprocess, os
    
cmd_start_server = "node server.js"
cmd_start_frontend = "npm start"
subprocess.Popen(cmd_start_server, shell=True)
os.chdir("frontend/slug-meter-react")
subprocess.Popen(cmd_start_frontend, shell=True)