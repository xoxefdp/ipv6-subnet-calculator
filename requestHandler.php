<?php
	require_once 'IPV6SubnetCalculator.php';

	if (isset($_REQUEST['address'])) {
		$address = $_REQUEST['address'];
		$len     = $_REQUEST['prefixlen'];
		$calc = new IPV6SubnetCalculator();
		if ($calc->testValidAddress($address)) {
			$rangedata = $calc->getAddressRange($address, $len);

			$ret = array(
				"abbreviated" => $calc->abbreviateAddress($address),
				"unabbreviated" => $calc->unabbreviateAddress($address),
				"prefixLength" => $_REQUEST['prefixlen'],
				"totalIps" => $calc->getInterfaceCount($len),
				"startIp" => $rangedata['start_address'],
				"endIp" => $rangedata['end_address'],
				"prefixAddress" => $rangedata['prefix_address'],
			);
		} else {
			$ret = array('That is not a valid IPv6 Address');
		}
	} else {
		$ret = array('Request is empty');
	}

	$payload = json_encode($ret);

	header('Content-type:application/json;charset=utf-8');
	echo $payload;
