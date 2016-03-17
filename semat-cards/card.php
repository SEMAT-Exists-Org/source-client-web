<html>
<head>
<link href="card.css" rel="stylesheet" type="text/css" media="all" />
</head>
<body>
<?php
#phpinfo();
?>
<img src="semat_blank.png">
    <div class="alpha">
    <?php
        if (!isset($_GET["alpha"])) {
        print "Not Set";
        } else {
        print $_GET["alpha"];
        }
    ?>
    </div>
    <div class="state">
    <?php
        if (!isset($_GET["state"])) {
        print "Not Set";
        } else {
        print $_GET["state"];
        }
    ?>
    </div>
    <div class="bullets">
    <ul>
    <?php
    if (!isset($_GET["bullet"])) {
    print "Not Set";
    } else {
        foreach ($_GET["bullet"] as $bullet) {
        print "<li>" . $bullet . "</li>";
        }
    }
    ?>
    <ul>
    </div>

    <div class="number">
    <?php
        if (!isset($_GET["number"])) {
        print "Not Set";
        } else {
        print $_GET["number"] . "/" . $_GET['max'] ;
        }
        ?>
    </div>
</body>
</html>
