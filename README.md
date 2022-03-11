# Uploadcare Chrome Extension

It's a browser extension that allows you to upload content to the cloud and get a url link to share or use in developing applications.

## Testing on Browser

#### Prerequisites:

1. Git and Node need to be installed on the local system
2. Should have a Chrome browser

### Installation

1. Open the terminal, and clone the repository

```
git clone https://github.com/raghavdhingra/Uploadcare-Chrome-Extension.git
```

2. Install the dependencies of the project

```
npm install
```

3. Rename `.env.example` file to `.env` file. This will prevent the inline script build by react build command and helps in maintaining the Content Security Policy.

4. Build the react project to plain HTML, CSS and Javascript files by:

```
npm run build
```

This will create a build folder in the base directory of the project.

5. Open the Chrome Browser, and type:

```
chrome://extensions
```

6. Click on **Load Unpacked** button and select the same **build** folder
   It will be ready to use.

### Development testing

For updating the extension, or to add up a feature, run the project on the localhost by typing:

```
npm start
```

This will initiate a localhost server on the browser tab and you can update the functionality.

To test within the chrome extension tab, you need to build the application and click refresh package button on the chrome extension page.
![image](https://user-images.githubusercontent.com/24492201/154844643-73cd31c7-7b96-4a6f-a91f-ba7bb428f8b5.png)
