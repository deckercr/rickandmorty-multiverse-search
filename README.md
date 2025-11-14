# 🛸 Wubba Lubba Dub Dub! - Rick and Morty Character Finder

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

> *"Listen Morty, I built this app so you could search through infinite realities and find any version of us. Pretty cool, right?"* - Rick Sanchez (probably)

A sleek, interdimensional React application that lets you explore the multiverse of Rick and Morty characters! Search through hundreds of characters, view detailed profiles, and save your favorites across dimensions.

## ✨ Features

- 🔍 **Real-time Character Search** - Debounced search with instant results
- 🌟 **Favorites System** - Save up to 4 favorite characters (because we're limiting your attachment issues)
- 📱 **Responsive Design** - Works across all devices and dimensions
- 🎨 **Beautiful UI** - Dark theme with smooth animations and hover effects
- 🚀 **Fast Navigation** - React Router for seamless page transitions
- 💾 **Local Storage** - Your favorites persist between sessions
- 🎯 **Context API** - Efficient state management across components

## 🎮 Demo

[Live Demo](#) *(Add your deployment link here)*

## 🖼️ Screenshots

*Coming soon - Add screenshots of your app in action!*

## 🛠️ Tech Stack

- **React 18+** - UI library
- **React Router v6** - Client-side routing with dynamic routes
- **Context API** - Global state management
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP requests to the Rick and Morty API
- **Rick and Morty API** - Character data source

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wubba-lubba-dub-dub.git
   cd wubba-lubba-dub-dub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📁 Project Structure

```
src/
├── contexts/
│   └── CharacterContext.jsx    # Global state management
├── App.jsx                      # Main layout with navigation
├── HomePage.jsx                 # Search and browse characters
├── CharacterDetailsPage.jsx     # Individual character details
├── FavoriteCharactersPage.jsx   # Saved favorites
├── router.jsx                   # Route configuration
├── main.jsx                     # App entry point
└── index.css                    # Global styles
```

## 🎯 Key Concepts Demonstrated

This project showcases several important React patterns and concepts:

- **Context API** - Sharing state across components without prop drilling
- **Custom Hooks** - Using `useContext`, `useState`, `useEffect`, `useCallback`
- **Debouncing** - Optimizing API calls during user input
- **Dynamic Routing** - URL parameters with React Router (`/character/:id`)
- **Local Storage** - Persisting user data between sessions
- **Error Handling** - Graceful API error management
- **Conditional Rendering** - Loading states and empty states
- **Component Composition** - Reusable and maintainable code structure

## 🌐 API Reference

This app uses the [Rick and Morty API](https://rickandmortyapi.com/):

- **Character Search**: `GET /api/character/?name={name}`
- **Character Details**: `GET /api/character/{id}`
- **Multiple Characters**: `GET /api/character/{id1},{id2},{id3}`

## 🎨 Features in Detail

### Search Functionality
- Debounced search (500ms delay) to reduce API calls
- Real-time results as you type
- Handles empty searches and no results gracefully

### Favorites System
- Add/remove characters with one click
- Maximum of 4 favorites (because choices are hard, Morty)
- Persistent across browser sessions
- Visual feedback with color-coded buttons

### Character Details
- Full character information including origin and location
- Beautiful image display
- Easy navigation back to search results

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/) for the awesome free API
- Adult Swim for creating the amazing show
- The React team for an incredible framework

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/wubba-lubba-dub-dub](https://github.com/yourusername/wubba-lubba-dub-dub)

---

<div align="center">

**Made with 💚 and a portal gun**

*"Nobody exists on purpose. Nobody belongs anywhere. Everybody's gonna die. Come search for characters."*

</div>
