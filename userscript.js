// ==UserScript==
// @name         GeoFS Information Display
// @version      2.0
// @description  Displays Speed/Altitude/Heading/VS on the bottom right of the screen
// @author       krunchiekrunch
// @match        https://www.geo-fs.com/geofs.php?v=*
// @match        https://*.geo-fs.com/geofs.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @grant        none
// ==/UserScript==

// Notes
// Pressing 'i' will hide the display
// TAS display is currently disabled, so it will say N/A (Line 25,26, and 66)


(function() {
    'use strict';

    // Function to update flight data display
    function updateFlightDataDisplay() {
        // Check if geofs.animation.values is available
        if (geofs.animation.values) {
            // Retrieve and format the required values
            //var tas = geofs.animation.values.tas ? geofs.animation.values.tas.toFixed(1) : 'N/A';
            var tas = 'Disabled';
            var kias = geofs.animation.values.kias ? geofs.animation.values.kias.toFixed(1) : 'N/A';
            var mach = geofs.animation.values.mach ? geofs.animation.values.mach.toFixed(2) : 'N/A';
            var groundSpeed = geofs.animation.values.groundSpeed ? geofs.animation.values.groundSpeed.toFixed(1) : 'N/A';
            var altitude = geofs.animation.values.altitude ? Math.round(geofs.animation.values.altitude) : 'N/A';
            var heading = geofs.animation.values.heading360 ? Math.round(geofs.animation.values.heading360) : 'N/A';
            var verticalSpeed = geofs.animation.values.verticalSpeed !== undefined ? Math.round(geofs.animation.values.verticalSpeed) : 'N/A';

            // Update the flight data display with formatted values
            var flightDataElement = document.getElementById('flightDataDisplay');
            if (!flightDataElement) {
                flightDataElement = document.createElement('div');
                flightDataElement.id = 'flightDataDisplay';
                flightDataElement.style.position = 'fixed';
                flightDataElement.style.bottom = '0';
                flightDataElement.style.right = 'calc(10px + 48px + 16px)';
                flightDataElement.style.height = '36px';
                flightDataElement.style.minWidth = '64px';
                flightDataElement.style.padding = '0 16px';
                flightDataElement.style.display = 'inline-block';
                flightDataElement.style.fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
                flightDataElement.style.fontSize = '14px';
                flightDataElement.style.textTransform = 'uppercase';
                flightDataElement.style.overflow = 'hidden';
                flightDataElement.style.willChange = 'box-shadow';
                flightDataElement.style.transition = 'box-shadow .2s cubic-bezier(.4,0,1,1), background-color .2s cubic-bezier(.4,0,.2,1), color .2s cubic-bezier(.4,0,.2,1)';
                flightDataElement.style.textAlign = 'center';
                flightDataElement.style.lineHeight = '36px';
                flightDataElement.style.verticalAlign = 'middle';
                flightDataElement.style.zIndex = '9999';
                document.body.appendChild(flightDataElement);
            }

            // Hide the flight data display if 'i' key is pressed
            document.addEventListener('keydown', function(event) {
                if (event.key === 'i') {
                    flightDataElement.style.display = flightDataElement.style.display === 'none' ? 'inline-block' : 'none';
                }
            });

            flightDataElement.innerHTML = `
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">TAS ${tas}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">KIAS ${kias}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">Mach ${mach}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">GS ${groundSpeed}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">ALT ${altitude}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">HDG ${heading}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">V/S ${verticalSpeed === 'N/A' ? 'N/A' : verticalSpeed}</span>
            `;
        }
    }

    // Update flight data display every 0.1 seconds
    setInterval(updateFlightDataDisplay, 100);
})();
