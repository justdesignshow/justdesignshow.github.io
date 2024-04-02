<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="stylesheet" href="style.css">
    <title>JUST DESIGN DEGREE SHOW</title>
    <meta name="description" content="The degree show for Graphic Design BA Hons, Coventry University">
    <style>
        .student-banner::before, .student-banner2 {background-image: url(banners/hohinwan.JPG);}
    </style>
    <head ontouchstart="">
        <nav role="navigation" class="nav1">
            <div id="menuToggle">
                <input type="checkbox" id="Toggle" aria-label="Hamburger Menu"/>
                <span></span><span></span><span></span>
                <ul class="menu">
                    <li><a href="index.html"><h1>HOME</h1></a></li>
                    <li><a href="index.html#about"><h1>ABOUT</h1></a></li>
                    <li><a href="index.html#directions"><h1>DIRECTIONS</h1></a></li>
                    <li><a href="index.html#students"><h1>STUDENTS</h1></a></li>
                </ul>
            </div>
        </nav>
        <div class="topnav" style="align-self: flex-start; z-index: 9999;">
            <a href="index.html"><h1>HOME</h1></a>
            <a href="index.html#about"><h1>ABOUT</h1></a>
            <a href="index.html#directions"><h1>DIRECTIONS</h1></a>
            <a href="index.html#students"><h1>STUDENTS</h1></a>
        </div>
    </head>
    <body>
        <div class="student-banner"></div>
        <div class="student-banner2">
            <div class="student-banner-container">
                <h1 id="name"><span class="student-banner-name"><?php echo $name; ?></span></h1>
                <symbol><span class="student-banner-symbol"><?php echo $symbol; ?></span></symbol>
            </div>
            <div class="student-quote-container">
                <h1><span class="student-banner-name"><?php echo $quote; ?></span></h1>
            </div>
        </div>
        <div class="student-work">
            <div class="work">
            </div>
            <div class="work2">
            </div>
            <div class="work3">
            </div>
        </div>
    </body>
    <script defer src="script.js"></script>
</html>
