/* OpenLayer custom control zur Standortanzeige */
class LocationAPI extends ol.control.Control {
    constructor(opt_options) {
        const options = opt_options || {};
        const button = document.createElement('button');
        button.innerHTML =
            '<img src="images/location-dot-white.svg" width="30" height="30" ></img>';
        button.title = 'Standortinformation';
        const element = document.createElement('div');
        element.className = 'location-api ol-unselectable ol-control';
        element.appendChild(button);

        super({
            element: element,
            target: options.target,
        });

        button.addEventListener(
            'click',
            this.handleLocationAPI.bind(this),
            false,
        );
    }

    handleLocationAPI() {
        geolocation.setTracking(true);
        //  Warten bis die Positionierung auch verfügbar ist
        function checkFlag() {
            if (geolocation.getPosition() === undefined) {
                window.setTimeout(checkFlag, 200);
            } else {
                const coordinates = geolocation.getPosition();
                positionFeature.setGeometry(
                    coordinates ? new ol.geom.Point(coordinates) : null,
                );
                // Karte auf Position zentrieren
                map.getView().setCenter(coordinates);
            }
        }

        if (geolocationError === true) {
            alert(
                'Entweder ist die Lokalisierierung nicht erlaubt worden, oder es ist ein anderer Fehler aufgetreten',
            );
        } else {
            checkFlag();
        }
    }
}
