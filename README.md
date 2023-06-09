# FindFreelance_FrontEnd
FindFreelance is a website in Next.js with React, that allows companies to search for freelance according to several criteria and propose them a mission. (3rd year Bachelor - in Progress) 

The website using :
- Node.js, 
- Next.js,
- Local API : https://github.com/KevOneRedOne/FindFreelance_API :
    - Express.js
    - MongoDB
    - Mongoose
    - JWT
    - Bcrypt
    - Nodemailer

## Installation
1. Clone the repository
```bash
git clone https://github.com/KevOneRedOne/FindFreelance_FrontEnd
```

2. Use the .env.example to create a .env file with your own credentials for the API and App
```bash
cd API
```
```bash
cp .env.example .env
```
```bash
cd ../findfreelance
```
```bash
cp .env.example .env
```

3. Install the dependencies for the API
```bash
cd API
```
```bash
npm install
```
a. Then, run the API
```bash
npm run dev
```

4. Install the dependencies for the FrontEnd
```bash
cd ../findfreelance
```
```bash
npm install
```
a. Then, run the FrontEnd
```bash
npm run dev
```
