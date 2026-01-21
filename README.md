# LinkedIn Smart Greet 🚀

A **safe, smart Chrome extension** that helps you generate personalized LinkedIn greeting messages when someone accepts your connection request.

This extension is designed with **responsible automation**, **human-like delays**, and **user control**, making it suitable for students, recruiters, and professionals.

---

## ✨ Features

- ✅ Personalized message generation
- 📝 Custom message templates
- ⏱ Human-like delay timers
- 📊 Daily message limits
- 🔁 Duplicate prevention (one message per profile)
- 🔌 Toggle ON / OFF
- 📈 Analytics (daily & total messages)
- 🤖 AI-based message rewriting (safe & optional)
- 🛡 Manual send (prevents spam & bans)

---

## Why This Extension is Better Than LinkedIn “Say Hello”

LinkedIn’s default “Say Hello” is a generic message that sounds robotic and repetitive.

LinkedIn Smart Greet solves this by:

## Generating personalized messages automatically
Using:

Profile name
Current company
Job title (if available)
Human-like phrasing

## Saving time
No more manual typing for every connection.

## Avoiding duplicates
The extension remembers who you already greeted.

## Providing message templates
Customize templates for:

Students
Recruiters
Professionals
Alumni networking

## Safe & responsible
No auto-send
No API usage

Manual approval only
This makes it less risky than full automation tools.
## ⚠ Disclaimer

This extension is **not affiliated with LinkedIn**.

Use responsibly. Excessive automation may violate LinkedIn’s Terms of Service and could result in account restrictions.  
This tool is intended for **light, human-assisted usage only**.

---

## 📁 Project Structure

linkedin-smart-greet/
│
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── popup.css
├── ai.js
│
├── icons/
│ └── icon128.png
│
└── README.md


---

## 🧠 How It Works

1. User opens LinkedIn on desktop
2. Opens a profile that accepted their connection
3. Ensure the message window is open and click the extension icon." (The content script needs the message box to be present in the DOM to inject the text.)
4. Message is generated using:
   - Profile name
   - Current company (if available)
5. Message is inserted after a short delay
6. User manually clicks **Send**

This approach keeps usage **safe and natural**.

---

## 🛠 Installation (Local / Developer Mode)

### Step-by-step:

1. Clone or download this repository
2. Open **Google Chrome**
3. Go to:
chrome://extensions 
4. Enable **Developer mode** (top-right)
5. Click **Load unpacked**
6. Select the `linkedin-smart-greet` folder

✅ Extension is now installed locally.

---

## 🧪 Testing Guide

Test the following scenarios:

- ✔ Profile with company
- ✔ Profile without company
- ✔ Daily limit reached
- ✔ Extension toggle OFF
- ✔ Delay timer execution
- ✔ Duplicate profile prevention

Recommended:
- Test using your own LinkedIn account
- Do NOT mass message

---

## 🔐 Safety Design Choices

- ❌ No background automation
- ❌ No auto-send messages
- ❌ No LinkedIn API usage
- ✅ User-triggered actions only
- ✅ Rate limits enforced
- ✅ Manual confirmation required

These choices significantly reduce the risk of account restrictions.

---

## 💡 Custom Message Template Example
Hi {{name}}, thanks for connecting!
Great to connect with someone from {{company}} 😊


If no company is found, the message adapts automatically.

---

## 📈 Analytics Tracked

- Messages sent today
- Total messages sent
- Daily usage limit

(All data stored locally in Chrome.)

---

## 🚀 Future Enhancements

- Advanced AI rewriting (API-based)
- Multiple template presets
- Time-based sending (work hours)
- Export analytics
- Chrome Web Store publishing

---

## 🎓 Ideal For

- Students building real-world projects
- Chrome extension learning
- Hackathons & portfolios
- Recruiters & professionals

---

## 📜 License

This project is open-sourced under the MIT License for
personal, educational, and non-commercial use.

For commercial use (including paid extensions, SaaS, or resale),
please contact the author for a commercial license.

---

## 🙌 Author

Built by a student developer with a focus on **safe automation** and **ethical engineering**.

