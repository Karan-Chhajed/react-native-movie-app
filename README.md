# 🎬 React Native Movie App

A cross-platform **React Native + TypeScript** application that lets users explore movies and tv shows, view details, and search seamlessly.  
Built with clean architecture and modern React Native best practices.

---

## 🚀 Live Demo
👉 [View on Expo](

)  
(Scan the QR code with the **Expo Go** app to preview on your device.)

---

## ✨ Features
- 🎥 Browse trending and popular movies and tv shows
- 🔍 Search movies and tv shows with instant results
- 📄 View detailed movie and tv show information
- ⚡ Smooth navigation between screens
- 🎨 Clean UI built with reusable components
- 🛠️ TypeScript for type-safety and maintainability

---

## 🛠️ Tech Stack
- **React Native** (Expo managed workflow)  
- **TypeScript**  
- **Expo Router** for routing  
- **Zustand** for state management
- **React Query** for server data caching/state management
- **TailwindCSS** for styling 
- **Fetch API** for data fetching  
- **TMDB API** (or your chosen movie API)  

---

## 📂 Folder Structure
```
app/
|---- (tabs)/
    |---- _layout.tsx
    |---- index.tsx
    |---- review.tsx
    |---- search.tsx
    |---- watchlist.tsx
|---- movies/
    |---- [id].tsx
|---- tv/
    |---- [id].tsx
|---- _layout.tsx
|---- globals.css
|---- assets/
    |---- fonts/
    |---- images/
|---- components/
    |---- AvailablePlatforms.tsx
    |---- GenreComponent.tsx
    |---- HorizontalList.tsx
    |---- HorizontalMediaCard.tsx
    |---- HorizontalMediaCardWithLink.tsx
    |---- InfoModal.tsx
    |---- SavedMovieCard.tsx
    |---- Search.tsx
    |---- SearchHistory.tsx
    |---- VerticalMediaCard.tsx
    |---- VerticalMediaCardWithLink.tsx
    |---- WhereToWatch.tsx
|---- hooks/
    |---- useMedia.ts
    |---- useMovie.ts
    |---- useMutations.ts
    |---- useTv.ts
|---- services/
    |---- api.ts
    |---- appwrite.ts
|---- store
    |---- store.ts
```
// config and setup files not mentioned.

---

## ✨ How to run on local

- clone the repo
- run an `npm i` to install the dependencies
- run `npx expo start --clear` for fresh or `npx expo start` to run the project
- scan the QR code to view on local device with expo go.

---

Disclaimer!

The project is under development and I plan to regularly improve aspects of it and update some features and designs depending upon
user / community reviews. Its a work in progress, this is just a teaser of what can be done.
Lets collaborate!

Dont forget to leave a review from inside the App as well! Thanks for your time !

