# i3blocks config variables script

This script will allow you to use very basic variables in your i3blocks config.

    #define RED #cc241d

    [cpu]
    script=myscript.sh
    color=RED

turns into

    [cpu]
    script=myscript.sh
    color=#cc241d

## Limitations ( there are many :-( )

* Variable values cannot contain spaces
* There cannot be multiple variables per line
* Variable declaration must happen before variable usage
    ...
    color=RED
    #define RED #cc241d

    would fail!

## Plans

* Solve all the bugs
* Change all the code to C so it can be put into a modified i3blocks program
* (maybe) Figure out a way to do this all with basic linux cli programs (sed,etc.)
