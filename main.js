const regexIPv4 = /^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$/,
  regexIPv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

function showElements(input, select) {
  input.style.display = "block";
  select.style.display = "block";
}

function hideElements(input, select) {
  input.style.display = "none";
  select.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const IPv4ORIPv6input = document.getElementById("ip-version-selec"),
    ipv4Input = document.getElementById("ipv4-address"),
    cidrv4Input = document.getElementById("prefix-ipv4"),
    ipv6Input = document.getElementById("ipv6-address"),
    cidrv6Input = document.getElementById("prefix-ipv6"),
		checkBtn = document.getElementById("check"),
		resultContainer = document.getElementById("results"),
    resultBox = document.getElementById("results-text");

  cidrv4Input.value = "16";
  cidrv6Input.value = "64";

	function listenKeyUp() {
		let input = null,
			select = null,
			regex = null;
		if (IPv4ORIPv6input.value == "ipv4") {
			input = ipv4Input;
			select = cidrv4Input;
			regex = regexIPv4;
		} else if (IPv4ORIPv6input.value == "ipv6") {
			input = ipv6Input;
			select = cidrv6Input;
			regex = regexIPv6;
		}
	
		if (regex.test(input.value)) {
			select.disabled = false;
			checkBtn.disabled = false;
		} else {
			select.disabled = true;
			checkBtn.disabled = true;
		}
	}

  IPv4ORIPv6input.addEventListener("change", function (e) {
    ipv4Input.value = "";
    ipv6Input.value = "";
    if (IPv4ORIPv6input.value == "ipv4") {
      hideElements(ipv6Input, cidrv6Input);
      showElements(ipv4Input, cidrv4Input);
      ipv6Input.removeEventListener("keyup", listenKeyUp);
      ipv4Input.addEventListener("keyup", listenKeyUp);
    } else if (IPv4ORIPv6input.value == "ipv6") {
      hideElements(ipv4Input, cidrv4Input);
      showElements(ipv6Input, cidrv6Input);
      ipv4Input.removeEventListener("keyup", listenKeyUp);
      ipv6Input.addEventListener("keyup", listenKeyUp);
    } else {
      ipv6Input.removeEventListener("keyup", listenKeyUp);
      ipv4Input.removeEventListener("keyup", listenKeyUp);
      hideElements(ipv4Input, cidrv4Input);
			hideElements(ipv6Input, cidrv6Input);
    }
  });

  checkBtn.addEventListener("click", function () {
    let formData = new FormData();
    formData.append("address", ipv6Input.value);
    formData.append("prefixlen", cidrv6Input.value);
    new Promise((resolve, reject) => {
      fetch(window.location.href + "requestHandler.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          resultBox.textContent = "";
					resultBox.textContent = `Abbreviated Address: ${data.abbreviated}\nUnabbreviated Address: ${data.unabbreviated}\nPrefix Length: ${data.prefixLength}\nNumber of IPs: ${data.totalIps}\nStart IP: ${data.startIp}\nEnd IP: ${data.endIp}\nPrefix Address: ${data.prefixAddress}`;
					resultContainer.style.display = "block";
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });
  });
});
