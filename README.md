
# lumino
a platform for personalised and structured learning from youtube playlist.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

npm run dev

then , in another terminal , run :

ngrok http --url=[YOUR_NGROK_URL] 3000

This exposes your local app to the internet through a secure tunnel , useful for webhooks or external API testing.

then , inside the genai_backend directory , run : 

uvicorn main:app --reload

This launches the FastAPI backend on http://127.0.0.1:8000 to fetch generative ai content.
