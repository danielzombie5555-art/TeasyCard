function stars(r){
    return r
        ? `<span class="rating">★ ${r.toFixed(1)}</span>`
        : '<span class="meta">Rating pending</span>';
}


/* =========================
   VIDEO DATA
========================= */

const destinationVideos = {
    "pate-grill-house-fajar": "videos/pate-grill-house.mp4",
    "raizu": "videos/raizu.mp4",
    "table-waterfall": "videos/table-waterfall.mp4",
    "uubay": "videos/uu-bay-garden.mp4",
    "victoria-bay": "videos/victoria-bay.mp4"
};

/* =========================
   DESTINATION CARD
========================= */
function destinationCard(x) {
    const video = destinationVideos[x.id];

    return `
        <article class="card destination-card">

            <img 
                src="${x.image}" 
                alt="${x.name}"
                class="card-image"
            >

            <div class="card-content">

                <div class="card-tag">
                    ${x.typeLabel || x.category || ""}
                </div>

                <h3>${x.name}</h3>

                <div class="rating">
                    ⭐ ${x.rating ?? "N/A"}
                </div>

                <p class="location">
                    📍 ${x.location}
                </p>

                <p class="description">
                    ${x.description}
                </p>

                ${
                    x.ticket
                    ? `
                    <div class="info-row">
                        <strong>🎟️ Ticketing Fee</strong>
                        <span>${x.ticket}</span>
                    </div>
                    `
                    : ""
                }

                ${
                    x.opening
                    ? `
                    <div class="info-row">
                        <strong>🕒 Opening Hours</strong>
                        <span>${x.opening}</span>
                    </div>
                    `
                    : ""
                }

                <div class="card-buttons">

                    ${
                        video
                        ? `
                        <button
                            class="small-btn video-btn"
                            onclick="openVideo('${video}', '${x.name.replace(/'/g, "\\'")}')">
                            🎥 Watch Video
                        </button>
                        `
                        : ""
                    }

                    ${
                        x.lat && 
                        x.lon && 
                        x.lat !== 0 && 
                        x.lon !== 0
                        ? `
                        <a
                            href="https://www.google.com/maps?q=${x.lat},${x.lon}"
                            target="_blank"
                            class="small-btn">
                            📍 View Map
                        </a>
                        `
                        : ""
                    }

                </div>

            </div>

        </article>
    `;
}


/* =========================
   RESTAURANT CARD
========================= */

function restaurantCard(x){

    const video = destinationVideos[x.id];

    return `
        <article class="card">

            <img
                class="card-image"
                src="${x.image}"
                alt="${x.name}"
                loading="lazy"
            >

            <div class="card-body">

                <span class="tag">
                    ${x.category === 'cafe' ? 'Café' : 'Restaurant'}
                </span>

                <h3>${x.name}</h3>

                <p>
                    ${stars(x.rating)}
                    <span class="meta">
                        • ${x.reviews || 0} reviews
                    </span>
                </p>

                <p class="meta">
                    🍜 ${x.cuisine}
                    <br>
                    📍 ${x.location}
                </p>

                <p>
                    <strong>🔥 Popular:</strong>
                    ${x.bestSeller.join(', ')}
                </p>

                <div class="card-actions">

                    ${
                        video
                        ? `
                            <button
                                class="small-btn video-btn"
                                onclick="openVideo('${video}', '${x.name.replace(/'/g, "\\'")}')"
                            >
                                🎥 Watch Video
                            </button>
                        `
                        : ''
                    }

                    <a
                        class="small-btn"
                        href="map.html?place=${encodeURIComponent(x.id)}"
                    >
                        View on Map
                    </a>

                </div>

            </div>

        </article>
    `;
}


/* =========================
   VIDEO MODAL
========================= */

function openVideo(video, title){

    const modal = document.getElementById('video-modal');

    const player = document.getElementById('destination-video');

    const videoTitle =
        document.getElementById('video-modal-title');

    if(!modal || !player) return;

    videoTitle.textContent = title;

    player.src = video;

    modal.classList.add('show');

    player.play().catch(() => {});
}


/* =========================
   CLOSE VIDEO
========================= */

function closeVideo(){

    const modal = document.getElementById('video-modal');

    const player =
        document.getElementById('destination-video');

    if(player){

        player.pause();

        player.currentTime = 0;

        player.removeAttribute('src');

        player.load();
    }

    if(modal){
        modal.classList.remove('show');
    }
}


/* =========================
   VIDEO MODAL SETUP
========================= */

function setupVideoModal(){

    const modal =
        document.getElementById('video-modal');

    const close =
        document.getElementById('video-modal-close');

    if(close){
        close.onclick = closeVideo;
    }

    if(modal){

        modal.addEventListener('click', function(e){

            if(e.target === modal){
                closeVideo();
            }

        });
    }

    document.addEventListener('keydown', function(e){

        if(e.key === 'Escape'){
            closeVideo();
        }

    });
}


/* =========================
   CAR RENTAL CARD
========================= */

function rentalCard(x){

    return `
        <article class="card">

            <img
                class="card-image"
                src="${x.image}"
                alt="${x.name}"
                loading="lazy"
            >

            <div class="card-body">

                <span class="tag">Car Rental</span>

                <h3>${x.name}</h3>

                <p>
                    ${stars(x.rating)}
                    <span class="meta">
                        • ${x.reviews} reviews
                    </span>
                </p>

                <p class="meta">
                    📍 ${x.location}
                    <br>
                    🚗 ${x.vehicle}
                    <br>
                    💰 ${x.price}
                </p>

                <p>${x.description}</p>

                <div class="card-actions">

                    <a
                        class="small-btn"
                        href="map.html?place=${encodeURIComponent(x.id)}"
                    >
                        View on Map
                    </a>

                </div>

            </div>

        </article>
    `;
}


/* =========================
   ACCOMMODATION CARD
========================= */

function stayCard(x){

    return `
        <article class="card">

            <img
                class="card-image"
                src="${x.image}"
                alt="${x.name}"
                loading="lazy"
            >

            <div class="card-body">

                <span class="tag">${x.typeLabel}</span>

                <h3>${x.name}</h3>

                <p>
                    ${stars(x.rating)}
                    <span class="meta">
                        • ${x.reviews || 0} reviews
                    </span>
                </p>

                <p class="meta">
                    📍 ${x.location}
                    <br>
                    💰 ${x.price}
                </p>

                <p>${x.description}</p>

                <p class="meta">
                    ${x.facilities.map(f => '• ' + f).join(' ')}
                </p>

                <div class="card-actions">

                    <a
                        class="small-btn"
                        href="map.html?place=${encodeURIComponent(x.id)}"
                    >
                        View on Map
                    </a>

                </div>

            </div>

        </article>
    `;
}


/* =========================
   RENDER
========================= */

function render(id, html){

    const el = document.getElementById(id);

    if(el){
        el.innerHTML = html;
    }
}


/* =========================
   MOBILE MENU
========================= */

function setupMenu(){

    const b = document.querySelector('.menu-toggle');
    const n = document.querySelector('.nav');

    if(b && n){
        b.onclick = () => n.classList.toggle('open');
    }
}


/* =========================
   PAGE INITIALIZATION
========================= */

document.addEventListener('DOMContentLoaded', () => {

    setupMenu();

    setupVideoModal();


    /* DESTINATIONS */

    if(typeof attractions !== 'undefined'){

        const all =
            document.getElementById('destination-list');

        if(all){

            const draw = f => {

                render(
                    'destination-list',

                    attractions
                        .filter(x =>
                            f === 'all' || x.type === f
                        )
                        .map(destinationCard)
                        .join('')
                );

            };

            draw('all');

            document
                .querySelectorAll('[data-filter]')
                .forEach(b => {

                    b.onclick = () => {

                        document
                            .querySelectorAll('[data-filter]')
                            .forEach(x =>
                                x.classList.remove('active')
                            );

                        b.classList.add('active');

                        draw(b.dataset.filter);

                    };

                });
        }


        render(
            'city-list',
            attractions
                .filter(x => x.type === 'city')
                .map(destinationCard)
                .join('')
        );


        render(
            'nature-list',
            attractions
                .filter(x => x.type === 'nature')
                .map(destinationCard)
                .join('')
        );


        render(
            'home-destinations',
            attractions
                .slice(0, 6)
                .map(destinationCard)
                .join('')
        );
    }


    /* RESTAURANTS */

    if(typeof restaurants !== 'undefined'){

        render(
            'home-restaurants',
            restaurants
                .slice(0, 3)
                .map(restaurantCard)
                .join('')
        );


        const list =
            document.getElementById('restaurant-list');

        if(list){

            let filter = 'all';

            const draw = () => {

                const q = (
                    document
                        .getElementById('restaurant-search')
                        ?.value || ''
                ).toLowerCase();


                render(
                    'restaurant-list',

                    restaurants
                        .filter(x =>
                            (filter === 'all' ||
                            x.category === filter) &&
                            (
                                x.name +
                                x.cuisine +
                                x.location
                            )
                            .toLowerCase()
                            .includes(q)
                        )
                        .map(restaurantCard)
                        .join('')

                    || '<p>No matching restaurant found.</p>'
                );
            };


            draw();


            document
                .querySelectorAll('[data-food-filter]')
                .forEach(b => {

                    b.onclick = () => {

                        document
                            .querySelectorAll('[data-food-filter]')
                            .forEach(x =>
                                x.classList.remove('active')
                            );

                        b.classList.add('active');

                        filter = b.dataset.foodFilter;

                        draw();

                    };

                });


            const search =
                document.getElementById('restaurant-search');

            if(search){
                search.oninput = draw;
            }
        }
    }


    /* CAR RENTAL */

    if(typeof carRentals !== 'undefined'){

        render(
            'rental-list',
            carRentals
                .map(rentalCard)
                .join('')
        );
    }


    /* ACCOMMODATION */

    if(typeof accommodations !== 'undefined'){

        const list =
            document.getElementById('accommodation-list');

        if(list){

            const draw = f => {

                render(
                    'accommodation-list',

                    accommodations
                        .filter(x =>
                            f === 'all' || x.type === f
                        )
                        .map(stayCard)
                        .join('')
                );

            };


            draw('all');


            document
                .querySelectorAll('[data-stay-filter]')
                .forEach(b => {

                    b.onclick = () => {

                        document
                            .querySelectorAll('[data-stay-filter]')
                            .forEach(x =>
                                x.classList.remove('active')
                            );

                        b.classList.add('active');

                        draw(b.dataset.stayFilter);

                    };

                });
        }
    }

});