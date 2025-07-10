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
| Android   | [https://github.com/safadhildev/rnAnimeExplorer/releases/tag/v.1.0.3 ](https://github.com/safadhildev/rnAnimeExplorer/releases/tag/v1.0.4)| 

(Or Visit Releases Page to see all files.)

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
