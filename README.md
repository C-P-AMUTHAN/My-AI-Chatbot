# Amuthan's AI Chatbot Project

## Introduction

This AI Chatbot is a personal project created by **C.P. Amuthan**, a 3rd-year Computer Science and Engineering student at **K. Ramakrishnan College of Engineering**. The chatbot is designed to answer questions specifically about the developer, offering personalized responses based on a pre-defined dataset.

## Project Objective

The main objective of this project was to:
- Create an AI-powered chatbot that responds to user queries about the developer.
- Use small-scale, free AI technologies to manage and process queries.
- Build a simple and functional front-end interface connected to an AI-driven backend.

## Frontend Technologies

- **HTML (HyperText Markup Language):** Built the structure of the chatbot, which includes a header (profile picture and name), chat area (for user-bot conversation), and a footer (input field and send button).
- **CSS (Cascading Style Sheets):** Applied basic styling to the chatbot interface, focusing on a minimalistic design.
- **JavaScript:** Handled message sending and receiving within the chat area, and established the connection between the front-end interface and the AI backend for message processing.

## Backend Technologies

The AI Chatbot uses AI platforms to fetch responses to user queries:

- **Botpress:** Used for initial AI integration, but limited due to the free tier restrictions. It retrieved data effectively during testing by fetching responses based on the user's queries.
- **Wit.ai:** A fully free AI platform that enables building chatbots by categorizing user queries into intents. The API key of Wit.ai is used to integrate it with the front-end and handle queries/response flow.

## Database

- The chatbot utilizes a **CSV file** to store the developer’s profile data. The CSV file is hosted on GitHub and is accessed through its hosting URL to fetch responses for the queries.

## How It Works

1. The user interacts with the chatbot through the interface.
2. User queries are sent to the backend, where Wit.ai processes and categorizes the query.
3. Based on the recognized intent, relevant data from the CSV file is fetched and displayed as a response.

## Installation and Usage

To run the chatbot locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/C-P-AMUTHAN/My-AI-Chatbot.git
