# AngularElements
Let’s start by generating a new Angular CLI app and installing Elements.

Angular Version: 6.0.0
RxJS Version: 6.0.0

ng new elementsApp
cd elementsApp

1. Install @angular/elements
    - ng add @angular/elements

2. Build Component
    - Now it’s time to build our component.
    - One important concept to mention is that our component is using the shadow dom to isolate our CSS styles. This means the CSS will be compiled to JavaScript, rather than regular CSS, allowing us to bundle the entire component with just a single script. Although technically optional, I recommend using the this Native View Encapsulation strategy.
    
    import { Component, OnInit, ViewEncapsulation } from '@angular/core';
    @Component({
        // ...
        encapsulation: ViewEncapsulation.Native 
    });

3. How to Use Angular Elements
    Converting an Angular Component to a custom element can be accomplished with a few simple steps.
    1. Add your component to entryComponents. This is required for any component that is defined, but not directly declared in the app.
    2. Implement the ngDoBootstrap method to manually bootstrap that app.
    3. Call createCustomElement to covert Angular’s component architecture to native DOM APIs.
    Your app.module should looks something like this:

    import { NgModule, Injector } from '@angular/core';
    import { createCustomElement } from '@angular/elements';
    import { UserPollComponent } from './user-poll/user-poll.component';

    @NgModule({
    // ...
    entryComponents:[
        UserPollComponent
    ]
    })
    export class AppModule { 
        constructor(private injector: Injector) {}

        ngDoBootstrap() {
            const el = createCustomElement(UserPollComponent, { injector: this.injector });
            customElements.define('user-poll', el);
        }
    }

4. Remove the App Component
    - Add your custom element to src/index.html
    ex:- <user-poll></user-poll>

5. Let’s install a few Node packages to make life easier.
    - npm install fs-extra concat --save-dev

6. Now create a new file called build-script.js. It will take our three JS bundles and merge them to a single file in the elements directory.

    const fs = require('fs-extra');
    const concat = require('concat');    

    (async function build() {

        const files =[
            './dist/inline.bundle.js',
            './dist/polyfills.bundle.js',
            './dist/main.bundle.js'
        ]
        await fs.ensureDir('elements')
        await concat(files, 'elements/user-poll.js')
        console.info('Elements created successfully!')

    })()

3. Install ngx-build-plus
    - npm install ngx-build-plus --save-dev
4. Open your angular.json and tell the CLI to use ngx-builder-plus instead of the default one:
    [...]
    "architect": {
        "build": {
        "builder": "ngx-build-plus:build",
        [...]
        }
    }
    [...]
5. Create a file webpack.extra.js with a partial webpack config that tells webpack to exclude packages like     @angular/core
        module.exports = {
        "externals": {
            "rxjs": "rxjs",
            "@angular/core": "ng.core",
            "@angular/common": "ng.common",
            "@angular/platform-browser": "ng.platformBrowser",
            "@angular/elements": "ng.elements"
        }
    }
7. Lastly, let’s add a build command to NPM scripts in package.json.
"scripts": {
    "build:elements": "ng build --prod --extraWebpackConfig webpack.extra.js --output-hashing false && node build-script.js",
}


References :-
1. https://angularfirebase.com/lessons/angular-elements-quick-start-guide/
2. https://github.com/manfredsteyer/ngx-build-plus