<!DOCTYPE html>
<html lang="en">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>IPv6 Subnet Calculator</title>
		<link text="text/css" rel="stylesheet" href="style.css">
		<script type="text/javascript" src="main.js"></script>
	</head>
	<body>
		<div class='calculator'>
			<div class='header'>IPv6 Subnet Calculator</div>
			<div class='inputs'>
				<h4>Enter an IPv6 Address and prefix length</h4>
				<div class="flex-container">
					<select class="flex-item" name='ip-type' id="ip-version-selec">
						<option value="">seleccione</option>
						<option value="ipv4">IPv4</option>
						<option value="ipv6">IPv6</option>
					</select>
					<input class="flex-item ipv4-address" type='text' name='address' id="ipv4-address" style="display:none">
					<input class="flex-item ipv6-address" type='text' name='address' id="ipv6-address" style="display:none">
					<input class="flex-item prefix-len" type="number" name='prefix6' min="0" max="128" id="prefix-ipv6" style="display:none" disabled>
					<input class="flex-item prefix-len" type="number" name='prefix4' min="0" max="32" id="prefix-ipv4" style="display:none" disabled>
					<button class="flex-item check" id="check" disabled>Check</button>
				</div>
			</div>
			<div class='results' id="results" style="display:none">
				<pre class='results-text' id="results-text"></pre>
			</div>
		</div>
	</body>
</html>
