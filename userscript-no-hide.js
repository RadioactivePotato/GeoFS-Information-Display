// ==UserScript==
// @name         GeoFS Information Display - no hide
// @version      2.2
// @description  Displays Speed/Altitude/Heading/VS on the bottom right of the screen
// @author       krunchiekrunch
// @match        https://www.geo-fs.com/geofs.php?v=*
// @match        https://*.geo-fs.com/geofs.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @grant        none
// ==/UserScript==

// Notes
// This script doesn't have the function to hide the display, use this if GeoFS lags when a key is pressed down.
// The AGL display will have a offset that varies from aircraft to aircraft, for example, the 737-700 have a offset of 10 while the C172 have a offset of 5.


(function() {
    'use strict';

    // Update display
    function updateFlightDataDisplay() {
        // Check if geofs.animation.values is available
        if (geofs.animation.values) {
            // Retrieve and format the required values
            var kias = geofs.animation.values.kias ? geofs.animation.values.kias.toFixed(1) : 'N/A';
            var mach = geofs.animation.values.mach ? geofs.animation.values.mach.toFixed(2) : 'N/A';
            var groundSpeed = geofs.animation.values.groundSpeed ? geofs.animation.values.groundSpeed.toFixed(1) : 'N/A';
            var altitude = geofs.animation.values.altitude ? Math.round(geofs.animation.values.altitude) : 'N/A';
            var heading = geofs.animation.values.heading360 ? Math.round(geofs.animation.values.heading360) : 'N/A';
            var agl = (geofs.animation.values.altitude !== undefined && geofs.animation.values.groundElevationFeet !== undefined) ? Math.round(geofs.animation.values.altitude - geofs.animation.values.groundElevationFeet) : 'N/A';
            var verticalSpeed = geofs.animation.values.verticalSpeed !== undefined ? Math.round(geofs.animation.values.verticalSpeed) : 'N/A';

            // Display css
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

            flightDataElement.innerHTML = `
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">KIAS ${kias}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">Mach ${mach}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">GS ${groundSpeed}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">ALT ${altitude}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">AGL ${agl}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">HDG ${heading}</span> |
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">V/S ${verticalSpeed === 'N/A' ? 'N/A' : verticalSpeed}</span>
            `;
        }
    }

    // Update flight data display every 100ms
    setInterval(updateFlightDataDisplay, 100);
})();
