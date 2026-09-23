// ===============================
// TEASYCARD INTERACTIVE MAP
// ===============================

// Tawau map
const map = L.map("map").setView([4.245, 117.895], 12);

// OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);


// ===============================
// CATEGORY GROUPS
// ===============================

const groups = {
    city: [],
    nature: [],
    restaurant: [],
    rental: [],
    accommodation: []
};


// ===============================
// MARKER COLOURS
// ===============================

const colors = {
    city: "#7b3fb5",
    nature: "#249653",
    restaurant: "#d83a3a",
    rental: "#3178d1",
    accommodation: "#e48a21"
};


// ===============================
// CREATE MARKER
// ===============================

function addMarker(item, category) {

    // Check coordinates
    if (
        item.lat === undefined ||
        item.lon === undefined ||
        item.lat === null ||
        item.lon === null ||
        item.lat === 0 ||
        item.lon === 0
    ) {
        console.warn("Marker skipped - no coordinates:", item.name);
        return;
    }

    const markerHTML = `
        <div
            style="
                width:20px;
                height:20px;
                background:${colors[category]};
                border:3px solid white;
                border-radius:50%;
                box-shadow:0 2px 6px rgba(0,0,0,0.4);
            "
        ></div>
    `;

    const icon = L.divIcon({
        className: "",
        html: markerHTML,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    const marker = L.marker(
        [Number(item.lat), Number(item.lon)],
        {
            icon: icon
        }
    );

    let popup = `
        <div style="min-width:220px">

            <h3 style="margin-bottom:8px;">
                ${item.name || "Unknown"}
            </h3>

            ${item.rating ? `
                <p>
                    ⭐ ${item.rating}
                </p>
            ` : ""}

            ${item.location ? `
                <p>
                    📍 ${item.location}
                </p>
            ` : ""}

            ${item.hours ? `
                <p>
                    🕒 ${item.hours}
                </p>
            ` : ""}

            ${item.phone ? `
                <p>
                    📞 ${item.phone}
                </p>
            ` : ""}

            ${item.description ? `
                <p>
                    ${item.description}
                </p>
            ` : ""}

            <a
                href="https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}"
                target="_blank"
                style="
                    display:inline-block;
                    margin-top:8px;
                    padding:8px 12px;
                    background:#3178d1;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                "
            >
                📍 Directions
            </a>

        </div>
    `;

    marker.bindPopup(popup);

    marker.category = category;

    groups[category].push(marker);

    marker.addTo(map);
}


// ===============================
// LOAD CITY & NATURE
// ===============================

if (typeof attractions !== "undefined") {

    attractions.forEach(function(item) {

        if (item.type === "city") {
            addMarker(item, "city");
        }

        else if (item.type === "nature") {
            addMarker(item, "nature");
        }

    });

}


// ===============================
// LOAD RESTAURANTS
// ===============================

if (typeof restaurants !== "undefined") {

    restaurants.forEach(function(item) {

        addMarker(item, "restaurant");

    });

}


// ===============================
// LOAD CAR RENTALS
// ===============================

if (typeof carRentals !== "undefined") {

    carRentals.forEach(function(item) {

        addMarker(item, "rental");

    });

}


// ===============================
// LOAD ACCOMMODATION
// ===============================

if (typeof accommodations !== "undefined") {

    accommodations.forEach(function(item) {

        addMarker(item, "accommodation");

    });

}


// ===============================
// FILTER MAP
// ===============================

function filterMap(category) {

    // Remove all markers
    Object.values(groups).forEach(function(group) {

        group.forEach(function(marker) {

            map.removeLayer(marker);

        });

    });


    // Show all
    if (category === "all") {

        Object.values(groups).forEach(function(group) {

            group.forEach(function(marker) {

                marker.addTo(map);

            });

        });

        return;
    }


    // Show selected category
    if (groups[category]) {

        groups[category].forEach(function(marker) {

            marker.addTo(map);

        });

    }

}


// ===============================
// FILTER BUTTONS
// ===============================

document
    .querySelectorAll("[data-map-filter]")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            // Remove active
            document
                .querySelectorAll("[data-map-filter]")
                .forEach(function(btn) {

                    btn.classList.remove("active");

                });


            // Add active
            button.classList.add("active");


            // Filter
            filterMap(
                button.dataset.mapFilter
            );

        });

    });


// ===============================
// CONSOLE CHECK
// ===============================

console.log("TeasyCard Map Loaded");

console.log(
    "City:",
    groups.city.length
);

console.log(
    "Nature:",
    groups.nature.length
);

console.log(
    "Restaurants:",
    groups.restaurant.length
);

console.log(
    "Car Rental:",
    groups.rental.length
);

console.log(
    "Accommodation:",
    groups.accommodation.length
);