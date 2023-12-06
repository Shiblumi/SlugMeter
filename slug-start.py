#!/usr/bin/env python3
import subprocess, os, time, platform

def start_command_in_new_terminal(command):
    if platform.system() == 'Windows':
        subprocess.Popen(f'start cmd /k "cd /d {os.getcwd()} && {command}"', shell=True)
    elif platform.system() == 'Linux':
        subprocess.Popen([os.getenv('SHELL'), '-c', f'cd {os.getcwd()} && {command}'])
    elif platform.system() == 'Darwin':
        subprocess.Popen(['osascript', '-e', f'tell app "Terminal" to do script "cd {os.getcwd()} && {command}"'])
    else:
        raise Exception("Unsupported operating system")

# Define paths
frontend_path = "./frontend/slug-meter-react/"
backend_path = "./backend/Server/"

# Change to frontend directory and run npm start
os.chdir(frontend_path)
print(f"Current directory: {os.getcwd()}")
start_command_in_new_terminal("npm start")

# Change back to the original directory
os.chdir("../../")
print(f"Current directory: {os.getcwd()}")

# Change to backend directory and run node server.js
os.chdir(backend_path)
print(f"Current directory: {os.getcwd()}")
start_command_in_new_terminal("node server.js")
