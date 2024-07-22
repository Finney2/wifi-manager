document.addEventListener("DOMContentLoaded", function() {
    // Dropdown Toggle Function
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    // Close Dropdown if Clicked Outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    // Handle WiFi Scan (for debugging purposes)
    function fScanWifi() {
        var headers = {
            "accept-ranges": "none",
            "connection": "close",
            "content-disposition": "inline",
            "filename": "wifimanager.html",
            "content-length": "1585",
            "content-type": "text/html",
            "wifis": "itsipl5:-51,airtel_9894780016:-60,itsipl9:-62,itsipl 7:-69,dhil1508:-90,"
        };
        console.log(headers);
    }

    // Toggle Input Fields
    const ipCheckbox = document.getElementById('ip-checkbox');
    const gatewayCheckbox = document.getElementById('gateway-checkbox');
    const ipInput = document.getElementById('ipAddress');
    const gatewayInput = document.getElementById('gatewayAddress');

    function toggleInput(checkbox, input) {
        if (checkbox.checked) {
            input.style.display = 'block';
        } else {
            input.style.display = 'none';
        }
    }

    ipCheckbox.addEventListener('change', function() {
        toggleInput(ipCheckbox, ipInput);
    });

    gatewayCheckbox.addEventListener('change', function() {
        toggleInput(gatewayCheckbox, gatewayInput);
    });

    // Initialize Dropdown List and Event Handlers
    const dropdownButton = document.getElementById('dropdownbutton');
    const dropdownList = document.getElementById('dropdownlist');

    dropdownButton.addEventListener('click', function() {
        dropdownList.classList.toggle('show');
    });

    dropdownList.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function() {
            const selectedValue = item.getAttribute('data-value');
            const selectedText = item.textContent;
            dropdownButton.textContent = selectedText;
            dropdownList.classList.remove('show');
        });
    });

    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownList.contains(event.target)) {
            dropdownList.classList.remove('show');
        }
    });

    function initializeNetworkList() {
        var networkItems = document.querySelectorAll("#dropdownlist li");
        networkItems.forEach(function(item) {
            item.addEventListener("click", function() {
                updateSSID(item.innerText);
            });
        });
    }

    // Define Networks and Helper Functions
    const networks = [
        { name: 'ITSIPL-5', signalStrength: -51 },
        { name: 'AIRTEL_9894780016', signalStrength: -60 },
        { name: 'ITSIPL-9', signalStrength: -62 },
        { name: 'ITSIPL-7', signalStrength: -69 },
        { name: 'DHIL1508', signalStrength: -90 }
    ];

  

    function hideDropdown() {
        const dropdown = document.getElementById("myDropdown");
        dropdown.style.display = "none";
    }

    function createDropdownItem(network) {
        const li = document.createElement("li");
        li.classList.add('wifi-item');
        li.setAttribute('data-fullname', network.name);
        const truncatedName = network.name.length > 17 ? network.name.substring(0, 17) + '...' : network.name;
        const nameSpan = document.createElement("span");
        nameSpan.textContent = truncatedName;
        nameSpan.classList.add('network-name');
        li.appendChild(nameSpan);
        const img = document.createElement("img");
        img.src = getSignalImage(network.signalStrength); // Placeholder for SVG image URL
        img.alt = `${network.signalStrength} dBm`;
        img.classList.add('wifi-signal');
        li.appendChild(img);
        li.addEventListener("click", function() {
            const fullName = li.getAttribute('data-fullname');
            const selectedImage = document.createElement("img");
            selectedImage.src = getSignalImage(network.signalStrength); // Placeholder for SVG image URL
            selectedImage.alt = `${network.signalStrength} dBm`;
            selectedImage.classList.add('wifi-signal-selected');
            const dropdownButton = document.getElementById("dropdownbutton");
            dropdownButton.innerHTML = '';
            dropdownButton.appendChild(selectedImage);
            const dropdownIcon = document.createElement("span");
            dropdownIcon.classList.add('dropdown-icon');
            dropdownIcon.innerHTML = '&#9660;';
            dropdownButton.append(` ${truncatedName}`);
            dropdownButton.appendChild(dropdownIcon);
            document.getElementById("ssid").value = fullName;
            document.getElementById("selectedNetworkName").textContent = network.name;
            document.getElementById("selectedNetworkImage").src = getSignalImage(network.signalStrength); // Placeholder for SVG image URL
            hideDropdown();
        });
        return li;
    }

    function getSignalImage(signalStrength) {
        if (signalStrength >= -50) {
            // Excellent signal
            return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwMjIiIHdpZHRoPSIxMjgwIiBoZWlnaHQ9IjEyODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDApIiBkPSJtMCAwaDIwNDh2MjAyMmgtMjA0OHoiIGZpbGw9IiNGRUZFRkUiLz4KPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ2MCw0NTYpIiBkPSJtMCAwaDk2bDM0IDEgMjggMiAxMyAzIDIgNyAxIDY2djExMTlsLTEgMjMtNCAxNy0yIDQtOSAzLTEwIDFoLTE3N2wtMTUtMS02LTItMy05LTItMTktMS0yMC0xLTQ4di05OTJsMS0xMzAgNS0xNiA3LTYgMTYtMnoiLz4KPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTExMSw3MzIpIiBkPSJtMCAwaDE0NGwzNiAyIDE2IDMgMyAzIDEgNiAxIDYydjgwNGwtMSA1NS0zIDIyLTIgOS0xMyAzLTI1IDFoLTE2MGwtMTUtMS01LTItMy02LTQtMTctMS0xMC0xLTkydi02OTdsMS04OSAxLTI5IDMtMTQgMy03IDYtNHoiLz4KPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzk5LDEwMDkpIiBkPSJtMCAwaDEyN2wyNSAxIDI0IDMgMTAgMyAzIDMgMSA5IDEgMzI1djE0M2wtMSAxNDYtMSAzMi00IDIwLTQgNC0xMyAzLTE0IDFoLTE1NGwtMjctMy0xMS00LTItNy0xLTEwLTEtMjR2LTU5N2wxLTM4IDEtMiAyMS01eiIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NTMsMTI4NikiIGQ9Im0wIDBoMTU5bDI1IDEgMTUgMiA1IDIgNCA2IDMgMTMgMSAxMnYyOTJsLTEgNTItMiAyNi0yIDctMTYgMi0xMTcgMWgtMjdsLTQwLTEtMTYtMi02LTMtMi03LTEtMTUtMS04NXYtMTgxbDEtOTMgMS0xMSAxMy0xN3oiLz4KPC9zdmc+Cg=='; // Replace with actual base64 string for excellent signal
        } else if (signalStrength >= -60) {
            // Good signal
            return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwMDAiIHdpZHRoPSIxMjgwIiBoZWlnaHQ9IjEyODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDApIiBkPSJtMCAwaDIwNDh2MmUzaC0yMDQ4eiIgZmlsbD0iI0ZFRkVGRSIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTAzLDc1NikiIGQ9Im0wIDBoMTMxbDQ1IDIgMTQgMiAzIDYgMSAxMCAxIDI1djczNGwtMSAxMjgtMSAxNi0xIDYtMTEgMi04IDEtMTkgMWgtMTQ1bC0yMC0xLTEzLTItMS0zLTEtMTMtMS0yN3YtNzgxbDEtNzkgMS0xMyA0LTggNS00eiIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDg0LDUyNCkiIGQ9Im0wIDBoODhsNCAydjEwMzFsMSA5Ny03IDJoLTE0NmwtMi0yLTEtMjJ2LTg2M2wxLTI0MyAxLTF6IiBmaWxsPSIjRkVGRUZFIi8+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwMiwxMDIyKSIgZD0ibTAgMGgxMjNsMjkgMSAxOSAyIDkgMiA0IDUgMSA0IDEgMjMgMSAxMTZ2Mjc2bC0xIDE2My0xIDM5LTMgMjItMyA5LTggMy0xMiAyaC0xNThsLTI1LTEtOS0xLTItMy0xLTE0LTEtNjR2LTU0MmwxLTI5IDItNiAxMS00IDEwLTJ6Ii8+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NTYsNDg4KSIgZD0ibTAgMGg4MGw0MSAyIDIxIDMgOCA0IDMgNyAxIDEwIDEgMTgxdjczMWwtMSAyMzQtMiAxMy00IDgtOCA1LTQgMS0xNSAxLTQ1IDFoLTExMGwtMTgtMi0xMC01LTQtMTAtMS05LTEtMzF2LTk2NmwxLTE1OCAxLTcgNS01IDE2LTUgMTktMnptMjggMzYtNjEgMS0xIDEtMSAyNDN2ODYzbDEgMjIgMiAyaDE0N2w2LTItMS05N3YtMTAzMWwtNC0yeiIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MzIsMTI4OCkiIGQ9Im0wIDBoNjJsNDQgMSAxNiAxIDkgMiA3IDYgNCA4IDIgMTF2MjkzbC0xIDQ5LTQgMjItNCA0LTkgMy04IDEtNDkgMWgtODVsLTQzLTEtMTQtMS0yLTUtMi0xOC0xLTIwLTEtNTR2LTIwOWwxLTY1IDItMTggNS02IDYtMiAxOC0yeiIvPgo8L3N2Zz4K'; // Replace with actual base64 string for good signal
        } else if (signalStrength >= -70) {
            // Fair signal
            return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIHdpZHRoPSIxMjgwIiBoZWlnaHQ9IjEyODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDApIiBkPSJtMCAwaDIwNDh2MjA0OGgtMjA0OHoiIGZpbGw9IiNGREZERkQiLz4KPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ1OSw1MzIpIiBkPSJtMCAwaDEzM2wyIDQtMSAyMDJ2MzM0bDEgNDkwIDEgMTEyLTEgMS04IDEtMTQ4LTEtMi0zLTEtMjN2LTk1bDEtODUgMS00OTQgMS0zMTUgMS0xMjd6IiBmaWxsPSIjRkRGREZEIi8+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgyNywxMDM0KSIgZD0ibTAgMGgxMjZsMTUgMSAxMiAzIDEwIDQgNCA1IDMgMTIgMSAyN3Y0OTNsLTEgOTgtNCAxNi02IDExLTYgNS0zIDEtMTIgMWgtMTczbC0xMS0xLTQtMi00LTE1LTItMTYtMS0yMjB2LTM3NmwxLTM5IDgtMyAxOS0zeiIgZmlsbD0iIzAyMDEwMSIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTUzLDgwMikiIGQ9Im0wIDBoMTI1bDEgMXY5OWwtMSAxNDR2MzgxbDIgMTk2djUwbC0zIDItNSAxLTE0OS0xLTQtNXYtODJsMS0xNDAgMS02NDQgMS0xeiIgZmlsbD0iI0ZERkRGRCIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDU0LDQ5NCkiIGQ9Im0wIDBoOTFsNDcgMiAxNSAyIDEzIDQgNCA1IDMgOSAxIDI2djE4MWwtMSA5NTctMyAxMy01IDEwLTUgNC01IDItMTAgMS03MCAxaC05OGwtMTUtMi04LTMtMy01LTItMTAtMS0xMy0xLTE4OC0xLTU5MHYtMzI3bDEtNDEgMy0xNiAzLTEwIDItNyAyLTIgMTUtMnptNSAzOC0yMCAxLTEgMTI3LTEgMzE1LTEgNDk0LTEgODV2OTVsMSAyMyAyIDMgMTQ4IDEgOC0xIDEtMS0xLTExMi0xLTQ5MHYtMzM0bDEtMjAyLTItNHoiIGZpbGw9IiMwMjAxMDEiLz4KPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTQ3LDEzMDQpIiBkPSJtMCAwaDcxbDQwIDEgMTIgMiA0IDUgNyAyMSAxIDcgMSA2N3YyMDdsLTEgNDctMSAxOC0zIDIxLTMgNy01IDMtNiAxaC0xNzZsLTE2LTItOC0zLTMtNC0zLTEwLTEtNy0xLTIyLTEtOTh2LTcybDEtMTQyIDEtMjMgMy0xMCA2LTcgOC00IDE4LTJ6IiBmaWxsPSIjMDIwMTAxIi8+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExNTIsNzY1KSIgZD0ibTAgMGg5M2wzMSAxIDIwIDIgOCA0IDQgNSA1IDExdjg5M2wtNCAxMS01IDktOCA2LTcgMi0xMSAxLTUyIDFoLTEwMWwtMjAtMi0xMC0zLTQtNC0zLTEzLTEtMTEtMS0zNS0xLTQ5M3YtMzI1bDEtMzAgMy0xOCAzLTYgNC0zIDE0LTJ6bTEgMzctMzEgMS0xIDEtMSA2NDQtMSAxNDB2ODJsNCA1IDE0OSAxIDctMiAxLTF2LTUwbC0yLTE5NnYtMzgxbDEtMTQ0di05OWwtMS0xeiIgZmlsbD0iIzAyMDEwMSIvPgo8L3N2Zz4K'; // Replace with actual base64 string for fair signal
        } else {
            // Poor signal
            return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwMDAiIHdpZHRoPSIxMjgwIiBoZWlnaHQ9IjEyODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDApIiBkPSJtMCAwaDIwNDh2MmUzaC0yMDQ4eiIgZmlsbD0iI0ZERkRGRCIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTA2LDUyNSkiIGQ9Im0wIDBoNzdsMSAxdjQwNWwxIDYyOSAxIDgzdjM4bC0zIDItMTI2IDFoLTI4bC00LTN2LTEwNzNsMS02NyAxLTEzIDEtMSAyMy0xeiIgZmlsbD0iI0ZERkRGRCIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjE2LDc5OCkiIGQ9Im0wIDBoMjZsMjEgMSAxIDEgMSA3ODggMSA2OXYyMWwtMyA1LTMgMmgtMjZsLTEyMS0xLTUtNC0xLTJ2LTMzNmwxLTUyMSAxLTIwIDEtMnoiIGZpbGw9IiNGREZERkQiLz4KPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ1Myw0ODgpIiBkPSJtMCAwaDEwOGwzMyAyIDEyIDMgNiA0IDkgMTcgMiAxMCAxIDc4IDEgMTM3djE2NWwtMSA0MDEtMSA2Ni0yIDI5MC0xIDI1LTQgMTgtMyA3LTUgNC0xMyAzLTQ0IDFoLTEyN2wtMTMtMi05LTQtNS02LTMtMTEtMS05LTEtMjQtMS00MS0yLTE3M3YtNDIwbDEtNDgwIDEtMjcgNS0xNiA0LTExIDMtMyA5LTIgMTEtMXptNTMgMzctNTUgMS0yMyAxLTEgMS0xIDEzLTEgNjd2MTA3M2w0IDNoMjhsMTI2LTEgMy0ydi0zOGwtMS04My0xLTYyOXYtNDA1bC0xLTF6IiBmaWxsPSIjMDQwMzA0Ii8+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgyNiwxMDcxKSIgZD0ibTAgMGgxMThsMSAxdjI1NGwxIDIxNSAxIDEzOC0xIDQtNSAyLTQ3LTEtMTAzLTEtMy0zLTEtNyAxLTI0NyAxLTM1MyAxLTF6IiBmaWxsPSIjRkRGREZEIi8+CjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ4NywxMzA4KSIgZD0ibTAgMGg5OGwzMSAxIDM0IDMgOSAyIDIgNSAxIDEzIDEgNDJ2Mjc0bC0xIDQwLTIgMjItMiA1LTQgMi03IDEtMjcgMWgtMTQ0bC0zOC0yLTItMy0yLTQ5di0yODZsMS00NSAzLTIxIDQtMiAyMi0yeiIgZmlsbD0iIzA0MDMwNCIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTAzLDc2MikiIGQ9Im0wIDBoMTA5bDQ1IDEgMzEgMiA5IDMgMiAxMyAxIDEzdjY1NWwtMSAyNDAtMiAxMi00IDgtNiA1LTcgMy02IDEtMzEgMWgtMTQxbC0xNy0zLTYtNC0zLTktMi0xNC0xLTMwLTItMTM3di01OTRsMS0xNDIgMi0xMiA4LTcgMTMtNHptMTEzIDM2LTEwNiAxLTEgMi0xIDIwLTEgNTIxdjMzNmw0IDUgMiAxIDEyMSAxaDI2bDUtNCAxLTN2LTIxbC0xLTY5LTEtNzg4LTEtMS0yMS0xeiIgZmlsbD0iIzA0MDMwNCIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3OTUsMTAzNCkiIGQ9Im0wIDBoMTQ1bDE4IDIgMTYgNCA1IDUgMyAyMXY2MjBsLTQgMTYtNiA4LTQgNC0xMCAzLTcgMS01OSAxaC0xMTBsLTE2LTItNi0zLTMtOC0yLTE2LTEtMjYtMS04MHYtNTEybDEtMTYgMy0xMiAzLTMgMTEtNCAxMS0yem0zMSAzNy0zNiAxLTEgMS0xIDM1My0xIDI0NyAxIDcgMyAzIDEwMyAxIDQ3IDEgNS0yIDEtNC0xLTEzOC0xLTIxNXYtMjU0bC0xLTF6IiBmaWxsPSIjMDQwMzA0Ii8+Cjwvc3ZnPgo='; // Replace with actual base64 string for weak signal
        }
    }
});
