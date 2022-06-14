/* OpenLayer custom control um wieder zur initialen Position zurückzukehren */
class Home extends ol.control.Control {
    constructor(opt_options) {
        const options = opt_options || {};
        const button = document.createElement('button');
        button.innerHTML =
            '<img src="images/home-solid.svg" width="30" height="30" ></img>';
        button.title = 'Standortinformation';
        const element = document.createElement('div');
        element.className = 'home-control ol-unselectable ol-control';
        element.appendChild(button);

        super({
            element: element,
            target: options.target,
        });

        button.addEventListener('click', this.handleHome.bind(this), false);
    }

    handleHome() {
        map.getView().fit(sourcePoint.getExtent(), {
            size: map.getSize(),
            padding: padding,
        });
        //map.getView().setCenter(centerInit);
        //map.getView().setZoom(zoomInit);
    }
}
