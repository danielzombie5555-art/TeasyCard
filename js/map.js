// ==========================================
// TAWAU EXPLORER - INTERACTIVE MAP
// ==========================================

// Tawau default location
const TAWAU_CENTER = [4.245, 117.895];

const map = L.map("map", {
    center: TAWAU_CENTER,
    zoom: 11,
    zoomControl: false,
    scrollWheelZoom: true
});

// ==========================================
// MAP TILE
// ==========================================

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);

// ==========================================
// ZOOM CONTROL
// ==========================================

L.control.zoom({
    position: "bottomright"
}).addTo(map);

// ==========================================
// MARKER GROUPS
// ==========================================

const groups = {
    city: [],
    nature: [],
    restaurant: [],
    rental: [],
    accommodation: []
};

// ==========================================
// CATEGORY SETTINGS
// ==========================================

const categoryInfo = {
    city: {
        color: "purple",
        label: "City",
        icon: "🏙️"
    },

    nature: {
        color: "green",
        label: "Nature",
        icon: "🌿"
    },

    restaurant: {
        color: "red",
        label: "Restaurant",
        icon: "🍽️"
    },

    rental: {
        color: "blue",
        label: "Car Rental",
        icon: "🚗"
    },

    accommodation: {
        color: "orange",
        label: "Accommodation",
        icon: "🏨"
    }
};

// ==========================================
// DESTINATION PAGE
// ==========================================

function getCategoryPage(type) {

    if (type === "restaurant") {
        return "restaurants.html";
    }

    if (type === "rental") {
        return "car-rental.html";
    }

    if (type === "accommodation") {
        return "accommodation.html";
    }

    return "destinations.html";
}

// ==========================================
// CREATE CUSTOM MARKER
// ==========================================

function createMarkerIcon(type) {

    const info = categoryInfo[type];

    return L.divIcon({
        className: "tawau-marker-wrapper",

        html: `
            <div class="custom-marker marker-${info.color}">
                <span></span>
            </div>
        `,

        iconSize: [30, 38],
        iconAnchor: [15, 38],
        popupAnchor: [0, -36]
    });
}

// ==========================================
// ADD MARKER
// ==========================================

function addMarker(place, type) {

    // Check coordinate
    if (
        typeof place.lat !== "number" ||
        typeof place.lon !== "number"
    ) {
        console.warn(
            "Invalid coordinates:",
            place.name,
            place.lat,
            place.lon
        );

        return;
    }

    // Check category
    if (!groups[type]) {
        console.warn(
            "Unknown category:",
            type,
            place.name
        );

        return;
    }

    const info = categoryInfo[type];

    const marker = L.marker(
        [place.lat, place.lon],
        {
            icon: createMarkerIcon(type),
            riseOnHover: true
        }
    );

    marker.category = type;
    marker.placeName = place.name || "";

    // ======================================
    // RATING
    // ======================================

    let ratingHTML = "";

    if (place.rating) {

        ratingHTML = `
            <div class="popup-rating">
                <span>★</span>
                ${place.rating}
            </div>
        `;

    } else {

        ratingHTML = `
            <div class="popup-rating pending">
                Rating pending
            </div>
        `;
    }

    // ======================================
    // DESCRIPTION
    // ======================================

    const description =
        place.description ||
        "Explore this location in Tawau.";

    // ======================================
    // LOCATION
    // ======================================

    const location =
        place.location ||
        "Tawau, Sabah";

    // ======================================
    // POPUP
    // ======================================

    const popupHTML = `

        <div class="map-popup">

            <div class="popup-category popup-${info.color}">
                ${info.icon}
                ${info.label}
            </div>

            <h3>
                ${place.name || "Unnamed Location"}
            </h3>

            ${ratingHTML}

            <div class="popup-location">
                📍 ${location}
            </div>

            <p class="popup-description">
                ${description}
            </p>

            <div class="popup-actions">

                <a
                    class="popup-button primary"
                    href="${getCategoryPage(type)}"
                >
                    View Details
                </a>

                <a
                    class="popup-button secondary"
                    href="https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}"
                    target="_blank"
                    rel="noopener"
                >
                    Directions
                </a>

            </div>

        </div>
    `;

    marker.bindPopup(popupHTML, {
        maxWidth: 320,
        minWidth: 260,
        closeButton: true
    });

    // ======================================
    // HOVER EFFECT
    // ======================================

    marker.on("mouseover", function () {
        this.setZIndexOffset(1000);
    });

    marker.on("mouseout", function () {
        this.setZIndexOffset(0);
    });

    // ======================================
    // SAVE + ADD
    // ======================================

    groups[type].push(marker);

    marker.addTo(map);
}

// ==========================================
// LOAD ATTRACTIONS
// ==========================================

if (typeof attractions !== "undefined") {

    attractions.forEach(place => {

        const type =
            place.type || "nature";

        addMarker(place, type);

    });

} else {

    console.warn(
        "attractions.js not loaded."
    );
}

// ==========================================
// LOAD RESTAURANTS
// ==========================================

if (typeof restaurants !== "undefined") {

    restaurants.forEach(place => {

        addMarker(
            place,
            "restaurant"
        );

    });

} else {

    console.warn(
        "restaurants.js not loaded."
    );
}

// ==========================================
// LOAD CAR RENTALS
// ==========================================

if (typeof carRentals !== "undefined") {

    carRentals.forEach(place => {

        addMarker(
            place,
            "rental"
        );

    });

} else {

    console.warn(
        "car-rentals.js not loaded."
    );
}

// ==========================================
// LOAD ACCOMMODATION
// ==========================================

if (typeof accommodations !== "undefined") {

    accommodations.forEach(place => {

        addMarker(
            place,
            "accommodation"
        );

    });

} else {

    console.warn(
        "accommodation.js not loaded."
    );
}

// ==========================================
// GET ALL MARKERS
// ==========================================

function getAllMarkers() {

    return Object
        .values(groups)
        .flat();

}

// ==========================================
// FILTER MAP
// ==========================================

function filterMap(type) {

    const allMarkers =
        getAllMarkers();

    // Remove all markers
    allMarkers.forEach(marker => {

        if (map.hasLayer(marker)) {
            map.removeLayer(marker);
        }

    });

    // Show selected category
    if (type === "all") {

        allMarkers.forEach(marker => {

            marker.addTo(map);

        });

    } else if (groups[type]) {

        groups[type].forEach(marker => {

            marker.addTo(map);

        });

    }

    // Update map view
    const visibleMarkers =
        type === "all"
            ? allMarkers
            : groups[type] || [];

    if (visibleMarkers.length > 0) {

        const bounds =
            L.featureGroup(visibleMarkers)
                .getBounds();

        map.fitBounds(
            bounds,
            {
                padding: [40, 40],
                maxZoom: 13
            }
        );

    }
}

// ==========================================
// FILTER BUTTONS
// ==========================================

document
    .querySelectorAll("[data-map-filter]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        "[data-map-filter]"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });

                this.classList.add("active");

                const filter =
                    this.dataset.mapFilter;

                filterMap(filter);

            }
        );

    });

// ==========================================
// LOCATE USER
// ==========================================

const LocateControl =
    L.Control.extend({

        options: {
            position: "bottomright"
        },

        onAdd: function () {

            const container =
                L.DomUtil.create(
                    "div",
                    "leaflet-bar leaflet-control"
                );

            const button =
                L.DomUtil.create(
                    "a",
                    "map-control-button",
                    container
                );

            button.innerHTML = "⌖";
            button.title =
                "Find my location";

            button.href = "#";

            L.DomEvent.disableClickPropagation(
                button
            );

            L.DomEvent.on(
                button,
                "click",
                function (event) {

                    L.DomEvent.preventDefault(
                        event
                    );

                    map.locate({
                        setView: true,
                        maxZoom: 15,
                        enableHighAccuracy: true
                    });

                }
            );

            return container;
        }
    });

map.addControl(
    new LocateControl()
);

// ==========================================
// LOCATION FOUND
// ==========================================

let userLocationMarker = null;

map.on(
    "locationfound",
    function (event) {

        if (userLocationMarker) {
            map.removeLayer(
                userLocationMarker
            );
        }

        userLocationMarker =
            L.circleMarker(
                event.latlng,
                {
                    radius: 8,
                    className:
                        "user-location-marker"
                }
            )
            .addTo(map)
            .bindPopup(
                "📍 You are here"
            )
            .openPopup();

    }
);

// ==========================================
// LOCATION ERROR
// ==========================================

map.on(
    "locationerror",
    function () {

        alert(
            "Unable to access your location. Please allow location permission in your browser."
        );

    }
);

// ==========================================
// OPEN LOCATION FROM URL
// Example:
// map.html?place=bukit-panchang
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const requestedPlace =
    params.get("place");

if (requestedPlace) {

    const searchName =
        requestedPlace
            .replaceAll("-", " ")
            .toLowerCase()
            .trim();

    const marker =
        getAllMarkers().find(
            item => {

                const name =
                    (
                        item.placeName ||
                        ""
                    )
                    .toLowerCase()
                    .trim();

                return (
                    name === searchName ||
                    name.includes(searchName)
                );

            }
        );

    if (marker) {

        map.setView(
            marker.getLatLng(),
            15,
            {
                animate: true
            }
        );

        setTimeout(
            () => {
                marker.openPopup();
            },
            400
        );

    }

}

// ==========================================
// MAP READY
// ==========================================

setTimeout(
    function () {

        map.invalidateSize();

    },
    300
);