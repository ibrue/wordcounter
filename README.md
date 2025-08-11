# 🎤 Real-Time Word Counter

A web application that listens to speech in real-time and counts how many times a specified word is spoken.

## ✨ Features

- **Real-time speech recognition** using the Web Speech API
- **Live word counting** with visual feedback
- **Interactive transcript** showing all spoken words
- **Highlighted matches** for easy identification
- **Confidence scoring** to show recognition accuracy
- **Responsive design** that works on all devices
- **Modern UI** with smooth animations

## 🚀 How to Use

1. **Open the app** in a modern web browser (Chrome, Edge, Safari recommended)
2. **Enter a word** you want to count in the input field
3. **Click "Start Listening"** to begin speech recognition
4. **Speak naturally** - the app will count your specified word in real-time
5. **View results** in the counter and live transcript
6. **Stop listening** when you're done
7. **Reset the counter** to start over

## 🛠️ Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Speech Recognition**: Web Speech API (webkitSpeechRecognition)
- **Browser Support**: Chrome, Edge, Safari (requires HTTPS in production)
- **No external dependencies** - runs entirely in the browser

## 📱 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best support |
| Edge | ✅ Full | Chromium-based |
| Safari | ✅ Full | iOS 14.5+ |
| Firefox | ❌ None | No Web Speech API support |

## 🔧 Setup

1. Clone or download the files
2. Open `index.html` in a supported browser
3. Allow microphone access when prompted
4. Start speaking!

## 🎯 Use Cases

- **Language learning** - Count specific vocabulary words
- **Speech therapy** - Track word frequency in practice sessions
- **Public speaking** - Monitor filler word usage
- **Research** - Analyze speech patterns
- **Fun** - Challenge friends to say a word multiple times

## ⚠️ Important Notes

- **Microphone permission** is required for speech recognition
- **HTTPS is recommended** for production use (required by some browsers)
- **Clear speech** produces better recognition results
- **Background noise** may affect accuracy
- **Browser compatibility** varies - Chrome provides the best experience

## 🎨 Customization

The app is easily customizable:

- **Colors**: Modify the CSS variables in `styles.css`
- **Language**: Change `lang` property in `script.js`
- **UI elements**: Adjust the HTML structure in `index.html`
- **Recognition settings**: Modify parameters in the JavaScript code

## 🐛 Troubleshooting

**Speech recognition not working?**
- Check browser compatibility
- Ensure microphone permissions are granted
- Try refreshing the page
- Use Chrome or Edge for best results

**Poor recognition accuracy?**
- Speak clearly and at a normal pace
- Reduce background noise
- Check microphone quality
- Ensure good internet connection

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the app!

---

**Happy counting! 🎉** 