# VS Statuses 📢

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/aleung27/VS-Statuses?include_prereleases)

![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/aleung27.vs-statuses)
![Visual Studio Marketplace Last Updated](https://img.shields.io/visual-studio-marketplace/last-updated/aleung27.vs-statuses)
![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/aleung27.vs-statuses)

[![GitHub stars](https://img.shields.io/github/stars/aleung27/VS-Statuses)](https://github.com/aleung27/VS-Statuses/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/aleung27/VS-Statuses)](https://github.com/aleung27/VS-Statuses/issues)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/aleung27/VS-Statuses)

[![GitHub license](https://img.shields.io/github/license/aleung27/VS-Statuses)](https://github.com/aleung27/VS-Statuses/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Faleung27%2FVS-Statuses)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Faleung27%2FVS-Statuses)

**Depreciated and disabled extension (server has been shut down)**

🔸 Want to see what all your friends are working on?

🔸 Want to see who else is coding with you at 3am the night before your project is due?

🔸 Want everyone to know you code in Rust or Julia?

Look no further, this is the extension for you (and your friends!).

VS Statuses is the latest extension for [Visual Studio Code](https://code.visualstudio.com/) bringing a social element to the often lonesome task of programming. Keep in touch with all the friends you follow on Github, seeing their latest statuses containing their recent coding activity whilst also sharing your own status!

For the VS Statuses API click [here](https://github.com/aleung27/VS-Statuses-api).

## 🙏🏻 Support 🙏🏻

Donations of any amount are greatly appreciated to help fund my uni-student diet of instant ramen packs and my bubble tea addiction 🍜 (along with servers - those are expensive af!)

<p style="text-align:center;" align="center"><a href='https://ko-fi.com/C0C73LYUO' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi4.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com'/></a></p>

Sharing this extension with your friends, family, colleagues or anyone is also a great way to help support this project and you have my thanks 🗣! 
## 💡 Features 💡

- See statuses of users that you follow on **Github**
- Transmit your own status so followers can see what you are working on
- Statuses are both automatically transmitted and received - even when not viewing the VS Statuses tab!
- Seamless integration with **Github Authentication** leverages their platform to create a social network with no need to create a profile to use VS Statuses. Follow more people to see their statuses!
- Ability to choose what data to share with your followers including obscuration of file names, folder names and the ability to enter "Ghost Mode"
- Bottom taskbar icon to set a custom message for your status

<figure><img src='https://i.postimg.cc/Z5KbFkq8/Home.png' border='0' alt='Home.png'/><p style="text-align:center" align="center">Click on the megaphone icon in the sidebar to use VS Statuses</p></figure>
<br/>

Statuses consist of the following information:

- Github Username (with display name if set)
- Profile Picture from Github
- Activity timestamp showing last time the user was active
- A custom status message set by the user (optional)
- Filename with language icon (optional)
- Folder name with a folder icon (optional)

<figure><img src="https://s2.gifyu.com/images/status.gif" border="0" alt="Edit Status.png" width="100%"/><p style="text-align:center;" align="center">Update your custom status message in the bottom taskbar</p></figure> 
<br/>

## 🚗 Roadmap 🚗

🔹 More fine-grained detection of 'active' status to reflect when idle or when VS Code is minimised

🔹 Interactive features between users (e.g. poking)

Want to see something else not on the list? Head [here](https://github.com/aleung27/VS-Statuses/issues) and submit a ticket!

## 💻 Installation 💻

1. In the sidebar of VS Code, click on the **Extensions** icon
2. Type `VS Statuses` into the searchbar
3. Click on the **Install** button
4. After installation, a new icon should appear on your sidebar. Click on it to use the `VS Statuses` extension!

Alternatively, open up the `Quick Open` dialog using `Ctrl + P` and type:

`ext install VS Statuses`

Note that on initial installation you will need to authenticate with Github in order to use the extension!

## ⚙️ Extension Settings ⚙️

Sometimes you just don't want everyone to know about that next big project you're making (or that you're STILL not done with that assignment 😣).

Luckily, we've got you covered with the following nifty settings:

* Ghost Mode (`vs-statuses.ghostMode`): When you just gotta disappear off the face of the earth for a while, this one is for you. You stop sending status updates and appear offline to all your friends (they will see the last status you had before turning on Ghost Mode). It's a two way street though - you also won't be able to see any new status updates from people you are following. Spooky! 👻
* Hide Workspace Name (`vs-statuses.hideWorkspaceName`): Hides your workspace folder from being transmitted in your status updates.
* Hide File Name (`vs-statuses.hideFileandLanguageName`): Hides your file name AND the language you are coding in from being transmitted in your status updates.

Not only this we make it super easy for you to toggle these settings on and off on the fly from the handy settings located in the top right of the VS Statuses panel.

[![Settings.png](https://i.postimg.cc/RZ2JvRdj/Settings.png)](https://postimg.cc/9DtQpyvp)

## 🤝 Contribution Guide 🤝

💙 Great that you want to contribute; contributions are always very welcome! 💙

Usual Github contribution flow:

1. Fork this repository
2. Clone your fork to your local development environment
3. Create a branch from `master` for you to work off of
4. Commit and push your changes
5. Open a pull request
6. Wait to get approved!

✨ And your done! ✨

Make sure to add comments as you make your changes. Follow existing coding patterns and idioms already present in the project.

Found a bug or got a suggestion? Feel free to submit a new [Issue](https://github.com/aleung27/VS-Statuses/issues)
