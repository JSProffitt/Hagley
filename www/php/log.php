<?php

function logRug($action,$status=null)
{
  $logDate = new DateTime();
  $log = array('Date'=>$logDate->format('Y-m-d H:i:s'), 'Action'=>$action, 'Status'=>$status);
  $csv = new SplFileObject('../log.csv', 'a+');
  $csv->fputcsv($log);
}

if (isset($_POST['action'])) {
	$action = $_POST['action'];
	$status = $_POST['status'];

	logRug($action,$status);
}
