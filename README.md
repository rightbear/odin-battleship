# odin_template

The template repository to initialize practices in The Odin Project

## Install Webpack Process:

1. Create a new directory for our new project, then create a `package.json` file in it.

```
$ npm init -y
```

2. Open `package.json`. If you see `"type": "commonjs"` or `"type": "module"` inside, remove it. Add three scripts inside our `package.json`. Then download new npm packages.

```
$ npm install --save-dev webpack webpack-cli
$ npm install --save-dev webpack-merge
$ npm install --save-dev html-webpack-plugin
$ npm install --save-dev mini-css-extract-plugin
$ npm install --save-dev style-loader css-loader
$ npm install --save-dev html-loader
$ npm install --save-dev webpack-dev-server
```

3. Create a folder called 'src'. Then create some basic HTML, CSS and JavaScript files in the folder.

```
$ mkdir src && cd src && touch index.js greeting.js styles.css template.html
```

4. Add new contents inside our two JavaScript files, one CSS file and one HTML file in 'src' folder. Then back in the project root.
   Create some basic webpack configuration files in the project root.

```
$ cd .. && touch webpack.common.js webpack.dev.js webpack.prod.js
```

5. Add new contents inside our three webpack configuration files. Then run 'dev' script to test Webpack dev server.

```
$ npm run dev
```

6. Open the browser (Webpack dev server is on http://localhost:8080/) and check your devtool in the browser. If you see the sentence "Hello, Odinite!" is printed in the console, Webpack dev server is working well. Press Ctrl+C to terminate Webpack dev server. Then run 'build' script to test the bundle function.

```
$ npm run build
```

7. If the bundle is finished, you will see a new folder called 'dist' is created in the project root. Run Live Server (Live Server is on http://localhost:5500/). Then open the browser and check your devtool in the browser. If you see the sentence "Hello, Odinite!" is printed in the console, the bundle function is working well.

8. Terminate Live Server. Then ceate a `.gitignore` file in the root of your project. Add new contents inside our `.gitignore` file.

```
$ touch .gitignore
```

9. All Webpack commands are tested. Then we can install some tools to maintain consistent code-style throughout the projects.

## Install ESLint & Prettier Process:

1. Download new npm packages.

```
$ npm install --save-dev eslint@latest @eslint/js@latest
$ npm install --save-dev --save-exact prettier
$ npm install --save-dev eslint-config-prettier
```

2. Create the basic ESLint configuration file in the project root. Add new contents inside our ESLint configuration file.

```
$ touch eslint.config.js
```

3. Then use lint code of project files to test the ESLint function.

```
$ npx eslint .
```

4. If linting is finished, create some Prettier configuration files in the project root. One is an empty config file and another is `.prettierignore` file. Add new contents inside the .prettierrc file if you need.

```
$ node --eval "fs.writeFileSync('.prettierrc','{}\n')"
$ node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```

5. Run the following command to check that files are already formatted.

```
$ npx prettier . --check
```

6. Run the following command to overwrite and format all files.

```
$ npx prettier . --write
```

7. All ESLint and Prettier commands are tested. Enjoy building your new project!

## Install Jest & Babel Process:

1. Install Jest using npm package manager

```
$ npm install --save-dev jest
```

2. Open `package.json`. If you see `"test": "echo \"Error: no test specified\" && exit 1"` inside, replace it with `"test": "jest"`.

3. In order for us to be able to use ES6 modules in Jest, we should use Babel. To use Babel, install required dependencies.

```
$ npm install --save-dev babel-jest @babel/core @babel/preset-env
```

4. Configure Babel to target your current version of Node by creating a Babel configuration file in the root of your project. Add new contents inside our Babel configuration file.

```
$ touch babel.config.js
```

5. Get into the 'src' folder. Then create some JavaScript files for testing in the folder.

```
$ cd src && touch sum.js sum.test.js
```

6. Add new contents inside our two JavaScript files in 'src' folder. Then back in the project root. Finally, run our test command.

```
$ npm run test
```

7. Check the terminal and you will see Jest print the following message in the terminal. It means Jest is working well.

```
> jest

 PASS  src/sum.test.js
  my calculation
    ✓ adds 1 + 2 to equal 3 (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.634 s, estimated 1 s
Ran all test suites.
```

## Use Template Process:

1. Choose "odin_template" in "Repository template" field, when creating new repository in Github.

2. Now the new repository is created. If `package.json` and `package-lock.json` is already in the folder, remember to change the content of 'name' field and 'description' field in `package.json`. Also change the content of 'name' field in `package-lock.json`. You should modify the above fields based on the details of your project.

3. Open the folder of repository. If `package.json` is already in the folder, download all npm packages in `package.json` directly. You should navigate to the path of folder containing `package.json` before the downloading.

```
$ npm install
```

4. After the downloading is finished, you can direcly use the following commands in your project.

```
$ npm run dev
$ npm run build
$ npm run test
$ npx eslint .
$ npx prettier . --check
$ npx prettier . --write
```

## Run JavaScript Files Process

1. If you only want to use `node` to run a single JavaScript file and your main Node.js application file is `main.js`, you can call it by typing the following command.

```
$ node main.js
```

2. You can also embed this information into your JavaScript file with a "shebang" line. The "shebang" is the first line in the file, and tells the OS which interpreter to use for running the script.

```
#!/usr/bin/node

// your code
```

3. You can tell the OS to run env with node as the following parameter instead.

```
#!/usr/bin/env node

// your code
```

4. To use a shebang, your file should have executable permission. You can give `main.js` the executable permission by running the following command.

```
$ chmod u+x main.js
```

5. The `node` command has to be re-executed in bash whenever there is a change in the application. To restart the application automatically, use the `nodemon` module. Install the nodemon module globally to system path. Or, you can also install `nodemon` as a development dependency.

```
$ npm i -g nodemon

// or

$ npm i --save-dev nodemon
```

6. This local installation of `nodemon` can be run by calling it from within npm script.

```
$ npm start

// or

$ npx nodemon
```

7. If you only want to use `nodemon` to run a single JavaScript file, run the application using the following `nodemon` command followed by the application's file name. The file will be restarted automatically.

```
$ nodemon main.js
```

## Commit Process:

1. Make a new branch called 'gh-pages'. You only need to do this the first time you deploy. The rest of the steps should be done every time you deploy or redeploy your project.

```
$ git branch gh-pages
```

2. Make sure you have all your work committed

```
$ git status
```

3. Change branch and sync your changes from main so that you’re ready to deploy.

```
$ git checkout gh-pages && git merge main --no-edit
```

4. Bundle our application into dist with your build command.

```
$ npm run build
```

5. Deploy files inside 'dist' folder to Github. The Github page will be built based on contents inside the 'dist' folder. Remember to add your own commit messages (Don't directly use "Deployment commit message") in each commit.

```
$ git add dist -f && git commit -m "<Deployment commit message>"
$ npm run deploy
$ git checkout main
```

6. Go to the Github repository of your project, and check the result of the commit.
