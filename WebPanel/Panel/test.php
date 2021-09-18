<?php 

$loc = json_decode(file_get_contents('../config.json'), true);
$time_keylogs = $loc['time_keylogs'];
$time_screenshot = $loc['time_screenshot'];
$grab_docs = $loc['grab_docs'];
$grab_photos = $loc['grab_photos'];	
$grab_txt = $loc['grab_txt'];

echo "<br />". $time_keylogs;
echo "<br />". $time_screenshot;
echo "<br />". $grab_docs;
echo "<br />". $grab_photos;
echo "<br />". $grab_txt;



?>