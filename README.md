# 📋 Task Management System

A dynamic, interactive Team Task Board built with Vanilla JavaScript. This application allows users to set up a team, create tasks, and manage them through a drag-and-drop interface with real-time persistence.

## Live Demo

Check out the live version here: [Task Management](https://task-management-mahmoud.vercel.app/)

## Features

- **Team Setup:** Initialize your board by defining team members.
- **Drag & Drop API:** Move tasks seamlessly between the main board and team members.
- **Persistent Data:** All tasks and team settings are saved in LocalStorage.
- **Task Status Management:** Update tasks to "Not-Started", "Ongoing", or "Finished".
- **Smart Notifications:** Real-time feedback for actions (Success/Error) with "pause on hover" logic.
- **Validation:** Prevents moving "Finished" tasks to maintain workflow integrity.
- **Responsive Layout:** Horizontal scrolling for team cards to support multiple members.

## Project Structure

```bash
├── index.html            # Main HTML structure
├── style.css             # Custom styles and layouts
└── js/
    ├── notification.js   # Notification system logic
    ├── modal.js          # Team setup and delete confirmation logic
    └── script.js         # Main app logic (Render, Drag & Drop, State)
```
