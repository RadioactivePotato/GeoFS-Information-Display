// ==UserScript==
// @name         GeoFS Ground Speed Display
// @version      1.0
// @description  Displays ground speed on the bottom right of the screen
// @author       krunchiekrunch
// @match        https://www.geo-fs.com/geofs.php?v=*
// @match        https://*.geo-fs.com/geofs.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Update ground speed display
    function updateGroundSpeedDisplay() {
        var groundSpeed = geofs.aircraft.instance.groundSpeed.toFixed(1); // Round ground speed to 1 dp
        var groundSpeedElement = document.getElementById('groundSpeedDisplay');
        if (!groundSpeedElement) {
            // Create the ground speed display
            groundSpeedElement = document.createElement('div');
            groundSpeedElement.id = 'groundSpeedDisplay';
            groundSpeedElement.textContent = 'GS ' + groundSpeed;
            groundSpeedElement.style.background = '0 0';
            groundSpeedElement.style.border = 'none';
            groundSpeedElement.style.borderRadius = '2px';
            groundSpeedElement.style.color = '#000';
            groundSpeedElement.style.position = 'fixed';
            groundSpeedElement.style.bottom = '0';
            groundSpeedElement.style.right = 'calc(10px + 48px + 16px)';
            groundSpeedElement.style.height = '36px';
            groundSpeedElement.style.minWidth = '64px';
            groundSpeedElement.style.padding = '0 16px';
            groundSpeedElement.style.display = 'inline-block';
            groundSpeedElement.style.fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
            groundSpeedElement.style.fontSize = '14px';
            groundSpeedElement.style.fontWeight = '500';
            groundSpeedElement.style.textTransform = 'uppercase';
            groundSpeedElement.style.letterSpacing = '0';
            groundSpeedElement.style.overflow = 'hidden';
            groundSpeedElement.style.willChange = 'box-shadow';
            groundSpeedElement.style.transition = 'box-shadow .2s cubic-bezier(.4,0,1,1), background-color .2s cubic-bezier(.4,0,.2,1), color .2s cubic-bezier(.4,0,.2,1)';
            groundSpeedElement.style.outline = 'none';
            groundSpeedElement.style.cursor = 'pointer';
            groundSpeedElement.style.textDecoration = 'none';
            groundSpeedElement.style.textAlign = 'center';
            groundSpeedElement.style.lineHeight = '36px';
            groundSpeedElement.style.verticalAlign = 'middle';
            groundSpeedElement.style.zIndex = '9999';
            document.body.appendChild(groundSpeedElement);
        } else {
            groundSpeedElement.textContent = 'GS ' + groundSpeed;
            groundSpeedElement.style.right = 'calc(10px + 48px + 16px)';
        }
    }

    // Update ground speed display every 100 ms
    setInterval(updateGroundSpeedDisplay, 100);
})();
