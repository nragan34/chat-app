
/**

-----------------------------------------
How to Run Cypress in WSL2 :::::: Headless with - Xvfb :::::
-----------------------------------------
-----------------------------------------
1.) Install Chrome in WSL 

Dependencies::::
sudo apt-get update
sudo apt-get install -y curl unzip xvfb libxi6 libgconf-2-4

Chrome itself:
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb

Ensure it worked:
google-chrome --version

------------

2.) Download, unzip, and put it in your bin directory:::
https://chromedriver.storage.googleapis.com/your-chrome-version/chromedriver_linux64.zip
wget https://chromedriver.storage.googleapis.com/your-chrome-version/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/bin/chromedriver
sudo chown root:root /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver

Double check it worked:
sudo chmod +x /usr/bin/chromedriver
--------------------------------------------

3.) Install Xvfb if you didn't install it yet and do the following 
sudo apt-get install -y xvfb

4.) For Headless Make sure that Xvfb starts every time the box/vm is booted::::::::::::::::::
Xvfb -ac :99 -screen 0 1280x1024x16 & export DISPLAY=:99

5.) required display settings:::::
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0

6.) Run cypress in chrome headless with the following command::::::::::::::::::
start development server: ng serve
npx cypress run --browser chrome









/**
------------------------------------------
How to Run Cypress tests in WSL2 :::::: Headed with - VcXsrv :::::::::
------------------------------------------
------------------------------------------
helpful tutorial - https://shouv.medium.com/how-to-run-cypress-on-wsl2-989b83795fb6
 
1.) On the Windows Side:
---------------------------------------
Download VcXsrv and install. You can set the settings to your preference (Multiple windows and Start no client is recommended), but on the page that lets you enable extra settings, disable access control. This is required as WSL2 has its own IP address, which changes often.

*** Launch xserver app in multi-window mode and check "Disable access control"
----------------------------------------

On the Linux side:
----------------------------------------
2.) Xvfb (short for X virtual framebuffer) is an in-memory display server for UNIX-like OS's
It enables you to run graphical applications without a display, while also having the
ability to take screenshots

Install Xvfb if you didn't install it yet and do the following 
sudo apt-get install -y xvfb

3.) this is a fallback to headless if xserver is not launched
Xvfb -ac :99 -screen 0 1280x1024x16 & export DISPLAY=:99
---------------------------------------

4.) export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0

5.) confirm this changed your display settings::::
echo $DISPLAY
------------------------------------------

6.) optionally add the export line to your .bashrc or .zshrc file. Adding to this file will set the DISPLAY varaible to what you need everytime a new terminal is initialized

---------------------------------------- 
7.) What do these linux commands do??

Grep:::: searches for lines matching a regex pattern and prints those matching lines to the standard output
Basic syntax - grep [OPTIONS] PATTERN [FILE...]
(a) Scans files and quicly search for matching patterns
(b) Prints the entire line when a match is found

AWK Operations:::: full-fledged progamming language that is comparable to perl. Offers a ton of built-in functions for string,
arithmetic, and time manipulation but also allows the user to define his own functions just like any regular scripting language
Basic syntax - awk [options] script file 
(a) Scans a file line by line 
(b) Splits each input line into fields 
(c) Compares input line/fields to pattern 
(d) Performs action(s) on matched lines 
------------------------------------------

----------------------------------------
8.) How do you run all of this stuff??

 * Start your VcXsrv server using the XLaunch shortcut on the Windows side
 * 
 * Start development server in WSL:
 * ng serve
 * 
 * Start cypress tests:
 * npx cypress open
------------------------------------------








------------------------------------------
For Jasmin tests
How to run Unit Testing in WSL2:
------------------------------------------
------------------------------------------
Two things you will need to do.
(1) make sure your spec files don't contain errors. 
If they do you may run into this error: Incomplete: No specs found, , randomized with seed 42905

(2) follow the startup of your headed or headless server directions above

-----------------------------
Trouble shoot unit testing: 
(a) your may need to create a tmp directory on your windows side here:
C:\tmp

(b) you may need to set your CHROMOE_BIN variable to chrome on the windows side:
--------------------------------
3). You should be able to run your unit tests now. If not, you may need to install dependencies. 
ng test
----------------------------------------






/** 

----------------------------------------
 Optional dbus settings you can try:::::
// dbus is needed for inter-process communications. 
// By default it uses unix sockets (that are not implemented in WSL). So, we may try to replace with tcp
// But first it need to be installed (which was done in Step 1 above, with sudo apt install dbus-x11) and configured.
a) .bashrc changes - add the follosing to your .bashrc

# X Server
export LIBGL_ALWAYS_INDIRECT=1
export DISPLAY=0:0
# Setup a D-Bus instance that will be shared by all X-Window apps
pidof dbus-launch 1> /dev/null || dbus-launch --exit-with-x11 1> /dev/null 2> /dev/null
# Alternatively, the following
# sudo /etc/init.d/dbus start &> /dev/null

b) Grant our user access without password to the dbus service

Run the following command:
~$ sudo visudo -f /etc/sudoers.d/dbus

Then paste the following text inside the Nano editor that will launch (Replace your_username with your linux username):
your_username ALL = (root) NOPASSWD: /etc/init.d/dbus

c) Prepare dbus to tcp use instead of sockets (to add pain to injury, we use vim to edit - you can change with nano if you want).
cd /usr/share/dbus-1 && sudo vim session.conf

add
<!-- <listen>unix:tmpdir=/tmp</listen> || Original Command --> 
and
add:<listen>tcp:host=localhost,bind=0.0.0.0,port=0</listen>
<auth>EXTERNAL</auth>
<auth>DBUS_COOKIE_SHA1</auth>
<auth>ANONYMOUS</auth> 

Restart Linux Console and it should work

----------------------------------------








// sudo apt --purge autoremove

/////// Write a script

// check if scripts are installed correctly
// install necessary dependencies
// check if xserver is installed on windows side
// start xserver



// run tests on single cypress file
npx cypress run --browser chrome --spec cypress/integration/firsttest.spec.js


// start xserver on windows side
./vcxsrv.exe :0 -multiwindow -clipboard -wgl

 */

describe('My first test', () => {
    beforeEach(() => {
        // Visit Localhost
        cy.visit('localhost:4200/')
        // Login as user #2
        cy.fixture('login').then((login) => {
            cy.get('#email')
                .type(login.email)
            cy.get('#password')
                .type(login.password)

            cy.get('[data-test="login-button"]').click()
        })
    })


    // tip: add data-tests to stuff that needs testing - data-test="new-todo"

    // Create a chat
    it('will create a new chat', () => {
        cy.visit('localhost:4200/')
        cy.get('.right-content-container textarea')
            .type('testing text area')
        cy.get('.right-content-container button').click();
    })

    // delete husq
    it('will delete husq', () => {
        cy.get('[data-test="remove-husq-button"]').click()
    })

    // update user profile
    it('update user profile age to 30 and confirm update', () => {
        // Visit Localhost
        cy.visit('http://localhost:4200/edit/2')
        // update age
        cy.get('[data-test="age-input"]').clear().type('30');
        // submit update
        cy.get('[data-test="update-profile-button"]').click()
        // Visit Localhsot profile
        cy.visit('http://localhost:4200/edit/2')
        // check age is 30
        cy.get('[data-test="age-input"]').should('have.value', '30')
    })

    // check user profile age value
    it('check user profile age is 42', () => {
        cy.visit('http://localhost:4200/edit/2')
        cy.get('[data-test="age-input"]').should('have.value', '42')
    })

    it('get windows location', () => {
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:4200/');
        })
    })

    it('get the current url', () => {
        cy.url().should('eq', 'http://localhost:4200/')
    })



    // it('should exist accessToken in localStorage', () => {
    //     cy.getLocalStorage().then(
    //         window => window.localStorage.getItem('users')
    //             // .should(() => {
    //             //     expect(localStorage.getItem('likes')).to.equal('[{"id":"1","husqId":"2","likes":["1","3"]}]')
    //             // })
    //         )
    //   });

    //   let storedLikes = window.localStorage.getItem('likes');
    //   cy.log('logging storedLikes, ', storedLikes);
    //   storedLikes.to.equal('[{"id":"1","husqId":"2","likes":["1","3"]}]');

    // news stuff with localhost

    // delete user

    // add user


})
