# learn-webgl
Explorations and touching on webgl, on top of a flask webapp with tailwind css.

# Dependencies and setup
1. Create a virtual environment
```
python -m venv venv
```

2. Pip install flask (for now)
```
pip install flask
```

3. Make sure you have npm install
```
npm install npm@latest -g
```

4. Initiate npm configuration file
```
npm init -y
```

5. Install and initiate tailwind
```
npm install -D tailwindcss
npx tailwindcss init
```

6. Add paths to our styles and templates tailwind.config.js
```
content: [
    './templates/**/*.{html,js}',
    './static/js/**/*.{js,jsx,ts,tsx}'
  ],
```

7. Creating our dist and src folders and create a tailwind.css in the src folder

├── README.md
├── main.py
├── node_modules
├── package-lock.json
├── package.json
├── static
│   └── css
│       ├── dist
│       └── src
├── tailwind.config.js
├── templates
└── venv

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

or we can use the @import to later include our custom css classes too

```
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

7. Add the CLI command for running tailwind to your scripts in the package.json
```
"dev": "npx tailwindcss build -i ./static/css/src/input.css -o ./static/css/dist/styles.css --watch"
```

8. Add the compiled styles to the html head tag.
```
<link rel="stylesheet" href="{{ url_for('static', filename='css/dist/styles.css') }}">
```

9. After starting the webserver make sure to run the npm to watch for changes in the styles
```
npm run dev
```

# Installing Three.js
```
npm install three
```