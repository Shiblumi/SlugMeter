#!/usr/bin/env python3
import subprocess, os, time, platform

def start_command_in_new_terminal(command):
    if platform.system() == 'Windows':
        # On Windows, use 'start' to open a new command prompt window
        subprocess.Popen(f'start cmd /k "{command}"', shell=True)
    elif platform.system() == 'Linux':
        # On Linux, use a terminal emulator (e.g., gnome-terminal, xterm)
        subprocess.Popen([os.getenv('SHELL'), '-c', command])
    elif platform.system() == 'Darwin':
        # On macOS, use osascript to open a new terminal window
        subprocess.Popen(['osascript', '-e', f'tell app "Terminal" to do script "{command}"'])
    else:
        raise Exception("Unsupported operating system")

cmd_start_server = "node backend/Server/server.js"
cmd_start_frontend = "npm start"
print("Starting Server.js...")
start_command_in_new_terminal(cmd_start_server)
os.chdir("frontend/slug-meter-react")
time.sleep(3)
print("Starting React Frontend...")
start_command_in_new_terminal(cmd_start_frontend)