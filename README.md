# Kasagi Labo Coding Challenges (FrontEnd)

**Date:** 10 Jul 2025  
**Name:** Syed Ahmad Fadhil  
**Email:** safadhil95@gmail.com  

---

## Prerequisite

Make sure the following are installed before running the project:

- **React Native**: 0.80.1  
- **Node.js**: Version >= 18  
- **Java**: Version 17.0.15  

---

## How to Run

1. Install dependencies:
   ```bash
   npm i
   ```

2. Start the Metro bundler:
   ```bash
   npm run start
   ```

3. Run the app:
   - For Android:
     ```bash
     npm run android
     ```
   - For iOS:
     ```bash
     npm run ios
     ```
---

## Download App

| Platform  | Download Link                                                       |
|:---------:|:--------------------------------------------------------------------|
| Android   | https://github.com/safadhildev/rnAnimeExplorer/releases/tag/v1.0.5  | 

(Or Visit Releases Page to see all files.)

---

## Screenshots
| Screen Name  | Screenshots                                                         | Extra Details |
|:------------:|:-------------------------------------------------------------------:|:----------|
| Home         |  <img alt="" src="https://github.com/user-attachments/assets/8e0f10e4-bb7d-4ddf-8be7-e4d181fd2add" width="130"/> | Recommendation section will auto scroll every 3s |
| Details      |  <img alt="" src="https://github.com/user-attachments/assets/b737a07f-2897-4794-b20f-b056c993afc6" width="130"/> | Image section is embedded with sensor, user can rotate/tilt device too see the effect. User can share the anime link |
| Explore      | <img alt="" src="https://github.com/user-attachments/assets/05e67db1-2076-4552-8db0-631de3c3c43c" width="130" />  <img alt="" src="https://github.com/user-attachments/assets/f4805647-3de6-4018-8215-9bbe6aeb8953" width="130"/> | User can search, and  filter by status/genres. infinite scroll list |
| Favourites   | <img alt="" src="https://github.com/user-attachments/assets/c340c747-4aeb-405f-9eee-ca423e834ea8" width="130"/><img alt="" src="https://github.com/user-attachments/assets/da4a454d-9247-4b96-a2f2-91ae7f74fcc8" width="130"/> | Show list of favourited animes |



// video src="https://github.maybank.com/MSS-DB/maya-mobile/assets/1707/18244a7a-ad03-4f1b-aa2d-96be56d00c87" alt=""/> 
---

## Known Limitations / Trade-offs

- Due to the lack of an Apple Developer Subscription, I’m currently unable to build a release version for iOS. Therefore, I’ve decided to focus on the Android platform for this assessment.

---

## Thought Process & Architecture Decisions

- **State Management**:  
  Since this is a relatively small app, I opted for the built-in **React Context API** instead of a more complex solution like Redux or Zustand.

- **Navigation**:  
  I’m using **React Navigation v7** for screen management.

- **Bottom Tab Bar**:  
  The bottom tab navigation is implemented using **React Navigation’s Bottom Tab Navigator**, with a **custom TabBar** design to better suit the app’s look and feel.

- **Theme**:  
  Light and Dark themes are handled using **React Navigation v7’s built-in theming** system.

- **Styling**:  
  All styles are defined using React Native’s built-in **`StyleSheet`**, which I find straightforward and easy to manage for customization.

---

Feel free to clone this repo and test it out. If you encounter any issues or have suggestions, feel free to reach out!
